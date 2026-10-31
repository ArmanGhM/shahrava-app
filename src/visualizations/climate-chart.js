/**
 * SHAHRAVA — D3.js Climate & Precipitation Visualization Engine
 * Interactive dual-axis area + bar chart with responsive SVG,
 * ResizeObserver, theme integration, and accessible tooltips.
 */

import * as d3 from 'd3';
import { toPersianDigits } from '../utils/formatting.js';
import { getLang, t } from '../i18n/index.js';

export class ClimateChart {
  constructor(containerElement) {
    this.container = containerElement;
    this.svg = null;
    this.resizeObserver = null;
    this.currentData = null;
    this.currentTheme = null;
    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = '';

    // Create SVG with responsive viewBox
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('class', 'w-full h-full overflow-visible')
      .attr('aria-label', 'نمودار اقلیمی دما و بارش ماهانه');

    // Tooltip element
    this.tooltip = d3.select(this.container)
      .append('div')
      .attr('class', 'climate-chart-tooltip pointer-events-none absolute z-20 hidden rounded-xl border border-white/20 bg-slate-900/95 px-3 py-2 text-xs text-white shadow-2xl backdrop-blur-md transition-opacity duration-150');

    // Resize observer for responsive rendering
    this.resizeObserver = new ResizeObserver(() => {
      if (this.currentData && this.currentTheme) {
        this.render(this.currentData, this.currentTheme);
      }
    });
    this.resizeObserver.observe(this.container);
  }

  render(climateData, theme) {
    if (!this.container || !climateData || !climateData.highs) return;
    this.currentData = climateData;
    this.currentTheme = theme;

    const lang = getLang();
    const months = lang === 'fa' 
      ? ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const rect = this.container.getBoundingClientRect();
    const width = Math.max(rect.width, 300);
    const height = Math.max(rect.height, 240);

    const margin = { top: 25, right: 40, bottom: 40, left: 45 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Reset SVG contents cleanly
    this.svg.selectAll('*').remove();
    this.svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Dataset structure
    const data = months.map((month, i) => ({
      month,
      index: i,
      high: climateData.highs[i] ?? 20,
      low: climateData.lows[i] ?? 10,
      rainfall: climateData.rainfall[i] ?? 20
    }));

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, innerWidth])
      .padding(0.25);

    const minTemp = Math.min(...data.map(d => d.low), 0);
    const maxTemp = Math.max(...data.map(d => d.high), 40) + 5;
    const yTemp = d3.scaleLinear()
      .domain([minTemp, maxTemp])
      .nice()
      .range([innerHeight, 0]);

    const maxRain = Math.max(...data.map(d => d.rainfall), 50);
    const yRain = d3.scaleLinear()
      .domain([0, maxRain * 1.25])
      .range([innerHeight, 0]);

    // Gradient definitions
    const defs = this.svg.append('defs');

    // Area Gradient
    const areaGrad = defs.append('linearGradient')
      .attr('id', 'temp-area-grad')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    areaGrad.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', theme.primary)
      .attr('stop-opacity', 0.45);

    areaGrad.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', theme.primary)
      .attr('stop-opacity', 0.02);

    // Rainfall Bar Gradient
    const rainGrad = defs.append('linearGradient')
      .attr('id', 'rain-bar-grad')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    rainGrad.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', theme.secondary)
      .attr('stop-opacity', 0.5);

    rainGrad.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', theme.secondary)
      .attr('stop-opacity', 0.15);

    // Grid lines (horizontal)
    g.append('g')
      .attr('class', 'grid text-slate-700/30 dark:text-slate-200/10')
      .call(d3.axisLeft(yTemp)
        .ticks(5)
        .tickSize(-innerWidth)
        .tickFormat('')
      )
      .call(grid => grid.select('.domain').remove())
      .call(grid => grid.selectAll('line').attr('stroke-dasharray', '3,3'));

    // Rainfall Bars
    g.selectAll('.rain-bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'rain-bar transition-all duration-300')
      .attr('x', d => x(d.month))
      .attr('y', d => yRain(d.rainfall))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - yRain(d.rainfall))
      .attr('rx', 3)
      .attr('fill', 'url(#rain-bar-grad)');

    // Temperature Area between high and low
    const areaGen = d3.area()
      .x(d => x(d.month) + x.bandwidth() / 2)
      .y0(d => yTemp(d.low))
      .y1(d => yTemp(d.high))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#temp-area-grad)')
      .attr('d', areaGen);

    // High Temperature Curve
    const lineHigh = d3.line()
      .x(d => x(d.month) + x.bandwidth() / 2)
      .y(d => yTemp(d.high))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', theme.primary)
      .attr('stroke-width', 2.5)
      .attr('d', lineHigh);

