export const metadata = {
    id: "exp_10_01_keplers_laws",
    standard: 10,
    subject: "Science 1",
    chapter: 1,
    title: "Verification of Kepler's Laws of Planetary Motion",
    titleUrdu: "سیاروی حرکت کے کیپلر کے قوانین کی تصدیق",
    description: "Demonstrate Kepler's three laws of planetary motion: elliptical orbits with the Sun at one focus, equal areas swept in equal time intervals (dA/dt = const), and the harmonic law verification (T² proportional to r³).",
    descriptionUrdu: "کیپلر کے تینوں سیاروی قوانین کا مشاہدہ کریں: بیضوی مدار جس کے ایک فوکس پر سورج واقع ہے، مساوی وقفوں میں مساوی رقبہ، اور دورانیہ اور فاصلے کا تناسب (T² ∝ r³).",
    apparatusList: [
        {
            id: "sun",
            name: "Central Star (The Sun at Focus F1)",
            nameUrdu: "مرکزی ستارہ (سورج بر مقام فوکس F1)",
            desc: "The massive primary gravitational body positioned at one of the two foci of the elliptical orbital trajectory.",
            descUrdu: "بیضوی مدار کے دو فوکسوں میں سے ایک پر واقع ثقلی مرکز جو سیارے پر کشش ثقل کا اثر ڈالتا ہے۔"
        },
        {
            id: "empty_focus",
            name: "Orbital Conjugate Focus (F2)",
            nameUrdu: "ثانوی بیضوی فوکس (F2)",
            desc: "The geometric conjugate focal point of the orbital ellipse demonstrating eccentric symmetry.",
            descUrdu: "بیضوی ہندساتی مدار کا دوسرا خالی فوکس جو بیضوی ساخت کو واضح کرتا ہے۔"
        },
        {
            id: "planet",
            name: "Orbiting Terrestrial Body",
            nameUrdu: "گردش کرتا ہوا سیارہ",
            desc: "Planetary mass orbiting with variable orbital velocity, moving fastest at perihelion and slowest at aphelion.",
            descUrdu: "ایک سیارہ جو بیضوی راستے پر گردش کرتے ہوئے سورج کے قریب ترین نقطے پر تیز اور دور ترین نقطے پر سست رفتار ہو جاتا ہے۔"
        },
        {
            id: "areal_sectors",
            name: "Equal Area Swept Sectors (A1 and A2)",
            nameUrdu: "مساوی رقباتی سیکٹرز (A1 اور A2)",
            desc: "Visual geometric sectors swept by the radius vector in identical time intervals showing A1 = A2.",
            descUrdu: "مساوی وقت میں نصف قطر کے ذریعے طے کردہ رقبے جو ثابت کرتے ہیں کہ دونوں رقبے بالکل برابر ہیں۔"
        },
        {
            id: "hud_analyzer",
            name: "Harmonic Ratio Telemetry Analyzer",
            nameUrdu: "ہارمونک ریشو ٹیلی میٹری اینالائزر",
            desc: "Real-time instrumentation verifying that the ratio T² / r³ remains constant for all planetary orbits.",
            descUrdu: "تمام سیاروں کے لیے دورانیہ اور فاصلے کے تناسب (T²/r³ = مستقل) کی تصدیق کرنے والا آلہ۔"
        }
    ]
};

