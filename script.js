// --- СЛОВНИК ПЕРЕКЛАДІВ ---
const translations = {
    uk: {
        app_title: "🎓 Розумний калькулятор оцінок", login_title: "🎓 Вхід", login_hint: "Авторизуйтесь, щоб зберігати свої оцінки",
        email_ph: "Електронна пошта", pass_ph: "Пароль", login_btn: "Увійти", no_account: "Немає акаунту?", register_link: "Зареєструватися",
        new_email_ph: "Нова електронна пошта", new_pass_ph: "Придумайте пароль", register_btn: "Створити акаунт", has_account: "Вже маєте акаунт?",
        login_link: "Увійти", welcome: "Вітаємо,", settings: "Налаштування", logout: "Вийти", sys_old: "Стара система (Всі оцінки)",
        sys_new: "Нова система (Тільки ГР)", sem_1: "І Семестр", sem_2: "ІІ Семестр", sem_annual: "Річні оцінки",
        import_title: "🚀 Швидкий імпорт з журналу", import_hint: "Вставте текст з журналу. Система розпізнає всі оцінки, а перемикач зверху визначить, як саме їх рахувати.",
        import_ph: "Вставте скопійовані оцінки сюди...", parse_btn: "Розпізнати оцінки", spec_title: "🎯 Аналіз за профілем",
        spec_ph: "Оберіть профіль (напр. Інформатичний)...", add_title: "➕ Додати предмет вручну", add_ph: "Назва предмету (напр. Математика)",
        add_btn: "Додати", clear_btn: "Очистити семестр", total_gpa_sem: "Загальний середній бал:", total_gpa_ann: "Загальний середній річний бал:",
        settings_title: "⚙️ Налаштування", theme_label: "Тема оформлення:", theme_light: "Світла", theme_dark: "Темна", lang_label: "Мова інтерфейсу:",
        close: "Закрити", confirm_title: "⚠️ Підтвердження", cancel: "Скасувати", ok_delete: "ОК, видалити", empty_data: "Оцінок поки немає.",
        no_annual: "Немає даних для розрахунку річних оцінок. Заповніть І або ІІ семестр.", delete_btn: "✕ Видалити", grades_ph: "Оцінки",
        grade_count: "Оцінок:", avg_score: "Середній бал:", sem_score: "За семестр:", ann_score: "Річна оцінка:", auto_calc: "Автоматичний розрахунок",
        profile: "Профіль:", prof_score: "Профільний бал:", msg_added: "Успішно додано:", msg_cleared: "Очищено!", msg_error: "Не розпізнано структуру.",
        dev_title: "🛠️ Консоль розробника", dev_hint: "Доступно тільки для адміністраторів. Тут можна керувати обліковими записами.",
        u_email: "Електронна пошта", u_subjects: "Предметів (I/II)", action: "Дія", acc_delete: "Видалити акаунт",
        invalid_email: "Введіть дійсну електронну пошту (напр. user@mail.com)!", dev_btn: "Консоль"
    },
    en: {
        app_title: "🎓 Smart Grade Calculator", login_title: "🎓 Login", login_hint: "Log in to save your grades",
        email_ph: "Email address", pass_ph: "Password", login_btn: "Log In", no_account: "No account?", register_link: "Register",
        new_email_ph: "New Email", new_pass_ph: "Create Password", register_btn: "Create Account", has_account: "Already have an account?",
        login_link: "Log In", welcome: "Welcome,", settings: "Settings", logout: "Log Out", sys_old: "Old System (All grades)",
        sys_new: "New System (Only GR)", sem_1: "Semester I", sem_2: "Semester II", sem_annual: "Annual Grades",
        import_title: "🚀 Quick Import", import_hint: "Paste text from the journal. The system will recognize the grades based on the switch above.",
        import_ph: "Paste copied grades here...", parse_btn: "Parse Grades", spec_title: "🎯 Profile Analysis",
        spec_ph: "Select profile (e.g. IT)...", add_title: "➕ Add Subject Manually", add_ph: "Subject name (e.g. Math)",
        add_btn: "Add", clear_btn: "Clear Semester", total_gpa_sem: "Overall GPA:", total_gpa_ann: "Annual GPA:",
        settings_title: "⚙️ Settings", theme_label: "Theme:", theme_light: "Light", theme_dark: "Dark", lang_label: "Language:",
        close: "Close", confirm_title: "⚠️ Confirmation", cancel: "Cancel", ok_delete: "OK, Delete", empty_data: "No grades yet.",
        no_annual: "No data for annual grades. Fill in Semester I or II.", delete_btn: "✕ Delete", grades_ph: "Grades",
        grades_count: "Grades count:", avg_score: "Average:", sem_score: "Semester:", ann_score: "Annual:", auto_calc: "Automatic calculation",
        profile: "Profile:", prof_score: "Profile GPA:", msg_added: "Successfully added:", msg_cleared: "Cleared!", msg_error: "Structure not recognized.",
        dev_title: "🛠️ Developer Console", dev_hint: "Available for admins only. Here you can manage user accounts.",
        u_email: "Email Address", u_subjects: "Subjects (I/II)", action: "Action", acc_delete: "Delete Account",
        invalid_email: "Please enter a valid email address (e.g. user@mail.com)!", dev_btn: "Console"
    }
};