    // Low Temperature Curve
    const lineLow = d3.line()
      .x(d => x(d.month) + x.bandwidth() / 2)
      .y(d => yTemp(d.low))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', theme.secondary)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,3')
      .attr('d', lineLow);

    // Data Points for High Temp
    g.selectAll('.dot-high')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot-high')
      .attr('cx', d => x(d.month) + x.bandwidth() / 2)
      .attr('cy', d => yTemp(d.high))
      .attr('r', 4)
      .attr('fill', theme.primary)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5);

    // Bottom Axis (Months)
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(10));

    xAxis.select('.domain').attr('stroke', 'rgba(255,255,255,0.15)');
    xAxis.selectAll('text')
      .attr('fill', 'currentColor')
      .attr('class', 'text-[11px] font-medium opacity-75');

    // Left Axis (Temp °C)
    const yAxisLeft = g.append('g')
      .call(d3.axisLeft(yTemp).ticks(5).tickFormat(d => lang === 'fa' ? `${toPersianDigits(d)}°` : `${d}°`));

    yAxisLeft.select('.domain').remove();
    yAxisLeft.selectAll('text')
      .attr('fill', theme.primary)
      .attr('class', 'text-[11px] font-semibold');

    // Right Axis (Rainfall mm)
    const yAxisRight = g.append('g')
      .attr('transform', `translate(${innerWidth},0)`)
      .call(d3.axisRight(yRain).ticks(4).tickFormat(d => lang === 'fa' ? `${toPersianDigits(d)}` : `${d}`));

    yAxisRight.select('.domain').remove();
    yAxisRight.selectAll('text')
      .attr('fill', theme.secondary)
      .attr('class', 'text-[11px] font-medium opacity-80');

    // Interactive Hover Tracking
    const verticalLine = g.append('line')
      .attr('class', 'hover-line pointer-events-none opacity-0')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'rgba(255,255,255,0.4)')
      .attr('stroke-dasharray', '3,3');

    const focusCircleHigh = g.append('circle')
      .attr('class', 'focus-circle-high pointer-events-none opacity-0')
      .attr('r', 6)
      .attr('fill', theme.primary)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    const focusCircleLow = g.append('circle')
      .attr('class', 'focus-circle-low pointer-events-none opacity-0')
      .attr('r', 5)
      .attr('fill', theme.secondary)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Overlay rect to capture mouse movements
    g.append('rect')
      .attr('class', 'overlay fill-transparent cursor-crosshair')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event);
        // Find closest month
        const bandwidth = x.step();
        const hoveredIndex = Math.min(Math.max(0, Math.floor(mx / bandwidth)), data.length - 1);
        const d = data[hoveredIndex];
        if (!d) return;

        const posX = x(d.month) + x.bandwidth() / 2;

        verticalLine
          .attr('x1', posX)
          .attr('x2', posX)
          .attr('opacity', 1);

        focusCircleHigh
          .attr('cx', posX)
          .attr('cy', yTemp(d.high))
          .attr('opacity', 1);

        focusCircleLow
          .attr('cx', posX)
          .attr('cy', yTemp(d.low))
          .attr('opacity', 1);

        // Tooltip formatting
        const highStr = lang === 'fa' ? `${toPersianDigits(d.high)}°C` : `${d.high}°C`;
        const lowStr = lang === 'fa' ? `${toPersianDigits(d.low)}°C` : `${d.low}°C`;
        const rainStr = lang === 'fa' ? `${toPersianDigits(d.rainfall)} میلی‌متر` : `${d.rainfall} mm`;

        this.tooltip
          .html(`
            <div class="font-bold text-white mb-1 border-b border-white/10 pb-1">${d.month}</div>
            <div class="flex items-center justify-between gap-4 py-0.5">
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full" style="background:${theme.primary}"></span>${t('visualizations.highTemp', 'بیشینه دما')}:</span>
              <span class="font-bold text-emerald-400">${highStr}</span>
            </div>
            <div class="flex items-center justify-between gap-4 py-0.5">
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full" style="background:${theme.secondary}"></span>${t('visualizations.lowTemp', 'کمینه دما')}:</span>
              <span class="font-bold text-sky-400">${lowStr}</span>
            </div>
            <div class="flex items-center justify-between gap-4 py-0.5">
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-400"></span>${t('visualizations.rainfall', 'بارش')}:</span>
              <span class="font-bold text-amber-300">${rainStr}</span>
            </div>
          `)
          .style('left', `${posX + margin.left - 50}px`)
          .style('top', `${Math.min(yTemp(d.high) + margin.top - 70, height - 100)}px`)
          .classed('hidden', false);
      })
      .on('mouseleave', () => {
        verticalLine.attr('opacity', 0);
        focusCircleHigh.attr('opacity', 0);
        focusCircleLow.attr('opacity', 0);
        this.tooltip.classed('hidden', true);
      });
  }

  destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}
