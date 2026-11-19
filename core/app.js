import { 
    auth, 
    db, 
    firebaseConfig,
    SUPER_ADMIN_UID, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    doc, 
    getDoc, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    collection, 
    getDocs, 
    query, 
    where 
} from "./firebase.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

import { DigiLabEngine } from "./engine.js";
import { DigiLabUIManager } from "./ui-manager.js";

// Guaranteed baseline module fallback
import { Experiment as OhmsLawExperiment, metadata as ohmsMetadata } from "../experiments/10/science-1/04-ohms-law.js";

// Secondary App instance for user provisioning (Prevents Admin session override)
const secondaryApp = initializeApp(firebaseConfig, "SecondaryAuthInstance");
const secondaryAuth = getAuth(secondaryApp);

class DigiLabApp {
    constructor() {
        this.currentUser = null;
        this.userRole = null;
        this.userData = null;
        this.selectedSubject = null;
        this.currentLang = 'en';

        this.engine = null;
        this.uiManager = null;
        this.activeSimExperiment = null;

                // Lightweight Metadata Registry (No Heavy JS Modules Loaded Yet)
        this.registeredCatalog = [];

        this.initDOMElements();
        this.initTheme();
        this.initCustomSelectors();
        this.bindEvents();
        this.initSimulationInfrastructure();
        this.bootstrapApp();
    }

    async bootstrapApp() {
        // Safety watchdog: Dismiss global boot loader within 2.5s
        setTimeout(() => {
            if (this.dom.loadingOverlay && !this.dom.loadingOverlay.classList.contains('hidden')) {
                this.hideLoader();
            }
        }, 2500);

        try {
            await this.loadRegistryCatalog();
        } catch (err) {
            console.warn("Catalog indexing warning:", err);
        } finally {
            this.initAuthListener();
        }
    }

    // ========================================================
    // SECURE LIGHTWEIGHT CATALOG INDEXER (Zero-Payload Boot)
    // ========================================================

    async loadRegistryCatalog() {
        let registryPaths = [];

        try {
            const registryModule = await import("../experiments/registry.js");
            if (registryModule && Array.isArray(registryModule.REGISTERED_EXPERIMENTS)) {
                registryPaths = registryModule.REGISTERED_EXPERIMENTS;
            }
        } catch (err) {
            console.warn("experiments/registry.js catalog reference missed:", err.message);
        }

        // Hardcoded guaranteed baseline path
        const baselinePath = "../experiments/10/science-1/04-ohms-law.js";
        if (!registryPaths.includes(baselinePath)) {
            registryPaths.push(baselinePath);
        }

        this.registeredCatalog = [];

        // Parse path metadata without downloading heavy experiment bodies
        for (const path of registryPaths) {
            const match = path.match(/\/experiments\/(\d+)\/([^/]+)\/(.+)\.js$/);
            if (match) {
                const standard = match[1];
                const rawSubject = match[2];
                const fileSlug = match[3];

                                const rawLower = rawSubject.toLowerCase();
                let cleanSubject = "Science 1";
                if (rawLower.includes("physics")) cleanSubject = "Physics";
                else if (rawLower.includes("chem")) cleanSubject = "Chemistry";
                else if (rawLower.includes("bio")) cleanSubject = "Biology";
                else if (rawLower.includes("math")) cleanSubject = "Mathematics";
                else if (rawLower.includes("2")) cleanSubject = "Science 2";

                let generatedTitle = fileSlug.replace(/^\d+-/, '').replace(/[-_]/g, ' ');
                generatedTitle = generatedTitle.charAt(0).toUpperCase() + generatedTitle.slice(1);

                let expId = `exp_${standard}_${fileSlug.replace(/[-]/g, '_')}`;

                // Specific calibrated IDs & titles matching internal module metadata
                if (fileSlug.includes("ohms")) {
                    generatedTitle = "Verification of Ohm's Law (V = IR)";
                    expId = "exp_10_04";
                } else if (fileSlug.includes("pendulum")) {
                    generatedTitle = "Determination of 'g' using Simple Pendulum";
                    expId = "exp_10_01";
                } else if (fileSlug.includes("free-fall") || fileSlug.includes("freefall")) {
                    generatedTitle = "Study of Free Fall and Kinematic Equations (s = ½gt²)";
                    expId = "exp_10_01_freefall";
                } else if (fileSlug.includes("prism")) {
                    generatedTitle = "Refraction of Light Through a Glass Prism";
                    expId = "exp_10_06_prism";
                } else if (fileSlug.includes("optics")) {
                    generatedTitle = "Chapter 9: Complete Ray & Wave Optics Lab";
                    expId = "exp_12_phy_09_optics";
                }


                this.registeredCatalog.push({
                    id: expId,
                    standard: standard.toString(),
                    subject: cleanSubject,
                    title: generatedTitle,
                    filePath: path,
                    isLoaded: false,
                    instanceClass: null,
                    metadata: null
                });
            }
        }
    }