export class Experiment {
    constructor(canvas, lang = 'en') {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.lang = lang;
        this.metadata = metadata;

        // Orbital Mechanics Parameters
        this.semiMajorAxisAU = 1.0;       // Semi-major axis (a) in Astronomical Units (0.4 to 3.0 AU)
        this.eccentricity = 0.45;         // Orbital eccentricity (e: 0.0 to 0.70)
        this.orbitSpeedFactor = 1.0;      // Simulation playback multiplier
        this.isOrbiting = true;
        this.showEqualAreaSectors = true;

        // Current Mean Anomaly (M = 2π * t / T)
        this.meanAnomaly = 0.0;
        this.orbitalPeriodYears = 1.0;    // Calculated via T = a^(1.5)
        this.currentDistanceAU = 1.0;     // Instantaneous radius r
        this.currentVelocityKms = 29.8;   // Instantaneous velocity v

        // Equal Area Sector Interval Definition (Delta t = 12% of orbital period)
        this.sectorDurationFraction = 0.12;

        // Preset Celestial Orbits
        this.presetPlanets = {
            mercury: { name: "Mercury", a: 0.387, e: 0.206 },
            earth: { name: "Earth", a: 1.000, e: 0.017 },
            mars: { name: "Mars", a: 1.524, e: 0.093 },
            halley: { name: "Comet Orbit", a: 1.800, e: 0.650 }
        };

        // Observation Records for Kepler's 3rd Law Table
        this.readings = [
            { planet: "Mercury", a: "0.387", T: "0.241", tSq: "0.058", aCube: "0.058", ratio: "1.00" },
            { planet: "Earth", a: "1.000", T: "1.000", tSq: "1.000", aCube: "1.000", ratio: "1.00" },
            { planet: "Mars", a: "1.524", T: "1.881", tSq: "3.538", aCube: "3.540", ratio: "1.00" },
            { planet: "Jupiter", a: "5.204", T: "11.86", tSq: "140.7", aCube: "140.8", ratio: "1.00" }
        ];

        this.updateDerivedOrbitalConstants();
    }

    updateDerivedOrbitalConstants() {
        // Kepler's Third Law: T² = a³ => T = a^(1.5) in Earth years / AU units
        this.orbitalPeriodYears = Math.pow(this.semiMajorAxisAU, 1.5);
    }

    // ========================================================
    // KEPLER ORBITAL MECHANICS SOLVER (Newton-Raphson for E)
    // ========================================================

    solveEccentricAnomaly(M, e) {
        let E = M;
        for (let i = 0; i < 7; i++) {
            const f = E - e * Math.sin(E) - M;
            const fPrime = 1.0 - e * Math.cos(E);
            const deltaE = f / fPrime;
            E -= deltaE;
            if (Math.abs(deltaE) < 1e-6) break;
        }
        return E;
    }

    getOrbitPositionAtMeanAnomaly(M, aPx, e, cx, cy) {
        const E = this.solveEccentricAnomaly(M, e);
        const bPx = aPx * Math.sqrt(Math.max(0.001, 1 - e * e));

        // Coordinate relative to Sun positioned at focus F1 (cx, cy)
        // Center of ellipse is shifted by - (a * e) along x-axis
        const xRelSun = aPx * (Math.cos(E) - e);
        const yRelSun = bPx * Math.sin(E);

        return {
            x: cx + xRelSun,
            y: cy + yRelSun,
            distPx: Math.hypot(xRelSun, yRelSun),
            E: E
        };
    }

    update(delta) {
        if (!this.isOrbiting) return;

        const dt = Math.min(delta, 0.033);
        // Orbital angular mean motion rate: n = 2π / T
        const meanMotion = (2 * Math.PI / this.orbitalPeriodYears) * 0.45 * this.orbitSpeedFactor;

        this.meanAnomaly = (this.meanAnomaly + meanMotion * dt) % (2 * Math.PI);

        // Solve current state
        const E = this.solveEccentricAnomaly(this.meanAnomaly, this.eccentricity);
        this.currentDistanceAU = this.semiMajorAxisAU * (1 - this.eccentricity * Math.cos(E));

        // Vis-Viva Equation: v² = GM * (2/r - 1/a) (Earth mean velocity = 29.8 km/s at 1 AU)
        const visVivaTerm = Math.max(0.01, (2.0 / this.currentDistanceAU) - (1.0 / this.semiMajorAxisAU));
        this.currentVelocityKms = 29.78 * Math.sqrt(visVivaTerm);
    }

    // ========================================================
    // CANVAS RENDERING ENGINE
    // ========================================================

