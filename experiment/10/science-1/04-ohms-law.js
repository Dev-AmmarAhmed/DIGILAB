/**
 * DIGILAB Module: Class 10 Science Part 1 - Chapter 4
 * Experiment: Verification of Ohm's Law (V = IR)
 * 
 * Supports dynamic 2D apparatus drawing (Battery, Resistor, Switch, Voltmeter, Ammeter),
 * live electron flow animation on wires, and bilingual controls.
 */

export const metadata = {
    id: "exp_10_04",
    standard: 10,
    subject: "Science 1",
    chapter: 4,
    title: "Verification of Ohm's Law (V = IR)",
    titleUrdu: "اوہم کے قانون کی تصدیق (V = IR)",
    description: "Study the dependence of potential difference (V) across a resistor on the current (I) passing through it and determine its resistance by plotting V vs I.",
    apparatusList: [
        {
            id: "dc_source",
            name: "Regulated DC Power Supply",
            nameUrdu: "ڈی سی پاور سپلائی",
            desc: "Provides variable direct current potential difference (0 - 10V) across the circuit terminals.",
            descUrdu: "سرکٹ کو صفر تا دس وولٹ تک متغیر برقی دباؤ فراہم کرتا ہے۔"
        },
        {
            id: "plug_key",
            name: "Plug Key Switch",
            nameUrdu: "پلگ کی سوئچ",
            desc: "Controls electrical continuity; insert plug to close circuit, remove plug to cut current flow.",
            descUrdu: "سرکٹ کو مکمل یا منقطع کرنے کے لیے استعمال کی جانے والی کلیدی سوئچ۔"
        },
        {
            id: "resistor",
            name: "Standard Resistance Wire (Nichrome)",
            nameUrdu: "مزاحمتی تار (نائیکروم)",
            desc: "High resistivity conductor wire providing fixed or variable resistance load to verify Ohm's linear relationship.",
            descUrdu: "مخصوص مزاحمت فراہم کرنے والی نائیکروم تار جو کرنٹ کے بہاؤ میں رکاوٹ ڈالتی ہے۔"
        },
        {
            id: "voltmeter",
            name: "DC Analog Voltmeter",
            nameUrdu: "اینالاگ وولٹ میٹر",
            desc: "Connected in parallel across the resistor to measure the potential difference in Volts (V).",
            descUrdu: "مزاحمت کے متوازی جوڑا جانے والا آلہ جو وولٹیج کی پیمائش کرتا ہے۔"
        },
        {
            id: "ammeter",
            name: "DC Analog Ammeter",
            nameUrdu: "اینالاگ ایم میٹر",
            desc: "Connected in series with the resistor to measure electric current intensity in Amperes (A).",
            descUrdu: "سرکٹ کے سلسلہ وار جوڑا جانے والا آلہ جو برقی رو کی پیمائش کرتا ہے۔"
        }
    ]
};


export class Experiment {
    constructor(canvas, lang = 'en') {
        this.canvas = canvas;
        this.lang = lang;

        // Scientific Circuit State
        this.voltage = 0.0;       // Volts (0 to 10V)
        this.resistance = 5.0;    // Ohms (1 to 20 Ohm)
        this.current = 0.0;       // Amperes (I = V / R)
        this.isSwitchClosed = true;

        // Needle Smoothing (Inertia physics)
        this.voltmeterAngle = 0;
        this.ammeterAngle = 0;

        // Observation Logs
        this.recordedReadings = [];

        // Electron Animation Tracker
        this.electronOffset = 0;
    }

