/**
 * SHAHRAVA — D3.js Historical Population Trajectory Engine
 * Interactive line + area progression chart with milestone data points and Persian numerals.
 */

import * as d3 from 'd3';
import { toPersianDigits, formatNumber } from '../utils/formatting.js';
import { getLang, t } from '../i18n/index.js';

export class PopulationChart {
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

    this.svg = d3.select(this.container)
      .append('svg')
      .attr('class', 'w-full h-full overflow-visible')
      .attr('aria-label', 'نمودار تاریخی رشد جمعیت');

    this.tooltip = d3.select(this.container)
      .append('div')
      .attr('class', 'pop-chart-tooltip pointer-events-none absolute z-20 hidden rounded-xl border border-white/20 bg-slate-900/95 px-3 py-2 text-xs text-white shadow-2xl backdrop-blur-md transition-opacity duration-150');

    this.resizeObserver = new ResizeObserver(() => {
      if (this.currentData && this.currentTheme) {
        this.render(this.currentData, this.currentTheme);
      }
    });
    this.resizeObserver.observe(this.container);
  }

  render(populationHistory, theme) {
    if (!this.container || !populationHistory || !populationHistory.length) return;
    this.currentData = populationHistory;
    this.currentTheme = theme;

    const lang = getLang();
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(rect.width, 300);
    const height = Math.max(rect.height, 220);

    const margin = { top: 20, right: 30, bottom: 35, left: 45 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    this.svg.selectAll('*').remove();
    this.svg.attr('viewBox', `0 0 ${width} ${height}`);

    const g = this.svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleLinear()
      .domain(d3.extent(populationHistory, d => d.year))
      .range([0, innerWidth]);

    const maxPop = d3.max(populationHistory, d => d.pop) * 1.15;
    const y = d3.scaleLinear()
      .domain([0, maxPop])
      .nice()
      .range([innerHeight, 0]);

    // Gradient
    const defs = this.svg.append('defs');
    const areaGrad = defs.append('linearGradient')
      .attr('id', 'pop-area-grad')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    areaGrad.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', theme.primary)
      .attr('stop-opacity', 0.4);

    areaGrad.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', theme.primary)
      .attr('stop-opacity', 0.0);

    // Grid lines
    g.append('g')
      .attr('class', 'grid text-slate-700/30 dark:text-slate-200/10')
      .call(d3.axisLeft(y)
        .ticks(4)
        .tickSize(-innerWidth)
        .tickFormat('')
      )
      .call(grid => grid.select('.domain').remove())
      .call(grid => grid.selectAll('line').attr('stroke-dasharray', '3,3'));

    // Area
    const area = d3.area()
      .x(d => x(d.year))
      .y0(innerHeight)
      .y1(d => y(d.pop))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(populationHistory)
      .attr('fill', 'url(#pop-area-grad)')
      .attr('d', area);

    // Line
    const line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d.pop))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(populationHistory)
      .attr('fill', 'none')
      .attr('stroke', theme.primary)
      .attr('stroke-width', 3)
      .attr('d', line);

    // Data dots
    g.selectAll('.pop-dot')
      .data(populationHistory)
      .enter()
      .append('circle')
      .attr('class', 'pop-dot transition-transform hover:scale-150 cursor-pointer')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(d.pop))
      .attr('r', 4.5)
      .attr('fill', theme.secondary)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2);

    // X Axis
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => lang === 'fa' ? toPersianDigits(d) : d));

    xAxis.select('.domain').attr('stroke', 'rgba(255,255,255,0.15)');
    xAxis.selectAll('text')
      .attr('fill', 'currentColor')
      .attr('class', 'text-[11px] font-medium opacity-75');

    // Y Axis (Millions)
    const yAxis = g.append('g')
      .call(d3.axisLeft(y).ticks(4).tickFormat(d => {
        return lang === 'fa' ? `${toPersianDigits(d)} م` : `${d}M`;
      }));

    yAxis.select('.domain').remove();
    yAxis.selectAll('text')
      .attr('fill', theme.primary)
      .attr('class', 'text-[11px] font-bold');

    // Hover effect
    const focusLine = g.append('line')
      .attr('class', 'pointer-events-none opacity-0')
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', 'rgba(255,255,255,0.3)')
      .attr('stroke-dasharray', '3,3');

    const focusPoint = g.append('circle')
      .attr('class', 'pointer-events-none opacity-0')
      .attr('r', 6)
      .attr('fill', theme.secondary)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    g.append('rect')
      .attr('class', 'fill-transparent cursor-crosshair')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .on('mousemove', (event) => {
        const [mx] = d3.pointer(event);
        const yearVal = Math.round(x.invert(mx));
        
        // Find closest datum
        let closest = populationHistory[0];
        let minDiff = Infinity;
        populationHistory.forEach(d => {
          const diff = Math.abs(d.year - yearVal);
          if (diff < minDiff) {
            minDiff = diff;
            closest = d;
          }
        });

        const cx = x(closest.year);
        const cy = y(closest.pop);

        focusLine.attr('x1', cx).attr('x2', cx).attr('opacity', 1);
        focusPoint.attr('cx', cx).attr('cy', cy).attr('opacity', 1);

        const yearLabel = lang === 'fa' ? `سال ${toPersianDigits(closest.year)}` : `Year ${closest.year}`;
        const popLabel = lang === 'fa' 
          ? `${toPersianDigits(closest.pop)} میلیون نفر` 
          : `${closest.pop} Million Inhabitants`;

        this.tooltip
          .html(`
            <div class="font-bold text-white mb-0.5">${yearLabel}</div>
            <div class="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full" style="background:${theme.primary}"></span>
              ${popLabel}
            </div>
          `)
          .style('left', `${cx + margin.left - 45}px`)
          .style('top', `${cy + margin.top - 50}px`)
          .classed('hidden', false);
      })
      .on('mouseleave', () => {
        focusLine.attr('opacity', 0);
        focusPoint.attr('opacity', 0);
        this.tooltip.classed('hidden', true);
      });
  }

  destroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.container) this.container.innerHTML = '';
  }
}
