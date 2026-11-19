export const metadata = {
    id: "exp_10_01_equations_of_motion",
    standard: 10,
    subject: "Science 1",
    chapter: 1,
    title: "Verification of Kinematic Equations of Motion",
    titleUrdu: "حرکت کی مساواتوں کی تصدیق",
    description: "Demonstrate Newton's three kinematic equations for a body projected vertically upward against gravity (v = u - gt, s = ut - 1/2 gt², and v² = u² - 2gs) with apex trajectory tracking and symmetric flight time.",
    descriptionUrdu: "کشش ثقل کے خلاف عمودی طور پر پھینکے گئے جسم کے لیے حرکت کی تینوں مساواتوں (v = u - gt, s = ut - 1/2 gt², v² = u² - 2gs) کی تصدیق کریں۔",
    apparatusList: [
        {
            id: "launcher",
            name: "Pneumatic Vertical Launch Cannon",
            nameUrdu: "ورٹیکل پروجیکشن کینن",
            desc: "Pneumatic accelerator calibrated to propel the projectile vertically upward at calibrated initial velocities.",
            descUrdu: "ایک خاص کینن جو تجرباتی جسم کو بالکل سیدھا اوپر مطلوبہ شروعاتی رفتار سے داغتی ہے۔"
        },
        {
            id: "scale_tower",
            name: "Calibrated Vertical Height Tower",
            nameUrdu: "کیلیبریٹڈ عمودی بلندی ٹاور",
            desc: "Precision metric height rail providing instantaneous displacement measurement from ground level to 35 meters.",
            descUrdu: "زمین سے پینتیس میٹر تک عمودی فاصلے کی پیمائش کرنے والی کیلیبریٹڈ ریل۔"
        },
        {
            id: "apex_sensor",
            name: "Optical Apex Height Detector",
            nameUrdu: "آپٹیکل اپیکس ڈیٹیکٹر",
            desc: "Infrared sensor tracking the maximum crest altitude where instantaneous vertical velocity momentarily drops to zero.",
            descUrdu: "وہ حساس سینسر جو بلند ترین نقطے پر گولے کے رکنے اور رفتار کے صفر ہونے کو ریکارڈ کرتا ہے۔"
        },
        {
            id: "landing_pad",
            name: "Piezoelectric Return Landing Pad",
            nameUrdu: "ریسیپٹر بیس پیڈ",
            desc: "Ground impact plate measuring final arrival timestamp to verify flight symmetry (time of ascent equals time of descent).",
            descUrdu: "زمین پر نصب ریسیپٹر پلیٹ جو واپسی کے وقت کا اندراج کر کے پرواز کی ہم آہنگی کی تصدیق کرتی ہے۔"
        },
        {
            id: "projectile",
            name: "Spherical Kinematic Projectile",
            nameUrdu: "پروجیکٹائل گولا",
            desc: "Precision balanced metallic sphere designed for vertical aerodynamic kinematics experimentation.",
            descUrdu: "ایک متوازن دھاتی گولا جو عمودی حرکیات کے مشاہدے کے لیے استعمال ہوتا ہے۔"
        }
    ]
};

