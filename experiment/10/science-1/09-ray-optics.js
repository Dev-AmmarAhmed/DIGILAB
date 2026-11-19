/**
 * DIGILAB - Virtual Science Lab Engine
 * Class 11 | Physics | Chapter 9: Ray Optics & Optical Instruments
 * Experiment: Image Formation by a Biconvex Lens & Lens Maker's Formula
 */

export const metadata = {
  id: 'exp_11_09',
  standard: 11,
  subject: 'Physics',
  chapter: 9,
  title: 'Ray Optics: Convex Lens Refraction & Image Formation',
  titleUrdu: 'شعاعی بصریات: محدب عدسے میں انعطاف اور عکس کی تشکیل',
  description:
    'Verify the Lens Maker’s Formula and Thin Lens Equation by studying the refraction of light through a biconvex lens. Observe how focal length, image position, magnification, and image nature vary with object distance, radius of curvature, and refractive index.',
  descriptionUrdu:
    'محدب عدسے (Convex Lens) سے گزرنے والی روشنی کے انعطاف کا مطالعہ کرکے عدسہ ساز فارمولا (Lens Maker’s Formula) اور عدسے کے مساوات کی تصدیق کرنا۔ شے کے فاصلے، نصف قطرِ انحنا اور انعطاف نما کی تبدیلی سے طولِ ماسکہ، عکس کے مقام، تکبیر اور عکس کی نوعیت پر پڑنے والے اثرات کا مشاہدہ کریں۔',
  apparatusList: [
    {
      id: 'optical_bench',
      name: 'Graduated Optical Bench',
      nameUrdu: 'درجہ بند بصری بینچ (Optical Bench)',
      desc: 'Calibrated linear rail with centimeter scale to measure object distance (u) and image distance (v) from the optical center.',
      descUrdu: 'بصری مرکز سے شے کے فاصلے (u) اور عکس کے فاصلے (v) کی پیمائش کے لیے سینٹی میٹر پیمانے والا بصری بینچ۔'
    },
    {
      id: 'convex_lens',
      name: 'Biconvex Glass Lens',
      nameUrdu: 'دوہرا محدب شیشے کا عدسہ (Convex Lens)',
      desc: 'Converging optical lens with adjustable radii of curvature (R) and refractive index (n).',
      descUrdu: 'متقارب بصری عدسہ جس کے نصف قطرِ انحنا (R) اور انعطاف نما (n) کو تبدیل کیا جا سکتا ہے۔'
    },
    {
      id: 'illuminated_object',
      name: 'Illuminated Object Needle / Arrow',
      nameUrdu: 'روشن شے (بصری تیر / سوئی)',
      desc: 'Luminous reference object placed along the principal axis to trace incident and refracted light rays.',
      descUrdu: 'محورِ اصلی پر رکھی گئی روشن شے جس سے نکلنے والی شعاعوں کے انعطاف کا مشاہدہ کیا جاتا ہے۔'
    },
    {
      id: 'image_screen',
      name: 'Translucent Image Screen',
      nameUrdu: 'نیم شفاف پردہ (Image Screen)',
      desc: 'Screen positioned at the focal plane of convergence to capture real and inverted images.',
      descUrdu: 'حقیقی اور الٹے عکس کو حاصل کرنے کے لیے نقطۂ ارتکاز پر رکھا جانے والا پردہ۔'
    }
  ]
};