    initDOMElements() {
        this.dom = {
            loadingOverlay: document.getElementById('appLoadingOverlay'),
            authSection: document.getElementById('authSection'),
            adminView: document.getElementById('adminDashboardView'),
            teacherView: document.getElementById('teacherDashboardView'),
            studentView: document.getElementById('studentDashboardView'),
            simWorkspaceView: document.getElementById('simulationWorkspaceView'),

            loginForm: document.getElementById('loginForm'),
            loginIdentifier: document.getElementById('loginIdentifier'),
            loginPassword: document.getElementById('loginPassword'),
            loginSubmitBtn: document.getElementById('loginSubmitBtn'),
            authErrorMessage: document.getElementById('authErrorMessage'),
            userProfileBadge: document.getElementById('userProfileBadge'),
            userRoleTag: document.getElementById('userRoleTag'),
            userNameDisplay: document.getElementById('userNameDisplay'),
            logoutBtn: document.getElementById('logoutBtn'),
            userMenuBtn: document.getElementById('userMenuBtn'),
            userDropdownMenu: document.getElementById('userDropdownMenu'),
            themePillButtons: document.querySelectorAll('.theme-pill-btn'),

            // Admin Navigation & Drawer Elements
            adminHamburgerBtn: document.getElementById('adminHamburgerBtn'),
            adminNavDrawerOverlay: document.getElementById('adminNavDrawerOverlay'),
            btnCloseAdminDrawer: document.getElementById('btnCloseAdminDrawer'),
            btnAdminNavUsers: document.getElementById('btnAdminNavUsers'),
            btnAdminNavAccessLab: document.getElementById('btnAdminNavAccessLab'),
            adminUsersManagementSection: document.getElementById('adminUsersManagementSection'),
            adminAccessLabSection: document.getElementById('adminAccessLabSection'),
            adminLabClassSelector: document.getElementById('adminLabClassSelector'),
            adminLabClassCustomSelect: document.getElementById('adminLabClassCustomSelect'),
            adminLabStandardBar: document.getElementById('adminLabStandardBar'),
            adminLabSubjectsView: document.getElementById('adminLabSubjectsView'),
            adminLabExperimentsView: document.getElementById('adminLabExperimentsView'),
            adminExperimentCardsDeck: document.getElementById('adminExperimentCardsDeck'),
            adminLabBreadcrumbContainer: document.getElementById('adminLabBreadcrumbContainer'),
            btnAdminBackToSubjects: document.getElementById('btnAdminBackToSubjects'),
            adminSelectedSubjectTitle: document.getElementById('adminSelectedSubjectTitle'),
            adminSelectedSubjectSub: document.getElementById('adminSelectedSubjectSub'),

            // Admin Management & Modals
            openRegisterTeacherModalBtn: document.getElementById('openRegisterTeacherModalBtn'),
            openRegisterStudentModalBtn: document.getElementById('openRegisterStudentModalBtn'),
            modalRegisterTeacher: document.getElementById('modalRegisterTeacher'),
            modalRegisterStudent: document.getElementById('modalRegisterStudent'),
            formRegisterTeacher: document.getElementById('formRegisterTeacher'),
            formRegisterStudent: document.getElementById('formRegisterStudent'),
            teacherRegUserId: document.getElementById('teacherRegUserId'),
            studentRegUserId: document.getElementById('studentRegUserId'),
            teacherRegError: document.getElementById('teacherRegError'),
            studentRegError: document.getElementById('studentRegError'),
            adminClassSelector: document.getElementById('adminClassSelector'),
            adminClassCustomSelect: document.getElementById('adminClassCustomSelect'),
            experimentsTableBody: document.getElementById('experimentsTableBody'),
            teachersTableBody: document.getElementById('teachersTableBody'),
            studentsTableBody: document.getElementById('studentsTableBody'),
            adminTabs: document.querySelectorAll('.admin-tab-btn'),
            adminTabContents: document.querySelectorAll('.admin-tab-content'),
            modalCloseButtons: document.querySelectorAll('.btn-close-modal'),

            // Teacher Console Elements
            teacherAssignedDisplay: document.getElementById('teacherAssignedClassesDisplay'),
            teacherClassSelector: document.getElementById('teacherClassSelector'),
            teacherClassCustomSelect: document.getElementById('teacherClassCustomSelect'),
            teacherClassCustomOptions: document.getElementById('teacherClassCustomOptions'),
            teacherExperimentsTableBody: document.getElementById('teacherExperimentsTableBody'),
            teacherStudentsTableBody: document.getElementById('teacherStudentsTableBody'),
            teacherTabs: document.querySelectorAll('.teacher-tab-btn'),
            teacherTabContents: document.querySelectorAll('.teacher-tab-content'),

            // Student Station Elements
            studentClassDisplay: document.getElementById('studentClassDisplay'),
            studentSubjectsView: document.getElementById('studentSubjectsView'),
            studentExperimentsView: document.getElementById('studentExperimentsView'),
            studentExperimentCardsDeck: document.getElementById('studentExperimentCardsDeck'),
            studentBreadcrumbContainer: document.getElementById('studentBreadcrumbContainer'),
            btnBackToSubjects: document.getElementById('btnBackToSubjects'),
            currentSelectedSubjectTitle: document.getElementById('currentSelectedSubjectTitle'),
            currentSelectedSubjectSub: document.getElementById('currentSelectedSubjectSub'),

                                    // Practical Micro-Loader
            practicalLoadingOverlay: document.getElementById('practicalLoadingOverlay'),

            // Simulation Workspace Elements
            container3D: document.getElementById('digiLab3DContainer'),
            simCanvas: document.getElementById('digiLabCanvas'),
            fpsBadge: document.getElementById('fpsCounter'),
            stageNoteCard: document.getElementById('stageNoteCard'),
            stageNoteTitle: document.getElementById('stageNoteTitle'),
            stageNoteBody: document.getElementById('stageNoteBody'),
            btnCloseStageNote: document.getElementById('btnCloseStageNote'),
btnExitSimulation: document.getElementById('btnExitSimulation'),
            btnResetSimulation: document.getElementById('btnResetSimulation'),
            simExperimentTitle: document.getElementById('simExperimentTitle'),
            simExperimentMeta: document.getElementById('simExperimentMeta'),
            dockControlTitle: document.getElementById('dockControlTitle'),
            simDynamicControlsContainer: document.getElementById('simDynamicControlsContainer'),
            btnLangEN: document.getElementById('btnLangEN'),
            btnLangUR: document.getElementById('btnLangUR'),
            btnToggleFullscreen: document.getElementById('btnToggleFullscreen'),
            iconEnterFS: document.getElementById('iconEnterFS'),
            iconExitFS: document.getElementById('iconExitFS'),
            btnZoomIn: document.getElementById('btnZoomIn'),
            btnZoomOut: document.getElementById('btnZoomOut'),
            zoomRangeSlider: document.getElementById('zoomRangeSlider'),
            zoomPercentDisplay: document.getElementById('zoomPercentDisplay'),
            instrumentPopover: document.getElementById('instrumentPopover'),
            popoverInstrumentName: document.getElementById('popoverInstrumentName'),
            btnPopoverInfo: document.getElementById('btnPopoverInfo'),
            btnClosePopover: document.getElementById('btnClosePopover'),
            btnTopInfoDrawer: document.getElementById('btnTopInfoDrawer'),
apparatusDrawerOverlay: document.getElementById('apparatusDrawerOverlay'),
            btnCloseApparatusDrawer: document.getElementById('btnCloseApparatusDrawer'),
            drawerApparatusList: document.getElementById('drawerApparatusList')
        };
    }

            initSimulationInfrastructure() {
        this.engine = new DigiLabEngine(this.dom.simCanvas, this.dom.fpsBadge, this.dom.container3D);
        this.uiManager = new DigiLabUIManager(this.dom.simDynamicControlsContainer, this.currentLang);

        // Recalibrate 2D & 3D canvas viewport whenever drag-sheet panel resizes or collapses
        this.uiManager.onDockResize = () => {
            if (this.engine) this.engine.resize();
        };

        // Sync pinch-to-zoom & wheel zoom back to bottom zoom slider
        this.engine.onZoomChange = (percent) => {
            if (this.dom.zoomRangeSlider) this.dom.zoomRangeSlider.value = percent;
            if (this.dom.zoomPercentDisplay) this.dom.zoomPercentDisplay.textContent = `${percent}%`;
            this.hideInstrumentPopover();
        };

        // Dismiss floating popover on pan/orbit transform so it never drifts away
        this.engine.onViewTransform = () => {
            this.hideInstrumentPopover();
        };

        // Auto-sync switches, readouts & observation tables when experiment state updates asynchronously
        this.engine.onExperimentSync = () => {
            if (this.uiManager) this.uiManager.syncFromExperiment();
        };
    }



    initTheme() {
        const savedTheme = localStorage.getItem('digilab_theme') || 'dark';
        this.applyTheme(savedTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('digilab_theme', theme);

        this.dom.themePillButtons.forEach(btn => {
            if (btn.dataset.themeVal === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (this.engine) this.engine.resize();
    }

    // ========================================================
    // IN-APP NATIVE CUSTOM SELECTORS ENGINE
    // ========================================================

    initCustomSelectors() {
        this.bindCustomSelect(this.dom.adminClassCustomSelect, (val) => {
            this.dom.adminClassSelector.value = val;
            this.loadExperimentsForClass(val);
        });

        this.bindCustomSelect(this.dom.adminLabClassCustomSelect, (val) => {
            this.dom.adminLabClassSelector.value = val;
            this.setupAdminLabStation(val);
        });

        const studentRegSelect = document.getElementById('studentRegClassCustomSelect');
        if (studentRegSelect) {
            this.bindCustomSelect(studentRegSelect, (val) => {
                document.getElementById('studentRegClass').value = val;
            });
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.custom-select-wrapper')) {
                document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
                    wrapper.classList.remove('open');
                    const options = wrapper.querySelector('.custom-select-options');
                    if (options) options.classList.add('hidden');
                });
            }
        });
    }

