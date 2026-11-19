
export const metadata = {
  id: "exp_10_03",
  standard: 10,
  subject: "Science 1",
  chapter: 3,
  title: "Types of Chemical Reactions & Thermal Changes",
  titleUrdu: "کیمیائی تعاملات کی اقسام اور حرارتی تبدیلیاں",
  description:
    "Perform and observe Combination, Decomposition, Displacement, Double Displacement, Exothermic, and Endothermic reactions as per Maharashtra State Board Class 10 Science Part 1 curriculum.",
  descriptionUrdu:
    "مہاراشٹر اسٹیٹ بورڈ جماعت دہم سائنس حصہ اول کے نصاب کے مطابق ترکیبی، تحلیلی، ہٹاؤ، دوہرے ہٹاؤ، حرارت زا اور حرارت گیر کیمیائی تعاملات کا مشاہدہ کریں۔",
  apparatusList: [
    {
      id: "bunsen_burner",
      name: "Bunsen Burner",
      nameUrdu: "بنسن برنر",
      desc: "Provides controlled heating flame for combustion and thermal decomposition.",
      descUrdu: "احتراق اور حرارتی تحلیل کے لیے شعلہ فراہم کرتا ہے۔"
    },
    {
      id: "test_tube",
      name: "Hard Glass Test Tube",
      nameUrdu: "سخت شیشے کی امتحانی نلی",
      desc: "Borosilicate glass tube used for heating solids and mixing aqueous solutions.",
      descUrdu: "ٹھوس اشیاء کو گرم کرنے اور محلول ملانے کے لیے بوروسیلیکیٹ نلی۔"
    },
    {
      id: "beaker",
      name: "Glass Beaker (250 mL)",
      nameUrdu: "شیشے کا بیکر (250 ملی لیٹر)",
      desc: "Used for exothermic and endothermic dissolution reactions.",
      descUrdu: "حرارت زا اور حرارت گیر تعاملات کے لیے استعمال ہونے والا بیکر۔"
    },
    {
      id: "thermometer",
      name: "Laboratory Thermometer",
      nameUrdu: "لیبارٹری تھرمامیٹر",
      desc: "Measures real-time temperature changes (-10°C to 110°C).",
      descUrdu: "درجہ حرارت میں ہونے والی تبدیلیوں کی پیمائش کرتا ہے۔"
    },
    {
      id: "tongs_watchglass",
      name: "Tongs & Watch Glass",
      nameUrdu: "چمٹا اور واچ گلاس",
      desc: "Holds magnesium ribbon safely and collects magnesium oxide ash.",
      descUrdu: "میگنیشیم کے فیتے کو پکڑنے اور راکھ جمع کرنے کے لیے۔"
    }
  ]
};