export class Experiment {
    constructor(canvas, lang = 'en') {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.lang = lang;
        this.metadata = metadata;

        // Kinematic Initial Parameters
        this.initialVelocityU = 16.0;      // u in m/s (5 to 25 m/s)
        this.gravity = 9.80;              // g in m/s^2 (1.6 to 25.0 m/s^2)

        // Dynamic State Variables
        this.isLaunched = false;
        this.hasLanded = false;
        this.elapsedTime = 0.0;           // t in seconds
        this.currentHeight = 0.0;         // s in meters
        this.currentVelocity = 0.0;       // v in m/s

        // Apex Tracking
        this.apexReached = false;
        this.apexHeight = 0.0;
        this.apexTime = 0.0;

        // Final Return Metrics
        this.totalFlightTime = 0.0;
        this.returnVelocity = 0.0;

        // Visual Effects
        this.impactRippleRadius = 0;
        this.impactRippleAlpha = 0;
        this.trailPoints = [];
        this.maxTrail = 18;

        // Theoretical Limits Storage
        this.theoreticalMaxH = 0.0;
        this.theoreticalApexT = 0.0;
        this.theoreticalTotalT = 0.0;

        // Observation Records Storage
        this.readings = [
            { u: "10.00", g: "9.80", H: "5.10", tApex: "1.02", tTotal: "2.04", vSqMinusUSq: "-100.0", twoGH: "-100.0" },
            { u: "15.00", g: "9.80", H: "11.48", tApex: "1.53", tTotal: "3.06", vSqMinusUSq: "-225.0", twoGH: "-225.0" },
            { u: "20.00", g: "9.80", H: "20.41", tApex: "2.04", tTotal: "4.08", vSqMinusUSq: "-400.0", twoGH: "-400.0" }
        ];

        this.updateTheoreticalCalculations();
    }

    updateTheoreticalCalculations() {
        const u = this.initialVelocityU;
        const g = this.gravity;
        this.theoreticalMaxH = (u * u) / (2 * g);
        this.theoreticalApexT = u / g;
        this.theoreticalTotalT = (2 * u) / g;
    }

    // ========================================================
    // PHYSICS INTEGRATION (Exact Kinematic Equations)
    // ========================================================

    update(delta) {
        if (!this.isLaunched) {
            if (this.impactRippleAlpha > 0) {
                this.impactRippleRadius += 55 * delta;
                this.impactRippleAlpha = Math.max(0, this.impactRippleAlpha - 1.8 * delta);
            }
            return;
        }

        const dt = Math.min(delta, 0.033);
        this.elapsedTime += dt;

        const t = this.elapsedTime;
        const u = this.initialVelocityU;
        const g = this.gravity;

        // Kinematic Equation 1: v = u - gt
        this.currentVelocity = u - (g * t);

        // Kinematic Equation 2: s = ut - 0.5 * g * t^2
        const s = (u * t) - (0.5 * g * t * t);

        // Check Apex Crossing (v changes from positive to negative)
        if (!this.apexReached && this.currentVelocity <= 0) {
            this.apexReached = true;
            this.apexTime = t;
            this.apexHeight = Math.max(s, (u * u) / (2 * g));
        }

        if (s <= 0 && this.apexReached) {
            // Projectile has returned to base landing pad
            this.currentHeight = 0.0;
            this.currentVelocity = -u;
            this.totalFlightTime = t;
            this.returnVelocity = this.currentVelocity;
            this.isLaunched = false;
            this.hasLanded = true;

            // Trigger ground shockwave
            this.impactRippleRadius = 4;
            this.impactRippleAlpha = 1.0;

            this.recordObservation();
        } else {
            this.currentHeight = Math.max(0, s);
        }
    }

    recordObservation() {
        const u = this.initialVelocityU;
        const g = this.gravity;
        const H = this.apexHeight;
        const tApex = this.apexTime;
        const tTotal = this.totalFlightTime;

        // Kinematic Equation 3: v² - u² = -2gs (At apex, v = 0)
        const vSqMinusUSq = -(u * u);
        const twoGH = -(2 * g * H);

        const row = {
            u: u.toFixed(2),
            g: g.toFixed(2),
            H: H.toFixed(2),
            tApex: tApex.toFixed(2),
            tTotal: tTotal.toFixed(2),
            vSqMinusUSq: vSqMinusUSq.toFixed(1),
            twoGH: twoGH.toFixed(1)
        };

        this.readings.unshift(row);
        if (this.readings.length > 5) this.readings.pop();
    }

    // ========================================================
    // CANVAS STAGE RENDERING (Physical Apparatus Only)
    // ========================================================