    bindCustomSelect(wrapperElement, onSelectCallback) {
        if (!wrapperElement) return;

        const trigger = wrapperElement.querySelector('.custom-select-trigger');
        const optionsBox = wrapperElement.querySelector('.custom-select-options');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = wrapperElement.classList.contains('open');

            document.querySelectorAll('.custom-select-wrapper').forEach(w => {
                w.classList.remove('open');
                const opt = w.querySelector('.custom-select-options');
                if (opt) opt.classList.add('hidden');
            });

            if (!isOpen) {
                wrapperElement.classList.add('open');
                optionsBox.classList.remove('hidden');
            }
        });

        optionsBox.querySelectorAll('.custom-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const val = option.dataset.value;
                const text = option.textContent.trim();

                trigger.querySelector('span').textContent = text;
                trigger.dataset.value = val;

                optionsBox.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');

                wrapperElement.classList.remove('open');
                optionsBox.classList.add('hidden');

                if (onSelectCallback) onSelectCallback(val);
            });
        });
    }

    bindEvents() {
        this.dom.userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dom.userDropdownMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!this.dom.userDropdownMenu.classList.contains('hidden') && !this.dom.userDropdownMenu.contains(e.target)) {
                this.dom.userDropdownMenu.classList.add('hidden');
            }
        });

        this.dom.themePillButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.applyTheme(btn.dataset.themeVal);
            });
        });

        this.dom.btnLangEN.addEventListener('click', () => this.switchLanguage('en'));
        this.dom.btnLangUR.addEventListener('click', () => this.switchLanguage('ur'));

        this.dom.btnExitSimulation.addEventListener('click', () => this.exitSimulation());
        this.dom.btnResetSimulation.addEventListener('click', () => {
            if (this.uiManager) this.uiManager.reset();
            if (this.engine) this.engine.resetView();
            this.dom.zoomRangeSlider.value = 100;
            this.dom.zoomPercentDisplay.textContent = '100%';
            this.hideInstrumentPopover();
        });

        this.dom.loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleLogin();
        });

        this.dom.logoutBtn.addEventListener('click', async () => {
            await signOut(auth);
            this.resetToAuthView();
        });

        this.dom.adminTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                this.dom.adminTabs.forEach(b => b.classList.remove('active'));
                this.dom.adminTabContents.forEach(c => c.classList.remove('active'));
                this.dom.adminTabContents.forEach(c => c.classList.add('hidden'));

                btn.classList.add('active');
                const targetContent = document.getElementById(btn.dataset.tab);
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');

                if (btn.dataset.tab === 'tabTeachers') this.loadTeachersDirectory();
                if (btn.dataset.tab === 'tabStudents') this.loadStudentsDirectory();
            });
        });

        this.dom.teacherTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                this.dom.teacherTabs.forEach(b => b.classList.remove('active'));
                this.dom.teacherTabContents.forEach(c => c.classList.remove('active'));
                this.dom.teacherTabContents.forEach(c => c.classList.add('hidden'));

                btn.classList.add('active');
                const targetContent = document.getElementById(btn.dataset.tab);
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');

                if (btn.dataset.tab === 'teacherTabStudents') this.loadTeacherStudentsDirectory();
            });
        });

        this.dom.adminHamburgerBtn.addEventListener('click', () => {
            this.dom.adminNavDrawerOverlay.classList.remove('hidden');
        });

        this.dom.btnCloseAdminDrawer.addEventListener('click', () => {
            this.dom.adminNavDrawerOverlay.classList.add('hidden');
        });

        this.dom.adminNavDrawerOverlay.addEventListener('click', (e) => {
            if (e.target === this.dom.adminNavDrawerOverlay) {
                this.dom.adminNavDrawerOverlay.classList.add('hidden');
            }
        });

        this.dom.btnAdminNavUsers.addEventListener('click', () => {
            this.dom.btnAdminNavUsers.classList.add('active');
            this.dom.btnAdminNavAccessLab.classList.remove('active');
            this.dom.adminUsersManagementSection.classList.remove('hidden');
            this.dom.adminAccessLabSection.classList.add('hidden');
            this.dom.adminNavDrawerOverlay.classList.add('hidden');
        });

        this.dom.btnAdminNavAccessLab.addEventListener('click', () => {
            this.dom.btnAdminNavAccessLab.classList.add('active');
            this.dom.btnAdminNavUsers.classList.remove('active');
            this.dom.adminUsersManagementSection.classList.add('hidden');
            this.dom.adminAccessLabSection.classList.remove('hidden');
            this.dom.adminNavDrawerOverlay.classList.add('hidden');
            this.setupAdminLabStation(this.dom.adminLabClassSelector.value);
        });

        this.dom.btnAdminBackToSubjects.addEventListener('click', () => {
            this.showAdminLabSubjectsView();
        });

        this.dom.openRegisterTeacherModalBtn.addEventListener('click', async () => {
            await this.prepareNextTeacherId();
            this.dom.modalRegisterTeacher.classList.remove('hidden');
        });

        this.dom.openRegisterStudentModalBtn.addEventListener('click', async () => {
            await this.prepareNextStudentId();
            this.dom.modalRegisterStudent.classList.remove('hidden');
        });

        this.dom.modalCloseButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.dataset.modal;
                document.getElementById(modalId).classList.add('hidden');
            });
        });

        this.dom.formRegisterTeacher.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleCreateTeacher();
        });

        this.dom.formRegisterStudent.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleCreateStudent();
        });

        this.dom.btnBackToSubjects.addEventListener('click', () => {
            this.showStudentSubjectsView();
        });

        this.dom.btnToggleFullscreen.addEventListener('click', () => {
            this.toggleLabFullscreen();
        });

        this.dom.zoomRangeSlider.addEventListener('input', (e) => {
            this.applyEngineZoom(parseInt(e.target.value));
        });

        this.dom.btnZoomIn.addEventListener('click', () => {
            let current = parseInt(this.dom.zoomRangeSlider.value);
            current = Math.min(200, current + 15);
            this.dom.zoomRangeSlider.value = current;
            this.applyEngineZoom(current);
        });

        this.dom.btnZoomOut.addEventListener('click', () => {
            let current = parseInt(this.dom.zoomRangeSlider.value);
            current = Math.max(50, current - 15);
            this.dom.zoomRangeSlider.value = current;
            this.applyEngineZoom(current);
        });

                this.dom.simCanvas.addEventListener('click', (e) => {
            if (this.engine && this.engine.dragMovedDistance > 6) return;
            this.handleCanvasSingleTap(e);
        });

        if (this.dom.btnClosePopover) {
            this.dom.btnClosePopover.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideInstrumentPopover();
            });
        }

        if (this.dom.btnCloseStageNote) {
            this.dom.btnCloseStageNote.addEventListener('click', (e) => {
                e.stopPropagation();
                this.hideStageNote();
            });
        }

        this.dom.btnTopInfoDrawer.addEventListener('click', () => this.openApparatusDrawer());
        this.dom.btnPopoverInfo.addEventListener('click', () => this.openApparatusDrawer());