const TRANSLATIONS = {
  en: {
    controls: {
      objectDistance: 'Object Distance (|u|)',
      radiusCurvature: 'Radius of Curvature (R)',
      refractiveIndex: 'Refractive Index (n)',
      rayBeamSwitch: 'Principal Light Rays',
      recordReading: 'Capture Observation Row',
      observationTable: 'Optical Observation Table'
    },
    units: {
      cm: 'cm',
      diopter: 'D',
      none: ''
    },
    tableHeaders: ['f (cm)', 'u (cm)', 'v (cm)', 'm', 'Nature'],
    labels: {
      opticalCenter: 'O',
      focus1: 'F₁',
      focus2: 'F₂',
      center2F1: '2F₁',
      center2F2: '2F₂',
      principalAxis: 'Principal Axis',
      object: 'Object (AB)',
      image: 'Image (A′B′)',
      virtualImage: 'Virtual (A′B′)',
      infinity: '∞ (Infinity)',
      raysOffHint: 'Principal Rays OFF — Toggle ON to trace refraction',
      formulaTitle: 'Lens Maker’s & Thin Lens Formula',
      natureLabel: 'Image Nature',
      natures: {
        realInvertedDiminished: 'Real, Inverted & Diminished',
        realInvertedSame: 'Real, Inverted & Same Size',
        realInvertedMagnified: 'Real, Inverted & Magnified',
        atInfinity: 'Real, Inverted (At ∞)',
        virtualErectMagnified: 'Virtual, Erect & Magnified'
      },
      shortNatures: {
        realInvertedDiminished: 'Real, Inv.',
        realInvertedSame: 'Real, Same',
        realInvertedMagnified: 'Real, Mag.',
        atInfinity: 'At ∞',
        virtualErectMagnified: 'Virtual, Erect'
      }
    }
  },
  ur: {
    controls: {
      objectDistance: 'شے کا فاصلہ (|u|)',
      radiusCurvature: 'نصف قطرِ انحنا (R)',
      refractiveIndex: 'انعطاف نما (n)',
      rayBeamSwitch: 'بنیادی روشنی کی شعاعیں',
      recordReading: 'مشاہدہ جدول میں درج کریں',
      observationTable: 'بصری مشاہداتی جدول'
    },
    units: {
      cm: 'سم',
      diopter: 'D',
      none: ''
    },
    tableHeaders: ['f (سم)', 'u (سم)', 'v (سم)', 'm', 'نوعیت'],
    labels: {
      opticalCenter: 'O',
      focus1: 'F₁',
      focus2: 'F₂',
      center2F1: '2F₁',
      center2F2: '2F₂',
      principalAxis: 'محورِ اصلی',
      object: 'شے (AB)',
      image: 'عکس (A′B′)',
      virtualImage: 'مجازی عکس (A′B′)',
      infinity: '∞ (لامحدود)',
      raysOffHint: 'روشنی کی شعاعیں بند ہیں — انعطاف دیکھنے کے لیے آن کریں',
      formulaTitle: 'عدسہ ساز اور عدسے کی مساوات',
      natureLabel: 'عکس کی نوعیت',
      natures: {
        realInvertedDiminished: 'حقیقی، الٹا اور چھوٹا',
        realInvertedSame: 'حقیقی، الٹا اور مساوی',
        realInvertedMagnified: 'حقیقی، الٹا اور بڑا',
        atInfinity: 'حقیقی، الٹا (لامحدود پر)',
        virtualErectMagnified: 'مجازی، سیدھا اور بڑا'
      },
      shortNatures: {
        realInvertedDiminished: 'حقیقی، چھوٹا',
        realInvertedSame: 'حقیقی، مساوی',
        realInvertedMagnified: 'حقیقی، بڑا',
        atInfinity: 'لامحدود (∞)',
        virtualErectMagnified: 'مجازی، سیدھا'
      }
    }
  }
};

export class Experiment {
  constructor(canvas, lang = 'en') {
    this.canvas = canvas;
    this.lang = lang === 'ur' ? 'ur' : 'en';

    // Target parameters (Textbook standard values in cm & refractive index)
    this.targetObjectDist = 30.0; // |u| in cm (placed left of lens -> u = -30 cm)
    this.targetRadius = 20.0; // Radius of curvature R in cm (R1 = +R, R2 = -R)
    this.targetRefractiveIndex = 1.5; // Crown glass standard n = 1.50
    this.raysEnabled = true;

    // Smoothly interpolated visual parameters (spring/lerp physics)
    this.currentObjectDist = this.targetObjectDist;
    this.currentRadius = this.targetRadius;
    this.currentRefractiveIndex = this.targetRefractiveIndex;
    this.rayAlpha = 1.0;

    // Animation timers
    this.elapsedTime = 0;
    this.photonPhase = 0;

    // Object height in world cm
    this.objectHeightCm = 6.5;

    // Hit-box registry for interactive pointer inspection
    this.hitBoxes = [];

    // Observation log history (seeded with 3 standard textbook cases + live row)
    this.savedObservations = [
      { n: 1.5, R: 20.0, u: -45.0 },
      { n: 1.5, R: 20.0, u: -40.0 },
      { n: 1.5, R: 20.0, u: -30.0 }
    ];

    // Computed optical state
    this.physics = this.computePhysics();
  }

