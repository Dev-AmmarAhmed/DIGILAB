import { 
    db, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc, 
    collection, 
    query, 
    where, 
    getDocs, 
    onSnapshot,
    secondaryAuth,
    createUserWithEmailAndPassword
} from "./firebase.js";

export class AdminController {
    constructor() {
        this.currentClass = "10";
        this.currentSubject = "science-1";
        this.controlsUnsubscribe = null;

        this.initDOMElements();
        this.bindEvents();
    }

    initDOMElements() {
        this.dom = {
            classSelector: document.getElementById('adminClassSelector'),
            subjectSelector: document.getElementById('adminSubjectSelector'),
            syncDefaultsBtn: document.getElementById('adminSyncDefaultsBtn'),
            experimentsTbody: document.getElementById('adminExperimentsTableBody'),
            teachersTbody: document.getElementById('adminTeachersTableBody'),
            studentsTbody: document.getElementById('adminStudentsTableBody'),
            tabButtons: document.querySelectorAll('.admin-tab-bar .tab-btn'),
            tabContents: document.querySelectorAll('.tab-content'),
            btnOpenAddTeacher: document.getElementById('btnOpenAddTeacherModal'),
            btnOpenAddStudent: document.getElementById('btnOpenAddStudentModal'),
            modalTeacher: document.getElementById('modalAddTeacher'),
            modalStudent: document.getElementById('modalAddStudent'),
            formAddTeacher: document.getElementById('formAddTeacher'),
            formAddStudent: document.getElementById('formAddStudent'),
            teacherError: document.getElementById('addTeacherError'),
            studentError: document.getElementById('addStudentError'),
            closeModalBtns: document.querySelectorAll('.btn-close-modal')
        };
    }