let currentLang = localStorage.getItem('smart_grades_lang') || 'uk';
let currentTheme = localStorage.getItem('smart_grades_theme') || 'light';

// Список твоїх адмін-акаунтів для доступу до консолі розробника
const adminEmails = ["dev1@test.com", "dev2@test.com"];

// ==========================================
// 🔐 ТВІЙ ОСОБИСТИЙ КОД КОНФІГУРАЦІЇ FIREBASE
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyDnvZte3CnzDx9jXBFX_q55TUb-bpmXN14",
    authDomain: "calc001.firebaseapp.com",
    projectId: "calc001",
    storageBucket: "calc001.firebasestorage.app",
    messagingSenderId: "527887058439",
    appId: "1:527887058439:web:b0c4de8cedd51386644ca2",
    measurementId: "G-GNSZ6Y2VJJ",
    databaseURL: "https://calc001-default-rtdb.europe-west1.firebasedatabase.app"
};

// Ініціалізація додатку Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function t(key) { return translations[currentLang][key] || key; }

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
    renderSubjects(); checkSpecialtyRequirements();
    const titleEl = document.getElementById('list-title');
    if (currentSemester === 'annual') {
        titleEl.textContent = `📋 ${t('sem_annual')}`;
        document.getElementById('total-gpa-label').textContent = t('total_gpa_ann');
    } else {
        titleEl.textContent = `📋 ${t(currentSemester === 1 ? 'sem_1' : 'sem_2')}`;
        document.getElementById('total-gpa-label').textContent = t('total_gpa_sem');
        document.getElementById('clear-all-btn').textContent = t('clear_btn');
    }
}

// --- НАЛАШТУВАННЯ ---
function openSettings() {
    document.getElementById('theme-selector').value = currentTheme;
    document.getElementById('lang-selector').value = currentLang;
    document.getElementById('settings-modal').classList.add('show');
}
function closeSettings() { document.getElementById('settings-modal').classList.remove('show'); }
window.changeTheme = function(theme) {
    currentTheme = theme; localStorage.setItem('smart_grades_theme', theme);
    if(theme === 'dark') document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
};
window.changeLanguage = function(lang) { currentLang = lang; localStorage.setItem('smart_grades_lang', lang); applyTranslations(); };

