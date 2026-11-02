/**
 * SHAHRAVA — D3.js City Comparison Radar / Spider Chart
 * Compares two metropolitan centers across 6 normalized dimensions.
 */

import * as d3 from 'd3';
import { toPersianDigits, normalizeMetric } from '../utils/formatting.js';
import { getLang, t } from '../i18n/index.js';

export class ComparisonRadar {
  constructor(containerElement) {
    this.container = containerElement;
    this.svg = null;
    this.resizeObserver = null;
    this.city1 = null;
    this.city2 = null;
    this.theme1 = null;
    this.theme2 = null;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('class', 'w-full h-full overflow-visible')
      .attr('aria-label', 'نمودار رادار مقایسه چندبعدی دو شهر');

    this.resizeObserver = new ResizeObserver(() => {
      if (this.city1 && this.city2) {
        this.render(this.city1, this.city2, this.theme1, this.theme2);
      }
    });
    this.resizeObserver.observe(this.container);
  }

  render(city1, city2, theme1, theme2) {
    if (!this.container || !city1 || !city2) return;
    this.city1 = city1;
    this.city2 = city2;
    this.theme1 = theme1;
    this.theme2 = theme2;

    const lang = getLang();
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const height = Math.max(rect.height, 300);

    const margin = 45;
    const radius = Math.min(width, height) / 2 - margin;
    const center = { x: width / 2, y: height / 2 };

    this.svg.selectAll('*').remove();
    this.svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = this.svg.append('g')
      .attr('transform', `translate(${center.x},${center.y})`);

    // Define 6 key dimensions
    const axes = [
      { key: 'population', fa: 'جمعیت', en: 'Population', min: 1000000, max: 20000000 },
      { key: 'density', fa: 'تراکم سکونت', en: 'Density', min: 1000, max: 25000 },
      { key: 'elevation', fa: 'ارتفاع طبیعی', en: 'Elevation', min: 0, max: 2000 },
      { key: 'climate', fa: 'اعتدال اقلیمی', en: 'Climate', min: 0, max: 100 },
      { key: 'heritage', fa: 'میراث و قدمت', en: 'Heritage', min: 0, max: 100 },
      { key: 'attractions', fa: 'تنوع جاذبه‌ها', en: 'Landmarks', min: 1, max: 10 }
    ];

    const totalAxes = axes.length;
    const angleSlice = (Math.PI * 2) / totalAxes;

    // Radius scale
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 100]);

    // Concentric Web Circles
    const levels = 4;
    for (let level = 1; level <= levels; level++) {
      const levelFactor = radius * (level / levels);
      const points = [];
      for (let i = 0; i < totalAxes; i++) {
        const x = levelFactor * Math.cos(angleSlice * i - Math.PI / 2);
        const y = levelFactor * Math.sin(angleSlice * i - Math.PI / 2);
        points.push([x, y]);
      }

      g.append('polygon')
        .attr('points', points.map(p => p.join(',')).join(' '))
        .attr('stroke', 'rgba(255,255,255,0.12)')
        .attr('fill', level % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent')
        .attr('stroke-width', 1);
    }

    // Radial axis lines and labels
    axes.forEach((axis, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = (radius + 20) * Math.cos(angle);
      const y = (radius + 20) * Math.sin(angle);

      // Axis ray
      g.append('line')
        .attr('x1', 0).attr('y1', 0)
        .attr('x2', radius * Math.cos(angle))
        .attr('y2', radius * Math.sin(angle))
        .attr('stroke', 'rgba(255,255,255,0.18)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2,2');

      // Label
      const label = lang === 'fa' ? axis.fa : axis.en;
      g.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('fill', 'rgba(255,255,255,0.85)')
        .attr('class', 'text-[11px] font-medium')
        .text(label);
    });

    // Score calculations
    const computeScore = (city) => {
      return axes.map(axis => {
        let rawVal = 50;
        if (axis.key === 'population') rawVal = city.population || 5000000;
        if (axis.key === 'density') rawVal = city.density || 5000;
        if (axis.key === 'elevation') rawVal = city.elevation || 50;
        if (axis.key === 'climate') {
          // Score mildness based on temp spread
          const highs = city.climate?.highs || [20, 20];
          const spread = Math.max(...highs) - Math.min(...highs);
          rawVal = Math.max(20, 100 - spread * 2);
        }
        if (axis.key === 'heritage') rawVal = 75 + (city.nameFa === 'اصفهان' || city.nameFa === 'رم' ? 20 : 0);
        if (axis.key === 'attractions') rawVal = (city.attractions?.length || 4) * 10;

        return {
          key: axis.key,
          score: normalizeMetric(rawVal, axis.min, axis.max)
        };
      });
    };

    const scores1 = computeScore(city1);
    const scores2 = computeScore(city2);

    // Draw City 1 Polygon
    const points1 = scores1.map((d, i) => {
      const r = rScale(d.score);
      const angle = angleSlice * i - Math.PI / 2;
      return [r * Math.cos(angle), r * Math.sin(angle)];
    });

    g.append('polygon')
      .attr('points', points1.map(p => p.join(',')).join(' '))
      .attr('stroke', theme1.primary)
      .attr('stroke-width', 2.5)
      .attr('fill', theme1.primary)
      .attr('fill-opacity', 0.28)
      .attr('class', 'transition-all duration-500');

    // Draw City 2 Polygon
    const points2 = scores2.map((d, i) => {
      const r = rScale(d.score);
      const angle = angleSlice * i - Math.PI / 2;
      return [r * Math.cos(angle), r * Math.sin(angle)];
    });

    g.append('polygon')
      .attr('points', points2.map(p => p.join(',')).join(' '))
      .attr('stroke', theme2.primary)
      .attr('stroke-width', 2.5)
      .attr('fill', theme2.primary)
      .attr('fill-opacity', 0.28)
      .attr('class', 'transition-all duration-500');

    // Data points for City 1
    points1.forEach(p => {
      g.append('circle')
        .attr('cx', p[0]).attr('cy', p[1])
        .attr('r', 4)
        .attr('fill', theme1.primary)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1.5);
    });

    // Data points for City 2
    points2.forEach(p => {
      g.append('circle')
        .attr('cx', p[0]).attr('cy', p[1])
        .attr('r', 4)
        .attr('fill', theme2.primary)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1.5);
    });
  }

  destroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.container) this.container.innerHTML = '';
  }
}