        getControls(lang = 'en') {
        this.lang = lang;
        return [
            {
                type: 'toggle',
                id: 'key_switch',
                label: lang === 'ur' ? 'پلگ کی سوئچ' : 'Circuit Key Switch',
                defaultValue: this.isSwitchClosed,
                onChange: (isOpen) => {
                    this.isSwitchClosed = isOpen;
                    this.computeCircuit();
                }
            },
            {
                type: 'slider',
                id: 'circuit_voltage',
            label: lang === 'ur' ? 'وولٹیج کنٹرول (V)' : 'Potential Difference (V)',
                unit: 'V',
                min: 0,
                max: 10,
                step: 0.5,
                defaultValue: this.voltage,
                onChange: (val) => {
                    this.voltage = val;
                    this.computeCircuit();
                }
            },
            {
                type: 'slider',
                id: 'circuit_resistance',
                label: lang === 'ur' ? 'مزاحمتی تار (R)' : 'Resistor Value (Ω)',
                unit: 'Ω',
                min: 2,
                max: 20,
                step: 1,
                defaultValue: this.resistance,
                onChange: (val) => {
                    this.resistance = val;
                    this.computeCircuit();
                }
            },
            {
                type: 'table',
                id: 'ohms_readings_table',
                label: lang === 'ur' ? 'مشاہداتی جدول (V vs I)' : 'Observations & Ratio (V/I)',
                headers: lang === 'ur' 
                    ? ['نمبر', 'وولٹیج (V)', 'برقی رو (A)', 'R = V/I (Ω)'] 
                    : ['Sr', 'Voltage (V)', 'Current (I)', 'Ratio V/I (Ω)'],
                getData: () => {
                    if (this.recordedReadings.length === 0) {
                        const ratio = this.current > 0 ? (this.voltage / this.current).toFixed(2) : '-';
                        return [[
                            'Live',
                            this.voltage.toFixed(1) + ' V',
                            this.current.toFixed(2) + ' A',
                            ratio + (this.current > 0 ? ' Ω' : '')
                        ]];
                    }
                    return this.recordedReadings.map((r, idx) => [
                        idx + 1,
                        r.v.toFixed(1) + ' V',
                        r.i.toFixed(2) + ' A',
                        (r.v / r.i).toFixed(2) + ' Ω'
                    ]);
                }
            }
        ];
    }

        computeCircuit() {
        if (!this.isSwitchClosed) {
            this.current = 0.0;
        } else {
            this.current = this.voltage / this.resistance;
        }
    }

    // Hit Testing for Instrument Touch Selection
    getInstrumentAtPoint(stageX, stageY, canvasW, canvasH) {
        const cx = canvasW / 2;
        const cy = canvasH / 2;
        const scale = Math.min(canvasW / 720, canvasH / 480, 1.0);

        // Convert touch coordinate to normalized apparatus space
        const lx = (stageX - cx) / scale;
        const ly = (stageY - cy) / scale;

        // Check Instruments Bounding Boxes
        if (Math.hypot(lx - (-180), ly - (-110)) < 36) {
            return { id: "dc_source", name: this.lang === 'ur' ? "ڈی سی پاور سپلائی" : "DC Power Supply", x: stageX, y: stageY - 24 };
        }
        if (Math.hypot(lx - 0, ly - (-110)) < 30) {
            return { id: "plug_key", name: this.lang === 'ur' ? "پلگ کی سوئچ" : "Plug Key Switch", x: stageX, y: stageY - 24 };
        }
        if (Math.hypot(lx - 180, ly - (-110)) < 36) {
            return { id: "resistor", name: this.lang === 'ur' ? "مزاحمتی تار" : "Resistance Wire", x: stageX, y: stageY - 24 };
        }
        if (Math.hypot(lx - (-90), ly - 70) < 48) {
            return { id: "voltmeter", name: this.lang === 'ur' ? "وولٹ میٹر" : "Voltmeter (0-10V)", x: stageX, y: stageY - 24 };
        }
        if (Math.hypot(lx - 90, ly - 70) < 48) {
            return { id: "ammeter", name: this.lang === 'ur' ? "ایم میٹر" : "Ammeter (0-5A)", x: stageX, y: stageY - 24 };
        }

        return null;
    }


    recordCurrentReading() {
        if (this.current > 0) {
            this.recordedReadings.push({
                v: this.voltage,
                i: this.current,
                timestamp: Date.now()
            });
        }
    }