function validateEmailPattern(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
function encodeEmail(email) { return email.replace(/\./g, ','); }
function decodeEmail(encoded) { return encoded.replace(/,/g, '.'); }

// --- ВІКНО ПІДТВЕРДЖЕННЯ ---
function customConfirm(message, onConfirmCallback) {
    const modal = document.getElementById('confirm-modal');
    document.getElementById('confirm-text').textContent = message;
    modal.classList.add('show');
    document.getElementById('confirm-ok-btn').onclick = () => { modal.classList.remove('show'); onConfirmCallback(); };
    document.getElementById('confirm-cancel-btn').onclick = () => { modal.classList.remove('show'); };
}

// --- СИСТЕМА АВТОРИЗАЦІЇ З ХМАРОЮ ---
let currentUserEmail = null;

function toggleAuthMode() {
    const loginForm = document.getElementById('login-form'); const regForm = document.getElementById('register-form');
    document.getElementById('auth-msg').textContent = '';
    if (loginForm.style.display === 'none') { loginForm.style.display = 'block'; regForm.style.display = 'none'; } 
    else { loginForm.style.display = 'none'; regForm.style.display = 'block'; }
}

function showAuthError(text) { const msg = document.getElementById('auth-msg'); msg.textContent = text; msg.style.opacity = 1; }

function register() {
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value;
    if (!email || !password) return showAuthError("Заповніть всі поля!");
    if (!validateEmailPattern(email)) return showAuthError(t('invalid_email'));
    if (password.length < 4) return showAuthError("Пароль має бути від 4 символів");

    const encEmail = encodeEmail(email);
    database.ref('users/' + encEmail).once('value').then((snapshot) => {
        if (snapshot.exists()) {
            showAuthError("Акаунт вже існує!");
        } else {
            database.ref('users/' + encEmail).set({ password: password }).then(() => {
                loginUser(email);
            });
        }
    });
}

function login() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    if (!email || !password) return showAuthError("Заповніть всі поля!");
    if (!validateEmailPattern(email)) return showAuthError(t('invalid_email'));

    const encEmail = encodeEmail(email);
    database.ref('users/' + encEmail).once('value').then((snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.password === password) {
            loginUser(email);
        } else {
            showAuthError("Невірна пошта або пароль!");
        }
    });
}

function loginUser(email) {
    currentUserEmail = email;
    localStorage.setItem('smart_grades_current_user', email);
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    document.getElementById('user-display-email').textContent = email;
    
    const devConsole = document.getElementById('dev-console-card');
    const devBtn = document.getElementById('dev-nav-btn');
    
    if (adminEmails.includes(email)) {
        devBtn.style.display = 'inline-block'; devConsole.style.display = 'none';
        database.ref('users').on('value', () => { renderAdminConsole(); });
    } else {
        devBtn.style.display = 'none'; devConsole.style.display = 'none';
        database.ref('users').off();
    }

    loadFromFirebase();
}

function logout() {
    database.ref('users').off();
    if(currentUserEmail) {
        database.ref('grades/' + encodeEmail(currentUserEmail)).off();
    }
    currentUserEmail = null; localStorage.removeItem('smart_grades_current_user');
    document.getElementById('app-screen').style.display = 'none';
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('dev-nav-btn').style.display = 'none';
    document.getElementById('dev-console-card').style.display = 'none';
    semestersData = { 1: [], 2: [] };
}

window.toggleDevConsole = function() {
    const devConsole = document.getElementById('dev-console-card');
    if (devConsole.style.display === 'none') { devConsole.style.display = 'block'; devConsole.scrollIntoView({ behavior: 'smooth' }); } 
    else { devConsole.style.display = 'none'; }
};