const MODES = [
  {
    id: "combination",
    en: "1A. Combination (Mg + O₂)",
    ur: "1A۔ ترکیبی تعامل (Mg + O₂)",
    eq: "2Mg(s) + O₂(g) → 2MgO(s) + Light",
    obsEn: "Magnesium burns with a dazzling white flame forming white MgO ash.",
    obsUr: "میگنیشیم تیز سفید شعلے کے ساتھ جلتا ہے اور سفید راکھ (MgO) بنتی ہے۔",
    typeEn: "Combination Reaction",
    typeUr: "ترکیبی تعامل"
  },
  {
    id: "decomposition",
    en: "1B. Decomposition (FeSO₄ Heat)",
    ur: "1B۔ تحلیلی تعامل (FeSO₄ کو گرم کرنا)",
    eq: "2FeSO₄(s) —Δ→ Fe₂O₃(s) + SO₂(g) + SO₃(g)",
    obsEn: "Pale green crystals turn reddish-brown with pungent sulphur gases.",
    obsUr: "ہلکے سبز قلمے سرخی مائل بھورے ہو جاتے ہیں اور گندھک کی بو آتی ہے۔",
    typeEn: "Thermal Decomposition",
    typeUr: "حرارتی تحلیلی تعامل"
  },
  {
    id: "displacement",
    en: "1C. Displacement (Fe + CuSO₄)",
    ur: "1C۔ ہٹاؤ کا تعامل (Fe + CuSO₄)",
    eq: "Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)",
    obsEn: "Blue CuSO₄ turns pale green; reddish-brown Cu deposits on iron nail.",
    obsUr: "نیلا محلول ہلکا سبز ہو جاتا ہے اور لوہے کی کیل پر تانبے کی تہہ جمتی ہے۔",
    typeEn: "Displacement Reaction",
    typeUr: "ہٹاؤ کا تعامل"
  },
  {
    id: "double_displacement",
    en: "1D. Double Displacement (Na₂SO₄ + BaCl₂)",
    ur: "1D۔ دوہرا ہٹاؤ (Na₂SO₄ + BaCl₂)",
    eq: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
    obsEn: "Instant insoluble white precipitate of Barium Sulphate settles down.",
    obsUr: "بیریم سلفیٹ کا سفید غیر حل پذیر رسوب فوراً تہہ میں بیٹھ جاتا ہے۔",
    typeEn: "Double Displacement",
    typeUr: "دوہرے ہٹاؤ کا تعامل"
  },
  {
    id: "exothermic",
    en: "2A. Exothermic (CaO + H₂O)",
    ur: "2A۔ حرارت زا تعامل (CaO + H₂O)",
    eq: "CaO(s) + H₂O(l) → Ca(OH)₂(aq) + Heat",
    obsEn: "Temperature rises rapidly from 27°C to 64°C; beaker becomes hot.",
    obsUr: "درجہ حرارت 27°C سے بڑھ کر 64°C ہو جاتا ہے؛ بیکر گرم ہو جاتا ہے۔",
    typeEn: "Exothermic Process",
    typeUr: "حرارت زا عمل"
  },
  {
    id: "endothermic",
    en: "2B. Endothermic (KNO₃ + H₂O)",
    ur: "2B۔ حرارت گیر تعامل (KNO₃ + H₂O)",
    eq: "KNO₃(s) + H₂O(l) + Heat → K⁺(aq) + NO₃⁻(aq)",
    obsEn: "Temperature drops from 27°C to 14°C; beaker feels cold with mist.",
    obsUr: "درجہ حرارت 27°C سے گر کر 14°C ہو جاتا ہے؛ بیکر ٹھنڈا ہو جاتا ہے۔",
    typeEn: "Endothermic Process",
    typeUr: "حرارت گیر عمل"
  }
];

// Pre-allocated particle stride: [x, y, vx, vy, life, maxLife, size, type]
const MAX_PARTICLES = 120;
const P_STRIDE = 8;

export class Experiment {
  constructor(canvas, lang = "en") {
    this.canvas = canvas;
    this.lang = lang;

    // Simulation state
    this.modeIndex = 0;
    this.burnerOn = false;
    this.actionTriggered = false;
    this.progress = 0; // 0.0 to 1.0
    this.smoothProgress = 0;
    this.time = 0;

    // Thermal telemetry
    this.ambientTemp = 27.0;
    this.currentTemp = 27.0;
    this.targetTemp = 27.0;
    this.tempHistory = new Float32Array(60);
    this.tempSampleTimer = 0;
    this.resetTempHistory();

    // Zero-GC particle pool
    this.particles = new Float32Array(MAX_PARTICLES * P_STRIDE);
    this.particleCursor = 0;

    // Observation log
    this.completedModes = new Set();

    // Interactive bounding boxes for hit-testing [id, x, y, w, h]
    this.hitBoxes = [];
    this.lastW = 800;
    this.lastH = 500;
  }

  resetTempHistory() {
    for (let i = 0; i < this.tempHistory.length; i++) {
      this.tempHistory[i] = this.ambientTemp;
    }
  }

  setMode(index) {
    this.modeIndex = Math.max(0, Math.min(MODES.length - 1, Number(index) || 0));
    this.resetExperiment();
  }

  resetExperiment() {
    this.burnerOn = false;
    this.actionTriggered = false;
    this.progress = 0;
    this.smoothProgress = 0;
    this.currentTemp = this.ambientTemp;
    this.targetTemp = this.ambientTemp;
    this.resetTempHistory();
    this.particles.fill(0);
  }