    update(delta) {
        // Needle dynamic interpolation (Lerp for smooth physical spring damping)
        const targetVolts = this.isSwitchClosed ? this.voltage : 0.0;
        const targetAmps = this.isSwitchClosed ? this.current : 0.0;

        // Angle mapping: -135 deg to +135 deg (-2.35 rad to +2.35 rad)
        const targetVAngle = -2.356 + (targetVolts / 10.0) * 4.712;
        const targetAAngle = -2.356 + (Math.min(targetAmps, 5.0) / 5.0) * 4.712;

        this.voltmeterAngle += (targetVAngle - this.voltmeterAngle) * (delta * 10);
        this.ammeterAngle += (targetAAngle - this.ammeterAngle) * (delta * 10);

        // Advance electron drift particles along wires
        if (this.isSwitchClosed && this.current > 0) {
            this.electronOffset = (this.electronOffset + delta * 80 * (this.current + 0.2)) % 40;
        }
    }

        draw(ctx, w, h) {
        ctx.save();

        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

        const cx = w / 2;
        const cy = h / 2;
        const scale = Math.min(w / 720, h / 480, 1.0);

        ctx.translate(cx, cy);
        ctx.scale(scale, scale);

        // 1. Draw Circuit Wiring Layout with theme awareness
        this.drawWires(ctx, isDark);

        // 2. Draw Battery Source (-180, -110)
        this.drawBattery(ctx, -180, -110, this.voltage, isDark);

        // 3. Draw Resistor Load (180, -110)
        this.drawResistor(ctx, 180, -110, this.resistance, isDark);

        // 4. Draw Voltmeter (-90, 70)
        this.drawAnalogMeter(ctx, -90, 70, 'V', '0-10V', this.voltmeterAngle, isDark ? '#00f0ff' : '#0284c7', isDark);

        // 5. Draw Ammeter (90, 70)
        this.drawAnalogMeter(ctx, 90, 70, 'A', '0-5A', this.ammeterAngle, isDark ? '#10b981' : '#059669', isDark);

        // 6. Draw Switch / Plug Key (0, -110)
        this.drawPlugKey(ctx, 0, -110, this.isSwitchClosed, isDark);

        ctx.restore();
    }

    drawWires(ctx, isDark) {
        ctx.save();
        ctx.strokeStyle = isDark ? 'rgba(0, 240, 255, 0.5)' : '#475569';
        ctx.lineWidth = isDark ? 3 : 4;
        ctx.lineJoin = 'round';


        // Outer Circuit Loop Box
        ctx.beginPath();
        // Top branch
        ctx.moveTo(-240, -110);
        ctx.lineTo(-210, -110);
        ctx.moveTo(-150, -110);
        ctx.lineTo(-30, -110);
        ctx.moveTo(30, -110);
        ctx.lineTo(150, -110);
        ctx.moveTo(210, -110);
        ctx.lineTo(240, -110);

        // Right branch down to meters
        ctx.lineTo(240, 70);
        ctx.lineTo(140, 70);
        ctx.moveTo(40, 70);
        ctx.lineTo(-40, 70);
        ctx.moveTo(-140, 70);
        ctx.lineTo(-240, 70);

        // Left branch closing loop
        ctx.lineTo(-240, -110);
        ctx.stroke();

        // Animated electron flow dots on wires
        if (this.isSwitchClosed && this.current > 0) {
            ctx.strokeStyle = '#00f0ff';
            ctx.setLineDash([4, 36]);
            ctx.lineDashOffset = -this.electronOffset;
            ctx.lineWidth = 4;
            ctx.stroke();
        }

        ctx.restore();
    }