    bindEvents() {
        // Tab switching
        this.dom.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                this.dom.tabButtons.forEach(b => b.classList.remove('active'));
                this.dom.tabContents.forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(target).classList.add('active');

                if (target === 'tabTeachers') this.loadTeachers();
                if (target === 'tabStudents') this.loadStudents();
            });
        });

        // Filter changes
        this.dom.classSelector.addEventListener('change', (e) => {
            this.currentClass = e.target.value;
            this.listenToExperiments();
        });

        this.dom.subjectSelector.addEventListener('change', (e) => {
            this.currentSubject = e.target.value;
            this.listenToExperiments();
        });

        // Seed defaults
        this.dom.syncDefaultsBtn.addEventListener('click', async () => {
            await this.seedDefaultExperiments();
        });

        // Modal Open/Close
        this.dom.btnOpenAddTeacher.addEventListener('click', () => {
            this.dom.modalTeacher.classList.remove('hidden');
        });

        this.dom.btnOpenAddStudent.addEventListener('click', () => {
            this.dom.modalStudent.classList.remove('hidden');
        });

        this.dom.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetModal = document.getElementById(btn.dataset.close);
                if (targetModal) targetModal.classList.add('hidden');
            });
        });

        // Form Submissions
        this.dom.formAddTeacher.addEventListener('submit', (e) => this.handleCreateTeacher(e));
        this.dom.formAddStudent.addEventListener('submit', (e) => this.handleCreateStudent(e));
    }

    mount() {
        this.listenToExperiments();
    }

    unmount() {
        if (this.controlsUnsubscribe) {
            this.controlsUnsubscribe();
            this.controlsUnsubscribe = null;
        }
    }

    listenToExperiments() {
        if (this.controlsUnsubscribe) {
            this.controlsUnsubscribe();
        }

        const docPath = `lab_controls/class_${this.currentClass}`;
        const docRef = doc(db, "lab_controls", `class_${this.currentClass}`);

        this.controlsUnsubscribe = onSnapshot(docRef, (snap) => {
            if (!snap.exists()) {
                this.dom.experimentsTbody.innerHTML = `
                    <tr>
                        <td colspan="5" class="table-loader">
                            No experiment configurations found for Class ${this.currentClass}. Click "Seed Default Registry" to initialize.
                        </td>
                    </tr>
                `;
                return;
            }

            const data = snap.data();
            const experiments = data.experiments || {};
            this.renderExperimentsTable(experiments);
        }, (err) => {
            console.error("Experiment Listener Failed:", err);
            this.dom.experimentsTbody.innerHTML = `<tr><td colspan="5" class="form-error">Failed to load experiments.</td></tr>`;
        });
    }

    renderExperimentsTable(experiments) {
        const keys = Object.keys(experiments);
        if (keys.length === 0) {
            this.dom.experimentsTbody.innerHTML = `<tr><td colspan="5" class="table-loader">No practicals found.</td></tr>`;
            return;
        }

        let html = '';
        keys.forEach(expKey => {
            const exp = experiments[expKey];
            html += `
                <tr>
                    <td>
                        <strong>${exp.title || expKey}</strong>
                        <div class="text-sub">${exp.titleUrdu || ''}</div>
                    </td>
                    <td>${exp.chapter ? `Chapter ${exp.chapter}` : 'General'}</td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" ${exp.isAvailable ? 'checked' : ''} data-key="${expKey}" class="toggle-availability">
                            <span class="slider-toggle"></span>
                        </label>
                    </td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" ${exp.isLocked ? 'checked' : ''} data-key="${expKey}" class="toggle-lock">
                            <span class="slider-toggle"></span>
                        </label>
                    </td>
                    <td>
                        <span class="text-sub">${exp.isLocked ? '🔒 Locked' : '🟢 Unlocked'}</span>
                    </td>
                </tr>
            `;
        });

        this.dom.experimentsTbody.innerHTML = html;

        // Bind Realtime Toggles
        this.dom.experimentsTbody.querySelectorAll('.toggle-availability').forEach(toggle => {
            toggle.addEventListener('change', async (e) => {
                const key = e.target.dataset.key;
                const isChecked = e.target.checked;
                await this.updateExperimentField(key, 'isAvailable', isChecked);
            });
        });

        this.dom.experimentsTbody.querySelectorAll('.toggle-lock').forEach(toggle => {
            toggle.addEventListener('change', async (e) => {
                const key = e.target.dataset.key;
                const isChecked = e.target.checked;
                await this.updateExperimentField(key, 'isLocked', isChecked);
            });
        });
    }

    async updateExperimentField(expKey, fieldName, value) {
        const docRef = doc(db, "lab_controls", `class_${this.currentClass}`);
        try {
            await updateDoc(docRef, {
                [`experiments.${expKey}.${fieldName}`]: value
            });
        } catch (err) {
            console.error("Update experiment failed:", err);
            alert("Error updating experiment: " + err.message);
        }
    }

    async seedDefaultExperiments() {
        const docRef = doc(db, "lab_controls", `class_${this.currentClass}`);
        
        // Initial experiments configuration for Class 10th Science 1
        const initialClass10Payload = {
            standard: 10,
            subject: "Science 1",
            experiments: {
                "exp_10_01_gravitation": {
                    title: "Simple Pendulum (Value of g)",
                    titleUrdu: "سادہ لولک (کشش ثقل کی قیمت)",
                    chapter: 1,
                    isAvailable: true,
                    isLocked: false
                },
                "exp_10_03_reactions": {
                    title: "Chemical Reactions (Types of Reactions)",
                    titleUrdu: "کیمیائی تعاملات کی اقسام",
                    chapter: 3,
                    isAvailable: true,
                    isLocked: false
                },
                "exp_10_04_ohms_law": {
                    title: "Verification of Ohm's Law (V = IR)",
                    titleUrdu: "اوہم کے قانون کی تصدیق",
                    chapter: 4,
                    isAvailable: true,
                    isLocked: false
                },
                "exp_10_05_heat": {
                    title: "Specific Heat Capacity",
                    titleUrdu: "مخصوص حرارت کی گنجائش",
                    chapter: 5,
                    isAvailable: true,
                    isLocked: false
                },
                "exp_10_06_refraction": {
                    title: "Refraction through Glass Slab (Snell's Law)",
                    titleUrdu: "مستطیل شیشے کی سلیب سے روشنی کا انعطاف",
                    chapter: 6,
                    isAvailable: true,
                    isLocked: false
                },
                "exp_10_07_lenses": {
                    title: "Convex Lens - Determination of Focal Length",
                    titleUrdu: "محدب عدسے کا ماسکہ معلوم کرنا",
                    chapter: 7,
                    isAvailable: true,
                    isLocked: false
                }
            }
        };

        try {
            await setDoc(docRef, initialClass10Payload, { merge: true });
            alert(`Class ${this.currentClass} registry seeded successfully.`);
        } catch (err) {
            console.error("Seed failed:", err);
            alert("Seed failed: " + err.message);
        }
    }

    async loadTeachers() {
        this.dom.teachersTbody.innerHTML = `<tr><td colspan="5" class="table-loader">Fetching teachers...</td></tr>`;
        try {
            const q = query(collection(db, "users"), where("role", "==", "teacher"));
            const snap = await getDocs(q);
            if (snap.empty) {
                this.dom.teachersTbody.innerHTML = `<tr><td colspan="5" class="table-loader">No registered teachers.</td></tr>`;
                return;
            }

            let html = '';
            snap.forEach(docSnap => {
                const u = docSnap.data();
                const uid = docSnap.id;
                const isBlocked = u.status === 'blocked';
                html += `
                    <tr>
                        <td><strong>${u.name || 'N/A'}</strong></td>
                        <td>${u.email}</td>
                        <td>${u.assignedClasses ? u.assignedClasses.join(', ') : 'None'}</td>
                        <td>
                            <button class="btn-status-toggle ${isBlocked ? 'blocked' : 'active'}" data-uid="${uid}" data-status="${u.status || 'active'}">
                                ${isBlocked ? 'Blocked' : 'Active'}
                            </button>
                        </td>
                        <td>
                            <span class="text-sub">Registered</span>
                        </td>
                    </tr>
                `;
            });
            this.dom.teachersTbody.innerHTML = html;

            this.dom.teachersTbody.querySelectorAll('.btn-status-toggle').forEach(btn => {
                btn.addEventListener('click', () => this.toggleUserStatus(btn.dataset.uid, btn.dataset.status));
            });
        } catch (err) {
            console.error("Failed loading teachers:", err);
            this.dom.teachersTbody.innerHTML = `<tr><td colspan="5" class="form-error">Could not load teachers.</td></tr>`;
        }
    }

    async loadStudents() {
        this.dom.studentsTbody.innerHTML = `<tr><td colspan="5" class="table-loader">Fetching students...</td></tr>`;
        try {
            const q = query(collection(db, "users"), where("role", "==", "student"));
            const snap = await getDocs(q);
            if (snap.empty) {
                this.dom.studentsTbody.innerHTML = `<tr><td colspan="5" class="table-loader">No registered students.</td></tr>`;
                return;
            }

            let html = '';
            snap.forEach(docSnap => {
                const u = docSnap.data();
                const uid = docSnap.id;
                const isBlocked = u.status === 'blocked';
                html += `
                    <tr>
                        <td>${u.admNo || '-'}</td>
                        <td><strong>${u.name || 'N/A'}</strong></td>
                        <td>Class ${u.standard || '10'}</td>
                        <td>
                            <button class="btn-status-toggle ${isBlocked ? 'blocked' : 'active'}" data-uid="${uid}" data-status="${u.status || 'active'}">
                                ${isBlocked ? 'Blocked' : 'Active'}
                            </button>
                        </td>
                        <td>
                            <span class="text-sub">Registered</span>
                        </td>
                    </tr>
                `;
            });
            this.dom.studentsTbody.innerHTML = html;

            this.dom.studentsTbody.querySelectorAll('.btn-status-toggle').forEach(btn => {
                btn.addEventListener('click', () => this.toggleUserStatus(btn.dataset.uid, btn.dataset.status));
            });
        } catch (err) {
            console.error("Failed loading students:", err);
            this.dom.studentsTbody.innerHTML = `<tr><td colspan="5" class="form-error">Could not load students.</td></tr>`;
        }
    }

    async toggleUserStatus(uid, currentStatus) {
        const nextStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
        try {
            await updateDoc(doc(db, "users", uid), {
                status: nextStatus,
                isBlocked: nextStatus === 'blocked'
            });
            // Reload views
            this.loadTeachers();
            this.loadStudents();
        } catch (err) {
            alert("Failed to toggle status: " + err.message);
        }
    }

    async handleCreateTeacher(e) {
        e.preventDefault();
        const name = document.getElementById('newTeacherName').value.trim();
        const email = document.getElementById('newTeacherEmail').value.trim();
        const password = document.getElementById('newTeacherPassword').value;
        const checkedBoxes = document.querySelectorAll('input[name="teacherClass"]:checked');
        const assignedClasses = Array.from(checkedBoxes).map(cb => cb.value);

        this.dom.teacherError.classList.add('hidden');
        const submitBtn = document.getElementById('btnSubmitTeacher');
        submitBtn.disabled = true;

        try {
            // Secondary Auth guarantees admin session is preserved
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            const newUid = userCredential.user.uid;

            await setDoc(doc(db, "users", newUid), {
                name: name,
                email: email,
                role: "teacher",
                assignedClasses: assignedClasses,
                status: "active",
                isBlocked: false,
                createdAt: new Date().toISOString()
            });

            this.dom.formAddTeacher.reset();
            this.dom.modalTeacher.classList.add('hidden');
            this.loadTeachers();
            alert("Teacher created successfully.");
        } catch (err) {
            this.dom.teacherError.textContent = err.message;
            this.dom.teacherError.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
        }
    }

    async handleCreateStudent(e) {
        e.preventDefault();
        const admNo = document.getElementById('newStudentAdmNo').value.trim();
        const name = document.getElementById('newStudentName').value.trim();
        const email = document.getElementById('newStudentEmail').value.trim();
        const password = document.getElementById('newStudentPassword').value;
        const standard = document.getElementById('newStudentClass').value;

        this.dom.studentError.classList.add('hidden');
        const submitBtn = document.getElementById('btnSubmitStudent');
        submitBtn.disabled = true;

        try {
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            const newUid = userCredential.user.uid;

            await setDoc(doc(db, "users", newUid), {
                admNo: admNo,
                name: name,
                email: email,
                role: "student",
                standard: parseInt(standard),
                status: "active",
                isBlocked: false,
                createdAt: new Date().toISOString()
            });

            this.dom.formAddStudent.reset();
            this.dom.modalStudent.classList.add('hidden');
            this.loadStudents();
            alert("Student created successfully.");
        } catch (err) {
            this.dom.studentError.textContent = err.message;
            this.dom.studentError.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
        }
    }
}
