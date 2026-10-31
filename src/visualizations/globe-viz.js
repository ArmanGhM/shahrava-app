/**
 * SHAHRAVA — D3.js Planetary Orthographic 3D Mini-Globe Engine
 * Interactive draggable rotating earth sphere with glowing atmosphere,
 * graticules, and a pulsing radar beacon at the city's exact coordinates.
 */

import * as d3 from 'd3';

export class GlobeVisualizer {
  constructor(containerElement) {
    this.container = containerElement;
    this.svg = null;
    this.resizeObserver = null;
    this.projection = null;
    this.path = null;
    this.currentCoords = [35.6892, 51.3890]; // [lat, lon]
    this.currentTheme = null;
    this.rotation = [-51.3890, -35.6892];
    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('class', 'w-full h-full overflow-visible select-none cursor-grab active:cursor-grabbing')
      .attr('aria-label', 'کره زمین سه‌بعدی و موقعیت سیاره‌ای شهر');

    this.resizeObserver = new ResizeObserver(() => {
      this.render(this.currentCoords, this.currentTheme);
    });
    this.resizeObserver.observe(this.container);
  }

  render(coords, theme) {
    if (!this.container || !coords) return;
    this.currentCoords = coords;
    this.currentTheme = theme;

    const [lat, lon] = coords;
    // Target rotation to focus on city coordinates
    this.rotation = [-lon, -lat];

    const rect = this.container.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height, 260);
    const radius = (size / 2) - 15;

    this.svg.selectAll('*').remove();
    this.svg.attr('viewBox', `0 0 ${size} ${size}`);

    // D3 Orthographic Projection
    this.projection = d3.geoOrthographic()
      .scale(radius)
      .translate([size / 2, size / 2])
      .rotate(this.rotation)
      .clipAngle(90);

    this.path = d3.geoPath().projection(this.projection);

    const defs = this.svg.append('defs');

    // Atmosphere Glow Filter
    const filter = defs.append('filter')
      .attr('id', 'globe-glow')
      .attr('x', '-30%').attr('y', '-30%')
      .attr('width', '160%').attr('height', '160%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '6')
      .attr('result', 'blur');

    filter.append('feComposite')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'blur')
      .attr('operator', 'over');

    // Globe Ocean Fill Gradient
    const oceanGrad = defs.append('radialGradient')
      .attr('id', 'ocean-grad')
      .attr('cx', '35%').attr('cy', '35%');

    oceanGrad.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#1e293b');

    oceanGrad.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#090d16');

    // Atmosphere Ring
    this.svg.append('circle')
      .attr('cx', size / 2)
      .attr('cy', size / 2)
      .attr('r', radius + 5)
      .attr('fill', 'none')
      .attr('stroke', theme ? theme.primary : '#38bdf8')
      .attr('stroke-width', 2.5)
      .attr('stroke-opacity', 0.45)
      .attr('filter', 'url(#globe-glow)');

    // Ocean Sphere
    const sphere = { type: 'Sphere' };
    this.svg.append('path')
      .datum(sphere)
      .attr('fill', 'url(#ocean-grad)')
      .attr('stroke', 'rgba(255,255,255,0.2)')
      .attr('stroke-width', 1)
      .attr('d', this.path);

    // Graticules (Latitude & Longitude grid)
    const graticule = d3.geoGraticule().step([20, 20]);
    this.svg.append('path')
      .datum(graticule())
      .attr('class', 'graticule')
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.12)')
      .attr('stroke-width', 0.75)
      .attr('d', this.path);

    // Equator highlight
    const equator = { type: 'LineString', coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, 0]) };
    this.svg.append('path')
      .datum(equator)
      .attr('fill', 'none')
      .attr('stroke', theme ? theme.secondary : '#f59e0b')
      .attr('stroke-opacity', 0.35)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3')
      .attr('d', this.path);

    // City Marker Ping (Latitude & Longitude)
    const projectedPoint = this.projection([lon, lat]);
    if (projectedPoint) {
      // Check if point is on the visible front hemisphere
      const centerLon = -this.rotation[0];
      const centerLat = -this.rotation[1];
      const distance = d3.geoDistance([lon, lat], [centerLon, centerLat]);

      if (distance < Math.PI / 2) {
        const markerGroup = this.svg.append('g')
          .attr('class', 'city-beacon')
          .attr('transform', `translate(${projectedPoint[0]},${projectedPoint[1]})`);

        // Pulsing radar ripples
        markerGroup.append('circle')
          .attr('r', 12)
          .attr('fill', theme ? theme.primary : '#38bdf8')
          .attr('fill-opacity', 0.25)
          .attr('class', 'animate-ping');

        markerGroup.append('circle')
          .attr('r', 6)
          .attr('fill', theme ? theme.primary : '#38bdf8')
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 2);
      }
    }

    // Drag Interaction to rotate the globe
    const drag = d3.drag()
      .on('drag', (event) => {
        const sens = 0.45;
        this.rotation[0] += event.dx * sens;
        this.rotation[1] -= event.dy * sens;
        this.rotation[1] = Math.max(-85, Math.min(85, this.rotation[1]));

        this.projection.rotate(this.rotation);
        this.svg.selectAll('path').attr('d', this.path);

        // Update city beacon position
        const p = this.projection([lon, lat]);
        const centerLon = -this.rotation[0];
        const centerLat = -this.rotation[1];
        const dist = d3.geoDistance([lon, lat], [centerLon, centerLat]);

        const beacon = this.svg.select('.city-beacon');
        if (dist < Math.PI / 2 && p) {
          beacon
            .attr('transform', `translate(${p[0]},${p[1]})`)
            .attr('display', 'block');
        } else {
          beacon.attr('display', 'none');
        }
      });

    this.svg.call(drag);
  }

  destroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.container) this.container.innerHTML = '';
  }
}