        drawBattery(ctx, x, y, volts, isDark) {
        ctx.save();
        ctx.translate(x, y);

        ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
        ctx.strokeStyle = isDark ? '#00f0ff' : '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-30, -22, 60, 44, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.fillRect(-22, -28, 12, 6);
        ctx.fillStyle = isDark ? '#64748b' : '#334155';
        ctx.fillRect(10, -28, 12, 6);

        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`DC SOURCE`, 0, -2);
        ctx.fillStyle = isDark ? '#00f0ff' : '#0284c7';
        ctx.fillText(`${volts.toFixed(1)}V`, 0, 14);

        ctx.restore();
    }

    drawResistor(ctx, x, y, ohms, isDark) {
        ctx.save();
        ctx.translate(x, y);

        ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
        ctx.strokeStyle = isDark ? '#7928ca' : '#7c3aed';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-30, -22, 60, 44, 6);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = isDark ? '#f59e0b' : '#d97706';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-18, 0);
        ctx.lineTo(-12, -8);
        ctx.lineTo(-4, 8);
        ctx.lineTo(4, -8);
        ctx.lineTo(12, 8);
        ctx.lineTo(18, 0);
        ctx.stroke();

        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${ohms} Ω`, 0, 16);

        ctx.restore();
    }

    drawPlugKey(ctx, x, y, isClosed, isDark) {
        ctx.save();
        ctx.translate(x, y);

        ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
        ctx.strokeStyle = isDark ? '#64748b' : '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-24, -18, 48, 36, 6);
        ctx.fill();
        ctx.stroke();

        // Contacts
        ctx.fillStyle = isDark ? '#e2e8f0' : '#64748b';
        ctx.beginPath();
        ctx.arc(-10, 0, 4, 0, Math.PI * 2);
        ctx.arc(10, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        if (isClosed) {
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 8px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('ON', 0, 3);
        } else {
            // Visible disconnected open gap + red cut indicator
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-6, -6);
            ctx.lineTo(6, 6);
            ctx.moveTo(6, -6);
            ctx.lineTo(-6, 6);
            ctx.stroke();

            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 8px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('CUT', 0, 14);
        }

        ctx.restore();
    }

    drawAnalogMeter(ctx, x, y, symbol, rangeText, needleAngle, glowColor, isDark) {
        ctx.save();
        ctx.translate(x, y);

        const radius = 48;

        ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius - 10, -2.356, 0.785);
        ctx.stroke();

        ctx.fillStyle = glowColor;
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(symbol, 0, -4);

        ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
        ctx.font = '9px monospace';
        ctx.fillText(rangeText, 0, 14);

        ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.rotate(needleAngle);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.lineTo(0, -(radius - 12));
        ctx.stroke();
        ctx.restore();

        ctx.restore();
    }

    drawPlugKey(ctx, x, y, isClosed) {
        ctx.save();
        ctx.translate(x, y);

        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-24, -18, 48, 36, 6);
        ctx.fill();
        ctx.stroke();

        // Plug Key Contacts
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(-10, 0, 4, 0, Math.PI * 2);
        ctx.arc(10, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        // Plug Insert Status
        if (isClosed) {
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(0, 0, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.font = 'bold 8px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('ON', 0, 3);
        } else {
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-6, -6);
            ctx.lineTo(6, 6);
            ctx.moveTo(6, -6);
            ctx.lineTo(-6, 6);
            ctx.stroke();
        }

        ctx.restore();
    }

    drawAnalogMeter(ctx, x, y, symbol, rangeText, needleAngle, glowColor) {
        ctx.save();
        ctx.translate(x, y);

        const radius = 48;

        // Outer Bezel
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Dial Arch Scale
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, radius - 10, -2.356, 0.785);
        ctx.stroke();

        // Meter Symbol & Range Text
        ctx.fillStyle = glowColor;
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(symbol, 0, -4);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px monospace';
        ctx.fillText(rangeText, 0, 14);

        // Needle Pivot
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();

        // Rotating Pointer Needle
        ctx.save();
        ctx.rotate(needleAngle);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.lineTo(0, -(radius - 12));
        ctx.stroke();
        ctx.restore();

        ctx.restore();
    }

    destroy() {
        this.recordedReadings = [];
    }
}
