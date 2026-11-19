export const metadata = {
    id: "exp_10_01",
    standard: 10,
    subject: "Science 1",
    chapter: 1,
    title: "Determination of 'g' using Simple Pendulum",
    titleUrdu: "سادہ پینڈولم کی مدد سے 'g' کی قیمت معلوم کرنا",
    description: "Determine the acceleration due to gravity (g) by measuring the periodic time of a simple pendulum for different lengths and verify that the period is independent of bob mass.",
    descriptionUrdu: "سادہ پینڈولم کی مختلف لمبائیوں کے لیے ارتعاش کا دورانیہ ناپ کر کشش ثقل کا اسراع (g) معلوم کریں اور تصدیق کریں کہ دورانیہ بوب کے وزن سے آزاد ہوتا ہے۔",
    apparatusList: [
        {
            id: "stand",
            name: "Rigid Iron Stand with Clamp",
            nameUrdu: "لوہے کا مضبوط اسٹینڈ اور کلیمپ",
            desc: "Provides a rigid, non-yielding support for suspension to prevent external harmonic oscillations.",
            descUrdu: "پینڈولم کو لٹکانے کے لیے ایک مضبوط سہارا جو بیرونی ارتعاش کو روکتا ہے۔"
        },
        {
            id: "cork",
            name: "Split Cork Clamp Pads",
            nameUrdu: "دو حصوں میں کٹا ہوا کارک",
            desc: "Holds the suspension thread firmly at a single sharp point without shearing or slippage.",
            descUrdu: "دھاگے کو ایک مخصوص نقطے پر مضبوطی سے جکڑتا ہے تاکہ لمبائی میں تغیر نہ آئے۔"
        },
        {
            id: "thread",
            name: "Inextensible Light Thread",
            nameUrdu: "نا کھنچنے والا باریک دھاگہ",
            desc: "Weightless, flexible cord whose effective length can be calibrated from 20 cm to 120 cm.",
            descUrdu: "ایک ہلکا اور لچک سے پاک دھاگہ جس کی لمبائی کو 20 تا 120 سینٹی میٹر ایڈجسٹ کیا جا سکتا ہے۔"
        },
        {
            id: "bob",
            name: "Heavy Spherical Brass Bob",
            nameUrdu: "پیتل کا کروی بوب",
            desc: "A solid, homogeneous metallic sphere with a hook, concentrating mass at the pendulum's center of gravity.",
            descUrdu: "پیتل کا ایک وزنی دھاتی گولا جس کے مرکز ثقل پر کمیت مرتکز ہوتی ہے۔"
        },
        {
            id: "stopwatch",
            name: "Precision Digital Stopwatch",
            nameUrdu: "ڈیجیٹل اسٹاپ واچ",
            desc: "Measures the time taken for 20 complete oscillations with 0.01s digital accuracy.",
            descUrdu: "بیس مکمل چکروں کے وقت کی پیمائش کے لیے استعمال ہونے والی درست گھڑی۔"
        }
    ]
};

export class Experiment {
    constructor(canvas, lang = 'en') {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.lang = lang;
        this.metadata = metadata;

        // Physical Parameters
        this.lengthCm = 80;
        this.bobMassGrams = 50;
        this.releaseAngleDeg = 15;
        this.gravity = 9.8;
        this.planetName = "Earth";

        // Dynamic State Variables
        this.theta = (this.releaseAngleDeg * Math.PI) / 180;
        this.omega = 0.0;
        this.damping = 0.015;
        this.isOscillating = false;

        // Oscillation Counting & Timing
        this.oscillationCount = 0;
        this.targetOscillations = 20;
        this.previousTheta = this.theta;
        this.hasCrossedZero = false;

        // Stopwatch State
        this.stopwatchRunning = false;
        this.stopwatchElapsed = 0.0;

        // Observation Records Storage
        this.readings = [
            { length: 60, time20: "31.08", period: "1.55", periodSq: "2.41", gCalc: "9.82" },
            { length: 80, time20: "35.88", period: "1.79", periodSq: "3.22", gCalc: "9.81" },
            { length: 100, time20: "40.12", period: "2.01", periodSq: "4.02", gCalc: "9.81" }
        ];

        // Visual Trajectory History
        this.trailPoints = [];
        this.maxTrail = 18;
    }