    draw(ctx, width, height) {
        ctx.save();

        const scale = Math.min(width / 700, height / 520, 1.0);
        const sunX = width * 0.44;
        const sunY = height * 0.50;

        // Display scaling: AU to canvas pixels
        const semiMajorPixels = (130 * this.semiMajorAxisAU) * scale;
        const e = this.eccentricity;
        const semiMinorPixels = semiMajorPixels * Math.sqrt(Math.max(0.001, 1 - e * e));
        const focalDistPixels = semiMajorPixels * e;

        // Ellipse Geometric Center
        const ellipseCenterX = sunX - focalDistPixels;
        const ellipseCenterY = sunY;

        // Empty Focus F2 Coordinate
        const f2X = ellipseCenterX - focalDistPixels;
        const f2Y = sunY;

        // 1. Draw Elliptical Trajectory Path
        this.drawEllipticalOrbit(ctx, ellipseCenterX, ellipseCenterY, semiMajorPixels, semiMinorPixels);

        // 2. Draw Major Axis & Equilibrium Reference Grid
        this.drawOrbitalAxes(ctx, ellipseCenterX, ellipseCenterY, semiMajorPixels, semiMinorPixels, sunX, f2X, scale);

        // 3. Draw Equal Area Swept Sectors (Kepler's 2nd Law)
        if (this.showEqualAreaSectors) {
            this.drawSweptAreaSectors(ctx, semiMajorPixels, e, sunX, sunY, scale);
        }

        // 4. Draw Conjugate Focus F2 Marker
        this.drawConjugateFocus(ctx, f2X, f2Y, scale);

        // 5. Draw Central Sun at Primary Focus F1
        this.drawSun(ctx, sunX, sunY, scale);

        // 6. Calculate & Draw Orbiting Planet
        const planetPos = this.getOrbitPositionAtMeanAnomaly(this.meanAnomaly, semiMajorPixels, e, sunX, sunY);
        this.drawRadiusVector(ctx, sunX, sunY, planetPos.x, planetPos.y);
        this.drawPlanet(ctx, planetPos.x, planetPos.y, scale);

        ctx.restore();
    }