// --- ЛОГІКА ЗАГАЛЬНОЇ КОНСОЛІ РОЗРОБНИКА ---
function renderAdminConsole() {
    const tbody = document.getElementById('dev-users-list'); tbody.innerHTML = '';
    
    database.ref('users').once('value').then((usersSnapshot) => {
        const usersData = usersSnapshot.val() || {};
        const emailsEncoded = Object.keys(usersData);

        if(emailsEncoded.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:gray;">Немає зареєстрованих користувачів</td></tr>`;
            return;
        }

        database.ref('grades').once('value').then((gradesSnapshot) => {
            const allGradesData = gradesSnapshot.val() || {};

            emailsEncoded.forEach(encEmail => {
                const email = decodeEmail(encEmail);
                const userGrades = allGradesData[encEmail] || {};
                
                let sem1Count = userGrades.sem1 ? userGrades.sem1.length : 0;
                let sem2Count = userGrades.sem2 ? userGrades.sem2.length : 0;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><b>${email}</b> ${adminEmails.includes(email) ? '<span style="color:#F59E0B;">(Dev)</span>' : ''}</td>
                    <td>${sem1Count} / ${sem2Count}</td>
                    <td><button class="delete-btn" style="font-weight:bold;" onclick="deleteUserAdmin('${email}')">${t('acc_delete')}</button></td>
                `;
                tbody.appendChild(tr);
            });
        });
    });
}

window.deleteUserAdmin = function(emailToDelete) {
    customConfirm(`Ви впевнені, що хочете повністю видалити акаунт ${emailToDelete} з глобальної хмари Firebase?`, () => {
        const encEmail = encodeEmail(emailToDelete);
        database.ref('users/' + encEmail).remove();
        database.ref('grades/' + encEmail).remove();
        showToast(`Акаунт ${emailToDelete} повністю видалено з хмари!`);
        if (emailToDelete === currentUserEmail) logout();
    });
};

// --- ОСНОВНИЙ КОД КАЛЬКУЛЯТОРА ---
let currentSemester = 1; let gradingSystem = 'new'; let semestersData = { 1: [], 2: [] };

const specialtyCategories = [
    { keys: ["фіз-мат", "фізмат", "фізико-математичний", "математичний"], name: "Фіз-Мат", core: ["алгебра", "геометрія", "математика", "фізика"], minGrade: 6 },
    { keys: ["історичний", "історія", "гуманітарний"], name: "Історичний", core: ["історія", "право", "громадянська"], minGrade: 6 },
    { keys: ["філологічний", "філологія", "мовний"], name: "Філологічний", core: ["українська", "література", "англійськ", "зарубіжна", "іноземна", "мова"], minGrade: 6 },
    { keys: ["хім-біо", "хімбіо", "хіміко-біологічний", "біологічний", "медичний"], name: "Хім-Біо", core: ["хімія", "біологія", "екологія", "природознавство", "здоров"], minGrade: 6 },
    { keys: ["інформатичний", "інформатика", "іт", "it", "комп"], name: "Інформатичний", core: ["інформатика", "робототехніка", "штучний інтелект"], minGrade: 7 }
];

function loadFromFirebase() {
    if (!currentUserEmail) return;
    const encEmail = encodeEmail(currentUserEmail);
    
    database.ref('grades/' + encEmail).on('value', (snapshot) => {
        const data = snapshot.val() || {};
        semestersData[1] = data.sem1 || [];
        semestersData[2] = data.sem2 || [];
        gradingSystem = data.system || 'new';

        const toggle = document.getElementById('grading-system-toggle');
        if (toggle) toggle.checked = (gradingSystem === 'new');
        document.getElementById('label-old').classList.toggle('active-text', gradingSystem === 'old');
        document.getElementById('label-new').classList.toggle('active-text', gradingSystem === 'new');

        applyTranslations();
    });
}

function saveToFirebase() {
    if (!currentUserEmail) return;
    const encEmail = encodeEmail(currentUserEmail);
    database.ref('grades/' + encEmail).set({
        sem1: semestersData[1],
        sem2: semestersData[2],
        system: gradingSystem
    });
}

window.toggleSystem = function(checkbox) {
    gradingSystem = checkbox.checked ? 'new' : 'old';
    saveToFirebase();
};

window.switchSemester = function(semesterNum) {
    currentSemester = semesterNum;
    document.getElementById('tab-sem1').classList.toggle('active', semesterNum === 1);
    document.getElementById('tab-sem2').classList.toggle('active', semesterNum === 2);
    document.getElementById('tab-annual').classList.toggle('active', semesterNum === 'annual');
    const importCard = document.getElementById('import-card'); const addCard = document.getElementById('add-subject-card'); const clearBtn = document.getElementById('clear-all-btn');
    if (semesterNum === 'annual') { importCard.style.display = 'none'; addCard.style.display = 'none'; clearBtn.style.display = 'none'; } 
    else { importCard.style.display = 'block'; addCard.style.display = 'block'; clearBtn.style.display = 'block'; }
    applyTranslations();
};

function showInlineMessage(text, isError = false) {
    const msgEl = document.getElementById('import-msg'); msgEl.textContent = text;
    msgEl.className = 'inline-msg ' + (isError ? 'error' : 'success');
    setTimeout(() => msgEl.className = 'inline-msg', 3000);
}

function showToast(text) {
    const toast = document.getElementById('toast-overlay'); document.getElementById('toast-msg').textContent = text;
    toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000);
}

function calculateAverage(gradesString) {
    let sum = 0; let count = 0;
    if (gradingSystem === 'new') {
        if (!gradesString.includes('(')) {
            const rawItems = gradesString.split(/[\s,]+/);
            rawItems.forEach(item => { const num = parseFloat(item.trim()); if (!isNaN(num) && num >= 1 && num <= 12) { sum += num; count++; } });
        } else {
            const regexGR = /\b([1-9]|1[0-2])\s*\([^)]*ГР[^)]*\)/gi; const matches = [...gradesString.matchAll(regexGR)];
            matches.forEach(m => { sum += parseFloat(m[1]); count++; });
        }
    } else {
        let stringWithoutParens = gradesString.replace(/\([^)]*\)/g, ' '); const rawItems = stringWithoutParens.split(/[\s,]+/);
        rawItems.forEach(item => { const num = parseFloat(item.trim()); if (!isNaN(num) && num >= 1 && num <= 12) { sum += num; count++; } });
    }
    if (count === 0) return { average: 0, count: 0, semesterGrade: 0 };
    const avg = sum / count; return { average: +avg.toFixed(2), count: count, semesterGrade: Math.round(avg) };
}

function getAnnualSubjects() {
    const list = []; const names1 = semestersData[1].map(s => s.name); const names2 = semestersData[2].map(s => s.name);
    const allNames = [...new Set([...names1, ...names2])]; 
    allNames.forEach(name => {
        const s1Subj = semestersData[1].find(s => s.name === name); const s2Subj = semestersData[2].find(s => s.name === name);
        const s1Stats = s1Subj ? calculateAverage(s1Subj.grades) : { semesterGrade: 0 }; const s2Stats = s2Subj ? calculateAverage(s2Subj.grades) : { semesterGrade: 0 };
        let annualGrade = 0;
        if (s1Stats.semesterGrade > 0 && s2Stats.semesterGrade > 0) annualGrade = Math.round((s1Stats.semesterGrade + s2Stats.semesterGrade) / 2);
        else if (s1Stats.semesterGrade > 0) annualGrade = s1Stats.semesterGrade; else if (s2Stats.semesterGrade > 0) annualGrade = s2Stats.semesterGrade;
        list.push({ name: name, s1Grade: s1Stats.semesterGrade, s2Grade: s2Stats.semesterGrade, annualGrade: annualGrade });
    });
    return list;
}

function checkSpecialtyRequirements() {
    const input = document.getElementById('specialty-input').value.toLowerCase(); const resultsContainer = document.getElementById('specialty-results');
    if (!input.trim()) { resultsContainer.innerHTML = ''; return; }
    let matchedCategory = null;
    for (let cat of specialtyCategories) { if (cat.keys.some(key => input.includes(key))) { matchedCategory = cat; break; } }
    if (!matchedCategory) { resultsContainer.innerHTML = ''; return; }
    let warningsHTML = ''; let coreSum = 0; let coreCount = 0; const currentMinGrade = matchedCategory.minGrade;

    const processSubject = (subject, grade, nameLabel) => {
        if (matchedCategory.core.some(word => subject.name.toLowerCase().includes(word)) && grade > 0) {
            coreSum += (subject.average || grade); coreCount++;
            if (grade < currentMinGrade) warningsHTML += `<div class="alert-item warning">⚠️ <b>${subject.name}</b>: ${nameLabel} <b>${grade}</b>.</div>`;
            else warningsHTML += `<div class="alert-item success">✅ <b>${subject.name}</b>: ${nameLabel} <b>${grade}</b>.</div>`;
        }
    };
    if (currentSemester === 'annual') getAnnualSubjects().forEach(s => processSubject(s, s.annualGrade, t('ann_score')));
    else semestersData[currentSemester].forEach(s => { const stats = calculateAverage(s.grades); processSubject({...s, average: stats.average}, stats.semesterGrade, t('sem_score')); });

    if (coreCount === 0) { resultsContainer.innerHTML = ''; return; }
    resultsContainer.innerHTML = `<div class="core-gpa-box">${t('profile')} ${matchedCategory.name} | ${t('prof_score')} <span style="color:var(--primary)">${(coreSum / coreCount).toFixed(2)}</span></div>${warningsHTML}`;
}

function updateTotalGPA() {
    let totalSum = 0; let validCount = 0;
    if (currentSemester === 'annual') { getAnnualSubjects().forEach(s => { if (s.annualGrade > 0) { totalSum += s.annualGrade; validCount++; } }); } 
    else { semestersData[currentSemester].forEach(s => { const stats = calculateAverage(s.grades); if (stats.count > 0) { totalSum += stats.average; validCount++; } }); }
    document.getElementById('total-gpa').textContent = validCount === 0 ? '0.00' : (totalSum / validCount).toFixed(2);
}

function renderSubjects() {
    const listElement = document.getElementById('subjects-list'); listElement.innerHTML = '';
    if (currentSemester === 'annual') {
        const annualSubjects = getAnnualSubjects();
        if (annualSubjects.length === 0) { listElement.innerHTML = `<p style="text-align:center; color:gray; padding: 20px;">${t('no_annual')}</p>`; } 
        else {
            annualSubjects.forEach((subject) => {
                const el = document.createElement('div'); el.className = 'subject-item';
                el.innerHTML = `<div class="subject-header"><span>${subject.name}</span></div><div class="grades-input-wrapper" style="padding: 5px 0; color: var(--text-muted); font-size: 15px;"><span>${t('sem_1')}: <b>${subject.s1Grade || '—'}</b> | ${t('sem_2')}: <b>${subject.s2Grade || '—'}</b></span></div><div class="subject-stats"><span class="hint">${t('auto_calc')}</span><div class="stats-group"><span>${t('ann_score')} <span class="semester-badge" style="background-color: var(--primary);">${subject.annualGrade || 'Н/А'}</span></span></div></div>`;
                listElement.appendChild(el);
            });
        }
    } else {
        const activeSubjects = semestersData[currentSemester];
        if (activeSubjects.length === 0) { listElement.innerHTML = `<p style="text-align:center; color:gray; padding: 20px;">${t('empty_data')}</p>`; } 
        else {
            activeSubjects.forEach((subject, index) => {
                const stats = calculateAverage(subject.grades); const el = document.createElement('div'); el.className = 'subject-item';
                el.innerHTML = `<div class="subject-header"><span>${subject.name}</span><button class="delete-btn" onclick="deleteSubject(${index})">${t('delete_btn')}</button></div><div class="grades-input-wrapper"><input type="text" value="${subject.grades}" placeholder="${t('grades_ph')}" oninput="updateGrades(${index}, this.value)"></div><div class="subject-stats"><span class="hint">${t('grade_count')} ${stats.count}</span><div class="stats-group"><span>${t('avg_score')} <span class="average-badge">${stats.average.toFixed(2)}</span></span><span>${t('sem_score')} <span class="semester-badge">${stats.semesterGrade || 'Н/А'}</span></span></div></div>`;
                listElement.appendChild(el);
            });
        }
    }
    updateTotalGPA(); checkSpecialtyRequirements();
}

// --- ПОКРАЩЕНИЙ ШВИДКИЙ ІМПОРТ (ДЛЯ ВСІХ ТИПІВ ТЕКСТУ) ---
document.getElementById('parse-btn').addEventListener('click', () => {
    const rawText = document.getElementById('import-text').value; 
    if (!rawText.trim()) return;
    
    let addedCount = 0;
    
    // 1. Спочатку перевіряємо стандартний формат електронного журналу з номерами
    const regexJournal = /\b(\d+)\s*([А-ЯІЇЄҐA-Z][А-ЯІЇЄҐа-яіїєґA-Za-z\s'’«»\-]*?)\s*(?=(?:[1-9]|1[0-2]|Н)\s*(?:\(|,|$|\s))([\s\S]*?)(?=\s*\b\d+\s*[А-ЯІЇЄҐA-Z][а-яіїєґa-zА-ЯІЇЄҐA-Z]|\s*$)/g;
    let match;
    
    while ((match = regexJournal.exec(rawText)) !== null) {
        let subjectName = match[2].trim().replace(/[\n\r\t]+/g, ' ').replace(/\s{2,}/g, ' '); 
        let rawGrades = match[3].replace(/[\n\r\t]+/g, ' ').trim();
        if (subjectName && /\d/.test(rawGrades)) { 
            semestersData[currentSemester].push({ name: subjectName, grades: rawGrades }); 
            addedCount++; 
        }
    }

    // 2. Якщо стандартний не спрацював, запускаємо супер-пошук для щільного злиплого тексту (напр. Англійська мова7)
    if (addedCount === 0) {
        const regexDense = /([А-ЯІЇЄҐA-Z][А-ЯІЇЄҐа-яіїєґA-Za-z\s'’«»\-]*?)\s*(1[0-2]|[1-9])(?=\s*[А-ЯІЇЄҐA-Z]|$)/g;
        
        while ((match = regexDense.exec(rawText)) !== null) { 
            let subjectName = match[1].trim(); 
            let grade = match[2].trim(); 
            
            if (subjectName && grade) { 
                semestersData[currentSemester].push({ name: subjectName, grades: grade }); 
                addedCount++; 
            } 
        }
    }

    if (addedCount > 0) { 
        document.getElementById('import-text').value = ''; 
        saveToFirebase(); 
        showInlineMessage(`${t('msg_added')} ${addedCount}`); 
    } 
    else showInlineMessage(t('msg_error'), true);
});

document.getElementById('add-subject-btn').addEventListener('click', () => {
    const name = document.getElementById('new-subject-name').value.trim();
    if (name) { semestersData[currentSemester].push({ name: name, grades: '' }); document.getElementById('new-subject-name').value = ''; saveToFirebase(); }
});

window.updateGrades = function(index, newGrades) { semestersData[currentSemester][index].grades = newGrades; saveToFirebase(); };
window.deleteSubject = function(index) { semestersData[currentSemester].splice(index, 1); saveToFirebase(); };

document.getElementById('clear-all-btn').addEventListener('click', () => {
    if (semestersData[currentSemester].length > 0) { customConfirm(t('confirm_title'), () => { semestersData[currentSemester] = []; saveToFirebase(); showToast(t('msg_cleared')); }); }
});

window.onload = () => {
    changeTheme(currentTheme); const savedUser = localStorage.getItem('smart_grades_current_user');
    if (savedUser) loginUser(savedUser); else { document.getElementById('auth-screen').style.display = 'flex'; applyTranslations(); }
};