this.dom.btnCloseApparatusDrawer.addEventListener('click', () => this.closeApparatusDrawer());
        this.dom.apparatusDrawerOverlay.addEventListener('click', (e) => {
            if (e.target === this.dom.apparatusDrawerOverlay) {
                this.closeApparatusDrawer();
            }
        });
    }

    // ========================================================
    // AUTO USER ID GENERATION (DIGI-T01, DIGI-S01)
    // ========================================================

    async prepareNextTeacherId() {
        try {
            const q = query(collection(db, "users"), where("role", "==", "teacher"));
            const snap = await getDocs(q);
            let maxNum = 0;

            snap.forEach(d => {
                const uId = d.data().userId || "";
                const match = uId.match(/DIGI-T(\d+)/i);
                if (match) {
                    const num = parseInt(match[1]);
                    if (num > maxNum) maxNum = num;
                }
            });

            const nextSeq = String(maxNum + 1).padStart(2, '0');
            this.dom.teacherRegUserId.value = `DIGI-T${nextSeq}`;
        } catch (err) {
            console.warn("Could not calculate next faculty ID:", err);
            this.dom.teacherRegUserId.value = "DIGI-T01";
        }
    }

    async prepareNextStudentId() {
        try {
            const q = query(collection(db, "users"), where("role", "==", "student"));
            const snap = await getDocs(q);
            let maxNum = 0;

            snap.forEach(d => {
                const uId = d.data().userId || "";
                const match = uId.match(/DIGI-S(\d+)/i);
                if (match) {
                    const num = parseInt(match[1]);
                    if (num > maxNum) maxNum = num;
                }
            });

            const nextSeq = String(maxNum + 1).padStart(2, '0');
            this.dom.studentRegUserId.value = `DIGI-S${nextSeq}`;
        } catch (err) {
            console.warn("Could not calculate next student ID:", err);
            this.dom.studentRegUserId.value = "DIGI-S01";
        }
    }

    // ========================================================
    // MULTI-IDENTIFIER AUTHENTICATION ENGINE
    // ========================================================

    async handleLogin() {
        const rawIdentifier = this.dom.loginIdentifier.value.trim();
        const password = this.dom.loginPassword.value;
        this.showAuthError(null);
        this.setButtonLoading(true);

        try {
            let authEmail = rawIdentifier;

            if (!rawIdentifier.includes('@')) {
                let q = query(collection(db, "users"), where("userId", "==", rawIdentifier.toUpperCase()));
                let querySnap = await getDocs(q);

                if (querySnap.empty) {
                    q = query(collection(db, "users"), where("phone", "==", rawIdentifier));
                    querySnap = await getDocs(q);
                }

                if (querySnap.empty) {
                    throw new Error("No account found matching this User ID or Phone Number.");
                }

                const matchedData = querySnap.docs[0].data();
                if (!matchedData.email) {
                    throw new Error("Account has no associated authentication credential.");
                }
                authEmail = matchedData.email;
            }

            await signInWithEmailAndPassword(auth, authEmail, password);
        } catch (error) {
            this.setButtonLoading(false);
            let message = error.message || "Authentication failed. Verify credentials.";
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                message = "Invalid account identifier or access key.";
            } else if (error.code === 'auth/too-many-requests') {
                message = "Access locked temporarily due to excessive failed attempts. Please retry later.";
            }
            this.showAuthError(message);
        }
    }

    setButtonLoading(isLoading) {
        this.dom.loginSubmitBtn.disabled = isLoading;
        this.dom.loginSubmitBtn.querySelector('span').textContent = isLoading ? "Authenticating..." : "Authenticate";
    }

    showAuthError(message) {
        if (!message) {
            this.dom.authErrorMessage.classList.add('hidden');
            this.dom.authErrorMessage.textContent = '';
        } else {
            this.dom.authErrorMessage.classList.remove('hidden');
            this.dom.authErrorMessage.textContent = message;
        }
    }

    initAuthListener() {
        onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    this.currentUser = user;
                    await this.resolveRoleAndRoute(user);
                } else {
                    this.currentUser = null;
                    this.userRole = null;
                    this.userData = null;
                    this.resetToAuthView();
                }
            } catch (err) {
                console.error("Auth routing failure:", err);
                this.resetToAuthView();
            } finally {
                this.hideLoader();
            }
        });
    }

    async resolveRoleAndRoute(user) {
        if (user.uid === SUPER_ADMIN_UID) {
            this.userRole = 'super_admin';
            this.userData = { name: "System Administrator", email: user.email };
            this.renderRoleBadge("SUPER ADMIN", "Administrator");
            this.switchView(this.dom.adminView);
            this.loadExperimentsForClass(this.dom.adminClassSelector.value);
            return;
        }

        try {
            const userDocRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userDocRef);

            if (!userSnap.exists()) {
                await signOut(auth);
                this.showAuthError("Access unauthorized: Profile record not discovered.");
                return;
            }

            const data = userSnap.data();
            this.userData = data;

            if (data.status === 'blocked' || data.isBlocked === true) {
                await signOut(auth);
                this.showAuthError("Account deactivated by administration.");
                return;
            }

            if (data.role === 'admin') {
                this.userRole = 'admin';
                this.renderRoleBadge("ADMIN", data.name || "Administrator");
                this.switchView(this.dom.adminView);
                this.loadExperimentsForClass(this.dom.adminClassSelector.value);
            } else if (data.role === 'teacher') {
                this.userRole = 'teacher';
                const assigned = data.assignedClasses || [];
                this.dom.teacherAssignedDisplay.textContent = `Scope: Classes ${assigned.join(', ')}`;
                this.renderRoleBadge("FACULTY", data.name || "Teacher");
                this.setupTeacherConsole(assigned);
                this.switchView(this.dom.teacherView);
            } else if (data.role === 'student') {
                this.userRole = 'student';
                this.dom.studentClassDisplay.textContent = `Class ${data.standard || '10'}`;
                this.renderRoleBadge("STUDENT", data.name || "Student");
                this.setupStudentStation(data.standard || '10');
                this.switchView(this.dom.studentView);
            } else {
                await signOut(auth);
                this.showAuthError("Undefined clearance credentials.");
            }
        } catch (error) {
            console.error("Profile authorization failure:", error);
            await signOut(auth);
            this.showAuthError("System verification fault. Please re-authenticate.");
        }
    }

    renderRoleBadge(roleLabel, name) {
        this.dom.userRoleTag.textContent = roleLabel;
        this.dom.userNameDisplay.textContent = name;
        this.dom.userProfileBadge.classList.remove('hidden');
    }

        switchView(targetViewElement) {
        this.dom.authSection.classList.remove('active');
        this.dom.adminView.classList.remove('active');
        this.dom.teacherView.classList.remove('active');
        this.dom.studentView.classList.remove('active');
        this.dom.simWorkspaceView.classList.remove('active');

        this.dom.authSection.classList.add('hidden');
        this.dom.adminView.classList.add('hidden');
        this.dom.teacherView.classList.add('hidden');
        this.dom.studentView.classList.add('hidden');
        this.dom.simWorkspaceView.classList.add('hidden');

        // Strictly maintain in-simulation layout flag to prevent header background leakage
        if (targetViewElement === this.dom.simWorkspaceView) {
            document.body.classList.add('in-simulation');
        } else {
            document.body.classList.remove('in-simulation');
        }

        // Show Hamburger exclusively for Admin and Super Admin roles
        if (targetViewElement === this.dom.adminView && (this.userRole === 'super_admin' || this.userRole === 'admin')) {
            this.dom.adminHamburgerBtn.classList.remove('hidden');
        } else {
            this.dom.adminHamburgerBtn.classList.add('hidden');
        }

        targetViewElement.classList.remove('hidden');
        targetViewElement.classList.add('active');
    }


    resetToAuthView() {
        if (this.engine) this.engine.stop();
        if (this.activeSimExperiment) {
            this.engine.unmountExperiment();
            this.activeSimExperiment = null;
        }
        document.body.classList.remove('in-simulation');
        this.dom.adminHamburgerBtn.classList.add('hidden');
        this.dom.adminNavDrawerOverlay.classList.add('hidden');
        this.dom.userProfileBadge.classList.add('hidden');
        this.dom.loginIdentifier.value = '';
        this.dom.loginPassword.value = '';
        this.setButtonLoading(false);
        this.switchView(this.dom.authSection);
    }

    hideLoader() {
        setTimeout(() => {
            this.dom.loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                this.dom.loadingOverlay.classList.add('hidden');
            }, 250);
        }, 150);
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        if (lang === 'ur') {
            this.dom.btnLangUR.classList.add('active');
            this.dom.btnLangEN.classList.remove('active');
            this.dom.dockControlTitle.textContent = "آلات کے کنٹرولز";
            this.dom.dockControlTitle.style.fontFamily = "var(--font-urdu)";
        } else {
            this.dom.btnLangEN.classList.add('active');
            this.dom.btnLangUR.classList.remove('active');
            this.dom.dockControlTitle.textContent = "Apparatus Controls";
            this.dom.dockControlTitle.style.fontFamily = "var(--font-stack)";
        }

        if (this.uiManager) {
            this.uiManager.setLanguage(lang);
        }

        if (this.activeSimExperiment && this.activeSimExperiment.metadata) {
            const meta = this.activeSimExperiment.metadata;
            this.dom.simExperimentTitle.textContent = (lang === 'ur' && meta.titleUrdu) ? meta.titleUrdu : meta.title;
            this.dom.simExperimentTitle.style.fontFamily = lang === 'ur' ? "var(--font-urdu)" : "var(--font-stack)";
        }
    }

    // ========================================================
    // ADMINISTRATIVE DIRECTORIES & EXPERIMENT MODES
    // ========================================================

    async handleCreateTeacher() {
        const userId = this.dom.teacherRegUserId.value.trim();
        const name = document.getElementById('teacherRegName').value.trim();
        const email = document.getElementById('teacherRegEmail').value.trim();
        const phone = document.getElementById('teacherRegPhone').value.trim();
        const password = document.getElementById('teacherRegPassword').value;
        const assigned = Array.from(document.querySelectorAll('input[name="assignedClass"]:checked')).map(cb => cb.value);

        this.dom.teacherRegError.classList.add('hidden');
        if (assigned.length === 0) {
            this.dom.teacherRegError.textContent = "Authorize at least one standard scope.";
            this.dom.teacherRegError.classList.remove('hidden');
            return;
        }

        try {
            const userCred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            const uid = userCred.user.uid;

            await setDoc(doc(db, "users", uid), {
                uid: uid,
                userId: userId,
                name: name,
                email: email,
                phone: phone,
                role: "teacher",
                assignedClasses: assigned,
                status: "active",
                createdAt: new Date().toISOString()
            });

            await signOut(secondaryAuth);
            this.dom.formRegisterTeacher.reset();
            this.dom.modalRegisterTeacher.classList.add('hidden');
            this.loadTeachersDirectory();
        } catch (err) {
            this.dom.teacherRegError.textContent = err.message;
            this.dom.teacherRegError.classList.remove('hidden');
        }
    }

    async handleCreateStudent() {
        const userId = this.dom.studentRegUserId.value.trim();
        const standard = document.getElementById('studentRegClass').value;
        const name = document.getElementById('studentRegName').value.trim();
        const email = document.getElementById('studentRegEmail').value.trim();
        const phone = document.getElementById('studentRegPhone').value.trim();
        const password = document.getElementById('studentRegPassword').value;

        this.dom.studentRegError.classList.add('hidden');

        try {
            const userCred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            const uid = userCred.user.uid;

            await setDoc(doc(db, "users", uid), {
                uid: uid,
                userId: userId,
                name: name,
                email: email,
                standard: standard,
                phone: phone,
                role: "student",
                status: "active",
                createdAt: new Date().toISOString()
            });

            await signOut(secondaryAuth);
            this.dom.formRegisterStudent.reset();
            this.dom.modalRegisterStudent.classList.add('hidden');
            this.loadStudentsDirectory();
        } catch (err) {
            this.dom.studentRegError.textContent = err.message;
            this.dom.studentRegError.classList.remove('hidden');
        }
    }

        async loadExperimentsForClass(classNum) {
        this.dom.experimentsTableBody.innerHTML = `<tr><td colspan="4" class="text-center">Loading registry records...</td></tr>`;

        try {
            const actualExps = this.registeredCatalog.filter(e => e.standard === classNum.toString());

            if (actualExps.length === 0) {
                this.dom.experimentsTableBody.innerHTML = `<tr><td colspan="4" class="text-center">No compiled modules for Standard ${classNum}.</td></tr>`;
                return;
            }

            const controlsDocRef = doc(db, "lab_controls", `class_${classNum}`);
            const docSnap = await getDoc(controlsDocRef);
            const dbData = docSnap.exists() ? (docSnap.data().experiments || {}) : {};

            this.renderExperimentsTable(classNum, actualExps, dbData);
        } catch (err) {
            console.error("Error loading registry:", err);
            this.dom.experimentsTableBody.innerHTML = `<tr><td colspan="4" class="text-center">Failed to fetch controls.</td></tr>`;
        }
    }


    renderExperimentsTable(classNum, actualExps, dbData) {
        this.dom.experimentsTableBody.innerHTML = '';

        actualExps.forEach(exp => {
            const remote = dbData[exp.id] || { statusMode: 'unlocked' };
            let currentMode = remote.statusMode;
            if (!currentMode) {
                if (remote.isAvailable === false) currentMode = 'hidden';
                else if (remote.isLocked === true) currentMode = 'locked';
                else currentMode = 'unlocked';
            }

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><code>${exp.id}</code></td>
                <td><strong>${exp.title}</strong> <small style="color:var(--text-muted)">(${exp.subject})</small></td>
                <td>
                    <select class="admin-mode-select" data-id="${exp.id}">
                        <option value="unlocked" ${currentMode === 'unlocked' ? 'selected' : ''}>Visible & Unlocked</option>
                        <option value="locked" ${currentMode === 'locked' ? 'selected' : ''}>Visible & Locked</option>
                        <option value="hidden" ${currentMode === 'hidden' ? 'selected' : ''}>Hidden from Students</option>
                    </select>
                </td>
                <td>
                    <span class="badge-${currentMode === 'unlocked' ? 'student' : currentMode === 'locked' ? 'super-admin' : 'teacher'}">
                        ${currentMode.toUpperCase()}
                    </span>
                </td>
            `;

            row.querySelector('.admin-mode-select').addEventListener('change', async (e) => {
                const expId = e.target.dataset.id;
                const newMode = e.target.value;
                await this.updateExperimentMode(classNum, expId, newMode);
            });

            this.dom.experimentsTableBody.appendChild(row);
        });
    }

    async updateExperimentMode(classNum, expId, mode) {
        try {
            const controlsDocRef = doc(db, "lab_controls", `class_${classNum}`);
            const isAvailable = mode !== 'hidden';
            const isLocked = mode === 'locked';

            await setDoc(controlsDocRef, {
                standard: parseInt(classNum),
                experiments: {
                    [expId]: { 
                        statusMode: mode,
                        isAvailable: isAvailable, 
                        isLocked: isLocked 
                    }
                }
            }, { merge: true });

            this.loadExperimentsForClass(classNum);
        } catch (err) {
            alert("Status update failed: " + err.message);
        }
    }

    async loadTeachersDirectory() {
        this.dom.teachersTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Loading faculty records...</td></tr>`;
        try {
            const q = query(collection(db, "users"), where("role", "==", "teacher"));
            const querySnap = await getDocs(q);

            this.dom.teachersTableBody.innerHTML = '';
            if (querySnap.empty) {
                this.dom.teachersTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No faculty enrolled yet.</td></tr>`;
                return;
            }

            querySnap.forEach(snap => {
                const t = snap.data();
                const tr = document.createElement('tr');
                const isBlocked = t.status === 'blocked';
                tr.innerHTML = `
                    <td><code>${t.userId || '-'}</code></td>
                    <td>${t.name}</td>
                    <td>${t.email}</td>
                    <td>${t.assignedClasses ? t.assignedClasses.join(', ') : 'None'}</td>
                    <td><span class="badge-${isBlocked ? 'super-admin' : 'student'}">${t.status.toUpperCase()}</span></td>
                    <td>
                        <div class="table-action-group">
                            <button class="btn-status-toggle ${isBlocked ? 'blocked' : 'active'}" data-uid="${t.uid}" data-status="${t.status}">
                                ${isBlocked ? 'Activate' : 'Suspend'}
                            </button>
                            <button class="btn-delete-row" data-uid="${t.uid}" data-name="${t.name}">
                                Delete
                            </button>
                        </div>
                    </td>
                `;

                tr.querySelector('.btn-status-toggle').addEventListener('click', async (e) => {
                    const uid = e.target.dataset.uid;
                    const currentStatus = e.target.dataset.status;
                    const nextStatus = currentStatus === 'active' ? 'blocked' : 'active';
                    await updateDoc(doc(db, "users", uid), { status: nextStatus });
                    this.loadTeachersDirectory();
                });

                tr.querySelector('.btn-delete-row').addEventListener('click', async (e) => {
                    const uid = e.target.dataset.uid;
                    const name = e.target.dataset.name;
                    if (confirm(`Permanently terminate record for faculty "${name}"?`)) {
                        await deleteDoc(doc(db, "users", uid));
                        this.loadTeachersDirectory();
                    }
                });

                this.dom.teachersTableBody.appendChild(tr);
            });
        } catch (err) {
            this.dom.teachersTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Failed to load directory.</td></tr>`;
        }
    }

    async loadStudentsDirectory() {
        this.dom.studentsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Loading student records...</td></tr>`;
        try {
            const q = query(collection(db, "users"), where("role", "==", "student"));
            const querySnap = await getDocs(q);

            this.dom.studentsTableBody.innerHTML = '';
            if (querySnap.empty) {
                this.dom.studentsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No student records enrolled.</td></tr>`;
                return;
            }

            querySnap.forEach(snap => {
                const s = snap.data();
                const tr = document.createElement('tr');
                const isBlocked = s.status === 'blocked';
                tr.innerHTML = `
                    <td><code>${s.userId || '-'}</code></td>
                    <td>${s.name}</td>
                    <td>Class ${s.standard}</td>
                    <td>${s.phone || '-'}</td>
                    <td><span class="badge-${isBlocked ? 'super-admin' : 'student'}">${s.status.toUpperCase()}</span></td>
                    <td>
                        <div class="table-action-group">
                            <button class="btn-status-toggle ${isBlocked ? 'blocked' : 'active'}" data-uid="${s.uid}" data-status="${s.status}">
                                ${isBlocked ? 'Activate' : 'Suspend'}
                            </button>
                            <button class="btn-delete-row" data-uid="${s.uid}" data-name="${s.name}">
                                Delete
                            </button>
                        </div>
                    </td>
                `;

                tr.querySelector('.btn-status-toggle').addEventListener('click', async (e) => {
                    const uid = e.target.dataset.uid;
                    const currentStatus = e.target.dataset.status;
                    const nextStatus = currentStatus === 'active' ? 'blocked' : 'active';
                    await updateDoc(doc(db, "users", uid), { status: nextStatus });
                    this.loadStudentsDirectory();
                });

                tr.querySelector('.btn-delete-row').addEventListener('click', async (e) => {
                    const uid = e.target.dataset.uid;
                    const name = e.target.dataset.name;
                    if (confirm(`Permanently terminate student profile for "${name}"?`)) {
                        await deleteDoc(doc(db, "users", uid));
                        this.loadStudentsDirectory();
                    }
                });

                this.dom.studentsTableBody.appendChild(tr);
            });
        } catch (err) {
            this.dom.studentsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Failed to load directory.</td></tr>`;
        }
    }

    // ========================================================
    // FACULTY CONSOLE & CUSTOM SELECT SCOPES
    // ========================================================

    setupTeacherConsole(assignedClasses) {
        this.dom.teacherClassCustomOptions.innerHTML = '';
        if (!assignedClasses || assignedClasses.length === 0) {
            this.dom.teacherClassCustomSelect.querySelector('.custom-select-trigger span').textContent = "No Scope Assigned";
            return;
        }

        assignedClasses.forEach((cls, idx) => {
            const opt = document.createElement('div');
            opt.className = `custom-option ${idx === 0 ? 'selected' : ''}`;
            opt.dataset.value = cls;
            opt.textContent = `Class ${cls}`;
            this.dom.teacherClassCustomOptions.appendChild(opt);
        });

        const firstCls = assignedClasses[0];
        const trigger = this.dom.teacherClassCustomSelect.querySelector('.custom-select-trigger');
        trigger.querySelector('span').textContent = `Class ${firstCls}`;
        trigger.dataset.value = firstCls;
        this.dom.teacherClassSelector.value = firstCls;

        this.bindCustomSelect(this.dom.teacherClassCustomSelect, (val) => {
            this.dom.teacherClassSelector.value = val;
            this.loadTeacherExperiments(val);
        });

        this.loadTeacherExperiments(firstCls);
    }

        async loadTeacherExperiments(classNum) {
        if (!classNum) return;
        this.dom.teacherExperimentsTableBody.innerHTML = `<tr><td colspan="4" class="text-center">Loading scope controls...</td></tr>`;

        const actualExps = this.registeredCatalog.filter(e => e.standard === classNum.toString());

        if (actualExps.length === 0) {
            this.dom.teacherExperimentsTableBody.innerHTML = `<tr><td colspan="4" class="text-center">No compiled modules for Standard ${classNum}.</td></tr>`;
            return;
        }


        try {
            const controlsDocRef = doc(db, "lab_controls", `class_${classNum}`);
            const docSnap = await getDoc(controlsDocRef);
            const dbData = docSnap.exists() ? (docSnap.data().experiments || {}) : {};

            this.dom.teacherExperimentsTableBody.innerHTML = '';
            actualExps.forEach(exp => {
                const remote = dbData[exp.id] || { isAvailable: true, isLocked: false };
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><code>${exp.id}</code></td>
                    <td><strong>${exp.title}</strong></td>
                    <td><span class="badge-${remote.isAvailable !== false ? 'student' : 'super-admin'}">${remote.isAvailable !== false ? 'ACTIVE' : 'RESTRICTED'}</span></td>
                    <td>
                        <button class="btn-status-toggle ${remote.isLocked ? 'blocked' : 'active'}" data-id="${exp.id}">
                            ${remote.isLocked ? 'Unlock Lab' : 'Lock Lab'}
                        </button>
                    </td>
                `;

                row.querySelector('.btn-status-toggle').addEventListener('click', async (e) => {
                    const expId = e.target.dataset.id;
                    const nextLockState = !remote.isLocked;
                    await setDoc(controlsDocRef, {
                        experiments: {
                            [expId]: { isLocked: nextLockState }
                        }
                    }, { merge: true });
                    this.loadTeacherExperiments(classNum);
                });

                this.dom.teacherExperimentsTableBody.appendChild(row);
            });
        } catch (err) {
            this.dom.teacherExperimentsTableBody.innerHTML = `<tr><td colspan="4" class="text-center">Failed to fetch controls.</td></tr>`;
        }
    }

    async loadTeacherStudentsDirectory() {
        this.dom.teacherStudentsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Loading enrolled roster...</td></tr>`;
        const assignedClasses = this.userData?.assignedClasses || [];

        if (assignedClasses.length === 0) {
            this.dom.teacherStudentsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No classes assigned to profile.</td></tr>`;
            return;
        }

        try {
            const q = query(collection(db, "users"), where("role", "==", "student"), where("standard", "in", assignedClasses));
            const querySnap = await getDocs(q);

            this.dom.teacherStudentsTableBody.innerHTML = '';
            if (querySnap.empty) {
                this.dom.teacherStudentsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">No students registered in assigned scope.</td></tr>`;
                return;
            }

            querySnap.forEach(snap => {
                const s = snap.data();
                const tr = document.createElement('tr');
                const isBlocked = s.status === 'blocked';
                tr.innerHTML = `
                    <td><code>${s.userId || '-'}</code></td>
                    <td>${s.name}</td>
                    <td>Class ${s.standard}</td>
                    <td>${s.phone || '-'}</td>
                    <td><span class="badge-${isBlocked ? 'super-admin' : 'student'}">${s.status.toUpperCase()}</span></td>
                    <td>
                        <button class="btn-status-toggle ${isBlocked ? 'blocked' : 'active'}" data-uid="${s.uid}" data-status="${s.status}">
                            ${isBlocked ? 'Activate' : 'Suspend'}
                        </button>
                    </td>
                `;

                tr.querySelector('.btn-status-toggle').addEventListener('click', async (e) => {
                    const uid = e.target.dataset.uid;
                    const currentStatus = e.target.dataset.status;
                    const nextStatus = currentStatus === 'active' ? 'blocked' : 'active';
                    await updateDoc(doc(db, "users", uid), { status: nextStatus });
                    this.loadTeacherStudentsDirectory();
                });

                this.dom.teacherStudentsTableBody.appendChild(tr);
            });
        } catch (err) {
            this.dom.teacherStudentsTableBody.innerHTML = `<tr><td colspan="6" class="text-center">Failed to load student roster.</td></tr>`;
        }
    }

    // ========================================================
    // DIRECT LAB SIMULATOR (SUPER ADMIN ACCESS)
    // ========================================================

    setupAdminLabStation(standard) {
        this.adminCurrentSelectedStandard = standard;
        this.renderAdminLabSubjectCards(standard);
        this.showAdminLabSubjectsView();
    }

      normalizeSubjectKey(str) {
        if (!str) return '';
        return str.toLowerCase().replace(/part\s*/g, '').replace(/[-\s]/g, '');
    }

    isSubjectMatch(expSubject, targetSubjectId) {
        if (targetSubjectId === "General Science" || expSubject === "General Science") return true;
        return this.normalizeSubjectKey(expSubject) === this.normalizeSubjectKey(targetSubjectId);
    }

        renderAdminLabSubjectCards(standard) {
        this.dom.adminLabSubjectsView.innerHTML = '';

                const allPossibleSubjects = [
            { id: "Physics", title: "Physics", icon: "🔭", desc: "Optics, Electrodynamics, Mechanics & Modern Physics Labs" },
            { id: "Chemistry", title: "Chemistry", icon: "🧪", desc: "Volumetric Analysis, Kinetics & Inorganic Qualitative Labs" },
            { id: "Biology", title: "Biology", icon: "🧬", desc: "Physiology, Genetics & Ecological Practicals" },
            { id: "Mathematics", title: "Mathematics", icon: "📐", desc: "Calculus, Vectors & 3D Analytical Geometry Labs" },
            { id: "Science 1", title: "Science Part 1", icon: "⚡", desc: "Physical Sciences, Electrodynamics & Chemical Systems" },
            { id: "Science 2", title: "Science Part 2", icon: "🌿", desc: "Biological & Environmental Sciences Modules" },
            { id: "General Science", title: `Class ${standard} General Science`, icon: "🔬", desc: "Fundamental Practical Curriculum Modules" }
        ];


        const availableSubjects = allPossibleSubjects.filter(sub => {
            return this.registeredCatalog.some(e => e.standard === standard.toString() && this.isSubjectMatch(e.subject, sub.id));
        });


        if (availableSubjects.length === 0) {
            this.dom.adminLabSubjectsView.innerHTML = `<div class="admin-placeholder-box"><p>No active laboratory modules compiled for Class ${standard} yet.</p></div>`;
            return;
        }

        availableSubjects.forEach(sub => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <div>
                    <div class="subject-card-icon">${sub.icon}</div>
                    <div class="subject-card-title">${sub.title}</div>
                    <div class="subject-card-desc">${sub.desc}</div>
                </div>
                <button class="btn-primary" style="margin-top:14px;">Open Laboratory →</button>
            `;

            card.addEventListener('click', () => {
                this.openAdminLabExperiments(sub.id, sub.title);
            });

            this.dom.adminLabSubjectsView.appendChild(card);
        });
    }


    showAdminLabSubjectsView() {
        this.dom.adminLabSubjectsView.classList.remove('hidden');
        this.dom.adminLabExperimentsView.classList.add('hidden');
        this.dom.adminLabBreadcrumbContainer.classList.add('hidden');
        this.dom.adminLabStandardBar.classList.remove('hidden');
    }

    openAdminLabExperiments(subjectId, subjectTitle) {
        this.adminSelectedSubjectId = subjectId;
        this.dom.adminSelectedSubjectTitle.textContent = `${subjectTitle} Laboratory`;
        this.dom.adminSelectedSubjectSub.textContent = `All compiled practicals for Standard ${this.adminCurrentSelectedStandard}.`;

        this.dom.adminLabSubjectsView.classList.add('hidden');
        this.dom.adminLabExperimentsView.classList.remove('hidden');
        this.dom.adminLabBreadcrumbContainer.classList.remove('hidden');
        this.dom.adminLabStandardBar.classList.add('hidden');

        this.loadAdminExperimentCards(this.adminCurrentSelectedStandard, subjectId);
    }

            loadAdminExperimentCards(standard, subjectId) {
        this.dom.adminExperimentCardsDeck.innerHTML = '';

        const matched = this.registeredCatalog.filter(e => 
            e.standard === standard.toString() && 
            this.isSubjectMatch(e.subject, subjectId)
        );

        if (matched.length === 0) {
            this.dom.adminExperimentCardsDeck.innerHTML = `<p>No practicals discovered for this discipline.</p>`;
            return;
        }

        matched.forEach(exp => {
            const card = document.createElement('div');
            card.className = 'experiment-card';
            card.innerHTML = `
                <div>
                    <span class="experiment-card-badge badge-unlocked">UNRESTRICTED ACCESS</span>
                    <div class="experiment-card-title">${exp.title}</div>
                    <div class="experiment-card-desc">Simulated hardware apparatus ready for empirical telemetry.</div>
                </div>
                <button class="btn-launch-exp" data-id="${exp.id}">Start</button>
            `;

            card.querySelector('.btn-launch-exp').addEventListener('click', () => {
                this.launchExperimentSimulation(exp);
            });

            this.dom.adminExperimentCardsDeck.appendChild(card);
        });
    }

    // ========================================================
    // STUDENT DISCOVERY & LAUNCHER
    // ========================================================

    setupStudentStation(standard) {
        this.currentStudentClass = standard;
        this.renderSubjectCards(standard);
        this.showStudentSubjectsView();
    }

            renderSubjectCards(standard) {
        this.dom.studentSubjectsView.innerHTML = '';

                const allPossibleSubjects = [
            { id: "Physics", title: "Physics", icon: "🔭", desc: "Optics, Electrodynamics, Mechanics & Modern Physics Labs" },
            { id: "Chemistry", title: "Chemistry", icon: "🧪", desc: "Volumetric Analysis, Kinetics & Inorganic Qualitative Labs" },
            { id: "Biology", title: "Biology", icon: "🧬", desc: "Physiology, Genetics & Ecological Practicals" },
            { id: "Mathematics", title: "Mathematics", icon: "📐", desc: "Calculus, Vectors & 3D Analytical Geometry Labs" },
            { id: "Science 1", title: "Science Part 1", icon: "⚡", desc: "Physical Sciences, Electrodynamics & Chemical Systems" },
            { id: "Science 2", title: "Science Part 2", icon: "🌿", desc: "Biological & Environmental Sciences Modules" },
            { id: "General Science", title: `Class ${standard} General Science`, icon: "🔬", desc: "Fundamental Practical Curriculum Modules" }
        ];


        const availableSubjects = allPossibleSubjects.filter(sub => {
            return this.registeredCatalog.some(e => e.standard === standard.toString() && this.isSubjectMatch(e.subject, sub.id));
        });



        if (availableSubjects.length === 0) {
            this.dom.studentSubjectsView.innerHTML = `<div class="admin-placeholder-box"><p>No authorized laboratory modules for Class ${standard} yet.</p></div>`;
            return;
        }

        availableSubjects.forEach(sub => {
            const card = document.createElement('div');
            card.className = 'subject-card';
            card.innerHTML = `
                <div>
                    <div class="subject-card-icon">${sub.icon}</div>
                    <div class="subject-card-title">${sub.title}</div>
                    <div class="subject-card-desc">${sub.desc}</div>
                </div>
                <button class="btn-primary" style="margin-top:14px;">Explore Practicals →</button>
            `;

            card.addEventListener('click', () => {
                this.openSubjectExperiments(sub.id, sub.title);
            });

            this.dom.studentSubjectsView.appendChild(card);
        });
    }

    showStudentSubjectsView() {
        this.dom.studentSubjectsView.classList.remove('hidden');
        this.dom.studentExperimentsView.classList.add('hidden');
        this.dom.studentBreadcrumbContainer.classList.add('hidden');
    }

    async openSubjectExperiments(subjectId, subjectTitle) {
        this.selectedSubject = subjectId;
        this.dom.currentSelectedSubjectTitle.textContent = `${subjectTitle} Laboratory`;
        this.dom.currentSelectedSubjectSub.textContent = `Available practical modules for Class ${this.currentStudentClass}.`;

        this.dom.studentSubjectsView.classList.add('hidden');
        this.dom.studentExperimentsView.classList.remove('hidden');
        this.dom.studentBreadcrumbContainer.classList.remove('hidden');

        await this.loadStudentExperimentCards(this.currentStudentClass, subjectId);
    }

            async loadStudentExperimentCards(standard, subjectId) {
        this.dom.studentExperimentCardsDeck.innerHTML = '';

        const matchedCatalogExps = this.registeredCatalog.filter(e => 
            e.standard === standard.toString() && 
            this.isSubjectMatch(e.subject, subjectId)
        );

        if (matchedCatalogExps.length === 0) {
            this.dom.studentExperimentCardsDeck.innerHTML = `<p>No active experiments configured for this subject.</p>`;
            return;
        }

        try {
            const controlsDocRef = doc(db, "lab_controls", `class_${standard}`);
            const docSnap = await getDoc(controlsDocRef);
            const dbData = docSnap.exists() ? (docSnap.data().experiments || {}) : {};

            matchedCatalogExps.forEach(exp => {
                const remote = dbData[exp.id] || { statusMode: 'unlocked' };
                let mode = remote.statusMode;
                if (!mode) {
                    if (remote.isAvailable === false) mode = 'hidden';
                    else if (remote.isLocked === true) mode = 'locked';
                    else mode = 'unlocked';
                }

                // Security Gate 1: Completely suppress hidden experiments
                if (mode === 'hidden') return;

                const isLocked = mode === 'locked';
                const card = document.createElement('div');
                card.className = `experiment-card ${isLocked ? 'locked' : ''}`;

                card.innerHTML = `
                    <div>
                        <span class="experiment-card-badge ${isLocked ? 'badge-locked' : 'badge-unlocked'}">
                            ${isLocked ? 'RESTRICTED ACCESS' : 'READY TO COMMENCE'}
                        </span>
                        <div class="experiment-card-title">${exp.title}</div>
                        <div class="experiment-card-desc">Standard curriculum simulation apparatus.</div>
                    </div>
                    <button class="btn-launch-exp" ${isLocked ? 'disabled' : ''} data-id="${exp.id}">
                        ${isLocked ? 'Locked' : 'Start'}
                    </button>
                `;

                // Security Gate 2: Locked experiments will NEVER trigger network import
                if (!isLocked) {
                    card.querySelector('.btn-launch-exp').addEventListener('click', () => {
                        this.launchExperimentSimulation(exp);
                    });
                }

                this.dom.studentExperimentCardsDeck.appendChild(card);
            });

            if (this.dom.studentExperimentCardsDeck.children.length === 0) {
                this.dom.studentExperimentCardsDeck.innerHTML = `<p>No authorized experiments currently available.</p>`;
            }
        } catch (err) {
            this.dom.studentExperimentCardsDeck.innerHTML = `<p>Error loading modules: ${err.message}</p>`;
        }
    }


    // ========================================================
    // SIMULATION RUNTIME & DOCK BINDING
    // ========================================================

        // ========================================================
    // SECURE ON-DEMAND DYNAMIC LOADER WITH MICRO-LOADER
    // ========================================================

    async launchExperimentSimulation(expConfig) {
        // Activate Micro-Loader Spinner
        if (this.dom.practicalLoadingOverlay) {
            this.dom.practicalLoadingOverlay.classList.remove('hidden');
            this.dom.practicalLoadingOverlay.classList.remove('fade-out');
        }

        try {
            // Lazy-load module only when user hits Start
            if (!expConfig.isLoaded || !expConfig.instanceClass) {
                const expModule = await import(expConfig.filePath);
                if (!expModule || !expModule.Experiment) {
                    throw new Error("Experiment module structure is invalid.");
                }
                expConfig.instanceClass = expModule.Experiment;
                expConfig.metadata = expModule.metadata || {};
                expConfig.isLoaded = true;
            }

            document.body.classList.add('in-simulation');
            this.switchView(this.dom.simWorkspaceView);

            const meta = expConfig.metadata;
            this.dom.simExperimentTitle.textContent = meta.title || expConfig.title;
            this.dom.simExperimentMeta.textContent = `Class ${expConfig.standard} • ${expConfig.subject}`;

                        const simInstance = new expConfig.instanceClass(this.dom.simCanvas, this.currentLang);
            simInstance.metadata = meta;
            simInstance.showNote = (title, body) => this.showStageNote(title, body);
            simInstance.hideNote = () => this.hideStageNote();

            this.activeSimExperiment = simInstance;
            this.hideInstrumentPopover();
            this.hideStageNote();

            if (this.uiManager && this.uiManager.setSheetSnap) {
                this.uiManager.setSheetSnap('split');
            }

            await this.engine.mountExperiment(simInstance);
            this.uiManager.render(simInstance);
            this.engine.start();
            this.switchLanguage(this.currentLang);

        } catch (err) {
            console.error("Secure mount failed:", err);
            alert(`Unable to initialize practical: ${err.message}`);
        } finally {
            // Dismiss Micro-Loader Spinner with smooth fade
            if (this.dom.practicalLoadingOverlay) {
                setTimeout(() => {
                    this.dom.practicalLoadingOverlay.classList.add('fade-out');
                    setTimeout(() => {
                        this.dom.practicalLoadingOverlay.classList.add('hidden');
                    }, 250);
                }, 180);
            }
        }
    }


    toggleLabFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
            this.dom.iconEnterFS.classList.add('hidden');
            this.dom.iconExitFS.classList.remove('hidden');
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
            this.dom.iconExitFS.classList.add('hidden');
            this.dom.iconEnterFS.classList.remove('hidden');
        }
    }

    applyEngineZoom(percent) {
        this.dom.zoomPercentDisplay.textContent = `${percent}%`;
        if (this.engine) {
            this.engine.setZoom(percent / 100);
        }
        this.hideInstrumentPopover();
    }

        handleCanvasSingleTap(e) {
        if (!this.activeSimExperiment) return;

        const rect = this.dom.simCanvas.getBoundingClientRect();
        const screenX = e.clientX - rect.left;
        const screenY = e.clientY - rect.top;

        let hit = null;

        if (this.engine.renderMode === '3d') {
            hit = this.engine.raycast3D(screenX, screenY);
        }

        if (!hit && this.activeSimExperiment.getInstrumentAtPoint) {
            const worldPt = this.engine.screenToWorld(screenX, screenY);
            hit = this.activeSimExperiment.getInstrumentAtPoint(worldPt.x, worldPt.y, this.engine.width, this.engine.height);
        }

        if (hit) {
            const clampedX = Math.max(70, Math.min(this.engine.width - 70, screenX));
            const clampedY = Math.max(44, Math.min(this.engine.height - 20, screenY - 12));

            this.dom.popoverInstrumentName.textContent = hit.name;
            this.dom.instrumentPopover.style.left = `${clampedX}px`;
            this.dom.instrumentPopover.style.top = `${clampedY}px`;
            this.dom.instrumentPopover.classList.remove('hidden');
        } else {
            this.hideInstrumentPopover();
        }
    }

    hideInstrumentPopover() {
        if (this.dom.instrumentPopover) {
            this.dom.instrumentPopover.classList.add('hidden');
        }
    }

    showStageNote(title, body) {
        if (!this.dom.stageNoteCard) return;
        const isUr = this.currentLang === 'ur';
        this.dom.stageNoteTitle.textContent = title || (isUr ? 'مشاہداتی نوٹ' : 'Observation Note');
        this.dom.stageNoteBody.textContent = body || '';
        this.dom.stageNoteTitle.classList.toggle('is-urdu', isUr);
        this.dom.stageNoteBody.classList.toggle('is-urdu', isUr);
        this.dom.stageNoteCard.classList.remove('hidden');
    }

    hideStageNote() {
        if (this.dom.stageNoteCard) {
            this.dom.stageNoteCard.classList.add('hidden');
        }
    }


    openApparatusDrawer() {
        this.hideInstrumentPopover();
        const meta = this.activeSimExperiment?.metadata;
        if (!meta) return;

        const isUr = this.currentLang === 'ur';
        this.dom.drawerApparatusList.innerHTML = '';

        if (meta.apparatusList && meta.apparatusList.length > 0) {
            meta.apparatusList.forEach(app => {
                const item = document.createElement('div');
                item.className = 'drawer-apparatus-item';
                item.innerHTML = `
                    <div class="drawer-apparatus-name ${isUr ? 'is-urdu' : ''}">${isUr ? app.nameUrdu : app.name}</div>
                    <div class="drawer-apparatus-desc ${isUr ? 'is-urdu' : ''}">${isUr ? app.descUrdu : app.desc}</div>
                `;
                this.dom.drawerApparatusList.appendChild(item);
            });
        }

        const summary = document.createElement('div');
        summary.className = 'drawer-exp-summary';
        summary.innerHTML = `
            <h4>${isUr ? 'تجرباتی اصول' : 'Scientific Principle'}</h4>
            <p class="${isUr ? 'is-urdu' : ''}">${isUr ? (meta.descriptionUrdu || meta.description) : meta.description}</p>
        `;
        this.dom.drawerApparatusList.appendChild(summary);

        this.dom.apparatusDrawerOverlay.classList.remove('hidden');
    }

    closeApparatusDrawer() {
        this.dom.apparatusDrawerOverlay.classList.add('hidden');
    }

        exitSimulation() {
        this.hideInstrumentPopover();
        this.hideStageNote();
        if (this.engine) this.engine.stop();
        if (this.activeSimExperiment) {
            this.engine.unmountExperiment();
            this.activeSimExperiment = null;
        }
        document.body.classList.remove('in-simulation');

        if (this.currentUser) {
            if (this.userRole === 'super_admin' || this.userRole === 'admin') {
                this.switchView(this.dom.adminView);
                if (!this.dom.adminAccessLabSection.classList.contains('hidden')) {
                    this.showAdminLabSubjectsView();
                }
            } else if (this.userRole === 'teacher') {
                this.switchView(this.dom.teacherView);
            } else {
                this.switchView(this.dom.studentView);
                this.openSubjectExperiments(this.selectedSubject || 'Science 1', this.selectedSubject || 'Science Part 1');
            }
        } else {
            this.switchView(this.dom.authSection);
        }
    }
}

// Bootstrap application on DOM ready with safety fallback
document.addEventListener('DOMContentLoaded', () => {
    try {
        new DigiLabApp();
    } catch (err) {
        console.error("Critical Bootstrap Failure:", err);
        const overlay = document.getElementById('appLoadingOverlay');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.classList.add('hidden'), 250);
        }
    }
});