    draw(ctx, width, height) {
        ctx.save();

        const scale = Math.min(width / 700, height / 520, 1.0);
        const towerX = width * 0.42;
        const cannonBaseY = height - Math.max(70, height * 0.16);
        const topSafetyY = Math.max(50, height * 0.12);
        const availableHeight = cannonBaseY - topSafetyY;

        // Auto-scale vertical meter calibration to comfortably fit max height
        const viewMaxMeters = Math.max(15, Math.ceil(this.theoreticalMaxH * 1.25));
        const pixelsPerMeter = availableHeight / viewMaxMeters;

        const sphereRadius = 13 * scale;
        const restingY = cannonBaseY - sphereRadius;
        const currentY = restingY - (this.currentHeight * pixelsPerMeter);

        // 1. Draw Background Vertical Tower Column with Metric Scale
        this.drawTowerScale(ctx, towerX, topSafetyY, cannonBaseY, viewMaxMeters, pixelsPerMeter, scale);

        // 2. Draw Apex Guideline Marker
        if (this.apexReached || this.hasLanded) {
            const apexPixelY = restingY - (this.apexHeight * pixelsPerMeter);
            this.drawApexMarker(ctx, towerX, apexPixelY, this.apexHeight, scale);
        }

        // 3. Draw Bottom Launch Cannon & Receptor Pad
        this.drawLaunchCannon(ctx, towerX, cannonBaseY, scale);

        // 4. Motion Blur Trail
        if (this.isLaunched) {
            this.trailPoints.push({ x: towerX, y: currentY });
            if (this.trailPoints.length > this.maxTrail) this.trailPoints.shift();

            for (let i = 0; i < this.trailPoints.length; i++) {
                const alpha = (i / this.trailPoints.length) * 0.35;
                ctx.beginPath();
                ctx.arc(this.trailPoints[i].x, this.trailPoints[i].y, sphereRadius * 0.7, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.fill();
            }
        }

        // 5. Ground Impact Shockwave
        if (this.impactRippleAlpha > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(towerX, cannonBaseY, this.impactRippleRadius * 1.6, this.impactRippleRadius * 0.6, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 240, 255, ${this.impactRippleAlpha})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.restore();
        }

        // 6. Draw Projectile Sphere
        this.drawProjectileSphere(ctx, towerX, currentY, sphereRadius);

        // 7. Draw Instantaneous Velocity Vector Arrow
        if (this.isLaunched) {
            this.drawVelocityVector(ctx, towerX + sphereRadius + 10 * scale, currentY, this.currentVelocity, scale);
        }

        ctx.restore();
    }

    drawTowerScale(ctx, tx, topY, botY, maxM, pxPerM, scale) {
        ctx.save();

        const towerW = 28 * scale;
        const towerLeft = tx - 44 * scale - towerW;

        // Tower Column Extrusion
        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(towerLeft, topY - 14 * scale, towerW, (botY - topY) + 24 * scale, 4);
        ctx.fill();
        ctx.stroke();

        // Laser Metric Ticks
        const step = maxM > 20 ? 5 : 2;
        for (let m = 0; m <= maxM; m += step) {
            const y = botY - (m * pxPerM);
            if (y < topY - 6) break;

            ctx.beginPath();
            ctx.moveTo(towerLeft + towerW, y);
            ctx.lineTo(towerLeft + towerW - 10 * scale, y);
            ctx.strokeStyle = "#00f0ff";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            ctx.fillStyle = "#94a3b8";
            ctx.font = `bold ${Math.max(8, Math.round(9 * scale))}px monospace`;
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillText(`${m}m`, towerLeft - 4 * scale, y);
        }

        ctx.restore();
    }

    drawApexMarker(ctx, tx, apexY, apexVal, scale) {
        ctx.save();

        ctx.beginPath();
        ctx.moveTo(tx - 40 * scale, apexY);
        ctx.lineTo(tx + 75 * scale, apexY);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();

        ctx.fillStyle = "#f59e0b";
        ctx.font = `bold ${Math.max(9, Math.round(10 * scale))}px sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "bottom";
        ctx.fillText(`Apex: ${apexVal.toFixed(2)} m (v = 0)`, tx + 14 * scale, apexY - 3);

        ctx.restore();
    }

    drawLaunchCannon(ctx, tx, cy, scale) {
        ctx.save();

        const cannonW = 50 * scale;
        const cannonH = 24 * scale;

        // Heavy Base Platform
        ctx.fillStyle = "#0f172a";
        ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(tx - 65 * scale, cy, 130 * scale, 16 * scale, 4);
        ctx.fill();
        ctx.stroke();

        // Pneumatic Cannon Barrel
        ctx.fillStyle = "#334155";
        ctx.strokeStyle = this.isLaunched ? "#10b981" : "#00f0ff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(tx - cannonW / 2, cy - cannonH + 4 * scale, cannonW, cannonH, 3);
        ctx.fill();
        ctx.stroke();

        // Launch Nozzle Rim
        ctx.fillStyle = this.isLaunched ? "#10b981" : "#0284c7";
        ctx.fillRect(tx - cannonW / 2 + 4 * scale, cy - cannonH + 1 * scale, cannonW - 8 * scale, 3 * scale);

        ctx.restore();
    }

    drawProjectileSphere(ctx, sx, sy, radius) {
        ctx.save();

        const grad = ctx.createRadialGradient(
            sx - radius * 0.35,
            sy - radius * 0.35,
            radius * 0.1,
            sx,
            sy,
            radius
        );
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.3, "#38bdf8");
        grad.addColorStop(0.7, "#0284c7");
        grad.addColorStop(1, "#0f172a");

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(0, 240, 255, 0.4)";
        ctx.shadowBlur = 6;
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.stroke();

        ctx.restore();
    }

    drawVelocityVector(ctx, vx, vy, velocity, scale) {
        ctx.save();

        const isUpward = velocity >= 0;
        const arrowLength = Math.min(45 * scale, Math.abs(velocity) * 2.2 * scale);

        if (arrowLength > 3) {
            const targetY = isUpward ? vy - arrowLength : vy + arrowLength;
            const color = isUpward ? "#10b981" : "#f59e0b";

            // Vector Stem Line
            ctx.beginPath();
            ctx.moveTo(vx, vy);
            ctx.lineTo(vx, targetY);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Vector Arrow Head
            ctx.beginPath();
            if (isUpward) {
                ctx.moveTo(vx, targetY);
                ctx.lineTo(vx - 4 * scale, targetY + 6 * scale);
                ctx.lineTo(vx + 4 * scale, targetY + 6 * scale);
            } else {
                ctx.moveTo(vx, targetY);
                ctx.lineTo(vx - 4 * scale, targetY - 6 * scale);
                ctx.lineTo(vx + 4 * scale, targetY - 6 * scale);
            }
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();

            // Instantaneous velocity readout
            ctx.fillStyle = color;
            ctx.font = `bold ${Math.max(8, Math.round(9 * scale))}px monospace`;
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(`${Math.abs(velocity).toFixed(1)} m/s`, vx + 8 * scale, (vy + targetY) / 2);
        }

        ctx.restore();
    }

    // ========================================================
    // SCREEN-SPACE FIXED HUD (Kinematic Equations Live Telemetry)
    // ========================================================

    drawHUD(ctx, w, h) {
        const scale = Math.min(w / 700, h / 520, 1.0);
        const isUr = this.lang === 'ur';
        ctx.save();

        // 1. Digital Precision Stopwatch Box (Fixed Top-Right)
        const boxW = 150 * scale;
        const boxH = 54 * scale;
        const boxX = w - boxW - 14;
        const boxY = 14;

        ctx.fillStyle = "rgba(13, 19, 34, 0.85)";
        ctx.strokeStyle = this.hasLanded ? "#10b981" : (this.isLaunched ? "#00f0ff" : "rgba(0, 240, 255, 0.35)");
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = this.hasLanded ? "#10b981" : "#00f0ff";
        ctx.font = `bold ${14 * scale}px monospace`;
        ctx.textAlign = "center";
        const displayTime = this.hasLanded ? this.totalFlightTime : this.elapsedTime;
        ctx.fillText(`${displayTime.toFixed(3)} s`, boxX + boxW / 2, boxY + 23 * scale);

        ctx.fillStyle = "#94a3b8";
        ctx.font = `600 ${9 * scale}px sans-serif`;
        const flightStatus = this.isLaunched 
            ? (this.currentVelocity >= 0 ? (isUr ? "اوپر چڑھ رہا ہے..." : "Ascending...") : (isUr ? "نیچے گر رہا ہے..." : "Descending..."))
            : (this.hasLanded ? (isUr ? "پرواز مکمل!" : "Flight Completed!") : (isUr ? "تیار (کینن)" : "Armed at Base"));
        ctx.fillText(flightStatus, boxX + boxW / 2, boxY + 41 * scale);

        // 2. Kinematic Equations Telemetry Overlay (Fixed Top-Left)
        ctx.textAlign = "left";
        ctx.fillStyle = "#94a3b8";
        ctx.font = `700 ${10 * scale}px sans-serif`;
        ctx.fillText(`u = ${this.initialVelocityU.toFixed(1)} m/s | g = ${this.gravity.toFixed(2)} m/s² | H(max) = ${this.theoreticalMaxH.toFixed(2)} m`, 14, 24);

        ctx.fillStyle = "#00f0ff";
        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillText(`v = u - gt: ${this.currentVelocity.toFixed(2)} m/s | s = ut - ½gt²: ${this.currentHeight.toFixed(2)} m`, 14, 40);

        ctx.restore();
    }

    // ========================================================
    // HIT-TESTING FOR TOOLTIP POPOVER
    // ========================================================

    getInstrumentAtPoint(stageX, stageY, canvasW, canvasH) {
        const scale = Math.min(canvasW / 700, canvasH / 520, 1.0);
        const towerX = canvasW * 0.42;
        const cannonBaseY = canvasH - Math.max(70, canvasH * 0.16);
        const topSafetyY = Math.max(50, canvasH * 0.12);
        const availableHeight = cannonBaseY - topSafetyY;
        const viewMaxMeters = Math.max(15, Math.ceil(this.theoreticalMaxH * 1.25));
        const pixelsPerMeter = availableHeight / viewMaxMeters;
        const sphereRadius = 13 * scale;
        const restingY = cannonBaseY - sphereRadius;
        const currentY = restingY - (this.currentHeight * pixelsPerMeter);

        // 1. Launch Cannon
        if (Math.abs(stageX - towerX) < 35 * scale && Math.abs(stageY - cannonBaseY) < 22 * scale) {
            return {
                id: "launcher",
                name: this.lang === 'ur' ? "ورٹیکل پروجیکشن کینن" : "Pneumatic Launch Cannon",
                x: stageX,
                y: stageY - 20
            };
        }

        // 2. Projectile Sphere
        if (Math.hypot(stageX - towerX, stageY - currentY) < sphereRadius + 10) {
            return {
                id: "projectile",
                name: this.lang === 'ur' 
                    ? `پروجیکٹائل گولا (v = ${this.currentVelocity.toFixed(1)} m/s)` 
                    : `Projectile Sphere (v = ${this.currentVelocity.toFixed(1)} m/s, s = ${this.currentHeight.toFixed(1)} m)`,
                x: towerX,
                y: currentY - sphereRadius - 15
            };
        }

        // 3. Apex Marker
        if (this.apexReached || this.hasLanded) {
            const apexPixelY = restingY - (this.apexHeight * pixelsPerMeter);
            if (Math.abs(stageX - towerX) < 65 * scale && Math.abs(stageY - apexPixelY) < 14 * scale) {
                return {
                    id: "apex_sensor",
                    name: this.lang === 'ur' ? `اپیکس بلندی: ${this.apexHeight.toFixed(2)}m (v = 0)` : `Apex Peak: ${this.apexHeight.toFixed(2)} m (v = 0 m/s)`,
                    x: stageX,
                    y: apexPixelY - 20
                };
            }
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
                id: "launch_btn",
                type: "button",
                label: isUr ? "پروجیکٹائل لانچر ایکشن" : "Vertical Projection Actuator",
                text: this.isLaunched 
                    ? (isUr ? "پرواز جاری ہے..." : "In Flight...") 
                    : (this.hasLanded 
                        ? (isUr ? "دوبارہ لانچ کے لیے ری سیٹ کریں" : "Reset to Launch Pad") 
                        : (isUr ? "اوپر داغیں (لانچ)" : "Launch Projectile")),
                className: this.isLaunched ? "state-on" : (this.hasLanded ? "state-off" : "state-on"),
                onClick: () => {
                    if (this.hasLanded) {
                        this.resetLaunch();
                    } else if (!this.isLaunched) {
                        this.isLaunched = true;
                        this.elapsedTime = 0.0;
                        this.currentHeight = 0.0;
                        this.currentVelocity = this.initialVelocityU;
                        this.apexReached = false;
                        this.apexHeight = 0.0;
                        this.apexTime = 0.0;
                        this.hasLanded = false;
                        this.trailPoints = [];
                    }
                }
            },
            {
                id: "velocity_slider",
                type: "slider",
                label: isUr ? "شروعاتی رفتار (u)" : "Initial Launch Velocity (u)",
                min: 5,
                max: 25,
                step: 1,
                defaultValue: this.initialVelocityU,
                value: this.initialVelocityU,
                unit: " m/s",
                onChange: (val) => {
                    this.initialVelocityU = parseFloat(val);
                    this.updateTheoreticalCalculations();
                    this.resetLaunch();
                }
            },
            {
                id: "gravity_slider",
                type: "slider",
                label: isUr ? "ثقلی اسراع (g)" : "Gravitational Acceleration (g)",
                min: 1.6,
                max: 25.0,
                step: 0.1,
                defaultValue: this.gravity,
                value: this.gravity,
                unit: " m/s²",
                onChange: (val) => {
                    this.gravity = parseFloat(val);
                    this.updateTheoreticalCalculations();
                    this.resetLaunch();
                }
            },
            {
                id: "observation_table",
                type: "table",
                label: isUr ? "حرکت کی مساواتوں کا مشاہداتی جدول" : "Kinematic Equations Verification (v² - u² = -2gH)",
                headers: isUr 
                    ? ["u (m/s)", "g (m/s²)", "بلندی H (m)", "اپیکس وقت (s)", "کل وقت (s)", "v² - u²", "-2gH"]
                    : ["u (m/s)", "g (m/s²)", "Apex H (m)", "t (apex)", "T (total)", "v² - u²", "-2gH"],
                rows: this.readings.map(r => [r.u, r.g, r.H, r.tApex, r.tTotal, r.vSqMinusUSq, r.twoGH])
            }
        ];
    }

    resetLaunch() {
        this.isLaunched = false;
        this.hasLanded = false;
        this.elapsedTime = 0.0;
        this.currentHeight = 0.0;
        this.currentVelocity = this.initialVelocityU;
        this.apexReached = false;
        this.apexHeight = 0.0;
        this.apexTime = 0.0;
        this.totalFlightTime = 0.0;
        this.returnVelocity = 0.0;
        this.impactRippleRadius = 0;
        this.impactRippleAlpha = 0;
        this.trailPoints = [];
    }

    reset() {
        this.initialVelocityU = 16.0;
        this.gravity = 9.80;
        this.updateTheoreticalCalculations();
        this.resetLaunch();
    }

    setLanguage(lang) {
        this.lang = lang;
    }
}
