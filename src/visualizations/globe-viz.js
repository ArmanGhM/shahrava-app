/**
 * SHAHRAVA — D3.js Planetary Orthographic Mini-Globe
 * ✅ Mobile-optimized: rAF-throttled drag, cached topology, quality reduction
 */

import * as d3 from "d3";
import * as topojson from "topojson-client";
import landTopology from "../data/land-110m.json";

export class GlobeVisualizer {
  constructor(containerElement) {
    this.container = containerElement;
    this.svg = null;
    this.resizeObserver = null;
    this.projection = null;
    this.path = null;
    this.currentCoords = [35.6892, 51.389];
    this.currentTheme = null;
    this.rotation = [-51.389, -35.6892];

    // ✅ 1. تشخیص دستگاه ضعیف (موبایل یا CPU کم)
    this.isMobile =
      typeof window !== "undefined" &&
      (matchMedia("(pointer: coarse)").matches ||
        matchMedia("(max-width: 640px)").matches ||
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4));

    // ✅ 2. کش کردن یکباره FeatureCollection (نه هر بار)
    this.landFeature = topojson.feature(
      landTopology,
      landTopology.objects.land,
    );

    // ✅ 3. rAF throttle برای drag
    this.dragPending = false;
    this.lastDragEvent = null;
    this.dragFrame = null;

    // ✅ 4. debounce برای resize
    this.resizeTimer = null;