  triggerPrimaryAction() {
    const mode = MODES[this.modeIndex].id;
    if (mode === "combination" || mode === "decomposition") {
      this.burnerOn = !this.burnerOn;
      if (this.burnerOn) this.actionTriggered = true;
    } else {
      this.actionTriggered = true;
    }
  }

  getControls(lang = this.lang) {
    this.lang = lang;
    const isUr = lang === "ur";
    const mode = MODES[this.modeIndex];
    const needsBurner = mode.id === "combination" || mode.id === "decomposition";

    return [
      {
        type: "select",
        id: "reaction_mode",
        label: isUr ? "تجربہ منتخب کریں" : "Select Practical Sub-Experiment",
        options: MODES.map((m, idx) => ({
          value: idx,
          label: isUr ? m.ur : m.en
        })),
        defaultValue: this.modeIndex,
        onChange: (val) => this.setMode(val)
      },
      {
        type: "toggle",
        id: "primary_action",
        label: needsBurner
          ? isUr
            ? "بنسن برنر آن / آف"
            : "Bunsen Burner ON / OFF"
          : isUr
          ? "تعامل شروع کریں (ری ایجنٹ ڈالیں)"
          : "Add Reagent / Start Reaction",
        defaultValue: needsBurner ? this.burnerOn : this.actionTriggered,
        onChange: (val) => {
          if (needsBurner) {
            this.burnerOn = Boolean(val);
            if (this.burnerOn) this.actionTriggered = true;
          } else {
            this.actionTriggered = Boolean(val);
            if (!this.actionTriggered) this.resetExperiment();
          }
        }
      },
      {
        type: "slider",
        id: "reaction_speed",
        label: isUr ? "تعامل کی رفتار" : "Reaction Rate / Simulation Speed",
        unit: "x",
        min: 0.5,
        max: 2.5,
        step: 0.5,
        defaultValue: 1.0,
        onChange: (val) => {
          this.speedMultiplier = Number(val) || 1.0;
        }
      },
      {
        type: "button",
        id: "reset_btn",
        label: isUr ? "دوبارہ ترتیب دیں (Reset)" : "Reset Apparatus",
        onClick: () => this.resetExperiment()
      },
      {
        type: "table",
        id: "observation_table",
        label: isUr ? "مشاہداتی جدول (Observation Table)" : "SSC Board Observation Table",
        headers: isUr
          ? ["تجربہ", "کیمیائی مساوات", "مشاہدہ", "قسم"]
          : ["Experiment", "Chemical Equation", "Observation", "Reaction Type"],
        getData: () => {
          return MODES.map((m, i) => {
            const done = this.completedModes.has(m.id) || i === this.modeIndex;
            return [
              isUr ? m.ur : m.en,
              m.eq,
              done ? (isUr ? m.obsUr : m.obsEn) : isUr ? "زیر التواء..." : "Pending...",
              isUr ? m.typeUr : m.typeEn
            ];
          });
        }
      }
    ];
  }

  spawnParticle(x, y, vx, vy, maxLife, size, type) {
    const idx = this.particleCursor * P_STRIDE;
    this.particles[idx] = x;
    this.particles[idx + 1] = y;
    this.particles[idx + 2] = vx;
    this.particles[idx + 3] = vy;
    this.particles[idx + 4] = maxLife;
    this.particles[idx + 5] = maxLife;
    this.particles[idx + 6] = size;
    this.particles[idx + 7] = type; // 1=spark, 2=gas/steam, 3=precipitate, 4=bubble
    this.particleCursor = (this.particleCursor + 1) % MAX_PARTICLES;
  }

