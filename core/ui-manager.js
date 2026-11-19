/**
 * DIGILAB Universal Hardware Controls & Interactive Drag-Sheet Manager
 * Supports 3-snap portrait drag resizing (Expanded / Split / Minimized),
 * landscape drawer collapsing, tactile 3D push-pull buttons, fine-step sliders,
 * segmented mode selectors, live telemetry readouts, and responsive tables.
 */

export class DigiLabUIManager {
    constructor(dockContainer, language = 'en') {
        this.container = dockContainer;
        this.lang = language;
        this.currentExperiment = null;
        this.controlElements = new Map();
        this.onDockResize = null;

        this.dockElement = document.getElementById('simControlsDock');
        this.dragZone = document.getElementById('dockDragZone');
        this.toggleBtn = document.getElementById('btnToggleDockSize');
        this.sheetState = 'split'; // 'minimized' | 'split' | 'expanded'

        this.initDragSheetController();
    }

    // ========================================================
    // INTERACTIVE 3-SNAP DRAG-SHEET & PANEL COLLAPSE CONTROLLER
    // ========================================================

    initDragSheetController() {
        if (!this.dockElement) return;

        let isDragging = false;
        let startY = 0;
        let startHeight = 0;

        const onDragStart = (clientY) => {
            if (window.innerWidth > window.innerHeight) return; // Portrait drag-sheet only
            isDragging = true;
            startY = clientY;
            startHeight = this.dockElement.getBoundingClientRect().height;
            this.dockElement.classList.add('is-dragging');
        };

        const onDragMove = (clientY) => {
            if (!isDragging) return;
            const stageContainer = document.getElementById('simStageContainer');
            const totalH = stageContainer ? stageContainer.clientHeight : (window.innerHeight - 52);
            const deltaY = startY - clientY;
            const nextHeight = Math.max(48, Math.min(totalH * 0.84, startHeight + deltaY));

            this.dockElement.style.setProperty('--dock-height', `${nextHeight}px`);
            if (nextHeight <= 64) {
                this.dockElement.classList.add('sheet-minimized');
            } else {
                this.dockElement.classList.remove('sheet-minimized');
            }

            if (this.onDockResize) this.onDockResize();
        };

        const onDragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            this.dockElement.classList.remove('is-dragging');

            const stageContainer = document.getElementById('simStageContainer');
            const totalH = stageContainer ? stageContainer.clientHeight : (window.innerHeight - 52);
            const currentH = this.dockElement.getBoundingClientRect().height;
            const ratio = currentH / Math.max(1, totalH);

            if (ratio < 0.22) {
                this.setSheetSnap('minimized');
            } else if (ratio > 0.62) {
                this.setSheetSnap('expanded');
            } else {
                this.setSheetSnap('split');
            }
        };

