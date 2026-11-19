/**
 * DIGILAB Hybrid 3D WebGL (Three.js) + 2D Canvas Simulation Engine
 * Supports hardware-accelerated 3D PBR lab apparatus with studio lighting,
 * crisp 2D vector & HUD overlay, unified single-grid rendering, and multi-touch gestures.
 */

const THREE_CDN_URL = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class DigiLabEngine {
    constructor(canvas, fpsBadgeElement, container3DElement = null) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.fpsBadge = fpsBadgeElement;
        this.container3D = container3DElement || document.getElementById('digiLab3DContainer');

        this.isRunning = false;
        this.animationFrameId = null;
        this.activeExperiment = null;
        this.renderMode = '2d';

        this.lastTime = performance.now();
        this.frameCount = 0;
        this.lastFpsUpdate = performance.now();

        this.width = 0;
        this.height = 0;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        // 2D Camera Matrix State
        this.zoom = 1.0;
        this.panX = 0;
        this.panY = 0;

        // 3D Spherical Orbit Camera State
        this.THREE = null;
        this.scene3D = null;
        this.camera3D = null;
        this.renderer3D = null;
        this.grid3D = null;
        this.raycaster3D = null;
        this.orbitTheta = 0.0;
        this.orbitPhi = 1.18;
        this.orbitRadius = 7.5;
        this.orbitTarget = { x: 0, y: 0.6, z: 0 };

        // Callbacks for external UI synchronization
        this.onZoomChange = null;
        this.onViewTransform = null;
        this.onExperimentSync = null;

        // Pointer & Multi-Touch Gesture State
        this.touches = [];
        this.isTwoFingerGesturing = false;
        this.lastTouchCenter = { x: 0, y: 0 };
        this.lastPinchDistance = 0;
        this.isMouseDragging = false;
        this.lastMousePos = { x: 0, y: 0 };
        this.dragMovedDistance = 0;

        this.initTouchHandlers();

        this.handleResize = this.resize.bind(this);
        window.addEventListener('resize', this.handleResize);
        this.resize();
    }

    // ========================================================
    // COORDINATE PROJECTION & CAMERA TRANSFORMS
    // ========================================================

    screenToWorld(screenX, screenY) {
        return {
            x: (screenX - this.panX - this.width / 2) / this.zoom + this.width / 2,
            y: (screenY - this.panY - this.height / 2) / this.zoom + this.height / 2
        };
    }

    worldToScreen(worldX, worldY) {
        return {
            x: (worldX - this.width / 2) * this.zoom + this.width / 2 + this.panX,
            y: (worldY - this.height / 2) * this.zoom + this.height / 2 + this.panY
        };
    }

    setZoom(scaleFactor, notify = false) {
        this.zoom = Math.max(0.5, Math.min(2.0, scaleFactor));
        if (this.renderMode === '3d') {
            this.orbitRadius = 7.5 / this.zoom;
            this.updateCamera3DPosition();
        }
        if (notify && this.onZoomChange) {
            this.onZoomChange(Math.round(this.zoom * 100));
        }
        if (this.onViewTransform) this.onViewTransform();
    }

    resetView() {
        this.zoom = 1.0;
        this.panX = 0;
        this.panY = 0;
        this.orbitTheta = 0.0;
        this.orbitPhi = 1.18;
        this.orbitRadius = 7.5;
        this.orbitTarget = { x: 0, y: 0.6, z: 0 };
        if (this.renderMode === '3d') {
            this.updateCamera3DPosition();
        }
        if (this.onZoomChange) {
            this.onZoomChange(100);
        }
        if (this.onViewTransform) this.onViewTransform();
    }

    // ========================================================
    // UNIFIED TOUCH & MOUSE GESTURES (2D PAN/ZOOM & 3D ORBIT)
    // ========================================================

    initTouchHandlers() {
        this.canvas.addEventListener('touchstart', (e) => {
            this.touches = Array.from(e.touches);
            this.dragMovedDistance = 0;

            if (this.touches.length === 2) {
                this.isTwoFingerGesturing = true;
                this.lastTouchCenter = this.getTouchCenter(this.touches[0], this.touches[1]);
                this.lastPinchDistance = this.getTouchDistance(this.touches[0], this.touches[1]);
            } else if (this.touches.length === 1) {
                this.isTwoFingerGesturing = false;
                this.lastMousePos = { x: this.touches[0].clientX, y: this.touches[0].clientY };
            }
        }, { passive: false });

        this.canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2 && this.isTwoFingerGesturing) {
                e.preventDefault();
                const p1 = e.touches[0];
                const p2 = e.touches[1];
                const currentCenter = this.getTouchCenter(p1, p2);
                const currentDist = this.getTouchDistance(p1, p2);

                const dx = currentCenter.x - this.lastTouchCenter.x;
                const dy = currentCenter.y - this.lastTouchCenter.y;
                this.dragMovedDistance += Math.hypot(dx, dy);

                if (this.renderMode === '3d') {
                    this.orbitTarget.x -= dx * 0.008;
                    this.orbitTarget.y += dy * 0.008;
                    this.updateCamera3DPosition();
                } else {
                    this.panX += dx;
                    this.panY += dy;
                }

                if (this.lastPinchDistance > 0) {
                    const scaleDelta = currentDist / this.lastPinchDistance;
                    this.setZoom(this.zoom * scaleDelta, true);
                }

                this.lastTouchCenter = currentCenter;
                this.lastPinchDistance = currentDist;
                if (this.onViewTransform) this.onViewTransform();
            } else if (e.touches.length === 1 && this.renderMode === '3d') {
                e.preventDefault();
                const t = e.touches[0];
                const dx = t.clientX - this.lastMousePos.x;
                const dy = t.clientY - this.lastMousePos.y;
                this.dragMovedDistance += Math.hypot(dx, dy);

                this.orbitTheta -= dx * 0.009;
                this.orbitPhi = Math.max(0.25, Math.min(Math.PI - 0.25, this.orbitPhi - dy * 0.009));
                this.updateCamera3DPosition();

                this.lastMousePos = { x: t.clientX, y: t.clientY };
                if (this.onViewTransform) this.onViewTransform();
            }
        }, { passive: false });

        this.canvas.addEventListener('touchend', (e) => {
            this.touches = Array.from(e.touches);
            if (this.touches.length < 2) {
                this.isTwoFingerGesturing = false;
                this.lastPinchDistance = 0;
            }
        });

        // Desktop Mouse Drag (3D Orbit / 2D Pan) & Wheel Zoom
        this.canvas.addEventListener('mousedown', (e) => {
            this.isMouseDragging = true;
            this.dragMovedDistance = 0;
            this.lastMousePos = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isMouseDragging) return;
            const dx = e.clientX - this.lastMousePos.x;
            const dy = e.clientY - this.lastMousePos.y;
            this.dragMovedDistance += Math.hypot(dx, dy);

            if (this.renderMode === '3d') {
                this.orbitTheta -= dx * 0.008;
                this.orbitPhi = Math.max(0.25, Math.min(Math.PI - 0.25, this.orbitPhi - dy * 0.008));
                this.updateCamera3DPosition();
            } else {
                this.panX += dx;
                this.panY += dy;
            }

            this.lastMousePos = { x: e.clientX, y: e.clientY };
            if (this.onViewTransform) this.onViewTransform();
        });

        window.addEventListener('mouseup', () => {
            this.isMouseDragging = false;
        });

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const step = e.deltaY < 0 ? 0.08 : -0.08;
            this.setZoom(this.zoom + step, true);
        }, { passive: false });
    }

    getTouchCenter(t1, t2) {
        return {
            x: (t1.clientX + t2.clientX) / 2,
            y: (t1.clientY + t2.clientY) / 2
        };
    }

    getTouchDistance(t1, t2) {
        return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
    }

    // ========================================================
    // THREE.JS 3D SCENE & BUILT-IN LAB APPARATUS FACTORY
    // ========================================================

    async ensureThreeLoaded() {
        if (this.THREE) return this.THREE;
        this.THREE = await import(THREE_CDN_URL);
        return this.THREE;
    }

    async setup3DEnvironment() {
        const THREE = await this.ensureThreeLoaded();
        if (!this.container3D) return;

        this.dispose3DEnvironment();

        this.scene3D = new THREE.Scene();

        const aspect = Math.max(1, this.width) / Math.max(1, this.height);
        this.camera3D = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
        this.updateCamera3DPosition();

        this.renderer3D = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer3D.setPixelRatio(this.dpr);
        this.renderer3D.setSize(this.width, this.height);
        this.renderer3D.shadowMap.enabled = true;
        this.renderer3D.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer3D.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer3D.toneMappingExposure = 1.15;

        this.container3D.innerHTML = '';
        this.container3D.appendChild(this.renderer3D.domElement);
        this.container3D.classList.remove('hidden');

        // Studio 3-Point Lighting
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const hemiLight = new THREE.HemisphereLight(0xffffff, isDark ? 0x0f172a : 0xcbd5e1, 1.1);
        hemiLight.position.set(0, 10, 0);
        this.scene3D.add(hemiLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
        keyLight.position.set(4, 8, 6);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        this.scene3D.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0x00f0ff, 0.65);
        rimLight.position.set(-5, 4, -5);
        this.scene3D.add(rimLight);

        // Unified Single 3D Coordinate Floor Grid
        const primaryGridColor = isDark ? 0x00f0ff : 0x0288d1;
        const secondaryGridColor = isDark ? 0x1e293b : 0xcbd5e1;
        this.grid3D = new THREE.GridHelper(12, 24, primaryGridColor, secondaryGridColor);
        this.grid3D.material.opacity = isDark ? 0.22 : 0.35;
        this.grid3D.material.transparent = true;
        this.scene3D.add(this.grid3D);

        this.raycaster3D = new THREE.Raycaster();
        this.lab3D = this.createLab3DFactory(THREE);
    }

    updateCamera3DPosition() {
        if (!this.camera3D) return;
        const sinPhi = Math.sin(this.orbitPhi);
        const cosPhi = Math.cos(this.orbitPhi);
        const sinTheta = Math.sin(this.orbitTheta);
        const cosTheta = Math.cos(this.orbitTheta);

        this.camera3D.position.set(
            this.orbitTarget.x + this.orbitRadius * sinPhi * sinTheta,
            this.orbitTarget.y + this.orbitRadius * cosPhi,
            this.orbitTarget.z + this.orbitRadius * sinPhi * cosTheta
        );
        this.camera3D.lookAt(this.orbitTarget.x, this.orbitTarget.y, this.orbitTarget.z);
    }

    raycast3D(screenX, screenY) {
        if (this.renderMode !== '3d' || !this.raycaster3D || !this.camera3D || !this.scene3D) return null;
        const ndcX = (screenX / this.width) * 2 - 1;
        const ndcY = -(screenY / this.height) * 2 + 1;
        this.raycaster3D.setFromCamera({ x: ndcX, y: ndcY }, this.camera3D);

        const hits = this.raycaster3D.intersectObjects(this.scene3D.children, true);
        for (const hit of hits) {
            let obj = hit.object;
            while (obj) {
                if (obj.userData && obj.userData.instrument) {
                    return obj.userData.instrument;
                }
                obj = obj.parent;
            }
        }
        return null;
    }

    createLab3DFactory(THREE) {
        const glassMat = () => new THREE.MeshPhysicalMaterial({
            color: 0xe0f7fa,
            transparent: true,
            opacity: 0.32,
            roughness: 0.08,
            metalness: 0.0,
            transmission: 0.65,
            ior: 1.47,
            depthWrite: false
        });

        return {
            createGlassBeaker: ({ radius = 0.65, height = 1.5, liquidLevel = 0.55, liquidColor = 0x00bcd4 } = {}) => {
                const group = new THREE.Group();

                const bodyGeo = new THREE.CylinderGeometry(radius, radius * 0.96, height, 36, 1, true);
                const bodyMesh = new THREE.Mesh(bodyGeo, glassMat());
                bodyMesh.position.y = height / 2;
                group.add(bodyMesh);

                const baseGeo = new THREE.CylinderGeometry(radius * 0.96, radius * 0.96, 0.06, 36);
                const baseMesh = new THREE.Mesh(baseGeo, glassMat());
                baseMesh.position.y = 0.03;
                group.add(baseMesh);

                const rimGeo = new THREE.TorusGeometry(radius, 0.025, 12, 36);
                const rimMesh = new THREE.Mesh(rimGeo, glassMat());
                rimMesh.rotation.x = Math.PI / 2;
                rimMesh.position.y = height;
                group.add(rimMesh);

                const clampedLevel = Math.max(0.01, Math.min(0.92, liquidLevel));
                const liqH = height * clampedLevel;
                const liqGeo = new THREE.CylinderGeometry(radius * 0.93, radius * 0.91, liqH, 32);
                const liqMat = new THREE.MeshPhysicalMaterial({
                    color: liquidColor,
                    transparent: true,
                    opacity: 0.82,
                    roughness: 0.15
                });
                const liquidMesh = new THREE.Mesh(liqGeo, liqMat);
                liquidMesh.position.y = liqH / 2 + 0.04;
                liquidMesh.name = 'liquidMesh';
                group.add(liquidMesh);

                group.userData.liquidMesh = liquidMesh;
                group.userData.maxLiquidHeight = height * 0.9;
                return group;
            },

            createTestTube: ({ radius = 0.24, height = 1.6, liquidLevel = 0.5, liquidColor = 0x3b82f6, hasStopper = false } = {}) => {
                const group = new THREE.Group();
                const cylH = height - radius;

                const tubeGeo = new THREE.CylinderGeometry(radius, radius, cylH, 28, 1, true);
                const tubeMesh = new THREE.Mesh(tubeGeo, glassMat());
                tubeMesh.position.y = radius + cylH / 2;
                group.add(tubeMesh);

                const bowlGeo = new THREE.SphereGeometry(radius, 28, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
                const bowlMesh = new THREE.Mesh(bowlGeo, glassMat());
                bowlMesh.position.y = radius;
                group.add(bowlMesh);

                const liqH = Math.max(0.05, cylH * Math.min(0.9, liquidLevel));
                const liqGeo = new THREE.CylinderGeometry(radius * 0.9, radius * 0.9, liqH, 24);
                const liqMat = new THREE.MeshPhysicalMaterial({
                    color: liquidColor,
                    transparent: true,
                    opacity: 0.85,
                    roughness: 0.12
                });
                const liqMesh = new THREE.Mesh(liqGeo, liqMat);
                liqMesh.position.y = radius + liqH / 2;
                group.add(liqMesh);

                if (hasStopper) {
                    const corkGeo = new THREE.CylinderGeometry(radius * 1.05, radius * 0.88, 0.24, 24);
                    const corkMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
                    const cork = new THREE.Mesh(corkGeo, corkMat);
                    cork.position.y = height + 0.04;
                    group.add(cork);
                }

                return group;
            },

            createGasCapsule: ({ radius = 0.34, length = 1.2, gasColor = 0xff4081 } = {}) => {
                const group = new THREE.Group();
                const capGeo = new THREE.CapsuleGeometry(radius, length, 16, 32);
                const capMesh = new THREE.Mesh(capGeo, glassMat());
                group.add(capMesh);

                const coreGeo = new THREE.CapsuleGeometry(radius * 0.84, length * 0.92, 12, 24);
                const coreMat = new THREE.MeshStandardMaterial({
                    color: gasColor,
                    emissive: gasColor,
                    emissiveIntensity: 0.75,
                    transparent: true,
                    opacity: 0.65,
                    roughness: 0.3
                });
                const coreMesh = new THREE.Mesh(coreGeo, coreMat);
                group.add(coreMesh);
                return group;
            },

            createMetalSphere: ({ radius = 0.35, color = 0xeab308, metalness = 0.88, roughness = 0.22 } = {}) => {
                const geo = new THREE.SphereGeometry(radius, 36, 36);
                const mat = new THREE.MeshStandardMaterial({ color, metalness, roughness });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.castShadow = true;
                return mesh;
            },

            createGlassPrism: ({ size = 1.1, height = 1.3 } = {}) => {
                const geo = new THREE.CylinderGeometry(size, size, height, 3);
                const mat = new THREE.MeshPhysicalMaterial({
                    color: 0xe0f2fe,
                    transparent: true,
                    opacity: 0.55,
                    roughness: 0.05,
                    ior: 1.52,
                    transmission: 0.75
                });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.castShadow = true;
                return mesh;
            }
        };
    }

    dispose3DEnvironment() {
        if (this.renderer3D) {
            this.renderer3D.dispose();
            this.renderer3D = null;
        }
        if (this.scene3D) {
            this.scene3D.clear();
            this.scene3D = null;
        }
        this.camera3D = null;
        this.grid3D = null;
        this.raycaster3D = null;
        if (this.container3D) {
            this.container3D.innerHTML = '';
            this.container3D.classList.add('hidden');
        }
    }

    // ========================================================
    // LIFECYCLE, RESIZE & HYBRID RENDER LOOP
    // ========================================================

    resize() {
        const parent = this.canvas.parentElement;
        if (!parent) return;

        this.width = parent.clientWidth;
        this.height = parent.clientHeight;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;

        this.ctx.resetTransform?.();
        this.ctx.scale(this.dpr, this.dpr);

        if (this.renderMode === '3d' && this.renderer3D && this.camera3D) {
            this.camera3D.aspect = Math.max(1, this.width) / Math.max(1, this.height);
            this.camera3D.updateProjectionMatrix();
            this.renderer3D.setSize(this.width, this.height);
        }

        if (this.activeExperiment && this.activeExperiment.onResize) {
            this.activeExperiment.onResize(this.width, this.height);
        }
    }

    async mountExperiment(experimentInstance) {
        this.unmountExperiment();
        this.activeExperiment = experimentInstance;
        this.resetView();

        const requestedMode = experimentInstance.renderMode || experimentInstance.metadata?.mode || '2d';
        this.renderMode = requestedMode === '3d' ? '3d' : '2d';

        this.resize();

        if (this.renderMode === '3d') {
            await this.setup3DEnvironment();
            if (this.activeExperiment && this.activeExperiment.init3D) {
                this.activeExperiment.init3D(this.THREE, this.scene3D, this.camera3D, this.lab3D);
            }
        } else {
            this.dispose3DEnvironment();
        }
    }

    unmountExperiment() {
        if (this.activeExperiment) {
            if (this.activeExperiment.destroy) this.activeExperiment.destroy();
            this.activeExperiment = null;
        }
        this.dispose3DEnvironment();
        this.renderMode = '2d';
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.loop = this.loop.bind(this);
        this.animationFrameId = requestAnimationFrame(this.loop);
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    loop(currentTime) {
        if (!this.isRunning) return;

        const delta = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.frameCount++;
        if (currentTime - this.lastFpsUpdate >= 500) {
            const currentFps = Math.round((this.frameCount * 1000) / (currentTime - this.lastFpsUpdate));
            if (this.fpsBadge) {
                this.fpsBadge.textContent = `${currentFps} FPS`;
            }
            this.frameCount = 0;
            this.lastFpsUpdate = currentTime;
        }

        this.render(delta);
        this.animationFrameId = requestAnimationFrame(this.loop);
    }

    render(delta) {
        const w = this.width;
        const h = this.height;

        // 1. Clear 2D Overlay / Stage Canvas
        this.ctx.clearRect(0, 0, w, h);

        if (this.renderMode === '3d') {
            // 3D Mode: WebGL renders 3D apparatus + single 3D floor grid; 2D canvas renders crisp HUD overlay
            if (this.activeExperiment) {
                if (this.activeExperiment.update) {
                    this.activeExperiment.update(delta);
                    if (this.activeExperiment.needsUISync) {
                        this.activeExperiment.needsUISync = false;
                        if (this.onExperimentSync) this.onExperimentSync();
                    }
                }
                if (this.activeExperiment.update3D) {
                    this.activeExperiment.update3D(delta, this.THREE, this.scene3D);
                }
            }

            if (this.renderer3D && this.scene3D && this.camera3D) {
                this.renderer3D.render(this.scene3D, this.camera3D);
            }

            if (this.activeExperiment && this.activeExperiment.drawOverlay) {
                this.activeExperiment.drawOverlay(this.ctx, w, h);
            }
        } else {
            // 2D Mode: Single Unified Coordinate Grid + Camera-Transformed Apparatus
            this.drawUnifiedGrid(w, h);

            this.ctx.save();
            this.ctx.translate(w / 2 + this.panX, h / 2 + this.panY);
            this.ctx.scale(this.zoom, this.zoom);
            this.ctx.translate(-w / 2, -h / 2);

            if (this.activeExperiment) {
                if (this.activeExperiment.update) {
                    this.activeExperiment.update(delta);
                    if (this.activeExperiment.needsUISync) {
                        this.activeExperiment.needsUISync = false;
                        if (this.onExperimentSync) this.onExperimentSync();
                    }
                }
                if (this.activeExperiment.draw) {
                    this.activeExperiment.draw(this.ctx, w, h);
                }
            }

            this.ctx.restore();
        }

        // Screen-Space Pinned HUD (Never moves or scales with 2-finger pan/zoom)
        if (this.activeExperiment) {
            const hudScale = Math.min(w / 700, h / 520, 1.0);
            if (this.activeExperiment.drawHUD) {
                this.activeExperiment.drawHUD(this.ctx, w, h, hudScale);
            } else if (this.activeExperiment.drawTelemetryHUD) {
                this.activeExperiment.drawTelemetryHUD(this.ctx, w, h, hudScale);
            }
        }
    }

    drawUnifiedGrid(w, h) {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const ctx = this.ctx;

        ctx.save();

        const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, Math.max(w, h) * 0.75);
        bgGrad.addColorStop(0, isDark ? '#0d1322' : '#f1f5f9');
        bgGrad.addColorStop(1, isDark ? '#070a13' : '#f8fafc');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        const minorColor = isDark ? 'rgba(0, 240, 255, 0.05)' : 'rgba(2, 136, 209, 0.05)';
        const majorColor = isDark ? 'rgba(0, 240, 255, 0.12)' : 'rgba(2, 136, 209, 0.11)';

        const step = 32 * this.zoom;
        const originX = (w / 2 + this.panX) % step;
        const originY = (h / 2 + this.panY) % step;

        ctx.strokeStyle = minorColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = originX; x <= w; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        for (let y = originY; y <= h; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
        ctx.stroke();

        const majorStep = step * 4;
        const majorOriginX = (w / 2 + this.panX) % majorStep;
        const majorOriginY = (h / 2 + this.panY) % majorStep;

        ctx.strokeStyle = majorColor;
        ctx.beginPath();
        for (let x = majorOriginX; x <= w; x += majorStep) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        for (let y = majorOriginY; y <= h; y += majorStep) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
        ctx.stroke();

        ctx.restore();
    }

    destroy() {
        this.stop();
        window.removeEventListener('resize', this.handleResize);
        this.unmountExperiment();
    }
}