    // ========================================================
    // PHYSICS INTEGRATION (Runge-Kutta 4th Order RK4)
    // ========================================================

    update(delta) {
        if (!this.isOscillating) return;

        const dt = Math.min(delta, 0.033);
        const L_meters = this.lengthCm / 100;
        const g = this.gravity;
        const b = this.damping;

        const getDerivatives = (th, om) => {
            const dTheta = om;
            const dOmega = -(g / L_meters) * Math.sin(th) - b * om;
            return { dTheta, dOmega };
        };

        const k1 = getDerivatives(this.theta, this.omega);
        const k2 = getDerivatives(this.theta + 0.5 * dt * k1.dTheta, this.omega + 0.5 * dt * k1.dOmega);
        const k3 = getDerivatives(this.theta + 0.5 * dt * k2.dTheta, this.omega + 0.5 * dt * k2.dOmega);
        const k4 = getDerivatives(this.theta + dt * k3.dTheta, this.omega + dt * k3.dOmega);

        this.theta += (dt / 6) * (k1.dTheta + 2 * k2.dTheta + 2 * k3.dTheta + k4.dTheta);
        this.omega += (dt / 6) * (k1.dOmega + 2 * k2.dOmega + 2 * k3.dOmega + k4.dOmega);

        if (this.previousTheta > 0 && this.theta <= 0) {
            this.hasCrossedZero = true;
        } else if (this.previousTheta < 0 && this.theta >= 0 && this.hasCrossedZero) {
            this.oscillationCount++;
            this.hasCrossedZero = false;

            if (this.oscillationCount >= this.targetOscillations && this.stopwatchRunning) {
                this.stopwatchRunning = false;
                this.recordReading();
            }
        }
        this.previousTheta = this.theta;

        if (this.stopwatchRunning) {
            this.stopwatchElapsed += dt;
        }
    }

    recordReading() {
        const L_meters = this.lengthCm / 100;
        const t20 = this.stopwatchElapsed;
        const T = t20 / this.targetOscillations;
        const T_sq = T * T;
        const g_val = (4 * Math.PI * Math.PI * L_meters) / T_sq;

        const row = {
            length: this.lengthCm,
            time20: t20.toFixed(2),
            period: T.toFixed(2),
            periodSq: T_sq.toFixed(2),
            gCalc: g_val.toFixed(2)
        };

        this.readings.unshift(row);
        if (this.readings.length > 5) this.readings.pop();
    }

    // ========================================================
    // CANVAS RENDERING ENGINE (Physical Apparatus Only)
    // ========================================================