  /**
   * Computes exact optical quantities using Cartesian Sign Convention:
   * Lens Maker's Formula: 1/f = (n - 1) * (1/R1 - 1/R2)
   * For symmetric biconvex lens: R1 = +R, R2 = -R => 1/f = 2(n - 1)/R
   * Thin Lens Formula: 1/v - 1/u = 1/f  (with u < 0)
   */
  computePhysics(
    uMag = this.currentObjectDist,
    R = this.currentRadius,
    n = this.currentRefractiveIndex
  ) {
    const safeN = Math.max(1.05, Number(n));
    const safeR = Math.max(5.0, Number(R));
    const u = -Math.abs(Number(uMag)); // Object is on the left (-ve X)

    // Focal length f in cm
    const invF = (2 * (safeN - 1)) / safeR;
    const f = 1 / invF;

    // Optical power P in Diopters (100 / f_cm)
    const powerD = 100 / f;

    // Image distance v using 1/v = 1/f + 1/u
    const invV = 1 / f + 1 / u;
    const isAtInfinity = Math.abs(invV) < 1e-4;

    let v = 0;
    let magnification = 0;
    let imageHeightCm = 0;
    let isVirtual = false;
    let natureKey = 'realInvertedDiminished';

    if (isAtInfinity) {
      v = Infinity;
      magnification = Infinity;
      imageHeightCm = Infinity;
      isVirtual = false;
      natureKey = 'atInfinity';
    } else {
      v = 1 / invV;
      magnification = v / u;
      imageHeightCm = magnification * this.objectHeightCm;
      isVirtual = v < 0;

      const absU = Math.abs(u);
      if (isVirtual) {
        natureKey = 'virtualErectMagnified';
      } else if (Math.abs(absU - 2 * f) < 0.35) {
        natureKey = 'realInvertedSame';
      } else if (absU > 2 * f) {
        natureKey = 'realInvertedDiminished';
      } else {
        natureKey = 'realInvertedMagnified';
      }
    }

    return {
      u,
      absU: Math.abs(u),
      R: safeR,
      n: safeN,
      f,
      twoF: 2 * f,
      powerD,
      v,
      magnification,
      imageHeightCm,
      isAtInfinity,
      isVirtual,
      natureKey
    };
  }

  /**
   * Formats a single observation into 5 compact table cells so both
   * horizontal (side-panel) and vertical (bottom-sheet) tables fit completely.
   */
  _formatTableRow(n, R, uSigned, t) {
    const state = this.computePhysics(Math.abs(uSigned), R, n);
    const vText = state.isAtInfinity
      ? '∞'
      : `${state.v > 0 ? '+' : ''}${state.v.toFixed(1)}`;
    const mText = state.isAtInfinity
      ? '∞'
      : `${state.magnification > 0 ? '+' : ''}${state.magnification.toFixed(2)}×`;

    return [
      `+${state.f.toFixed(1)}`,
      state.u.toFixed(1),
      vText,
      mText,
      t.labels.shortNatures[state.natureKey]
    ];
  }

  /**
   * Returns DIGILAB UI Manager controls schema
   */
  getControls(lang = this.lang) {
    this.lang = lang === 'ur' ? 'ur' : 'en';
    const t = TRANSLATIONS[this.lang];

    return [
      {
        type: 'toggle',
        id: 'ray_beam_toggle',
        label: t.controls.rayBeamSwitch,
        defaultValue: this.raysEnabled,
        onChange: (val) => {
          this.raysEnabled = Boolean(val);
        }
      },
      {
        type: 'slider',
        id: 'object_distance',
        label: t.controls.objectDistance,
        unit: t.units.cm,
        min: 8,
        max: 60,
        step: 0.5,
        defaultValue: this.targetObjectDist,
        onChange: (val) => {
          this.targetObjectDist = Number(val);
        }
      },
      {
        type: 'slider',
        id: 'radius_curvature',
        label: t.controls.radiusCurvature,
        unit: t.units.cm,
        min: 12,
        max: 35,
        step: 0.5,
        defaultValue: this.targetRadius,
        onChange: (val) => {
          this.targetRadius = Number(val);
        }
      },
      {
        type: 'slider',
        id: 'refractive_index',
        label: t.controls.refractiveIndex,
        unit: t.units.none,
        min: 1.33,
        max: 1.75,
        step: 0.01,
        defaultValue: this.targetRefractiveIndex,
        onChange: (val) => {
          this.targetRefractiveIndex = Number(val);
        }
      },
      {
        type: 'toggle',
        id: 'capture_observation',
        label: t.controls.recordReading,
        defaultValue: false,
        onChange: (val) => {
          if (val) {
            this.savedObservations.push({
              n: Number(this.targetRefractiveIndex.toFixed(2)),
              R: Number(this.targetRadius.toFixed(1)),
              u: -Math.abs(Number(this.targetObjectDist.toFixed(1)))
            });
            if (this.savedObservations.length > 8) {
              this.savedObservations.shift();
            }
          }
        }
      },
      {
        type: 'table',
        id: 'optics_observation_table',
        label: t.controls.observationTable,
        headers: t.tableHeaders,
        getData: () => {
          const activeT = TRANSLATIONS[this.lang];
          const rows = this.savedObservations.map((obs) =>
            this._formatTableRow(obs.n, obs.R, obs.u, activeT)
          );
          rows.push(
            this._formatTableRow(
              this.targetRefractiveIndex,
              this.targetRadius,
              -this.targetObjectDist,
              activeT
            )
          );
          return rows;
        }
      }
    ];
  }

