export const metadata = {
    id: "exp_10_01_free_fall",
    standard: 10,
    subject: "Science 1",
    chapter: 1,
    title: "Study of Free Fall & Determination of 'g'",
    titleUrdu: "آزادانہ گرتے ہوئے جسم کی حرکیات اور 'g' کی قیمت",
    description: "Investigate Galileo's free fall principles (h = 1/2 gt²). Compare the fall rates of a heavy steel sphere vs a light feather in atmospheric air (with aerodynamic drag) versus inside a zero-drag vacuum chamber.",
    descriptionUrdu: "گیلیلیو کے آزادانہ گرنے کے اصولوں کی جانچ کریں۔ ہوا کے ماحول (ہوائی رگڑ) اور خلاء چیمبر (صفر رگڑ) میں وزنی گولے اور پر (Feather) کے گرنے کی رفتار کا موازنہ کریں۔",
    apparatusList: [
        {
            id: "electromagnet",
            name: "Electromagnetic Release Clamp",
            nameUrdu: "الیکٹرو میگنیٹک ریلیز کلیمپ",
            desc: "Suspends the test object securely at the calibrated height and de-energizes instantly for zero-velocity release.",
            descUrdu: "تجرباتی جسم کو مطلوبہ بلندی پر سنبھالتا ہے اور بٹن دباتے ہی فوری صفر ولاسٹی پر چھوڑتا ہے۔"
        },
        {
            id: "tower",
            name: "Calibrated Vertical Meter Tower",
            nameUrdu: "کیلیبریٹڈ عمودی میٹر ٹاور",
            desc: "Rigid vertical aluminum rail calibrated with high-contrast metric laser scale from 1 m to 20 m.",
            descUrdu: "ایک پیمائشی ایلومینیم ریل جو ایک میٹر سے بیس میٹر تک درست بلندی ناپنے کے کام آتی ہے۔"
        },
        {
            id: "photogate",
            name: "Infrared Optical Photogates",
            nameUrdu: "آپٹیکل فوٹو گیٹ سینسرز",
            desc: "Precision dual-laser optical gates that trigger and stop the digital millisecond counter upon beam interruption.",
            descUrdu: "لیزر شعاعوں پر مبنی حساس سینسرز جو جسم کے گزرتے ہی ملی سیکنڈ ٹائمر کو خودکار طور پر چلاتے اور روکتے ہیں۔"
        },
        {
            id: "sphere",
            name: "Interchangeable Drop Body (Sphere / Feather)",
            nameUrdu: "تبدیل شدہ گرنے والا جسم (گولا / پر)",
            desc: "Switch between a heavy solid steel sphere (low drag area) and a lightweight aerodynamic feather (high drag area).",
            descUrdu: "ایک وزنی فولادی گولا یا ایک ہلکا پر، جس کے ذریعے ہوا اور خلاء کے اثرات کا فرق دیکھا جا سکتا ہے۔"
        },
        {
            id: "impact_pad",
            name: "Piezoelectric Ground Impact Sensor Pad",
            nameUrdu: "امپیکٹ ڈیٹیکٹر پلیٹ",
            desc: "Cushioned receptor platform with a piezoelectric sensor that locks the final arrival timestamp upon surface contact.",
            descUrdu: "زمین پر نصب حساس پلیٹ جس کی اوپری سطح پر جسم کے چھوتے ہی ٹائمر منجمد ہو جاتا ہے۔"
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
        this.heightMeters = 10.0;          // Drop height in meters (2m to 20m)
        this.gravity = 9.80;              // Acceleration due to gravity (m/s^2)
        this.massKg = 0.50;               // Mass of falling body (kg)
        this.isVacuum = true;             // Vacuum vs Atmospheric Drag
        this.objectType = "feather";      // "sphere" or "feather"

        // Kinematic State Variables
        this.currentDistance = 0.0;       // Distance fallen in meters
        this.currentVelocity = 0.0;       // Current velocity in m/s
        this.elapsedTime = 0.0;           // Timer in seconds
        this.isFalling = false;
        this.hasHitGround = false;
        this.impactVelocity = 0.0;
        this.impactTime = 0.0;

        // Visual Feather Sway / Flutter State
        this.swayAngle = 0.0;
        this.swayOffset = 0.0;

        // Visual Impact Wave Effect
        this.impactRippleRadius = 0;
        this.impactRippleAlpha = 0;

        // Observation Records Storage
        this.readings = [
            { body: "Sphere", env: "Vacuum", height: "10.00", time: "1.43", velocity: "14.00", gCalc: "9.80" },
            { body: "Feather", env: "Vacuum", height: "10.00", time: "1.43", velocity: "14.00", gCalc: "9.80" },
            { body: "Feather", env: "Air", height: "10.00", time: "4.82", velocity: "2.35", gCalc: "0.86" }
        ];

        // Motion Trail Visuals
        this.trailPoints = [];
        this.maxTrail = 16;
    }

    // ========================================================
    // NUMERICAL AERODYNAMIC KINEMATICS SOLVER
    // ========================================================

    update(delta) {
        if (!this.isFalling) {
            if (this.impactRippleAlpha > 0) {
                this.impactRippleRadius += 55 * delta;
                this.impactRippleAlpha = Math.max(0, this.impactRippleAlpha - 1.8 * delta);
            }
            return;
        }

        const dt = Math.min(delta, 0.033);

        // Aerodynamics differentiation based on Object Type & Medium
        let accel = this.gravity;

        if (!this.isVacuum) {
            if (this.objectType === "feather") {
                // Feather reaches low terminal velocity (~2.3 m/s) with strong air resistance
                const terminalV = 2.3;
                const dragFactor = this.gravity / (terminalV * terminalV);
                const dragAccel = dragFactor * (this.currentVelocity * this.currentVelocity);
                accel = Math.max(0.08, this.gravity - dragAccel);

                // Feather aerodynamic swaying oscillation
                this.swayAngle = Math.sin(this.elapsedTime * 6.5) * 0.45;
                this.swayOffset = Math.sin(this.elapsedTime * 5.0) * 18;
            } else {
                // Sphere has subtle aerodynamic air drag
                const terminalV = 32.0;
                const dragFactor = this.gravity / (terminalV * terminalV);
                const dragAccel = dragFactor * (this.currentVelocity * this.currentVelocity);
                accel = Math.max(0.5, this.gravity - dragAccel);
                this.swayAngle = 0;
                this.swayOffset = 0;
            }
        } else {
            // Vacuum chamber: ZERO Drag for all objects (Galileo's Law)
            accel = this.gravity;
            this.swayAngle = 0;
            this.swayOffset = 0;
        }

        this.currentVelocity += accel * dt;
        this.currentDistance += this.currentVelocity * dt;
        this.elapsedTime += dt;

                // Ground Impact Detection with Smooth Positional Continuity
        if (this.currentDistance >= this.heightMeters) {
            this.currentDistance = this.heightMeters;
            this.isFalling = false;
            this.hasHitGround = true;
            this.impactVelocity = this.currentVelocity;
            this.impactTime = this.elapsedTime;

            // Freeze natural resting tilt and landing coordinate without snap teleportation
            if (this.objectType === "feather") {
                this.swayAngle = this.swayAngle * 0.45;
            } else {
                this.swayAngle = 0;
                this.swayOffset = 0;
            }

            // Trigger ground ripple animation centered on actual landing impact point
            this.impactRippleRadius = 4;
            this.impactRippleAlpha = 1.0;

            this.recordObservation();
        }

    }

    recordObservation() {
        const t = this.impactTime;
        const h = this.heightMeters;
        const gComputed = t > 0 ? (2 * h) / (t * t) : 0;

        const row = {
            body: this.objectType === "feather" ? "Feather" : "Sphere",
            env: this.isVacuum ? "Vacuum" : "Air",
            height: h.toFixed(2),
            time: t.toFixed(2),
            velocity: this.impactVelocity.toFixed(2),
            gCalc: gComputed.toFixed(2)
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
        const topClampY = Math.max(50, height * 0.12);
        const groundY = height - Math.max(70, height * 0.16);

        // Object Dimensions
        const sphereRadius = (13 + Math.cbrt(this.massKg) * 7) * scale;
        const objectEffectiveRadius = this.objectType === "feather" ? 14 * scale : sphereRadius;

        // Precise Physical Geometry: Object rests ON TOP of ground pad (Never penetrates into it)
        const startCenterY = topClampY + objectEffectiveRadius + 2 * scale;
        const impactCenterY = groundY - objectEffectiveRadius;
        const totalTravelPixels = impactCenterY - startCenterY;

        // Vertical scaling: pixels per real meter along tower
        const pixelsPerMeter = totalTravelPixels / this.heightMeters;

        // 1. Draw Background Vertical Tower Column with Metric Scale
        this.drawTowerScale(ctx, towerX, startCenterY, impactCenterY, pixelsPerMeter, scale);

        // 2. Draw Top Electromagnetic Clamp
        this.drawTopElectromagnet(ctx, towerX, topClampY, scale);

        // 3. Draw Bottom Impact Cushioned Platform
        this.drawGroundPlatform(ctx, towerX, groundY, scale);

        // 4. Draw Photogate Laser Beams (Top and Bottom resting point)
        this.drawPhotogates(ctx, towerX, startCenterY, impactCenterY, scale);

                // 5. Continuous Object Position (Locks cleanly to landing spot)
        const objectY = startCenterY + (this.currentDistance / this.heightMeters) * totalTravelPixels;
        const objectX = towerX + (this.swayOffset * scale);

        // 6. Motion Blur Trail
        if (this.isFalling) {
            this.trailPoints.push({ x: objectX, y: objectY });
            if (this.trailPoints.length > this.maxTrail) this.trailPoints.shift();

            for (let i = 0; i < this.trailPoints.length; i++) {
                const alpha = (i / this.trailPoints.length) * 0.35;
                ctx.beginPath();
                ctx.arc(this.trailPoints[i].x, this.trailPoints[i].y, objectEffectiveRadius * 0.7, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.fill();
            }
        }

        // 7. Ground Impact Shockwave Ring (Centered on exact landing spot)
        if (this.impactRippleAlpha > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(objectX, groundY, this.impactRippleRadius * 1.6, this.impactRippleRadius * 0.6, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 240, 255, ${this.impactRippleAlpha})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.restore();
        }

        // 8. Draw Dropped Object (Steel Sphere OR Vector Natural Leaf)
        if (this.objectType === "feather") {
            this.drawLeafVector(ctx, objectX, objectY, scale);
        } else {
            this.drawSphere(ctx, objectX, objectY, sphereRadius);
        }


        ctx.restore();
    }

    drawTowerScale(ctx, tx, topY, botY, pxPerMeter, scale) {
        ctx.save();

        const towerW = 28 * scale;
        const towerLeft = tx - 42 * scale - towerW;

        // Tower Metallic Extrusion
        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(towerLeft, topY - 14 * scale, towerW, (botY - topY) + 28 * scale, 4);
        ctx.fill();
        ctx.stroke();

        // Laser Metric Scale Lines
        const totalM = Math.round(this.heightMeters);
        for (let m = 0; m <= totalM; m++) {
            const y = topY + (m * pxPerMeter);
            const isMajor = (m % 2 === 0) || m === totalM;

            ctx.beginPath();
            ctx.moveTo(towerLeft + towerW, y);
            ctx.lineTo(towerLeft + towerW - (isMajor ? 12 * scale : 6 * scale), y);
            ctx.strokeStyle = isMajor ? "#00f0ff" : "rgba(148, 163, 184, 0.4)";
            ctx.lineWidth = isMajor ? 1.5 : 1;
            ctx.stroke();

            if (isMajor) {
                ctx.fillStyle = "#94a3b8";
                ctx.font = `bold ${Math.max(8, Math.round(9 * scale))}px monospace`;
                ctx.textAlign = "right";
                ctx.textBaseline = "middle";
                ctx.fillText(`${m}m`, towerLeft - 4 * scale, y);
            }
        }

        ctx.restore();
    }

    drawTopElectromagnet(ctx, tx, ty, scale) {
        ctx.save();

        const w = 48 * scale;
        const h = 18 * scale;

        // Magnet Body
        ctx.fillStyle = "#334155";
        ctx.strokeStyle = this.isFalling ? "#64748b" : "#00f0ff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(tx - w / 2, ty - h, w, h, 4);
        ctx.fill();
        ctx.stroke();

        // Magnetic Pole Coils
        ctx.fillStyle = this.isFalling ? "#475569" : "#eab308";
        ctx.fillRect(tx - w / 2 + 6 * scale, ty - 5 * scale, 12 * scale, 5 * scale);
        ctx.fillRect(tx + w / 2 - 18 * scale, ty - 5 * scale, 12 * scale, 5 * scale);

        // Status Indicator LED
        ctx.beginPath();
        ctx.arc(tx, ty - h / 2, 3 * scale, 0, Math.PI * 2);
        ctx.fillStyle = this.isFalling ? "#ef4444" : "#10b981";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.fill();

        ctx.restore();
    }

    drawGroundPlatform(ctx, tx, gy, scale) {
        ctx.save();

        const padW = 120 * scale;
        const padH = 16 * scale;

        // Heavy Base Platform
        ctx.fillStyle = "#0f172a";
        ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(tx - padW / 2, gy, padW, padH, 4);
        ctx.fill();
        ctx.stroke();

        // Piezo Sensor Top Receptor Plate (Ball lands exactly on this line)
        ctx.fillStyle = this.hasHitGround ? "#10b981" : "#0284c7";
        ctx.fillRect(tx - padW / 2 + 8 * scale, gy + 1, padW - 16 * scale, 4 * scale);

        ctx.restore();
    }

    drawPhotogates(ctx, tx, startY, impactY, scale) {
        ctx.save();

        // Photogate 1 (Upper Trigger Gate at release line)
        this.renderPhotogateBeam(ctx, tx, startY, scale, this.isFalling);

        // Photogate 2 (Lower Stop Gate at exact ground touch line)
        this.renderPhotogateBeam(ctx, tx, impactY, scale, this.hasHitGround);

        ctx.restore();
    }

    renderPhotogateBeam(ctx, tx, y, scale, isTriggered) {
        const span = 42 * scale;

        // Left & Right Sensor Arms
        ctx.fillStyle = "#334155";
        ctx.fillRect(tx - span - 10 * scale, y - 4 * scale, 10 * scale, 8 * scale);
        ctx.fillRect(tx + span, y - 4 * scale, 10 * scale, 8 * scale);

        // Optical Laser Line
        ctx.beginPath();
        ctx.moveTo(tx - span, y);
        ctx.lineTo(tx + span, y);
        ctx.strokeStyle = isTriggered ? "#10b981" : "rgba(239, 68, 68, 0.75)";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = isTriggered ? 8 : 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    drawSphere(ctx, sx, sy, radius) {
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
        grad.addColorStop(0.3, "#cbd5e1");
        grad.addColorStop(0.7, "#64748b");
        grad.addColorStop(1, "#1e293b");

        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(0, 240, 255, 0.3)";
        ctx.shadowBlur = 6;
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
        ctx.stroke();

        ctx.restore();
    }

    drawLeafVector(ctx, lx, ly, scale) {
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(this.swayAngle);

        const leafLength = 34 * scale;
        const leafWidth = 13 * scale;

        // 1. Blade Outer Contour (Botanical Vector Leaf)
        ctx.beginPath();
        ctx.moveTo(0, -leafLength / 2);
        // Left Blade Curve
        ctx.bezierCurveTo(-leafWidth, -leafLength * 0.15, -leafWidth * 0.9, leafLength * 0.25, 0, leafLength / 2);
        // Right Blade Curve
        ctx.bezierCurveTo(leafWidth * 0.9, leafLength * 0.25, leafWidth, -leafLength * 0.15, 0, -leafLength / 2);
        ctx.closePath();

        // High-tech translucent Emerald-Cyan gradient
        const leafGrad = ctx.createLinearGradient(-leafWidth, 0, leafWidth, 0);
        leafGrad.addColorStop(0, "rgba(16, 185, 129, 0.88)");
        leafGrad.addColorStop(0.5, "rgba(5, 150, 105, 0.95)");
        leafGrad.addColorStop(1, "rgba(4, 120, 87, 0.88)");
        ctx.fillStyle = leafGrad;
        ctx.fill();

        ctx.strokeStyle = "rgba(110, 231, 183, 0.75)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // 2. Central Stem Vein (Midrib)
        ctx.beginPath();
        ctx.moveTo(0, -leafLength / 2);
        ctx.quadraticCurveTo(1.5 * scale, 0, 0, leafLength / 2 + 4 * scale);
        ctx.strokeStyle = "#a7f3d0";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 3. Delicate Vector Lateral Veins
        const veinOffsets = [-leafLength * 0.2, 0, leafLength * 0.2];
        ctx.strokeStyle = "rgba(209, 250, 229, 0.45)";
        ctx.lineWidth = 0.9;
        veinOffsets.forEach(vy => {
            // Left lateral vein
            ctx.beginPath();
            ctx.moveTo(0, vy);
            ctx.lineTo(-leafWidth * 0.65, vy - 4 * scale);
            ctx.stroke();

            // Right lateral vein
            ctx.beginPath();
            ctx.moveTo(0, vy);
            ctx.lineTo(leafWidth * 0.65, vy - 4 * scale);
            ctx.stroke();
        });

        ctx.restore();
    }


    // ========================================================
    // SCREEN-SPACE FIXED HUD (Telemetry & Digital Stop Timer)
    // ========================================================

    drawHUD(ctx, w, h) {
        const scale = Math.min(w / 700, h / 520, 1.0);
        const isUr = this.lang === 'ur';
        ctx.save();

        // 1. Digital Precision Microsecond Box (Fixed Top-Right)
        const boxW = 150 * scale;
        const boxH = 52 * scale;
        const boxX = w - boxW - 14;
        const boxY = 14;

        ctx.fillStyle = "rgba(13, 19, 34, 0.82)";
        ctx.strokeStyle = this.hasHitGround ? "#10b981" : (this.isFalling ? "#00f0ff" : "rgba(0, 240, 255, 0.35)");
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = this.hasHitGround ? "#10b981" : "#00f0ff";
        ctx.font = `bold ${14 * scale}px monospace`;
        ctx.textAlign = "center";
        const displayTime = this.hasHitGround ? this.impactTime : this.elapsedTime;
        ctx.fillText(`${displayTime.toFixed(3)} s`, boxX + boxW / 2, boxY + 24 * scale);

        ctx.fillStyle = "#94a3b8";
        ctx.font = `600 ${9 * scale}px sans-serif`;
        const statusText = this.isFalling ? (isUr ? "گر رہا ہے..." : "Dropping...") : (this.hasHitGround ? (isUr ? "امپیکٹ مکمل!" : "Impact Captured!") : (isUr ? "تیار (کلیمپ)" : "Armed (Held)"));
        ctx.fillText(statusText, boxX + boxW / 2, boxY + 41 * scale);

        // 2. Fixed Telemetry Overlay (Fixed Top-Left)
        ctx.textAlign = "left";
        ctx.fillStyle = "#94a3b8";
        ctx.font = `700 ${10 * scale}px sans-serif`;
        const bodyTag = this.objectType === "feather" ? (isUr ? "ہلکا پتہ (Leaf)" : "Aerodynamic Leaf") : (isUr ? "دھاتی گولا (Sphere)" : "Steel Sphere");
        const envTag = this.isVacuum ? (isUr ? "خلاء چیمبر" : "Vacuum Chamber") : (isUr ? "ہوا کا ماحول" : "Atmospheric Air");
        ctx.fillText(`${bodyTag} | ${envTag}`, 14, 24);

        ctx.fillStyle = "#00f0ff";
        ctx.font = `bold ${11 * scale}px sans-serif`;
        ctx.fillText(`v = ${this.currentVelocity.toFixed(2)} m/s | h = ${this.heightMeters.toFixed(1)} m | g = ${this.gravity.toFixed(2)}`, 14, 40);

        ctx.restore();
    }

    // ========================================================
    // HIT-TESTING FOR TOOLTIP POPOVER
    // ========================================================

    getInstrumentAtPoint(stageX, stageY, canvasW, canvasH) {
        const scale = Math.min(canvasW / 700, canvasH / 520, 1.0);
        const towerX = canvasW * 0.42;
        const topClampY = Math.max(50, canvasH * 0.12);
        const groundY = canvasH - Math.max(70, canvasH * 0.16);
        const sphereRadius = (13 + Math.cbrt(this.massKg) * 7) * scale;
        const objectEffectiveRadius = this.objectType === "feather" ? 14 * scale : sphereRadius;
        const startCenterY = topClampY + objectEffectiveRadius + 2 * scale;
        const impactCenterY = groundY - objectEffectiveRadius;
        const totalTravelPixels = impactCenterY - startCenterY;
        const objectY = startCenterY + (this.currentDistance / this.heightMeters) * totalTravelPixels;

        // 1. Electromagnet Top Clamp
        if (Math.abs(stageX - towerX) < 30 * scale && Math.abs(stageY - (topClampY - 10 * scale)) < 16 * scale) {
            return {
                id: "electromagnet",
                name: this.lang === 'ur' ? "الیکٹرو میگنیٹک کلیمپ" : "Electromagnetic Clamp",
                x: stageX,
                y: stageY - 20
            };
        }

        // 2. Falling Body
        if (Math.hypot(stageX - towerX, stageY - objectY) < objectEffectiveRadius + 12) {
            return {
                id: "sphere",
                name: this.objectType === "feather" 
                    ? (this.lang === 'ur' ? "ہوائی پر (Feather)" : "Light Feather")
                    : (this.lang === 'ur' ? `فولادی گولا (${this.massKg}kg)` : `Steel Sphere (${this.massKg} kg)`),
                x: towerX,
                y: objectY - objectEffectiveRadius - 15
            };
        }

        // 3. Ground Sensor Pad
        if (Math.abs(stageX - towerX) < 60 * scale && Math.abs(stageY - groundY) < 16 * scale) {
            return {
                id: "impact_pad",
                name: this.lang === 'ur' ? "امپیکٹ ڈیٹیکٹر پلیٹ" : "Ground Impact Sensor Pad",
                x: stageX,
                y: stageY - 20
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
                id: "release_btn",
                type: "button",
                label: isUr ? "گرانے کا ایکشن" : "Free Fall Actuator",
                text: this.isFalling 
                    ? (isUr ? "جسم گر رہا ہے..." : "Dropping...") 
                    : (this.hasHitGround 
                        ? (isUr ? "اوپر دوبارہ لوڈ کریں" : "Reset to Top Clamp") 
                        : (isUr ? "جسم چھوڑیں (ریلیز)" : "Release Object")),
                className: this.isFalling ? "state-on" : (this.hasHitGround ? "state-off" : "state-on"),
                onClick: () => {
                    if (this.hasHitGround) {
                        this.resetDrop();
                    } else if (!this.isFalling) {
                        this.isFalling = true;
                        this.elapsedTime = 0.0;
                        this.currentDistance = 0.0;
                        this.currentVelocity = 0.0;
                        this.hasHitGround = false;
                        this.trailPoints = [];
                    }
                }
            },
                      {
                id: "body_selector_btn",
                type: "button",
                label: isUr ? "گرانے کا جسم (گولا / پتہ)" : "Test Body (Galileo Setup)",
                text: this.objectType === "feather" 
                    ? (isUr ? "جسم: نباتاتی پتہ (Light Leaf)" : "Body: Aerodynamic Leaf") 
                    : (isUr ? "جسم: فولادی گولا (Steel Ball)" : "Body: Metallic Sphere"),
                className: this.objectType === "feather" ? "state-on" : "state-off",
                onClick: () => {
                    this.objectType = this.objectType === "feather" ? "sphere" : "feather";
                    this.resetDrop();
                }
            },
            {
                id: "vacuum_btn",
                type: "button",
                label: isUr ? "ماحولیاتی حالت (خلاء / ہوا)" : "Medium Environment",
                text: this.isVacuum 
                    ? (isUr ? "خلاء چیمبر (صفر رگڑ)" : "Vacuum Chamber [Zero Drag]") 
                    : (isUr ? "ہوا کا ماحول (ہوائی رگڑ آن)" : "Atmospheric Air [Drag Active]"),
                className: this.isVacuum ? "state-on" : "state-off",
                onClick: () => {
                    this.isVacuum = !this.isVacuum;
                    this.resetDrop();
                }
            },

            {
                id: "height_slider",
                type: "slider",
                label: isUr ? "گرانے کی بلندی (h)" : "Release Height (h)",
                min: 2,
                max: 20,
                step: 1,
                defaultValue: this.heightMeters,
                value: this.heightMeters,
                unit: " m",
                onChange: (val) => {
                    this.heightMeters = parseFloat(val);
                    this.resetDrop();
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
                    this.resetDrop();
                }
            },
            {
                id: "mass_slider",
                type: "slider",
                label: isUr ? "گولے کی کمیت (m)" : "Sphere Mass (m)",
                min: 0.05,
                max: 5.0,
                step: 0.05,
                defaultValue: this.massKg,
                value: this.massKg,
                unit: " kg",
                onChange: (val) => {
                    this.massKg = parseFloat(val);
                }
            },
            {
                id: "observation_table",
                type: "table",
                label: isUr ? "مشاہداتی جدول (Kinematics Observations)" : "Experimental Observations (g = 2h / t²)",
                headers: isUr 
                    ? ["جسم", "ماحول", "h (m)", "t (s)", "v (m/s)", "Calculated g"]
                    : ["Body", "Medium", "h (m)", "Time t (s)", "Impact v (m/s)", "g (m/s²)"],
                rows: this.readings.map(r => [r.body, r.env, r.height, r.time, r.velocity, r.gCalc])
            }
        ];
    }

    resetDrop() {
        this.isFalling = false;
        this.hasHitGround = false;
        this.currentDistance = 0.0;
        this.currentVelocity = 0.0;
        this.elapsedTime = 0.0;
        this.impactVelocity = 0.0;
        this.impactTime = 0.0;
        this.impactRippleRadius = 0;
        this.impactRippleAlpha = 0;
        this.swayAngle = 0.0;
        this.swayOffset = 0.0;
        this.trailPoints = [];
    }

    reset() {
        this.heightMeters = 10.0;
        this.gravity = 9.80;
        this.massKg = 0.50;
        this.isVacuum = true;
        this.objectType = "feather";
        this.resetDrop();
    }

    setLanguage(lang) {
        this.lang = lang;
    }
}
