/**
 * NGHS — Coded B&W scene engine (Arkham 2022: the "movement of value" section,
 * rebuilt as code). One fullscreen canvas behind the slide deck; five
 * structural scenes, crossfaded in sync with slide transitions.
 *
 * Laws: strictly monochrome (white/grey on black only), no feTurbulence
 * (grain is drawn noise, per the anti-slop catalog), deterministic layout
 * via seeded RNG — composed, not random soup.
 */

(function () {
  'use strict';

  // Deterministic PRNG so scenes are composed the same on every load.
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const WHITE = '255,255,255';

  function rgba(c, a) { return 'rgba(' + c + ',' + a + ')'; }

  /* ---------------- Scene 1: nodes — the movement of value ---------------- */
  class NodesScene {
    init(w, h) {
      const rnd = mulberry32(11);
      this.nodes = [];
      const n = Math.max(28, Math.floor((w * h) / 42000));
      for (let i = 0; i < n; i++) {
        this.nodes.push({
          x: rnd() * w, y: rnd() * h,
          vx: (rnd() - 0.5) * 0.22, vy: (rnd() - 0.5) * 0.22,
          r: 1 + rnd() * 1.6
        });
      }
      this.pulses = [];
      this.rnd = mulberry32(77);
      this.w = w; this.h = h;
    }
    edges() {
      const out = [];
      const R = 150;
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const a = this.nodes[i], b = this.nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < R) out.push([a, b, 1 - d / R]);
        }
      }
      return out;
    }
    update() {
      for (const p of this.nodes) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > this.w) p.vx *= -1;
        if (p.y < 0 || p.y > this.h) p.vy *= -1;
      }
      if (this.pulses.length < 7 && this.rnd() < 0.06) {
        const e = this.edges();
        if (e.length) {
          const pick = e[Math.floor(this.rnd() * e.length)];
          this.pulses.push({ a: pick[0], b: pick[1], t: 0 });
        }
      }
      for (const pu of this.pulses) pu.t += 0.012;
      this.pulses = this.pulses.filter(pu => pu.t <= 1);
    }
    draw(ctx) {
      for (const [a, b, s] of this.edges()) {
        ctx.strokeStyle = rgba(WHITE, (0.05 + s * 0.06).toFixed(3));
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.fillStyle = rgba(WHITE, 0.5);
      for (const p of this.nodes) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
      for (const pu of this.pulses) {
        const x = pu.a.x + (pu.b.x - pu.a.x) * pu.t;
        const y = pu.a.y + (pu.b.y - pu.a.y) * pu.t;
        ctx.fillStyle = rgba(WHITE, 0.9);
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.2832); ctx.fill();
      }
    }
  }

  /* ---------------- Scene 2: routes — arcs between ports ---------------- */
  class RoutesScene {
    init(w, h) {
      const rnd = mulberry32(23);
      this.ports = [];
      for (let i = 0; i < 7; i++) {
        this.ports.push({ x: w * (0.08 + rnd() * 0.84), y: h * (0.12 + rnd() * 0.76) });
      }
      this.arcs = [];
      const pairs = [[0, 1], [1, 4], [2, 5], [3, 6], [0, 5], [2, 4]];
      for (const [i, j] of pairs) {
        const a = this.ports[i], b = this.ports[j];
        const mx = (a.x + b.x) / 2, my = Math.min(a.y, b.y) - Math.hypot(b.x - a.x, b.y - a.y) * 0.28;
        this.arcs.push({ a, b, mx, my, off: rnd() * 40 });
      }
      this.w = w; this.h = h;
    }
    update(t) {
      for (const arc of this.arcs) arc.off -= 0.35;
    }
    draw(ctx) {
      for (const arc of this.arcs) {
        ctx.strokeStyle = rgba(WHITE, 0.16);
        ctx.lineWidth = 1;
        ctx.setLineDash([7, 9]);
        ctx.lineDashOffset = arc.off;
        ctx.beginPath();
        ctx.moveTo(arc.a.x, arc.a.y);
        ctx.quadraticCurveTo(arc.mx, arc.my, arc.b.x, arc.b.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = rgba(WHITE, 0.75);
      for (const p of this.ports) ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
    }
  }

  /* ---------------- Scene 3: lattice — every link monitored ---------------- */
  class LatticeScene {
    init(w, h) {
      this.w = w; this.h = h;
      this.cols = 26; this.rows = 15;
    }
    update() {}
    draw(ctx, t) {
      const sweepX = ((t * 0.00012) % 1.3 - 0.15) * this.w;
      for (let r = 0; r < this.rows; r++) {
        const v = r / (this.rows - 1);
        const y = this.h * 0.08 + v * this.h * 0.84;
        for (let c = 0; c < this.cols; c++) {
          const x = (c / (this.cols - 1)) * this.w;
          const d = Math.abs(x - sweepX);
          const glow = Math.max(0, 1 - d / 130);
          const a = 0.06 + glow * 0.5 + v * 0.04;
          ctx.fillStyle = rgba(WHITE, a.toFixed(3));
          const s = 1.4 + glow * 1.6;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      }
      ctx.fillStyle = rgba(WHITE, 0.10);
      ctx.fillRect(sweepX - 0.5, 0, 1, this.h);
    }
  }

  /* ---------------- Scene 4: terrain — contour field ---------------- */
  class TerrainScene {
    init(w, h) {
      this.w = w; this.h = h;
      this.layers = [];
      const rnd = mulberry32(41);
      for (let i = 0; i < 10; i++) {
        this.layers.push({
          base: h * (0.12 + (i / 9) * 0.76),
          f: 0.002 + rnd() * 0.003,
          amp: 26 + rnd() * 44,
          ph: rnd() * 6.28,
          sp: 0.00012 + rnd() * 0.0002
        });
      }
    }
    update() {}
    draw(ctx, t) {
      for (const L of this.layers) {
        ctx.strokeStyle = rgba(WHITE, 0.11);
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= this.w; x += 8) {
          const y = L.base + Math.sin(x * L.f + L.ph + t * L.sp) * L.amp
                          + Math.sin(x * L.f * 2.7 + t * L.sp * 1.6) * L.amp * 0.3;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }
  }

  /* ---------------- Scene 5: thermal — cold, unbroken ---------------- */
  class ThermalScene {
    init(w, h) {
      this.w = w; this.h = h;
      this.bands = 22;
    }
    update() {}
    draw(ctx, t) {
      for (let i = 0; i < this.bands; i++) {
        const y0 = (i / (this.bands - 1)) * this.h;
        ctx.strokeStyle = rgba(WHITE, 0.07);
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= this.w; x += 10) {
          const y = y0 + Math.sin(x * 0.004 + t * 0.0004 + i * 0.7) * 5;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // readout ticks, right edge
      ctx.fillStyle = rgba(WHITE, 0.28);
      for (let i = 0; i < 12; i++) {
        const y = this.h * 0.2 + i * (this.h * 0.6 / 11);
        ctx.fillRect(this.w - 46, y, i % 3 === 0 ? 18 : 9, 1);
      }
      const temp = (-24.6 + Math.sin(t * 0.0006) * 0.4).toFixed(1);
      ctx.font = '11px "IBM Plex Mono", monospace';
      ctx.fillStyle = rgba(WHITE, 0.5);
      ctx.fillText(temp + '°C // NOMINAL', this.w - 190, this.h * 0.16);
    }
  }

  /* ---------------- Engine ---------------- */
  class SceneEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.scenes = {
        nodes: new NodesScene(),
        routes: new RoutesScene(),
        lattice: new LatticeScene(),
        terrain: new TerrainScene(),
        thermal: new ThermalScene()
      };
      this.order = ['nodes', 'routes', 'lattice', 'terrain', 'thermal'];
      this.current = 'nodes';
      this.prev = null;
      this.blend = 1;
      this.blendDur = 700;
      this.blendStart = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.noise = this.makeNoiseTile();
      this.t0 = performance.now();
      this.lastT = 0;
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.scenes[this.current].init(this.w, this.h);
      if (this.reduced) {
        this.renderStatic();
      } else {
        this.running = true;
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) { this.running = false; }
          else if (!this.running) { this.running = true; this.t0 = performance.now() - this.lastT; requestAnimationFrame(() => this.frame()); }
        });
        requestAnimationFrame(() => this.frame());
      }
    }
    makeNoiseTile() {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const g = c.getContext('2d');
      const img = g.createImageData(128, 128);
      const rnd = mulberry32(99);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.floor(rnd() * 255);
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 255;
      }
      g.putImageData(img, 0, 0);
      return c;
    }
    resize() {
      this.w = this.canvas.clientWidth || window.innerWidth;
      this.h = this.canvas.clientHeight || window.innerHeight;
      this.canvas.width = Math.floor(this.w * this.dpr);
      this.canvas.height = Math.floor(this.h * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      if (this.scenes[this.current]) this.scenes[this.current].init(this.w, this.h);
    }
    goTo(name) {
      if (!this.scenes[name] || name === this.current) return;
      this.prev = this.current;
      this.current = name;
      this.blend = 0;
      this.blendStart = performance.now();
      this.scenes[name].init(this.w, this.h);
      if (this.reduced) this.renderStatic();
    }
    drawScene(name, alpha, t) {
      const ctx = this.ctx;
      ctx.save();
      ctx.globalAlpha = alpha;
      const s = this.scenes[name];
      s.update(t);
      s.draw(ctx, t);
      ctx.restore();
    }
    paint(t) {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, this.w, this.h);
      if (this.prev && this.blend < 1) {
        this.drawScene(this.prev, 1 - this.blend, t);
        this.drawScene(this.current, this.blend, t);
      } else {
        this.drawScene(this.current, 1, t);
      }
      // film grain — drawn noise, never an SVG filter
      ctx.save();
      ctx.globalAlpha = 0.055;
      const ox = Math.floor(Math.random() * 128), oy = Math.floor(Math.random() * 128);
      ctx.drawImage(this.noise, -ox, -oy, this.w + 128, this.h + 128);
      ctx.restore();
    }
    renderStatic() {
      const t = 4000;
      this.paint(t);
    }
    frame() {
      if (!this.running) return;
      const now = performance.now();
      const t = now - this.t0;
      this.lastT = t;
      if (this.prev && this.blend < 1) {
        this.blend = Math.min(1, (now - this.blendStart) / this.blendDur);
        if (this.blend >= 1) this.prev = null;
      }
      this.paint(t);
      requestAnimationFrame(() => this.frame());
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sceneCanvas');
    if (canvas) window.sceneEngine = new SceneEngine(canvas);
  });
})();