  /**
   * Delta-time physics & spring interpolation loop (60-120 FPS safe)
   */
  update(delta) {
    const dt = Math.min(Math.max(delta || 0.016, 0.001), 0.1);
    this.elapsedTime += dt;

    // Exponential damping factor for smooth parameter transitions
    const smoothFactor = 1 - Math.exp(-14 * dt);

    this.currentObjectDist +=
      (this.targetObjectDist - this.currentObjectDist) * smoothFactor;
    this.currentRadius +=
      (this.targetRadius - this.currentRadius) * smoothFactor;
    this.currentRefractiveIndex +=
      (this.targetRefractiveIndex - this.currentRefractiveIndex) * smoothFactor;

    // Smooth fade for Ray ON/OFF switch
    const targetRayAlpha = this.raysEnabled ? 1.0 : 0.0;
    this.rayAlpha += (targetRayAlpha - this.rayAlpha) * (1 - Math.exp(-12 * dt));

    // Photon wave pulse phase along rays
    if (this.rayAlpha > 0.01) {
      this.photonPhase = (this.photonPhase + dt * 1.4) % 1.0;
    }

    // Recompute optical geometry
    this.physics = this.computePhysics(
      this.currentObjectDist,
      this.currentRadius,
      this.currentRefractiveIndex
    );
  }