  computePhysics(delta) {
    const speed = this.speedMultiplier || 1.0;
    const mode = MODES[this.modeIndex].id;
    const active =
      mode === "combination" || mode === "decomposition"
        ? this.burnerOn
        : this.actionTriggered;

    if (active && this.progress < 1.0) {
      const rate = mode === "double_displacement" ? 0.55 : 0.22;
      this.progress = Math.min(1.0, this.progress + delta * rate * speed);
      if (this.progress >= 0.85) {
        this.completedModes.add(mode);
      }
    }

    // Smooth exponential interpolation (no jitter)
    const lerpFactor = 1 - Math.exp(-8 * delta);
    this.smoothProgress += (this.progress - this.smoothProgress) * lerpFactor;

    // Temperature physics
    if (mode === "exothermic") {
      this.targetTemp = this.ambientTemp + 37.5 * Math.sin(this.smoothProgress * Math.PI * 0.65);
    } else if (mode === "endothermic") {
      this.targetTemp = this.ambientTemp - 13.2 * Math.sin(this.smoothProgress * Math.PI * 0.65);
    } else if (this.burnerOn) {
      this.targetTemp = this.ambientTemp + 68.0 * this.smoothProgress;
    } else {
      this.targetTemp = this.ambientTemp;
    }

    this.currentTemp += (this.targetTemp - this.currentTemp) * (1 - Math.exp(-3.5 * delta));

    // Record temperature graph samples every 0.25s
    this.tempSampleTimer += delta;
    if (this.tempSampleTimer >= 0.25) {
      this.tempSampleTimer = 0;
      for (let i = 0; i < this.tempHistory.length - 1; i++) {
        this.tempHistory[i] = this.tempHistory[i + 1];
      }
      this.tempHistory[this.tempHistory.length - 1] = this.currentTemp;
    }
  }

  update(delta) {
    const dt = Math.min(delta, 0.05); // Clamp delta for tab-switch safety
    this.time += dt;
    this.computePhysics(dt);

    const cx = this.lastW * 0.42;
    const benchY = this.lastH * 0.78;
    const mode = MODES[this.modeIndex].id;

    // Emit mode-specific particles
    if (mode === "combination" && this.burnerOn && this.smoothProgress > 0.15 && this.smoothProgress < 0.92) {
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 45 + Math.random() * 110;
        this.spawnParticle(
          cx + 18,
          benchY - 145,
          Math.cos(angle) * spd,
          Math.sin(angle) * spd,
          0.35 + Math.random() * 0.25,
          2.5 + Math.random() * 2,
          1
        );
      }
    } else if (mode === "decomposition" && this.burnerOn && this.smoothProgress > 0.2) {
      if (Math.random() < 0.5) {
        this.spawnParticle(
          cx + 38,
          benchY - 175,
          12 + Math.random() * 16,
          -35 - Math.random() * 25,
          1.1,
          5 + Math.random() * 4,
          2
        );
      }
    } else if (mode === "double_displacement" && this.actionTriggered && this.smoothProgress < 0.95) {
      if (Math.random() < 0.7) {
        this.spawnParticle(
          cx + (Math.random() - 0.5) * 44,
          benchY - 110 + Math.random() * 30,
          (Math.random() - 0.5) * 8,
          18 + Math.random() * 22,
          1.4,
          3.2,
          3
        );
      }
    } else if (mode === "exothermic" && this.actionTriggered && this.smoothProgress > 0.2) {
      if (Math.random() < 0.45) {
        this.spawnParticle(
          cx + (Math.random() - 0.5) * 55,
          benchY - 135,
          (Math.random() - 0.5) * 14,
          -28 - Math.random() * 22,
          1.2,
          6 + Math.random() * 4,
          2
        );
      }
    }