    drawEllipticalOrbit(ctx, ecx, ecy, aPx, bPx) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(ecx, ecy, aPx, bPx, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 240, 255, 0.45)";
        ctx.lineWidth = 1.8;
        ctx.shadowColor = "rgba(0, 240, 255, 0.3)";
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.restore();
    }

    drawOrbitalAxes(ctx, ecx, ecy, aPx, bPx, f1x, f2x, scale) {
        ctx.save();

        // Major Axis (Horizontal)
        ctx.beginPath();
        ctx.moveTo(ecx - aPx - 20 * scale, ecy);
        ctx.lineTo(ecx + aPx + 20 * scale, ecy);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Minor Axis (Vertical)
        ctx.beginPath();
        ctx.moveTo(ecx, ecy - bPx - 15 * scale);
        ctx.lineTo(ecx, ecy + bPx + 15 * scale);
        ctx.stroke();

        // Labels for Perihelion and Aphelion
        ctx.fillStyle = "#94a3b8";
        ctx.font = `600 ${Math.max(9, Math.round(10 * scale))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("Perihelion (Closest)", ecx + aPx, ecy + 16 * scale);
        ctx.fillText("Aphelion (Farthest)", ecx - aPx, ecy + 16 * scale);

        ctx.restore();
    }

    drawSweptAreaSectors(ctx, aPx, e, sunX, sunY, scale) {
        ctx.save();

        const dtFrac = this.sectorDurationFraction;
        const totalSteps = 24;

        // Sector 1: Near Perihelion (M from -dtFrac/2 to +dtFrac/2 around M = 0)
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        const startM1 = - (dtFrac * Math.PI);
        const endM1 = (dtFrac * Math.PI);
        for (let i = 0; i <= totalSteps; i++) {
            const m = startM1 + (i / totalSteps) * (endM1 - startM1);
            const p = this.getOrbitPositionAtMeanAnomaly(m, aPx, e, sunX, sunY);
            ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(0, 240, 255, 0.22)";
        ctx.fill();
        ctx.strokeStyle = "#00f0ff";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Sector 2: Near Aphelion (M around π, identical duration dtFrac)
        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        const startM2 = Math.PI - (dtFrac * Math.PI);
        const endM2 = Math.PI + (dtFrac * Math.PI);
        for (let i = 0; i <= totalSteps; i++) {
            const m = startM2 + (i / totalSteps) * (endM2 - startM2);
            const p = this.getOrbitPositionAtMeanAnomaly(m, aPx, e, sunX, sunY);
            ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(16, 185, 129, 0.22)";
        ctx.fill();
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Shaded Area Annotations
        ctx.fillStyle = "#00f0ff";
        ctx.font = `bold ${Math.max(10, Math.round(11 * scale))}px sans-serif`;
        ctx.textAlign = "center";
        const midP1 = this.getOrbitPositionAtMeanAnomaly(0, aPx * 0.55, e, sunX, sunY);
        ctx.fillText("Area A1", midP1.x, midP1.y + 12 * scale);

        ctx.fillStyle = "#10b981";
        const midP2 = this.getOrbitPositionAtMeanAnomaly(Math.PI, aPx * 0.55, e, sunX, sunY);
        ctx.fillText("Area A2", midP2.x, midP2.y + 12 * scale);

        ctx.restore();
    }

    drawConjugateFocus(ctx, f2x, f2y, scale) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(f2x, f2y, 4 * scale, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([2, 2]);
        ctx.stroke();

        ctx.fillStyle = "#64748b";
        ctx.font = `600 ${Math.max(8, Math.round(9 * scale))}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText("Focus F2", f2x, f2y - 8 * scale);
        ctx.restore();
    }

    drawSun(ctx, sx, sy, scale) {
        ctx.save();
        const sunRadius = 16 * scale;

        // Glowing Sun Corona
        const coronaGrad = ctx.createRadialGradient(sx, sy, sunRadius * 0.2, sx, sy, sunRadius * 2.2);
        coronaGrad.addColorStop(0, "rgba(251, 191, 36, 0.95)");
        coronaGrad.addColorStop(0.4, "rgba(245, 158, 11, 0.45)");
        coronaGrad.addColorStop(1, "rgba(234, 88, 12, 0)");
        ctx.fillStyle = coronaGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, sunRadius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Solid Solar Core
        const coreGrad = ctx.createRadialGradient(sx - sunRadius * 0.3, sy - sunRadius * 0.3, sunRadius * 0.1, sx, sy, sunRadius);
        coreGrad.addColorStop(0, "#ffffff");
        coreGrad.addColorStop(0.3, "#fef08a");
        coreGrad.addColorStop(0.7, "#f59e0b");
        coreGrad.addColorStop(1, "#d97706");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, sunRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#fef3c7";
        ctx.font = `bold ${Math.max(8, Math.round(9 * scale))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("Sun (F1)", sx, sy + sunRadius + 11 * scale);

        ctx.restore();
    }

    drawRadiusVector(ctx, sx, sy, px, py) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.restore();
    }

    drawPlanet(ctx, px, py, scale) {
        ctx.save();
        const r = 9 * scale;

        // Specular Shading
        const grad = ctx.createRadialGradient(px - r * 0.35, py - r * 0.35, r * 0.1, px, py, r);
        grad.addColorStop(0, "#93c5fd");
        grad.addColorStop(0.4, "#3b82f6");
        grad.addColorStop(0.8, "#1d4ed8");
        grad.addColorStop(1, "#1e3a8a");

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(59, 130, 246, 0.7)";
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }

    // ========================================================
    // SCREEN-SPACE FIXED HUD (Telemetry & Kepler Laws Status)
    // ========================================================

    drawHUD(ctx, w, h) {
        const scale = Math.min(w / 700, h / 520, 1.0);
        const isUr = this.lang === 'ur';
        ctx.save();

        // 1. Kepler's Third Law Harmonic Verification Box (Fixed Top-Right)
        const boxW = 160 * scale;
        const boxH = 54 * scale;
        const boxX = w - boxW - 14;
        const boxY = 14;

        ctx.fillStyle = "rgba(13, 19, 34, 0.85)";
        ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#00f0ff";
        ctx.font = `bold ${12 * scale}px monospace`;
        ctx.textAlign = "center";
        const tVal = this.orbitalPeriodYears;
        const aVal = this.semiMajorAxisAU;
        const ratio = (tVal * tVal) / Math.pow(aVal, 3);
        ctx.fillText(`T²/r³ = ${ratio.toFixed(2)} [Const]`, boxX + boxW / 2, boxY + 23 * scale);

        ctx.fillStyle = "#10b981";
        ctx.font = `600 ${9 * scale}px sans-serif`;
        const periodText = isUr ? `دورانیہ: ${tVal.toFixed(2)} سال` : `Period T = ${tVal.toFixed(2)} Earth Yrs`;
        ctx.fillText(periodText, boxX + boxW / 2, boxY + 41 * scale);

        // 2. Instantaneous Kinematics Telemetry (Fixed Top-Left)
        ctx.textAlign = "left";
        ctx.fillStyle = "#94a3b8";
        ctx.font = `700 ${10 * scale}px sans-serif`;
        const law2Text = this.showEqualAreaSectors ? "Law 2: Equal Area A1 = A2 Active" : "Kepler Orbit Active";
        ctx.fillText(`Semi-major a = ${this.semiMajorAxisAU.toFixed(2)} AU | e = ${this.eccentricity.toFixed(2)} | ${law2Text}`, 14, 24);

        ctx.fillStyle = "#00f0ff";
        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillText(`v = ${this.currentVelocityKms.toFixed(1)} km/s | Distance r = ${this.currentDistanceAU.toFixed(2)} AU`, 14, 40);

        ctx.restore();
    }

    // ========================================================
    // HIT-TESTING FOR TOOLTIP POPOVER
    // ========================================================

    getInstrumentAtPoint(stageX, stageY, canvasW, canvasH) {
        const scale = Math.min(canvasW / 700, canvasH / 520, 1.0);
        const sunX = canvasW * 0.44;
        const sunY = canvasH * 0.50;
        const semiMajorPixels = (130 * this.semiMajorAxisAU) * scale;
        const e = this.eccentricity;
        const focalDistPixels = semiMajorPixels * e;
        const f2X = (sunX - focalDistPixels) - focalDistPixels;

        // 1. Central Sun (F1)
        if (Math.hypot(stageX - sunX, stageY - sunY) < 26 * scale) {
            return {
                id: "sun",
                name: this.lang === 'ur' ? "مرکزی سورج (فوکس F1)" : "The Sun (Gravitational Focus F1)",
                x: sunX,
                y: sunY - 24
            };
        }

        // 2. Conjugate Focus (F2)
        if (Math.hypot(stageX - f2X, stageY - sunY) < 18 * scale) {
            return {
                id: "empty_focus",
                name: this.lang === 'ur' ? "خالی بیضوی فوکس (F2)" : "Conjugate Elliptical Focus (F2)",
                x: f2X,
                y: sunY - 20
            };
        }

        // 3. Orbiting Planet
        const planetPos = this.getOrbitPositionAtMeanAnomaly(this.meanAnomaly, semiMajorPixels, e, sunX, sunY);
        if (Math.hypot(stageX - planetPos.x, stageY - planetPos.y) < 18 * scale) {
            return {
                id: "planet",
                name: this.lang === 'ur' 
                    ? `سیارہ (فاصلہ: ${this.currentDistanceAU.toFixed(2)} AU)` 
                    : `Planet (r = ${this.currentDistanceAU.toFixed(2)} AU, v = ${this.currentVelocityKms.toFixed(1)} km/s)`,
                x: planetPos.x,
                y: planetPos.y - 18
            };
        }

        return null;
    }

    // ========================================================
    // CONTROLS SCHEMA FOR DIGILAB UI MANAGER
    // ========================================================

    getControls() {
        const isUr = this.lang === 'ur';

        return [
            {
                id: "orbit_motion_btn",
                type: "button",
                label: isUr ? "سیاروی حرکت" : "Orbital Motion",
                text: this.isOrbiting 
                    ? (isUr ? "گردش جاری ہے (ایکٹو)" : "Orbiting (Active)") 
                    : (isUr ? "روک دیا گیا (ہولڈ)" : "Hold Orbit (Paused)"),
                className: this.isOrbiting ? "state-on" : "state-off",
                onClick: () => {
                    this.isOrbiting = !this.isOrbiting;
                }
            },
            {
                id: "sectors_toggle_btn",
                type: "button",
                label: isUr ? "کیپلر کا دوسرا قانون (مساوی رقبہ)" : "Equal Area Sectors (Kepler's 2nd Law)",
                text: this.showEqualAreaSectors 
                    ? (isUr ? "مساوی رقبے نمایاں ہیں (A1 = A2)" : "Area Sectors Displayed (A1 = A2)") 
                    : (isUr ? "رقبے چھپائے گئے" : "Area Sectors Hidden"),
                className: this.showEqualAreaSectors ? "state-on" : "state-off",
                onClick: () => {
                    this.showEqualAreaSectors = !this.showEqualAreaSectors;
                }
            },
            {
                id: "semi_major_slider",
                type: "slider",
                label: isUr ? "نصف بڑا محور (فاصلہ r)" : "Semi-Major Axis (r / a)",
                min: 0.4,
                max: 3.0,
                step: 0.1,
                defaultValue: this.semiMajorAxisAU,
                value: this.semiMajorAxisAU,
                unit: " AU",
                onChange: (val) => {
                    this.semiMajorAxisAU = parseFloat(val);
                    this.updateDerivedOrbitalConstants();
                }
            },
            {
                id: "eccentricity_slider",
                type: "slider",
                label: isUr ? "بیضویت (Eccentricity e)" : "Orbital Eccentricity (e)",
                min: 0.0,
                max: 0.70,
                step: 0.02,
                defaultValue: this.eccentricity,
                value: this.eccentricity,
                unit: "",
                onChange: (val) => {
                    this.eccentricity = parseFloat(val);
                }
            },
            {
                id: "speed_slider",
                type: "slider",
                label: isUr ? "گردش کی رفتار" : "Simulation Playback Speed",
                min: 0.2,
                max: 3.0,
                step: 0.2,
                defaultValue: this.orbitSpeedFactor,
                value: this.orbitSpeedFactor,
                unit: "x",
                onChange: (val) => {
                    this.orbitSpeedFactor = parseFloat(val);
                }
            },
            {
                id: "observation_table",
                type: "table",
                label: isUr ? "کیپلر کے تیسرے قانون کا جدول (T² ∝ r³)" : "Harmonic Law Verification (T² / r³ = Constant)",
                headers: isUr 
                    ? ["سیارہ", "فاصلہ r (AU)", "دورانیہ T (سال)", "T²", "r³", "تناسب (T²/r³)"]
                    : ["Planet / Body", "Distance r (AU)", "Period T (Yrs)", "T²", "r³", "Ratio (T²/r³)"],
                rows: this.readings.map(r => [r.planet, r.a, r.T, r.tSq, r.aCube, r.ratio])
            }
        ];
    }

    reset() {
        this.semiMajorAxisAU = 1.0;
        this.eccentricity = 0.45;
        this.orbitSpeedFactor = 1.0;
        this.isOrbiting = true;
        this.showEqualAreaSectors = true;
        this.meanAnomaly = 0.0;
        this.updateDerivedOrbitalConstants();
    }

    setLanguage(lang) {
        this.lang = lang;
    }
}