  /**
   * Detects theme from DOM document attribute or prefers-color-scheme
   */
  _isDarkTheme() {
    if (typeof document !== 'undefined') {
      const themeAttr = document.documentElement?.getAttribute('data-theme');
      if (themeAttr === 'light') return false;
      if (themeAttr === 'dark') return true;
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches
      ) {
        return false;
      }
    }
    return true;
  }

  /**
   * High-contrast theme color palette
   */
  _getPalette(isDark) {
    if (isDark) {
      return {
        benchBody: '#1e293b',
        benchStroke: '#38bdf8',
        benchTick: '#94a3b8',
        benchText: '#cbd5e1',
        axisLine: 'rgba(226, 232, 240, 0.5)',
        focusPoint: '#f59e0b',
        twoFocusPoint: '#38bdf8',
        lensFillStart: 'rgba(56, 189, 248, 0.28)',
        lensFillMid: 'rgba(186, 230, 253, 0.45)',
        lensStroke: '#7dd3fc',
        lensCenterLine: 'rgba(125, 211, 252, 0.45)',
        objectColor: '#fb7185',
        realImageColor: '#34d399',
        virtualImageColor: '#c084fc',
        ray1Color: '#fbbf24', // Top parallel -> F2
        ray2Color: '#38bdf8', // Through optical center O
        ray3Color: '#f472b6', // Through F1 -> parallel
        virtualRayColor: 'rgba(192, 132, 252, 0.78)',
        hudBg: 'rgba(11, 18, 34, 0.88)',
        hudBorder: 'rgba(56, 189, 248, 0.42)',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        accent: '#38bdf8',
        screenFill: 'rgba(52, 211, 153, 0.16)',
        screenStroke: '#34d399'
      };
    }
    return {
      benchBody: '#cbd5e1',
      benchStroke: '#0284c7',
      benchTick: '#475569',
      benchText: '#1e293b',
      axisLine: 'rgba(30, 41, 59, 0.55)',
      focusPoint: '#d97706',
      twoFocusPoint: '#0284c7',
      lensFillStart: 'rgba(2, 132, 199, 0.18)',
      lensFillMid: 'rgba(125, 211, 252, 0.36)',
      lensStroke: '#0369a1',
      lensCenterLine: 'rgba(3, 105, 161, 0.42)',
      objectColor: '#e11d48',
      realImageColor: '#059669',
      virtualImageColor: '#7c3aed',
      ray1Color: '#d97706',
      ray2Color: '#0284c7',
      ray3Color: '#db2777',
      virtualRayColor: 'rgba(124, 58, 237, 0.78)',
      hudBg: 'rgba(255, 255, 255, 0.92)',
      hudBorder: 'rgba(2, 132, 199, 0.38)',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      accent: '#0284c7',
      screenFill: 'rgba(5, 150, 105, 0.14)',
      screenStroke: '#059669'
    };
  }

  /**
   * Hit-testing method for interactive apparatus inspection popovers
   */
  getInstrumentAtPoint(stageX, stageY, canvasW, canvasH) {
    if (this.hitBoxes.length === 0 && canvasW > 0 && canvasH > 0) {
      this._computeLayout(canvasW, canvasH);
    }

    for (let i = this.hitBoxes.length - 1; i >= 0; i--) {
      const box = this.hitBoxes[i];
      if (
        stageX >= box.x &&
        stageX <= box.x + box.w &&
        stageY >= box.y &&
        stageY <= box.y + box.h
      ) {
        const appItem = metadata.apparatusList.find((a) => a.id === box.id);
        const localizedName = appItem
          ? this.lang === 'ur'
            ? appItem.nameUrdu
            : appItem.name
          : box.id;
        return {
          id: box.id,
          name: localizedName,
          x: box.x + box.w * 0.5,
          y: box.y
        };
      }
    }
    return null;
  }

  /**
   * Computes coordinate mapping between cm optical space and stage pixels
   */
  _computeLayout(w, h) {
    const centerX = w * 0.5;
    const axisY = h * 0.54;
    const pxPerCm = Math.max(4.5, Math.min((w * 0.88) / 130, (h * 0.56) / 28));
    const lensHalfHeight = Math.min(h * 0.25, 135);

    const curvatureFactor = 35 / this.currentRadius;
    const lensHalfThick = Math.max(8, Math.min(28, 9 * curvatureFactor));

    const objX = centerX + this.physics.u * pxPerCm;
    const objTopY = axisY - this.objectHeightCm * pxPerCm;

    const benchY = axisY + lensHalfHeight + 22;
    const benchHeight = 28;

    this.hitBoxes = [
      {
        id: 'optical_bench',
        x: w * 0.04,
        y: benchY,
        w: w * 0.92,
        h: benchHeight
      },
      {
        id: 'convex_lens',
        x: centerX - lensHalfThick - 14,
        y: axisY - lensHalfHeight,
        w: (lensHalfThick + 14) * 2,
        h: lensHalfHeight * 2
      },
      {
        id: 'illuminated_object',
        x: objX - 18,
        y: objTopY - 16,
        w: 36,
        h: axisY - objTopY + 22
      }
    ];

    if (!this.physics.isAtInfinity && !this.physics.isVirtual) {
      const imgX = centerX + this.physics.v * pxPerCm;
      if (imgX > centerX + 10 && imgX < w * 0.96) {
        this.hitBoxes.push({
          id: 'image_screen',
          x: imgX - 14,
          y: axisY - lensHalfHeight * 0.85,
          w: 28,
          h: lensHalfHeight * 1.7
        });
      }
    }

    return {
      centerX,
      axisY,
      pxPerCm,
      lensHalfHeight,
      lensHalfThick,
      objX,
      objTopY,
      benchY,
      benchHeight
    };
  }

  /**
   * Main 2D Canvas rendering pipeline
   * Note: Background is intentionally transparent so DIGILAB's native UI graph/grid
   * renders cleanly without duplication, and fixed HUD cards use screen-space transform.
   */
  draw(ctx, w, h) {
    if (!ctx || w <= 0 || h <= 0) return;

    const isDark = this._isDarkTheme();
    const palette = this._getPalette(isDark);
    const t = TRANSLATIONS[this.lang];
    const layout = this._computeLayout(w, h);
    const {
      centerX,
      axisY,
      pxPerCm,
      lensHalfHeight,
      lensHalfThick,
      objX,
      objTopY,
      benchY,
      benchHeight
    } = layout;

    ctx.save();

    // 1. Principal Axis
    ctx.save();
    ctx.strokeStyle = palette.axisLine;
    ctx.lineWidth = 1.6;
    ctx.setLineDash([8, 5]);
    ctx.beginPath();
    ctx.moveTo(w * 0.03, axisY);
    ctx.lineTo(w * 0.97, axisY);
    ctx.stroke();
    ctx.restore();

    ctx.font = '600 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = palette.textSecondary;
    ctx.textAlign = 'right';
    ctx.fillText(t.labels.principalAxis, w * 0.965, axisY - 7);

    // 2. Graduated Optical Bench & Ruler Ticks
    this._drawOpticalBench(ctx, w, centerX, benchY, benchHeight, pxPerCm, palette);

    // 3. Focal Points (F1, F2) and Centers of Curvature (2F1, 2F2)
    this._drawCardinalPoints(ctx, centerX, axisY, pxPerCm, palette, t);

    // 4. Image Screen (for Real Images within bench bounds)
    if (!this.physics.isAtInfinity && !this.physics.isVirtual) {
      const imgX = centerX + this.physics.v * pxPerCm;
      if (imgX > centerX + 12 && imgX < w * 0.96) {
        this._drawImageScreen(ctx, imgX, axisY, lensHalfHeight * 0.85, palette);
      }
    }

    // 5. Biconvex Glass Lens (dynamically shaped by R and tinted by n)
    this._drawConvexLens(
      ctx,
      centerX,
      axisY,
      lensHalfHeight,
      lensHalfThick,
      palette,
      t
    );

    // 6. Principal Light Rays (if Ray ON/OFF switch is active)
    if (this.rayAlpha > 0.01) {
      this._drawPrincipalRays(
        ctx,
        w,
        centerX,
        axisY,
        pxPerCm,
        lensHalfHeight,
        objX,
        objTopY,
        palette
      );
    } else {
      ctx.save();
      ctx.font = '600 13px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = palette.textSecondary;
      ctx.textAlign = 'center';
      ctx.fillText(t.labels.raysOffHint, centerX, axisY - lensHalfHeight - 18);
      ctx.restore();
    }

    // 7. Illuminated Object Arrow (AB)
    this._drawArrow(
      ctx,
      objX,
      axisY,
      objTopY,
      palette.objectColor,
      false,
      t.labels.object,
      palette
    );

    // 8. Formed Image Arrow (A'B')
    if (!this.physics.isAtInfinity) {
      const imgX = centerX + this.physics.v * pxPerCm;
      const imgTopY = axisY - this.physics.imageHeightCm * pxPerCm;

      if (imgX > w * 0.02 && imgX < w * 0.98) {
        const clampedImgTopY = Math.max(26, Math.min(benchY - 6, imgTopY));
        const imgColor = this.physics.isVirtual
          ? palette.virtualImageColor
          : palette.realImageColor;
        const imgLabel = this.physics.isVirtual
          ? t.labels.virtualImage
          : t.labels.image;

        this._drawArrow(
          ctx,
          imgX,
          axisY,
          clampedImgTopY,
          imgColor,
          this.physics.isVirtual,
          imgLabel,
          palette
        );
      }
    }

    ctx.restore();

    // 9. Fixed Screen-Space Telemetry Cards (Pinned Top-Left & Top-Right, immune to pan/zoom)
    this._drawFixedTelemetryHUD(ctx, w, h, palette, t);
  }

  _drawOpticalBench(ctx, w, centerX, benchY, benchHeight, pxPerCm, palette) {
    const marginX = w * 0.04;
    const benchW = w * 0.92;

    ctx.save();
    ctx.fillStyle = palette.benchBody;
    ctx.strokeStyle = palette.benchStroke;
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(marginX, benchY, benchW, benchHeight, 6);
    ctx.fill();
    ctx.stroke();

    ctx.font = '500 10px monospace';
    ctx.fillStyle = palette.benchText;
    ctx.textAlign = 'center';

    const maxCm = Math.floor((benchW * 0.5) / pxPerCm);
    for (let cm = -maxCm; cm <= maxCm; cm++) {
      const tickX = centerX + cm * pxPerCm;
      if (tickX < marginX + 8 || tickX > marginX + benchW - 8) continue;

      const isTen = cm % 10 === 0;
      const isFive = cm % 5 === 0;
      const tickH = isTen ? 11 : isFive ? 7 : 4;

      ctx.strokeStyle = palette.benchTick;
      ctx.lineWidth = isTen ? 1.5 : 1;
      ctx.beginPath();
      ctx.moveTo(tickX, benchY);
      ctx.lineTo(tickX, benchY + tickH);
      ctx.stroke();

      if (isTen) {
        const label = cm === 0 ? '0' : `${cm > 0 ? '+' : ''}${cm}`;
        ctx.fillText(label, tickX, benchY + 22);
      }
    }
    ctx.restore();
  }

  _drawCardinalPoints(ctx, centerX, axisY, pxPerCm, palette, t) {
    const fPx = this.physics.f * pxPerCm;
    const points = [
      { x: centerX - fPx, label: t.labels.focus1, color: palette.focusPoint },
      { x: centerX + fPx, label: t.labels.focus2, color: palette.focusPoint },
      {
        x: centerX - 2 * fPx,
        label: t.labels.center2F1,
        color: palette.twoFocusPoint
      },
      {
        x: centerX + 2 * fPx,
        label: t.labels.center2F2,
        color: palette.twoFocusPoint
      }
    ];

    ctx.save();
    ctx.font = '700 12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';

    for (const pt of points) {
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, axisY, 4.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillText(pt.label, pt.x, axisY + 18);
    }
    ctx.restore();
  }

  _drawConvexLens(ctx, centerX, axisY, halfHeight, halfThick, palette, t) {
    ctx.save();

    const densityBoost = (this.currentRefractiveIndex - 1.3) * 0.35;

    const grad = ctx.createLinearGradient(
      centerX - halfThick,
      axisY,
      centerX + halfThick,
      axisY
    );
    grad.addColorStop(0, palette.lensFillStart);
    grad.addColorStop(0.5, palette.lensFillMid);
    grad.addColorStop(1, palette.lensFillStart);

    ctx.globalAlpha = Math.min(1, 0.85 + densityBoost);
    ctx.fillStyle = grad;
    ctx.strokeStyle = palette.lensStroke;
    ctx.lineWidth = 2.2;

    ctx.beginPath();
    ctx.moveTo(centerX, axisY - halfHeight);
    ctx.quadraticCurveTo(
      centerX + halfThick * 2.1,
      axisY,
      centerX,
      axisY + halfHeight
    );
    ctx.quadraticCurveTo(
      centerX - halfThick * 2.1,
      axisY,
      centerX,
      axisY - halfHeight
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.strokeStyle = palette.lensCenterLine;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(centerX, axisY - halfHeight - 10);
    ctx.lineTo(centerX, axisY + halfHeight + 10);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = palette.lensStroke;
    ctx.beginPath();
    ctx.arc(centerX, axisY, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '700 12px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = palette.textPrimary;
    ctx.textAlign = 'center';
    ctx.fillText(t.labels.opticalCenter, centerX, axisY - halfHeight - 14);

    ctx.restore();
  }

  _drawImageScreen(ctx, imgX, axisY, halfH, palette) {
    ctx.save();
    ctx.fillStyle = palette.screenFill;
    ctx.strokeStyle = palette.screenStroke;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.roundRect(imgX - 4, axisY - halfH, 8, halfH * 2, 3);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  _drawArrow(ctx, x, baseY, tipY, color, isDashed, label, palette) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;

    if (isDashed) {
      ctx.setLineDash([6, 4]);
    }

    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.lineTo(x, tipY);
    ctx.stroke();
    ctx.setLineDash([]);

    const dir = tipY < baseY ? -1 : 1;
    const headSize = 9;
    ctx.beginPath();
    ctx.moveTo(x, tipY);
    ctx.lineTo(x - 5.5, tipY - dir * headSize);
    ctx.lineTo(x + 5.5, tipY - dir * headSize);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, baseY, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '700 12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    const labelY = dir < 0 ? tipY - 12 : tipY + 18;
    ctx.fillStyle = palette.textPrimary;
    ctx.fillText(label, x, labelY);

    ctx.restore();
  }

  /**
   * Draws the 3 canonical principal rays + animated wave pulses + virtual extensions
   */
  _drawPrincipalRays(
    ctx,
    w,
    centerX,
    axisY,
    pxPerCm,
    lensHalfHeight,
    objX,
    objTopY,
    palette
  ) {
    const fPx = this.physics.f * pxPerCm;
    const f1X = centerX - fPx;
    const f2X = centerX + fPx;

    ctx.save();
    ctx.globalAlpha = this.rayAlpha;
    ctx.lineWidth = 2.1;

    // RAY 1: Parallel to principal axis -> refracts through F2
    const r1LensY = objTopY;
    const r1Slope = (axisY - r1LensY) / (f2X - centerX);
    const r1EndX = w;
    const r1EndY = r1LensY + r1Slope * (r1EndX - centerX);

    this._drawRaySegment(ctx, objX, objTopY, centerX, r1LensY, palette.ray1Color);
    this._drawRaySegment(ctx, centerX, r1LensY, r1EndX, r1EndY, palette.ray1Color);

    // RAY 2: Passes undeviated through Optical Center O
    const r2Slope = (axisY - objTopY) / (centerX - objX);
    const r2EndX = w;
    const r2EndY = axisY + r2Slope * (r2EndX - centerX);

    this._drawRaySegment(ctx, objX, objTopY, centerX, axisY, palette.ray2Color);
    this._drawRaySegment(ctx, centerX, axisY, r2EndX, r2EndY, palette.ray2Color);

    // RAY 3: Passes through F1 -> emerges parallel
    const r3SlopeIncident = (axisY - objTopY) / (f1X - objX);
    const r3LensY = objTopY + r3SlopeIncident * (centerX - objX);

    if (Math.abs(r3LensY - axisY) <= lensHalfHeight * 1.25) {
      this._drawRaySegment(
        ctx,
        objX,
        objTopY,
        centerX,
        r3LensY,
        palette.ray3Color
      );
      this._drawRaySegment(
        ctx,
        centerX,
        r3LensY,
        w,
        r3LensY,
        palette.ray3Color
      );
    }

    // VIRTUAL BACKWARD EXTENSIONS (when |u| < f)
    if (this.physics.isVirtual && !this.physics.isAtInfinity) {
      const imgX = centerX + this.physics.v * pxPerCm;
      const imgTopY = axisY - this.physics.imageHeightCm * pxPerCm;

      ctx.save();
      ctx.strokeStyle = palette.virtualRayColor;
      ctx.lineWidth = 1.7;
      ctx.setLineDash([5, 5]);

      ctx.beginPath();
      ctx.moveTo(centerX, r1LensY);
      ctx.lineTo(imgX, imgTopY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX, axisY);
      ctx.lineTo(imgX, imgTopY);
      ctx.stroke();

      if (Math.abs(r3LensY - axisY) <= lensHalfHeight * 1.25) {
        ctx.beginPath();
        ctx.moveTo(centerX, r3LensY);
        ctx.lineTo(imgX, imgTopY);
        ctx.stroke();
      }

      ctx.restore();
    }

    ctx.restore();
  }

  _drawRaySegment(ctx, x1, y1, x2, y2, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len > 36) {
      const angle = Math.atan2(dy, dx);
      const midT = 0.45;
      const mx = x1 + dx * midT;
      const my = y1 + dy * midT;

      ctx.save();
      ctx.translate(mx, my);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(-4, -4);
      ctx.lineTo(-4, 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      const px = x1 + dx * this.photonPhase;
      const py = y1 + dy * this.photonPhase;
      ctx.beginPath();
      ctx.arc(px, py, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  /**
   * Renders fixed Top-Left (Blue Formula Card) & Top-Right (Green/Purple Nature Card)
   * using unzoomed screen-space coordinates so they never drift or overlap when panning/zooming.
   */
  _drawFixedTelemetryHUD(ctx, stageW, stageH, palette, t) {
    ctx.save();

    // Reset any engine pan/zoom camera transform back to crisp viewport CSS pixels
    const dpr =
      typeof window !== 'undefined' && window.devicePixelRatio
        ? window.devicePixelRatio
        : ctx.canvas && stageW > 0
          ? ctx.canvas.width / stageW
          : 1;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const viewW =
      ctx.canvas && ctx.canvas.clientWidth
        ? ctx.canvas.clientWidth
        : ctx.canvas
          ? ctx.canvas.width / dpr
          : stageW;

    const pad = 12;
    const topY = 42; // Sits cleanly below the engine's top-left "60 FPS" badge
    const gap = 10;
    const availW = Math.max(260, viewW - pad * 2 - gap);

    // Responsive split so Top-Left & Top-Right boxes NEVER overlap on any screen width
    const leftW = Math.min(265, Math.floor(availW * 0.56));
    const rightW = Math.min(220, Math.floor(availW * 0.44));

    // --- 1. TOP-LEFT FIXED BOX (Blue Border: Formulas & Live Readings) ---
    const leftX = pad;
    const leftH = 88;

    ctx.fillStyle = palette.hudBg;
    ctx.strokeStyle = palette.hudBorder;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.roundRect(leftX, topY, leftW, leftH, 9);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(leftX, topY, leftW, leftH, 9);
    ctx.clip();

    ctx.font = '700 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = palette.accent;
    ctx.textAlign = 'left';
    ctx.fillText(t.labels.formulaTitle, leftX + 10, topY + 17);

    ctx.font = '600 10px monospace';
    ctx.fillStyle = palette.textSecondary;
    ctx.fillText('1/f = 2(n-1)/R  |  1/v - 1/u = 1/f', leftX + 10, topY + 34);

    const fStr = `+${this.physics.f.toFixed(1)}${t.units.cm}`;
    const pStr = `+${this.physics.powerD.toFixed(1)}${t.units.diopter}`;
    const vStr = this.physics.isAtInfinity
      ? t.labels.infinity
      : `${this.physics.v > 0 ? '+' : ''}${this.physics.v.toFixed(1)}${t.units.cm}`;
    const mStr = this.physics.isAtInfinity
      ? '∞'
      : `${this.physics.magnification > 0 ? '+' : ''}${this.physics.magnification.toFixed(2)}×`;

    ctx.font = '700 11px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = palette.textPrimary;
    ctx.fillText(`f = ${fStr}  |  P = ${pStr}`, leftX + 10, topY + 54);
    ctx.fillText(`v = ${vStr}  |  m = ${mStr}`, leftX + 10, topY + 72);
    ctx.restore();

    // --- 2. TOP-RIGHT FIXED BOX (Green/Purple Border: Image Nature) ---
    const rightX = viewW - rightW - pad;
    const rightH = 52;
    const natureColor = this.physics.isVirtual
      ? palette.virtualImageColor
      : palette.realImageColor;

    ctx.fillStyle = palette.hudBg;
    ctx.strokeStyle = natureColor;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.roundRect(rightX, topY, rightW, rightH, 9);
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(rightX, topY, rightW, rightH, 9);
    ctx.clip();

    ctx.font = '600 10px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = palette.textSecondary;
    ctx.textAlign = 'left';
    ctx.fillText(t.labels.natureLabel, rightX + 10, topY + 18);

    ctx.font = '700 11.5px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = natureColor;
    ctx.fillText(
      t.labels.natures[this.physics.natureKey],
      rightX + 10,
      topY + 37
    );
    ctx.restore();

    ctx.restore();
  }

  /**
   * Memory cleanup and state teardown
   */
  destroy() {
    this.hitBoxes = [];
    this.savedObservations = [];
    this.canvas = null;
  }
}