    // Update active particles in-place
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const idx = i * P_STRIDE;
      const life = this.particles[idx + 4];
      if (life > 0) {
        this.particles[idx] += this.particles[idx + 2] * dt;
        this.particles[idx + 1] += this.particles[idx + 3] * dt;
        if (this.particles[idx + 7] === 3) {
          // Precipitate settles at bottom of beaker
          if (this.particles[idx + 1] > benchY - 22) {
            this.particles[idx + 1] = benchY - 22;
            this.particles[idx + 3] = 0;
          }
        }
        this.particles[idx + 4] = life - dt;
      }
    }
  }

  getInstrumentAtPoint(stageX, stageY) {
    for (let i = 0; i < this.hitBoxes.length; i++) {
      const b = this.hitBoxes[i];
      if (stageX >= b.x && stageX <= b.x + b.w && stageY >= b.y && stageY <= b.y + b.h) {
        return {
          id: b.id,
          name: this.lang === "ur" ? b.nameUr : b.name,
          x: b.x + b.w * 0.5,
          y: b.y
        };
      }
    }
    return null;
  }

  onPointerDown(stageX, stageY) {
    const hit = this.getInstrumentAtPoint(stageX, stageY);
    if (hit) {
      this.triggerPrimaryAction();
    }
  }

  isDarkTheme() {
    if (typeof document !== "undefined") {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme) return theme === "dark";
    }
    return true;
  }

  lerpColor(c1, c2, t) {
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
    const a = c1[3] + (c2[3] - c1[3]) * t;
    return `rgba(${r},${g},${b},${a.toFixed(2)})`;
  }

  drawPseudo3DCylinder(ctx, x, y, w, h, liquidRatio, liquidColor, isDark) {
    const rx = w * 0.5;
    const ry = Math.max(6, w * 0.14);

    // Soft bench shadow
    ctx.fillStyle = isDark ? "rgba(0,0,0,0.45)" : "rgba(15,23,42,0.16)";
    ctx.beginPath();
    ctx.ellipse(x, y + 4, rx * 1.08, ry * 1.25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Liquid body
    if (liquidRatio > 0.01) {
      const liqH = (h - ry) * liquidRatio;
      const liqTopY = y - liqH;

      ctx.fillStyle = liquidColor;
      ctx.beginPath();
      ctx.ellipse(x, y - ry * 0.5, rx - 2, ry * 0.85, 0, 0, Math.PI);
      ctx.lineTo(x - rx + 2, liqTopY);
      ctx.ellipse(x, liqTopY, rx - 2, ry * 0.85, 0, Math.PI, 0, true);
      ctx.closePath();
      ctx.fill();

      // Top liquid meniscus highlight
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.beginPath();
      ctx.ellipse(x, liqTopY, rx - 2, ry * 0.85, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glass outer body gradient (Pseudo-3D cylindrical shading)
    const glassGrad = ctx.createLinearGradient(x - rx, 0, x + rx, 0);
    if (isDark) {
      glassGrad.addColorStop(0, "rgba(148, 163, 184, 0.28)");
      glassGrad.addColorStop(0.22, "rgba(255, 255, 255, 0.16)");
      glassGrad.addColorStop(0.55, "rgba(148, 163, 184, 0.04)");
      glassGrad.addColorStop(0.88, "rgba(226, 232, 240, 0.20)");
      glassGrad.addColorStop(1, "rgba(148, 163, 184, 0.32)");
    } else {
      glassGrad.addColorStop(0, "rgba(71, 85, 105, 0.22)");
      glassGrad.addColorStop(0.22, "rgba(255, 255, 255, 0.65)");
      glassGrad.addColorStop(0.55, "rgba(241, 245, 249, 0.12)");
      glassGrad.addColorStop(0.88, "rgba(255, 255, 255, 0.45)");
      glassGrad.addColorStop(1, "rgba(71, 85, 105, 0.25)");
    }

    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = isDark ? "rgba(203, 213, 225, 0.55)" : "rgba(51, 65, 85, 0.55)";
    ctx.lineWidth = 1.6;

    ctx.beginPath();
    ctx.moveTo(x - rx, y - h);
    ctx.lineTo(x - rx, y - ry * 0.5);
    ctx.ellipse(x, y - ry * 0.5, rx, ry, 0, Math.PI, 0, true);
    ctx.lineTo(x + rx, y - h);
    ctx.stroke();
    ctx.fill();

    // Top glass rim
    ctx.beginPath();
    ctx.ellipse(x, y - h, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Specular vertical highlight bar
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.fillRect(x - rx * 0.68, y - h + ry, rx * 0.16, h - ry * 2);
  }

  drawBurner(ctx, x, y, isOn, isDark) {
    // Base
    ctx.fillStyle = isDark ? "#334155" : "#475569";
    ctx.beginPath();
    ctx.ellipse(x, y, 34, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Brass/Steel barrel
    const barrelGrad = ctx.createLinearGradient(x - 8, 0, x + 8, 0);
    barrelGrad.addColorStop(0, "#64748b");
    barrelGrad.addColorStop(0.4, "#cbd5e1");
    barrelGrad.addColorStop(1, "#475569");
    ctx.fillStyle = barrelGrad;
    ctx.fillRect(x - 7, y - 62, 14, 60);

    // Animated blue-orange flame
    if (isOn) {
      const flicker = Math.sin(this.time * 28) * 3;
      const flameH = 44 + flicker;
      const outerGrad = ctx.createRadialGradient(x, y - 75, 2, x, y - 78, flameH * 0.7);
      outerGrad.addColorStop(0, "rgba(56, 189, 248, 0.95)");
      outerGrad.addColorStop(0.55, "rgba(59, 130, 246, 0.65)");
      outerGrad.addColorStop(1, "rgba(249, 115, 22, 0)");

      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.moveTo(x - 9, y - 62);
      ctx.quadraticCurveTo(x - 14, y - 82, x + flicker * 0.4, y - 62 - flameH);
      ctx.quadraticCurveTo(x + 14, y - 82, x + 9, y - 62);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawThermalGraph(ctx, gx, gy, gw, gh, isDark) {
    // Card background
    ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.78)" : "rgba(255, 255, 255, 0.88)";
    ctx.strokeStyle = isDark ? "rgba(148, 163, 184, 0.25)" : "rgba(100, 116, 139, 0.3)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(gx, gy, gw, gh, 10);
    ctx.fill();
    ctx.stroke();

    // Header
    ctx.fillStyle = isDark ? "#e2e8f0" : "#0f172a";
    ctx.font = "bold 12px system-ui, sans-serif";
    ctx.textAlign = "left";
    const title = this.lang === "ur" ? "درجہ حرارت گراف (°C)" : "Live Temp vs. Time (°C)";
    ctx.fillText(title, gx + 12, gy + 20);

    // Current temperature readout badge
    const tempColor =
      this.currentTemp > 32 ? "#f97316" : this.currentTemp < 24 ? "#38bdf8" : "#10b981";
    ctx.fillStyle = tempColor;
    ctx.textAlign = "right";
    ctx.fillText(`${this.currentTemp.toFixed(1)} °C`, gx + gw - 12, gy + 20);

    // Plot area
    const px = gx + 14;
    const py = gy + 32;
    const pw = gw - 28;
    const ph = gh - 46;

    // Grid lines
    ctx.strokeStyle = isDark ? "rgba(148,163,184,0.12)" : "rgba(100,116,139,0.15)";
    ctx.beginPath();
    for (let i = 0; i <= 3; i++) {
      const ly = py + (ph * i) / 3;
      ctx.moveTo(px, ly);
      ctx.lineTo(px + pw, ly);
    }
    ctx.stroke();

    // Plot curve (range 0°C to 100°C)
    ctx.strokeStyle = tempColor;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    const len = this.tempHistory.length;
    for (let i = 0; i < len; i++) {
      const val = Math.max(0, Math.min(100, this.tempHistory[i]));
      const vx = px + (i / (len - 1)) * pw;
      const vy = py + ph - (val / 100) * ph;
      if (i === 0) ctx.moveTo(vx, vy);
      else ctx.lineTo(vx, vy);
    }
    ctx.stroke();
  }

  draw(ctx, w, h) {
    this.lastW = w;
    this.lastH = h;
    this.hitBoxes.length = 0;
    const isDark = this.isDarkTheme();
    const isUr = this.lang === "ur";
    const mode = MODES[this.modeIndex];

    // Background & Lab Bench
    ctx.fillStyle = isDark ? "#0b1120" : "#f1f5f9";
    ctx.fillRect(0, 0, w, h);

    const benchY = h * 0.78;
    const benchGrad = ctx.createLinearGradient(0, benchY, 0, h);
    benchGrad.addColorStop(0, isDark ? "#1e293b" : "#cbd5e1");
    benchGrad.addColorStop(1, isDark ? "#0f172a" : "#94a3b8");
    ctx.fillStyle = benchGrad;
    ctx.fillRect(0, benchY, w, h - benchY);

    ctx.strokeStyle = isDark ? "#334155" : "#64748b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY);
    ctx.lineTo(w, benchY);
    ctx.stroke();

    // Top Equation Banner
    ctx.fillStyle = isDark ? "rgba(30, 41, 59, 0.85)" : "rgba(255, 255, 255, 0.92)";
    ctx.beginPath();
    ctx.roundRect(16, 14, w - 32, 46, 10);
    ctx.fill();

    ctx.fillStyle = isDark ? "#38bdf8" : "#0284c7";
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(isUr ? mode.ur : mode.en, 28, 42);

    ctx.fillStyle = isDark ? "#f8fafc" : "#0f172a";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "right";
    ctx.fillText(mode.eq, w - 28, 42);

    // Stage Center Coordinates
    const cx = w * 0.42;

    // Render Apparatus by Mode
    if (mode.id === "combination") {
      this.drawBurner(ctx, cx, benchY, this.burnerOn, isDark);
      this.hitBoxes.push({
        id: "bunsen_burner",
        name: "Bunsen Burner (Tap to Ignite)",
        nameUrdu: "بنسن برنر (جلانے کے لیے ٹیپ کریں)",
        x: cx - 35,
        y: benchY - 70,
        w: 70,
        h: 75
      });

      // Tongs + Magnesium Ribbon
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 110, benchY - 155);
      ctx.lineTo(cx + 5, benchY - 145);
      ctx.stroke();

      // Mg Ribbon shrinking as it burns
      const ribbonLen = 32 * (1 - this.smoothProgress * 0.85);
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx + 5, benchY - 145);
      ctx.lineTo(cx + 5 + ribbonLen, benchY - 145);
      ctx.stroke();

      // Dazzling white flash glow
      if (this.burnerOn && this.smoothProgress > 0.15 && this.smoothProgress < 0.92) {
        const flashR = 38 + Math.sin(this.time * 40) * 8;
        const flash = ctx.createRadialGradient(cx + 18, benchY - 145, 2, cx + 18, benchY - 145, flashR);
        flash.addColorStop(0, "rgba(255,255,255,1)");
        flash.addColorStop(0.4, "rgba(224,242,254,0.85)");
        flash.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = flash;
        ctx.beginPath();
        ctx.arc(cx + 18, benchY - 145, flashR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Watch glass + white MgO ash
      ctx.strokeStyle = isDark ? "#94a3b8" : "#475569";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx + 75, benchY - 18, 34, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      if (this.smoothProgress > 0.2) {
        ctx.fillStyle = "#f8fafc";
        ctx.beginPath();
        ctx.ellipse(cx + 75, benchY - 4, 18 * this.smoothProgress, 5 * this.smoothProgress, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (mode.id === "decomposition") {
      this.drawBurner(ctx, cx, benchY, this.burnerOn, isDark);
      this.hitBoxes.push({
        id: "bunsen_burner",
        name: "Bunsen Burner",
        nameUrdu: "بنسن برنر",
        x: cx - 35,
        y: benchY - 70,
        w: 70,
        h: 75
      });

      // Tilted hard-glass boiling tube
      ctx.save();
      ctx.translate(cx + 12, benchY - 115);
      ctx.rotate(0.45);
      const crystalColor = this.lerpColor(
        [74, 222, 128, 0.85], // Green FeSO4
        [154, 52, 18, 0.92],  // Reddish-brown Fe2O3
        this.smoothProgress
      );
      this.drawPseudo3DCylinder(ctx, 0, 35, 28, 125, 0.28, crystalColor, isDark);
      ctx.restore();
    } else if (mode.id === "displacement") {
      // CuSO4 blue -> FeSO4 pale green
      const solColor = this.lerpColor(
        [14, 165, 233, 0.65],
        [74, 222, 128, 0.45],
        this.smoothProgress
      );
      this.drawPseudo3DCylinder(ctx, cx, benchY, 44, 165, 0.68, solColor, isDark);
      this.hitBoxes.push({
        id: "test_tube",
        name: "Test Tube (Tap to Dip Iron Nail)",
        nameUrdu: "امتحانی نلی (لوہے کی کیل ڈالنے کے لیے ٹیپ کریں)",
        x: cx - 25,
        y: benchY - 170,
        w: 50,
        h: 170
      });

      // Iron nail dipping inside
      const dipY = this.actionTriggered ? benchY - 22 : benchY - 135;
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx, dipY - 85);
      ctx.lineTo(cx, dipY);
      ctx.stroke();

      // Copper coating on dipped portion
      if (this.smoothProgress > 0.1) {
        ctx.strokeStyle = `rgba(180, 83, 9, ${this.smoothProgress})`;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx, dipY - 52 * this.smoothProgress);
        ctx.lineTo(cx, dipY);
        ctx.stroke();
      }
    } else if (mode.id === "double_displacement") {
      const mixColor = this.lerpColor(
        [226, 232, 240, 0.3],
        [248, 250, 252, 0.78],
        this.smoothProgress
      );
      this.drawPseudo3DCylinder(ctx, cx, benchY, 72, 140, 0.62, mixColor, isDark);
      this.hitBoxes.push({
        id: "beaker",
        name: "Beaker (Tap to Add BaCl₂)",
        nameUrdu: "بیکر (BaCl₂ ملانے کے لیے ٹیپ کریں)",
        x: cx - 40,
        y: benchY - 145,
        w: 80,
        h: 145
      });

      // Settled white BaSO4 precipitate layer
      if (this.smoothProgress > 0.15) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * this.smoothProgress})`;
        ctx.beginPath();
        ctx.ellipse(cx, benchY - 9, 33, 6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (mode.id === "exothermic" || mode.id === "endothermic") {
      const isExo = mode.id === "exothermic";
      // Thermal aura glow around beaker
      if (this.smoothProgress > 0.05) {
        const aura = ctx.createRadialGradient(cx, benchY - 65, 10, cx, benchY - 65, 85);
        aura.addColorStop(
          0,
          isExo
            ? `rgba(249, 115, 22, ${0.38 * this.smoothProgress})`
            : `rgba(56, 189, 248, ${0.38 * this.smoothProgress})`
        );
        aura.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(cx, benchY - 65, 85, 0, Math.PI * 2);
        ctx.fill();
      }

      const waterColor = isExo
        ? this.lerpColor([186, 230, 253, 0.45], [241, 245, 249, 0.72], this.smoothProgress)
        : "rgba(186, 230, 253, 0.52)";

      this.drawPseudo3DCylinder(ctx, cx, benchY, 78, 145, 0.65, waterColor, isDark);
      this.hitBoxes.push({
        id: "beaker",
        name: "Beaker (Tap to Add Salt/Oxide)",
        nameUrdu: "بیکر (نمک/آکسائیڈ ڈالنے کے لیے ٹیپ کریں)",
        x: cx - 42,
        y: benchY - 150,
        w: 84,
        h: 150
      });

      // Mercury Thermometer inside beaker
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillRect(cx + 14, benchY - 185, 7, 155);
      const mercH = Math.max(12, ((this.currentTemp + 10) / 120) * 145);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(cx + 16, benchY - 30 - mercH, 3, mercH);
      ctx.beginPath();
      ctx.arc(cx + 17.5, benchY - 28, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Active Particles
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const idx = i * P_STRIDE;
      const life = this.particles[idx + 4];
      if (life > 0) {
        const alpha = Math.max(0, life / this.particles[idx + 5]);
        const pType = this.particles[idx + 7];
        const size = this.particles[idx + 6];

        if (pType === 1) ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        else if (pType === 2) ctx.fillStyle = `rgba(203, 213, 225, ${alpha * 0.45})`;
        else ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.85})`;

        ctx.beginPath();
        ctx.arc(this.particles[idx], this.particles[idx + 1], size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Right-side Live Temperature Graph HUD
    const graphW = Math.min(240, w * 0.34);
    const graphH = 125;
    this.drawThermalGraph(ctx, w - graphW - 18, 74, graphW, graphH, isDark);

    // Bottom Observation Prompt Bar
    ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.roundRect(16, h - 46, w - 32, 34, 8);
    ctx.fill();

    ctx.fillStyle = isDark ? "#cbd5e1" : "#334155";
    ctx.font = "13px system-ui, sans-serif";
    ctx.textAlign = "center";
    const statusText =
      this.smoothProgress > 0.25
        ? isUr
          ? mode.obsUr
          : mode.obsEn
        : isUr
        ? "تجربہ شروع کرنے کے لیے برنر/بیکر پر ٹیپ کریں یا نیچے کنٹرول استعمال کریں۔"
        : "Tap the apparatus on stage or use the control dock to start the reaction.";
    ctx.fillText(statusText, w * 0.5, h - 24);
  }

  destroy() {
    this.particles = null;
    this.tempHistory = null;
    this.hitBoxes.length = 0;
    this.completedModes.clear();
  }
}