        if (this.dragZone) {
            this.dragZone.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    onDragStart(e.touches[0].clientY);
                }
            }, { passive: true });

            window.addEventListener('touchmove', (e) => {
                if (isDragging && e.touches.length === 1) {
                    onDragMove(e.touches[0].clientY);
                }
            }, { passive: true });

            window.addEventListener('touchend', onDragEnd);

            this.dragZone.addEventListener('mousedown', (e) => {
                onDragStart(e.clientY);
            });

            window.addEventListener('mousemove', (e) => {
                if (isDragging) onDragMove(e.clientY);
            });

            window.addEventListener('mouseup', onDragEnd);
        }

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isLandscape = window.innerWidth > window.innerHeight;
                if (isLandscape) {
                    const isMin = this.dockElement.classList.toggle('sheet-minimized');
                    this.sheetState = isMin ? 'minimized' : 'split';
                    setTimeout(() => {
                        if (this.onDockResize) this.onDockResize();
                    }, 250);
                } else {
                    if (this.sheetState === 'split') {
                        this.setSheetSnap('expanded');
                    } else if (this.sheetState === 'expanded') {
                        this.setSheetSnap('minimized');
                    } else {
                        this.setSheetSnap('split');
                    }
                }
            });
        }
    }

    setSheetSnap(mode) {
        if (!this.dockElement) return;
        this.sheetState = mode;

        if (mode === 'minimized') {
            this.dockElement.classList.add('sheet-minimized');
            this.dockElement.style.setProperty('--dock-height', '48px');
        } else if (mode === 'expanded') {
            this.dockElement.classList.remove('sheet-minimized');
            this.dockElement.style.setProperty('--dock-height', '80vh');
        } else {
            this.dockElement.classList.remove('sheet-minimized');
            this.dockElement.style.setProperty('--dock-height', '48vh');
        }

        // Trigger smooth canvas recalibration during & after CSS transition
        if (this.onDockResize) this.onDockResize();
        setTimeout(() => {
            if (this.onDockResize) this.onDockResize();
        }, 250);
    }

    // ========================================================
    // LANGUAGE & DYNAMIC CONTROLS RENDERER
    // ========================================================

    setLanguage(newLang) {
        this.lang = newLang;
        if (this.currentExperiment) {
            if (this.currentExperiment.setLanguage) {
                this.currentExperiment.setLanguage(newLang);
            }
            this.render(this.currentExperiment);
        }
    }

    render(experimentInstance) {
        this.currentExperiment = experimentInstance;
        this.container.innerHTML = '';
        this.controlElements.clear();

        if (!experimentInstance || !experimentInstance.getControls) {
            this.container.innerHTML = `<p class="ctrl-label" style="text-align:center;">No controls configured for this lab.</p>`;
            return;
        }

        const controls = experimentInstance.getControls(this.lang);

        controls.forEach(ctrl => {
            if (ctrl.type === 'toggle' || ctrl.type === 'switch') {
                this.renderSwitchToggle(ctrl);
            } else if (ctrl.type === 'button' || ctrl.type === 'action') {
                this.renderActionButton(ctrl);
            } else if (ctrl.type === 'slider' || ctrl.type === 'range') {
                this.renderSlider(ctrl);
            } else if (ctrl.type === 'segmented' || ctrl.type === 'select') {
                this.renderSegmentedSelector(ctrl);
            } else if (ctrl.type === 'readout' || ctrl.type === 'telemetry') {
                this.renderLiveReadout(ctrl);
            } else if (ctrl.type === 'table') {
                this.renderObservationTable(ctrl);
            }
        });
    }

    getSwitchText(ctrl, isOn) {
        const isUr = this.lang === 'ur';
        if (isOn) {
            return ctrl.textOn || (isUr ? 'چالو ہے (ON)' : 'Active (ON)');
        }
        return ctrl.textOff || (isUr ? 'بند ہے (OFF)' : 'Inactive (OFF)');
    }

    renderSwitchToggle(ctrl) {
        const group = document.createElement('div');
        group.className = 'ctrl-group';

        const isUr = this.lang === 'ur';
        const initialVal = ctrl.value !== undefined ? Boolean(ctrl.value) : Boolean(ctrl.defaultValue);

        group.innerHTML = `
            <div class="ctrl-header">
                <span class="ctrl-label ${isUr ? 'is-urdu' : ''}">${ctrl.label}</span>
            </div>
            <button type="button" class="ctrl-switch-btn ${initialVal ? 'state-on' : 'state-off'}" id="btn_${ctrl.id}">
                <span class="${isUr ? 'is-urdu' : ''}" id="txt_${ctrl.id}">${this.getSwitchText(ctrl, initialVal)}</span>
            </button>
        `;

        const btn = group.querySelector(`#btn_${ctrl.id}`);
        const txt = group.querySelector(`#txt_${ctrl.id}`);
        let state = initialVal;

        btn.addEventListener('click', () => {
            state = !state;
            btn.className = `ctrl-switch-btn ${state ? 'state-on' : 'state-off'}`;
            txt.textContent = this.getSwitchText(ctrl, state);

            if (ctrl.onChange) ctrl.onChange(state);
            this.syncFromExperiment();
        });

        this.controlElements.set(ctrl.id, {
            type: 'switch',
            btn,
            txt,
            setState: (newVal) => {
                state = Boolean(newVal);
                btn.className = `ctrl-switch-btn ${state ? 'state-on' : 'state-off'}`;
                txt.textContent = this.getSwitchText(ctrl, state);
            },
            ctrl
        });
        this.container.appendChild(group);
    }

    renderActionButton(ctrl) {
        const group = document.createElement('div');
        group.className = 'ctrl-group';

        const isUr = this.lang === 'ur';
        const btnLabel = ctrl.buttonText || ctrl.label;

        group.innerHTML = `
            ${ctrl.buttonText ? `<div class="ctrl-header"><span class="ctrl-label ${isUr ? 'is-urdu' : ''}">${ctrl.label}</span></div>` : ''}
            <button type="button" class="ctrl-action-btn" id="act_${ctrl.id}">
                <span class="${isUr ? 'is-urdu' : ''}">${btnLabel}</span>
            </button>
        `;

        const btn = group.querySelector(`#act_${ctrl.id}`);
        btn.addEventListener('click', () => {
            if (ctrl.onClick) ctrl.onClick();
            if (ctrl.onChange) ctrl.onChange(true);
            this.syncFromExperiment();
        });

        this.controlElements.set(ctrl.id, { type: 'button', btn, ctrl });
        this.container.appendChild(group);
    }

    renderSlider(ctrl) {
        const group = document.createElement('div');
        group.className = 'ctrl-group';

        const isUr = this.lang === 'ur';
        const initVal = ctrl.value !== undefined ? ctrl.value : (ctrl.defaultValue !== undefined ? ctrl.defaultValue : ctrl.min);
        const stepVal = parseFloat(ctrl.step) || 1;
        const decimals = (stepVal.toString().split('.')[1] || '').length;

        const formatVal = (v) => Number(v).toFixed(decimals);

        group.innerHTML = `
            <div class="ctrl-header">
                <span class="ctrl-label ${isUr ? 'is-urdu' : ''}">${ctrl.label}</span>
                <span class="ctrl-value" id="val_${ctrl.id}">${formatVal(initVal)}${ctrl.unit || ''}</span>
            </div>
            <div class="ctrl-slider-row">
                <button type="button" class="btn-ctrl-step" id="dec_${ctrl.id}" aria-label="Decrease">−</button>
                <input type="range" class="ctrl-range" 
                       id="input_${ctrl.id}" 
                       min="${ctrl.min}" 
                       max="${ctrl.max}" 
                       step="${stepVal}" 
                       value="${initVal}">
                <button type="button" class="btn-ctrl-step" id="inc_${ctrl.id}" aria-label="Increase">+</button>
            </div>
        `;

        const input = group.querySelector(`#input_${ctrl.id}`);
        const valDisplay = group.querySelector(`#val_${ctrl.id}`);
        const decBtn = group.querySelector(`#dec_${ctrl.id}`);
        const incBtn = group.querySelector(`#inc_${ctrl.id}`);

        const applyNewValue = (raw) => {
            const clamped = Math.max(parseFloat(ctrl.min), Math.min(parseFloat(ctrl.max), raw));
            const rounded = parseFloat(clamped.toFixed(decimals));
            input.value = rounded;
            valDisplay.textContent = `${formatVal(rounded)}${ctrl.unit || ''}`;
            if (ctrl.onChange) ctrl.onChange(rounded);
            this.syncFromExperiment();
        };

        input.addEventListener('input', (e) => {
            applyNewValue(parseFloat(e.target.value));
        });

        decBtn.addEventListener('click', () => {
            applyNewValue(parseFloat(input.value) - stepVal);
        });

        incBtn.addEventListener('click', () => {
            applyNewValue(parseFloat(input.value) + stepVal);
        });

        this.controlElements.set(ctrl.id, {
            type: 'slider',
            input,
            valDisplay,
            formatVal,
            initialDefault: initVal,
            ctrl
        });
        this.container.appendChild(group);
    }

    renderSegmentedSelector(ctrl) {
        const group = document.createElement('div');
        group.className = 'ctrl-group';

        const isUr = this.lang === 'ur';
        const options = ctrl.options || [];
        const currentVal = ctrl.value !== undefined ? ctrl.value : (options[0]?.value ?? '');

        const buttonsHtml = options.map(opt => {
            const isActive = opt.value === currentVal;
            return `<button type="button" class="ctrl-seg-btn ${isActive ? 'active' : ''} ${isUr ? 'is-urdu' : ''}" data-val="${opt.value}">${opt.label}</button>`;
        }).join('');

        group.innerHTML = `
            <div class="ctrl-header">
                <span class="ctrl-label ${isUr ? 'is-urdu' : ''}">${ctrl.label}</span>
            </div>
            <div class="ctrl-segmented" id="seg_${ctrl.id}">
                ${buttonsHtml}
            </div>
        `;

        const segContainer = group.querySelector(`#seg_${ctrl.id}`);
        segContainer.querySelectorAll('.ctrl-seg-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const chosen = btn.dataset.val;
                segContainer.querySelectorAll('.ctrl-seg-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (ctrl.onChange) ctrl.onChange(chosen);
                this.syncFromExperiment();
            });
        });

        this.controlElements.set(ctrl.id, { type: 'segmented', segContainer, ctrl });
        this.container.appendChild(group);
    }

    renderLiveReadout(ctrl) {
        const group = document.createElement('div');
        group.className = 'ctrl-group';

        const isUr = this.lang === 'ur';
        const items = typeof ctrl.getItems === 'function' ? ctrl.getItems() : (ctrl.items || []);

        const cellsHtml = items.map(it => `
            <div class="ctrl-readout-cell">
                <span class="ctrl-readout-key ${isUr ? 'is-urdu' : ''}">${it.label}</span>
                <span class="ctrl-readout-val">${it.value}</span>
            </div>
        `).join('');

        group.innerHTML = `
            ${ctrl.label ? `<div class="ctrl-header"><span class="ctrl-label ${isUr ? 'is-urdu' : ''}">${ctrl.label}</span></div>` : ''}
            <div class="ctrl-readout-grid" id="readout_${ctrl.id}">
                ${cellsHtml}
            </div>
        `;

        this.controlElements.set(ctrl.id, {
            type: 'readout',
            grid: group.querySelector(`#readout_${ctrl.id}`),
            ctrl
        });
        this.container.appendChild(group);
    }

    updateReadout(readoutId) {
        const item = this.controlElements.get(readoutId);
        if (!item || !item.grid || typeof item.ctrl.getItems !== 'function') return;

        const isUr = this.lang === 'ur';
        const items = item.ctrl.getItems();
        item.grid.innerHTML = items.map(it => `
            <div class="ctrl-readout-cell">
                <span class="ctrl-readout-key ${isUr ? 'is-urdu' : ''}">${it.label}</span>
                <span class="ctrl-readout-val">${it.value}</span>
            </div>
        `).join('');
    }

    renderObservationTable(ctrl) {
        const group = document.createElement('div');
        group.className = 'ctrl-group';

        const isUr = this.lang === 'ur';
        const theadCols = ctrl.headers.map(h => `<th class="${isUr ? 'is-urdu' : ''}">${h}</th>`).join('');

        group.innerHTML = `
            <div class="ctrl-header">
                <span class="ctrl-label ${isUr ? 'is-urdu' : ''}">${ctrl.label || (isUr ? 'مشاہداتی جدول' : 'Live Readings')}</span>
            </div>
            <div class="ctrl-table-box">
                <table class="ctrl-mini-table">
                    <thead>
                        <tr>${theadCols}</tr>
                    </thead>
                    <tbody id="table_body_${ctrl.id}"></tbody>
                </table>
            </div>
        `;

        this.controlElements.set(ctrl.id, {
            type: 'table',
            tbody: group.querySelector(`#table_body_${ctrl.id}`),
            ctrl
        });

        this.container.appendChild(group);
        this.updateTable(ctrl.id);
    }

    updateTable(tableId) {
        const item = this.controlElements.get(tableId);
        if (!item || !item.tbody) return;

        const dataFn = item.ctrl.getData || item.ctrl.rows;
        if (!dataFn) return;

        const dataRows = typeof dataFn === 'function' ? dataFn() : dataFn;
        item.tbody.innerHTML = '';

        if (!Array.isArray(dataRows) || dataRows.length === 0) return;

        if (!Array.isArray(dataRows[0])) {
            const tr = document.createElement('tr');
            tr.innerHTML = dataRows.map(v => `<td>${v}</td>`).join('');
            item.tbody.appendChild(tr);
        } else {
            dataRows.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = row.map(v => `<td>${v}</td>`).join('');
                item.tbody.appendChild(tr);
            });
        }
    }

    refreshTables() {
        this.controlElements.forEach((val, key) => {
            if (val.type === 'table') {
                this.updateTable(key);
            } else if (val.type === 'readout') {
                this.updateReadout(key);
            }
        });
    }

    syncFromExperiment() {
        if (!this.currentExperiment || !this.currentExperiment.getControls) {
            this.refreshTables();
            return;
        }

        const latestControls = this.currentExperiment.getControls(this.lang);
        latestControls.forEach(latest => {
            const bound = this.controlElements.get(latest.id);
            if (!bound) return;

            if (bound.type === 'switch' && bound.setState) {
                const liveVal = latest.value !== undefined ? latest.value : latest.defaultValue;
                if (liveVal !== undefined) {
                    bound.setState(liveVal);
                }
            } else if (bound.type === 'slider' && bound.input) {
                const liveVal = latest.value !== undefined ? latest.value : latest.defaultValue;
                if (liveVal !== undefined && parseFloat(bound.input.value) !== parseFloat(liveVal)) {
                    bound.input.value = liveVal;
                    bound.valDisplay.textContent = `${bound.formatVal(liveVal)}${latest.unit || ''}`;
                }
            } else if (bound.type === 'segmented' && bound.segContainer && latest.value !== undefined) {
                bound.segContainer.querySelectorAll('.ctrl-seg-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.val === String(latest.value));
                });
            }
        });

        this.refreshTables();
    }

    reset() {
        if (this.currentExperiment && this.currentExperiment.reset) {
            this.currentExperiment.reset();
            this.render(this.currentExperiment);
            return;
        }

        this.controlElements.forEach((item) => {
            if (item.type === 'slider' && item.input && item.ctrl) {
                item.input.value = item.initialDefault;
                item.valDisplay.textContent = `${item.formatVal(item.initialDefault)}${item.ctrl.unit || ''}`;
                if (item.ctrl.onChange) item.ctrl.onChange(item.initialDefault);
            }
        });
        this.refreshTables();
    }
}



  