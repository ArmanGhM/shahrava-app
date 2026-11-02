/**
 * SHAHRAVA — D3.js City Comparison Radar / Spider Chart
 * ✅ FIX #9: heritage & attractions now data-driven (no more clamp-to-100)
 */

import * as d3 from "d3";
import { normalizeMetric } from "../utils/formatting.js";
import { getLang } from "../i18n/index.js";

// Cities with deep ancient history receive a heritage boost
const ANCIENT_CITY_IDS = new Set([
  "rome",
  "isfahan",
  "istanbul",
  "cairo",
  "athens",
  "jerusalem",
  "tehran",
]);

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
    this.container.innerHTML = "";

    this.svg = d3
      .select(this.container)
      .append("svg")
      .attr("class", "w-full h-full overflow-visible")
      .attr("aria-label", "نمودار رادار مقایسه چندبعدی دو شهر");

    // ✅ Debounced resize (mobile perf)
    let resizeTimer = null;
    this.resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (this.city1 && this.city2) {
          this.render(this.city1, this.city2, this.theme1, this.theme2);
        }
      }, 150);
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

    this.svg.selectAll("*").remove();
    this.svg.attr("viewBox", `0 0 ${width} ${height}`);

    const g = this.svg
      .append("g")
      .attr("transform", `translate(${center.x},${center.y})`);

    // ✅ FIX #9: attractions max bumped 10 → 15 (cities now have 12-14 each)
    const axes = [
      {
        key: "population",
        fa: "جمعیت",
        en: "Population",
        min: 1_000_000,
        max: 20_000_000,
      },
      {
        key: "density",
        fa: "تراکم سکونت",
        en: "Density",
        min: 1000,
        max: 25000,
      },
      {
        key: "elevation",
        fa: "ارتفاع طبیعی",
        en: "Elevation",
        min: 0,
        max: 2000,
      },
      { key: "climate", fa: "اعتدال اقلیمی", en: "Climate", min: 0, max: 100 },
      { key: "heritage", fa: "میراث و قدمت", en: "Heritage", min: 0, max: 100 },
      {
        key: "attractions",
        fa: "تنوع جاذبه‌ها",
        en: "Landmarks",
        min: 0,
        max: 15,
      },
    ];

    const totalAxes = axes.length;
    const angleSlice = (Math.PI * 2) / totalAxes;
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 100]);

    // Concentric web rings
    const levels = 4;
    for (let level = 1; level <= levels; level++) {
      const levelFactor = radius * (level / levels);
      const points = [];
      for (let i = 0; i < totalAxes; i++) {
        const x = levelFactor * Math.cos(angleSlice * i - Math.PI / 2);
        const y = levelFactor * Math.sin(angleSlice * i - Math.PI / 2);
        points.push([x, y]);
      }

      g.append("polygon")
        .attr("points", points.map((p) => p.join(",")).join(" "))
        .attr("stroke", "rgba(255,255,255,0.12)")
        .attr(
          "fill",
          level % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
        )
        .attr("stroke-width", 1);
    }

    // Axis rays + labels
    axes.forEach((axis, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = (radius + 20) * Math.cos(angle);
      const y = (radius + 20) * Math.sin(angle);

      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", radius * Math.cos(angle))
        .attr("y2", radius * Math.sin(angle))
        .attr("stroke", "rgba(255,255,255,0.18)")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

      const label = lang === "fa" ? axis.fa : axis.en;
      g.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("fill", "rgba(255,255,255,0.85)")
        .attr("class", "text-[11px] font-medium")
        .text(label);
    });

    // ✅ Data-driven scoring
    const computeScore = (city) => {
      return axes.map((axis) => {
        let rawVal = 50;

        if (axis.key === "population") {
          rawVal = city.population || 5_000_000;
        } else if (axis.key === "density") {
          rawVal = city.density || 5000;
        } else if (axis.key === "elevation") {
          rawVal = city.elevation || 50;
        } else if (axis.key === "climate") {
          // Smaller temperature spread = milder, more comfortable climate
          const highs = city.climate?.highs || [20, 20];
          const spread = Math.max(...highs) - Math.min(...highs);
          rawVal = Math.max(20, 100 - spread * 2);
        } else if (axis.key === "heritage") {
          // Count historical/religious attractions + ancient city boost
          const heritageCount = (city.attractions || []).filter(
            (a) => a.category === "historical" || a.category === "religious",
          ).length;
          const ancientBoost = ANCIENT_CITY_IDS.has(city.id) ? 25 : 0;
          rawVal = Math.min(100, 40 + heritageCount * 6 + ancientBoost);
        } else if (axis.key === "attractions") {
          // Real count, normalized against realistic max (15)
          rawVal = (city.attractions || []).length || 4;
        }

        return {
          key: axis.key,
          score: normalizeMetric(rawVal, axis.min, axis.max),
        };
      });
    };

    const scores1 = computeScore(city1);
    const scores2 = computeScore(city2);

    const points1 = scores1.map((d, i) => {
      const r = rScale(d.score);
      const angle = angleSlice * i - Math.PI / 2;
      return [r * Math.cos(angle), r * Math.sin(angle)];
    });

    g.append("polygon")
      .attr("points", points1.map((p) => p.join(",")).join(" "))
      .attr("stroke", theme1.primary)
      .attr("stroke-width", 2.5)
      .attr("fill", theme1.primary)
      .attr("fill-opacity", 0.28)
      .attr("class", "transition-all duration-500");

    const points2 = scores2.map((d, i) => {
      const r = rScale(d.score);
      const angle = angleSlice * i - Math.PI / 2;
      return [r * Math.cos(angle), r * Math.sin(angle)];
    });

    g.append("polygon")
      .attr("points", points2.map((p) => p.join(",")).join(" "))
      .attr("stroke", theme2.primary)
      .attr("stroke-width", 2.5)
      .attr("fill", theme2.primary)
      .attr("fill-opacity", 0.28)
      .attr("class", "transition-all duration-500");

    points1.forEach((p) => {
      g.append("circle")
        .attr("cx", p[0])
        .attr("cy", p[1])
        .attr("r", 4)
        .attr("fill", theme1.primary)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1.5);
    });

    points2.forEach((p) => {
      g.append("circle")
        .attr("cx", p[0])
        .attr("cy", p[1])
        .attr("r", 4)
        .attr("fill", theme2.primary)
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1.5);
    });
  }

  destroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.container) this.container.innerHTML = "";
  }
}