    draw(ctx, width, height) {
        ctx.save();

        const pivotX = width / 2;
        const pivotY = Math.max(45, height * 0.12);
        const scaleFactor = Math.min(width / 700, height / 520, 1.0);

        const visualLength = (this.lengthCm * 2.8) * scaleFactor;
        const bobRadius = (16 + (this.bobMassGrams / 100) * 8) * scaleFactor;

        const bobX = pivotX + visualLength * Math.sin(this.theta);
        const bobY = pivotY + visualLength * Math.cos(this.theta);

        // 1. Draw Stand Top Bar and Clamp
        this.drawStandSupport(ctx, pivotX, pivotY, scaleFactor);

        // 2. Draw Protractor Angle Grid with Dynamic Arc & Angle Text (up to 60°)
        this.drawAngleProtractor(ctx, pivotX, pivotY, visualLength * 0.45, scaleFactor);

        // 3. Motion Trajectory Trail
        if (this.isOscillating) {
            this.trailPoints.push({ x: bobX, y: bobY });
            if (this.trailPoints.length > this.maxTrail) this.trailPoints.shift();

            for (let i = 0; i < this.trailPoints.length; i++) {
                const alpha = (i / this.trailPoints.length) * 0.35;
                ctx.beginPath();
                ctx.arc(this.trailPoints[i].x, this.trailPoints[i].y, bobRadius * 0.7, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.fill();
            }
        }

        // 4. Draw Inextensible Suspension Thread to Hook Top
        const hookOffset = (bobRadius + 4 * scaleFactor);
        const hookX = bobX - hookOffset * Math.sin(this.theta);
        const hookY = bobY - hookOffset * Math.cos(this.theta);

        ctx.beginPath();
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(hookX, hookY);
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = Math.max(1.5, 2 * scaleFactor);
        ctx.shadowColor = "rgba(0, 240, 255, 0.4)";
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 5. Draw Brass Bob with Dynamic Orientation Along Thread
        ctx.save();
        ctx.translate(bobX, bobY);
        ctx.rotate(-this.theta);

        // Radial Specular 3D Gradient
        const grad = ctx.createRadialGradient(
            -bobRadius * 0.3,
            -bobRadius * 0.3,
            bobRadius * 0.1,
            0,
            0,
            bobRadius
        );
        grad.addColorStop(0, "#fef08a");
        grad.addColorStop(0.35, "#eab308");
        grad.addColorStop(0.85, "#ca8a04");
        grad.addColorStop(1, "#854d0e");

        ctx.beginPath();
        ctx.arc(0, 0, bobRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#713f12";
        ctx.stroke();

        // Suspension Hook Base Pin
        ctx.beginPath();
        ctx.arc(0, -bobRadius, 3 * scaleFactor, 0, Math.PI * 2);
        ctx.fillStyle = "#cbd5e1";
        ctx.fill();
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Suspension Hook Eyelet
        ctx.beginPath();
        ctx.arc(0, -bobRadius - 3 * scaleFactor, 4 * scaleFactor, 0, Math.PI * 2);
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();

        ctx.restore();
    }

    // ========================================================
    // SCREEN-SPACE FIXED HUD (Never shifts with Pan or Zoom)
    // ========================================================

    drawHUD(ctx, w, h) {
        const scale = Math.min(w / 700, h / 520, 1.0);
        const isUr = this.lang === 'ur';
        ctx.save();

        // Digital Stopwatch Box (Fixed Top-Right)
        const boxW = 140 * scale;
        const boxH = 50 * scale;
        const boxX = w - boxW - 14;
        const boxY = 14;

        ctx.fillStyle = "rgba(13, 19, 34, 0.78)";
        ctx.strokeStyle = this.stopwatchRunning ? "#10b981" : "rgba(0, 240, 255, 0.35)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = this.stopwatchRunning ? "#10b981" : "#00f0ff";
        ctx.font = `bold ${14 * scale}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(`${this.stopwatchElapsed.toFixed(2)} s`, boxX + boxW / 2, boxY + 24 * scale);

        ctx.fillStyle = "#94a3b8";
        ctx.font = `600 ${9 * scale}px sans-serif`;
        const lapText = isUr ? `دورانیہ: ${this.oscillationCount}/20` : `Oscillations: ${this.oscillationCount} / 20`;
        ctx.fillText(lapText, boxX + boxW / 2, boxY + 40 * scale);

        // Theoretical Period & Gravity Tag (Fixed Top-Left)
        const L_m = this.lengthCm / 100;
        const theoreticalT = 2 * Math.PI * Math.sqrt(L_m / this.gravity);

        ctx.textAlign = "left";
        ctx.fillStyle = "#94a3b8";
        ctx.font = `700 ${10 * scale}px sans-serif`;
        ctx.fillText(`${this.planetName}: g = ${this.gravity.toFixed(2)} m/s²`, 14, 24);

        ctx.fillStyle = "#00f0ff";
        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillText(`T = 2π√(L/g) = ${theoreticalT.toFixed(2)} s`, 14, 40);

        ctx.restore();
    }

    drawStandSupport(ctx, px, py, scale) {
        ctx.save();

        ctx.fillStyle = "#334155";
        ctx.strokeStyle = "#00f0ff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px - 36 * scale, py - 18 * scale, 72 * scale, 18 * scale, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#1e293b";
        ctx.fillRect(px - 160 * scale, py - 14 * scale, 124 * scale, 10 * scale);

        ctx.beginPath();
        ctx.arc(px, py, 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "#f59e0b";
        ctx.fill();

        ctx.restore();
    }

    drawAngleProtractor(ctx, px, py, radius, scale = 1.0) {
        ctx.save();

        // 1. Dotted Reference Protractor Arc covering up to ±65°
        ctx.beginPath();
        ctx.arc(px, py, radius, Math.PI * 0.14, Math.PI * 0.86);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Vertical Equilibrium Guideline
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px, py + radius * 1.15);
        ctx.strokeStyle = "rgba(0, 240, 255, 0.35)";
        ctx.setLineDash([3, 3]);
        ctx.stroke();

        // 3. Dynamic Angle Sector & Arc
        const currentAngleRad = this.theta;
        const currentDeg = Math.abs((currentAngleRad * 180) / Math.PI);
        const arcRadius = Math.max(28, 44 * scale);

        const threadAngle = Math.PI / 2 - currentAngleRad;
        const verticalAngle = Math.PI / 2;

        const startAngle = Math.min(threadAngle, verticalAngle);
        const endAngle = Math.max(threadAngle, verticalAngle);

        if (currentDeg > 0.6) {
            // Translucent glowing wedge
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.arc(px, py, arcRadius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = "rgba(0, 240, 255, 0.15)";
            ctx.fill();

            // Solid angle arc boundary
            ctx.beginPath();
            ctx.arc(px, py, arcRadius, startAngle, endAngle);
            ctx.setLineDash([]);
            ctx.strokeStyle = "#00f0ff";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // 4. Angle Numeric Text Badge (e.g. θ = 28.5°)
            const midAngle = currentAngleRad / 2;
            const textDist = arcRadius + 18 * scale;
            const textX = px + textDist * Math.sin(midAngle);
            const textY = py + textDist * Math.cos(midAngle);

            ctx.textAlign = currentAngleRad >= 0 ? "left" : "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#00f0ff";
            ctx.font = `bold ${Math.max(10, Math.round(11 * scale))}px monospace`;
            ctx.fillText(`θ = ${currentDeg.toFixed(1)}°`, textX, textY);
        }

        ctx.restore();
    }

    // ========================================================
    // HIT-TESTING FOR TOOLTIP POPOVER
    // ========================================================

    getInstrumentAtPoint(stageX, stageY, canvasW, canvasH) {
        const pivotX = canvasW / 2;
        const pivotY = Math.max(45, canvasH * 0.12);
        const scaleFactor = Math.min(canvasW / 700, canvasH / 520, 1.0);
        const visualLength = (this.lengthCm * 2.8) * scaleFactor;
        const bobX = pivotX + visualLength * Math.sin(this.theta);
        const bobY = pivotY + visualLength * Math.cos(this.theta);
        const bobRadius = (16 + (this.bobMassGrams / 100) * 8) * scaleFactor;

        if (Math.abs(stageX - pivotX) < 45 * scaleFactor && Math.abs(stageY - pivotY) < 22 * scaleFactor) {
            return {
                id: "stand",
                name: this.lang === 'ur' ? "مضبوط اسٹینڈ و کارک" : "Rigid Stand & Split Cork",
                x: stageX,
                y: stageY - 20
            };
        }

        if (Math.hypot(stageX - bobX, stageY - bobY) < bobRadius + 14) {
            return {
                id: "bob",
                name: this.lang === 'ur' ? `پیتل کا بوب (${this.bobMassGrams}g)` : `Brass Bob (${this.bobMassGrams}g)`,
                x: bobX,
                y: bobY - bobRadius - 15
            };
        }

        const midThreadX = (pivotX + bobX) / 2;
        const midThreadY = (pivotY + bobY) / 2;
        if (Math.hypot(stageX - midThreadX, stageY - midThreadY) < 24) {
            return {
                id: "thread",
                name: this.lang === 'ur' ? `دھاگہ (L = ${this.lengthCm}cm)` : `Thread (L = ${this.lengthCm} cm)`,
                x: stageX,
                y: stageY - 20
            };
        }

        return null;
    }

    // ========================================================
    // CONTROLS SCHEMA & EVENT BINDINGS
    // ========================================================

    getControls() {
        const isUr = this.lang === 'ur';

        return [
            {
                id: "oscillation_btn",
                type: "button",
                label: isUr ? "پینڈولم موشن (جھولاؤ)" : "Pendulum Oscillation",
                text: this.isOscillating 
                    ? (isUr ? "جھول رہا ہے (ایکٹو)" : "Oscillating (Active)") 
                    : (isUr ? "روک دیا گیا (ہولڈ)" : "Hold Bob (Paused)"),
                className: this.isOscillating ? "state-on" : "state-off",
                onClick: () => {
                    this.isOscillating = !this.isOscillating;
                    if (this.isOscillating) {
                        this.theta = (this.releaseAngleDeg * Math.PI) / 180;
                        this.omega = 0.0;
                        this.trailPoints = [];
                    }
                }
            },
            {
                id: "stopwatch_btn",
                type: "button",
                label: isUr ? "ڈیجیٹل اسٹاپ واچ" : "Precision Digital Stopwatch",
                text: this.stopwatchRunning 
                    ? (isUr ? "اسٹاپ واچ چل رہی ہے" : "Stopwatch Running...") 
                    : (isUr ? "اسٹاپ واچ اسٹارٹ کریں" : "Start Stopwatch Timer"),
                className: this.stopwatchRunning ? "state-on" : "state-off",
                onClick: () => {
                    this.stopwatchRunning = !this.stopwatchRunning;
                    if (this.stopwatchRunning && this.stopwatchElapsed === 0) {
                        this.oscillationCount = 0;
                        this.hasCrossedZero = false;
                    }
                }
            },
            {
                id: "length_slider",
                type: "slider",
                label: isUr ? "دھاگے کی لمبائی (L)" : "Effective String Length (L)",
                min: 20,
                max: 120,
                step: 5,
                defaultValue: this.lengthCm,
                value: this.lengthCm,
                unit: " cm",
                onChange: (val) => {
                    this.lengthCm = parseFloat(val);
                    if (!this.isOscillating) {
                        this.theta = (this.releaseAngleDeg * Math.PI) / 180;
                        this.omega = 0;
                    }
                }
            },
            {
                id: "angle_slider",
                type: "slider",
                label: isUr ? "شروعاتی زاویہ (θ)" : "Release Amplitude Angle (θ)",
                min: 5,
                max: 60,
                step: 1,
                defaultValue: this.releaseAngleDeg,
                value: this.releaseAngleDeg,
                unit: "°",
                onChange: (val) => {
                    this.releaseAngleDeg = parseFloat(val);
                    if (!this.isOscillating) {
                        this.theta = (this.releaseAngleDeg * Math.PI) / 180;
                    }
                }
            },
            {
                id: "mass_slider",
                type: "slider",
                label: isUr ? "بوب کی کمیت (m)" : "Bob Mass (m)",
                min: 20,
                max: 100,
                step: 10,
                defaultValue: this.bobMassGrams,
                value: this.bobMassGrams,
                unit: " g",
                onChange: (val) => {
                    this.bobMassGrams = parseFloat(val);
                }
            },
            {
                id: "observation_table",
                type: "table",
                label: isUr ? "مشاہداتی جدول (Observation Table)" : "Experimental Observations (g Calculation)",
                headers: isUr 
                    ? ["L (cm)", "t (20 osc)", "T (s)", "T² (s²)", "g (m/s²)"]
                    : ["L (cm)", "t₂₀ (s)", "T (s)", "T² (s²)", "g (m/s²)"],
                rows: this.readings.map(r => [r.length, r.time20, r.period, r.periodSq, r.gCalc])
            }
        ];
    }

    reset() {
        this.isOscillating = false;
        this.lengthCm = 80;
        this.bobMassGrams = 50;
        this.releaseAngleDeg = 15;
        this.theta = (this.releaseAngleDeg * Math.PI) / 180;
        this.omega = 0.0;
        this.stopwatchRunning = false;
        this.stopwatchElapsed = 0.0;
        this.oscillationCount = 0;
        this.hasCrossedZero = false;
        this.trailPoints = [];
    }

    setLanguage(lang) {
        this.lang = lang;
    }
}