    this.init();
  }

  init() {
    if (!this.container) return;
    this.container.innerHTML = "";

    this.svg = d3
      .select(this.container)
      .append("svg")
      .attr(
        "class",
        "w-full h-full overflow-visible select-none cursor-grab active:cursor-grabbing",
      )
      .attr("aria-label", "کره زمین سه‌بعدی و موقعیت سیاره‌ای شهر");

    // ✅ 5. Debounce resize (موبایل: ۲۵۰ms، دسکتاپ: ۱۲۰ms)
    this.resizeObserver = new ResizeObserver(() => {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(
        () => {
          if (this.currentTheme) {
            this.render(this.currentCoords, this.currentTheme);
          }
        },
        this.isMobile ? 250 : 120,
      );
    });
    this.resizeObserver.observe(this.container);
  }

  render(coords, theme) {
    if (!this.container || !coords) return;
    this.currentCoords = coords;
    this.currentTheme = theme;

    const [lat, lon] = coords;
    this.rotation = [-lon, -lat];

    const rect = this.container.getBoundingClientRect();
    // ✅ موبایل: کمی کوچکتر برای صرفه‌جویی در پیکسل
    const size = Math.min(rect.width, rect.height, this.isMobile ? 220 : 260);
    const radius = size / 2 - 15;

    this.svg.selectAll("*").remove();
    this.svg.attr("viewBox", `0 0 ${size} ${size}`);

    this.projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([size / 2, size / 2])
      .rotate(this.rotation)
      .clipAngle(90);

    this.path = d3.geoPath().projection(this.projection);

    const defs = this.svg.append("defs");

    // ✅ 6. فیلتر blur سبکتر روی موبایل
    const blurAmount = this.isMobile ? 3 : 6;
    const filter = defs
      .append("filter")
      .attr("id", "globe-glow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");

    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", blurAmount)
      .attr("result", "blur");

    filter
      .append("feComposite")
      .attr("in", "SourceGraphic")
      .attr("in2", "blur")
      .attr("operator", "over");

    // Ocean gradient
    const oceanGrad = defs
      .append("radialGradient")
      .attr("id", "ocean-grad")
      .attr("cx", "35%")
      .attr("cy", "35%");
    oceanGrad.append("stop").attr("offset", "0%").attr("stop-color", "#1a2a3f");
    oceanGrad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#070c16");

    // Land gradient
    const landGrad = defs
      .append("radialGradient")
      .attr("id", "land-grad")
      .attr("cx", "35%")
      .attr("cy", "35%");
    landGrad
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", theme ? theme.primary : "#4a7c8f")
      .attr("stop-opacity", 0.55);
    landGrad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", theme ? theme.secondary : "#2d4a5c")
      .attr("stop-opacity", 0.75);

    // Atmosphere ring (بدون filter روی موبایل)
    this.svg
      .append("circle")
      .attr("cx", size / 2)
      .attr("cy", size / 2)
      .attr("r", radius + 4)
      .attr("fill", "none")
      .attr("stroke", theme ? theme.primary : "#38bdf8")
      .attr("stroke-width", this.isMobile ? 1.5 : 2.5)
      .attr("stroke-opacity", 0.4)
      .attr("filter", this.isMobile ? null : "url(#globe-glow)");

    // Ocean
    this.svg
      .append("path")
      .datum({ type: "Sphere" })
      .attr("fill", "url(#ocean-grad)")
      .attr("stroke", "rgba(255,255,255,0.15)")
      .attr("stroke-width", 1)
      .attr("d", this.path);

    // ✅ Land (from cache — faster)
    this.svg
      .append("g")
      .attr("class", "land-layer")
      .append("path")
      .datum(this.landFeature)
      .attr("fill", "url(#land-grad)")
      .attr("stroke", theme ? theme.primary : "#38bdf8")
      .attr("stroke-width", 0.4)
      .attr("stroke-opacity", 0.35)
      .attr("d", this.path);

    // ✅ 7. Graticule فقط روی دسکتاپ (روی موبایل حذف)
    if (!this.isMobile) {
      const graticule = d3.geoGraticule().step([20, 20]);
      this.svg
        .append("path")
        .datum(graticule())
        .attr("fill", "none")
        .attr("stroke", "rgba(255,255,255,0.09)")
        .attr("stroke-width", 0.5)
        .attr("d", this.path);
    }

    // ✅ Equator ساده‌تر روی موبایل
    const equatorStep = this.isMobile ? 5 : 1;
    const equator = {
      type: "LineString",
      coordinates: Array.from(
        { length: Math.floor(360 / equatorStep) + 1 },
        (_, i) => [i * equatorStep - 180, 0],
      ),
    };
    this.svg
      .append("path")
      .datum(equator)
      .attr("fill", "none")
      .attr("stroke", theme ? theme.secondary : "#f59e0b")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3")
      .attr("d", this.path);

    // ✅ 8. Beacon (بدون animate-ping روی موبایل)
    const projectedPoint = this.projection([lon, lat]);
    if (projectedPoint) {
      const distance = d3.geoDistance(
        [lon, lat],
        [-this.rotation[0], -this.rotation[1]],
      );
      if (distance < Math.PI / 2) {
        const beaconGroup = this.svg
          .append("g")
          .attr("class", "city-beacon")
          .attr(
            "transform",
            `translate(${projectedPoint[0]},${projectedPoint[1]})`,
          );

        if (!this.isMobile) {
          beaconGroup
            .append("circle")
            .attr("r", 12)
            .attr("fill", theme ? theme.primary : "#38bdf8")
            .attr("fill-opacity", 0.25)
            .attr("class", "animate-ping");
        }

        beaconGroup
          .append("circle")
          .attr("r", this.isMobile ? 5 : 6)
          .attr("fill", theme ? theme.primary : "#38bdf8")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 2);
      }
    }

    // ✅ 9. Drag با rAF throttle
    this._setupDrag(lat, lon);
  }

  _setupDrag(lat, lon) {
    const sens = this.isMobile ? 0.55 : 0.45;

    // ✅ Cache element references (نه query هر بار)
    const paths = this.svg.selectAll("path");
    const beacon = this.svg.select(".city-beacon");
    const self = this;

    const applyFrame = () => {
      self.dragFrame = null;
      if (!self.lastDragEvent) return;
      const event = self.lastDragEvent;
      self.lastDragEvent = null;

      self.rotation[0] += event.dx * sens;
      self.rotation[1] -= event.dy * sens;
      self.rotation[1] = Math.max(-85, Math.min(85, self.rotation[1]));

      self.projection.rotate(self.rotation);
      paths.attr("d", self.path);

      if (!beacon.empty()) {
        const p = self.projection([lon, lat]);
        const dist = d3.geoDistance(
          [lon, lat],
          [-self.rotation[0], -self.rotation[1]],
        );
        if (dist < Math.PI / 2 && p) {
          beacon
            .attr("transform", `translate(${p[0]},${p[1]})`)
            .attr("display", "block");
        } else {
          beacon.attr("display", "none");
        }
      }
    };

    const drag = d3
      .drag()
      .on("drag", (event) => {
        // ✅ فقط آخرین رویداد را نگه می‌داریم (skip intermediate)
        self.lastDragEvent = event;
        if (!self.dragFrame) {
          self.dragFrame = requestAnimationFrame(applyFrame);
        }
      })
      .on("end", () => {
        if (self.dragFrame) {
          cancelAnimationFrame(self.dragFrame);
          self.dragFrame = null;
        }
        self.lastDragEvent = null;
      });

    this.svg.call(drag);
  }

  destroy() {
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.dragFrame) cancelAnimationFrame(this.dragFrame);
    clearTimeout(this.resizeTimer);
    if (this.container) this.container.innerHTML = "";
  }
}
