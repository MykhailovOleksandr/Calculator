// =========================================================================
// 1. СЛОВНИК ЛОКАЛІЗАЦІЇ
// =========================================================================
const translations = {
    uk: {
        app_title: "🎓 Розумний калькулятор оцінок", login_title: "🎓 Вхід", login_hint: "Авторизуйтесь, щоб зберігати свої оцінки",
        email_ph: "Електронна пошта", pass_ph: "Пароль", login_btn: "Увійти", no_account: "Немає акаунту?", register_link: "Зареєструватися",
        new_email_ph: "Нова електронна пошта", new_pass_ph: "Придумайте пароль", register_btn: "Створити акаунт", has_account: "Вже маєте акаунт?",
        login_link: "Увійти", welcome: "Вітаємо,", settings: "Налаштування", logout: "Вийти", sys_old: "Стара система (Всі оцінки)",
        sys_new: "Нова система (Тільки ГР)", sem_1: "І Семестр", sem_2: "ІІ Семестр", sem_annual: "Річні оцінки",
        import_title: "🚀 Швидкий імпорт з журналу", import_hint: "Вставте текст стовпчиком. Скрипт автоматично вичистить зайві слова в дужках.",
        import_ph: "Вставте скопійовані оцінки сюди...", parse_btn: "Розпізнати оцінки", spec_title: "🎯 Аналіз за профілем",
        spec_ph: "Оберіть профіль...", add_title: "➕ Додати предмет вручну", add_ph: "Назва предмету",
        add_btn: "Додати", clear_btn: "Очистити семестр", total_gpa_sem: "Загальний середній бал:", total_gpa_ann: "Загальний середній річний бал:",
        settings_title: "⚙️ Налаштування", theme_label: "Тема оформлення:", theme_light: "Світла", theme_dark: "Темна", lang_label: "Мова інтерфейсу:",
        close: "Закрити", confirm_title: "⚠️ Підтвердження", cancel: "Скасувати", ok_delete: "ОК, видалити", empty_data: "Оцінок поки немає.",
        no_annual: "Немає даних для розрахунку річних оцінок. Заповніть І або ІІ семестр.", delete_btn: "✕ Видалити", grades_ph: "Оцінки",
        grade_count: "Оцінок:", avg_score: "Середній бал:", sem_score: "За семестр:", ann_score: "Річна оцінка:", auto_calc: "Автоматичний розрахунок",
        profile: "Профіль:", prof_score: "Профільний бал:", msg_added: "Успішно додано:", msg_cleared: "Очищено!", msg_error: "Не розпізнано структуру рядків.",
        dev_title: "🛠️ Консоль розробника", dev_hint: "Доступно тільки для адміністраторів.",
        u_email: "Електронна пошта", u_subjects: "Предметів (I/II)", action: "Дія", acc_delete: "Видалити акаунт",
        invalid_email: "Введіть дійсну електронну пошту!", dev_btn: "Консоль"
    },
    en: { /* ... */ }
};


// =========================================================================
// 2. ГЛОБАЛЬНИЙ СТАН ТА КОНФІГУРАЦІЯ FIREBASE
// =========================================================================
let currentLang = localStorage.getItem('smart_grades_lang') || 'uk';
let currentTheme = localStorage.getItem('smart_grades_theme') || 'light';
let currentUserEmail = null;

const adminEmails = ["dev1@test.com", "dev2@test.com", "belugedad@gmail.com", "mykhailov@gmail.com"];

const firebaseConfig = {
    apiKey: "AIzaSyDnvZte3CnzDx9jXBFX_q55TUb-bpmXN14",
    authDomain: "calc001.firebaseapp.com",
    projectId: "calc001",
    storageBucket: "calc001.firebasestorage.app",
    messagingSenderId: "527887058439",
    appId: "1:527887058439:web:b0c4de8cedd51386644ca2",
    databaseURL: "https://calc001-default-rtdb.europe-west1.firebasedatabase.app"
};

let isFirebaseConnected = false;
let database = null;

try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        isFirebaseConnected = true;
    }
} catch (e) {
    console.error("Firebase SDK не завантажився. Переведено в локальний режим.", e);
}


// =========================================================================
// 3. ДОПОМІЖНІ УТИЛІТИ
// =========================================================================
function t(key) { return translations[currentLang][key] || key; }
function encodeEmail(email) { return email.replace(/\./g, ','); }
function decodeEmail(encoded) { return encoded.replace(/,/g, '.'); }

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

function openSettings() { document.getElementById('theme-selector').value = currentTheme; document.getElementById('lang-selector').value = currentLang; document.getElementById('settings-modal').classList.add('show'); }
function closeSettings() { document.getElementById('settings-modal').classList.remove('show'); }
window.changeTheme = function(theme) { currentTheme = theme; localStorage.setItem('smart_grades_theme', theme); if(theme === 'dark') document.body.classList.add('dark-theme'); else document.body.classList.remove('dark-theme'); };
window.changeLanguage = function(lang) { currentLang = lang; localStorage.setItem('smart_grades_lang', lang); applyTranslations(); };

function customConfirm(message, onConfirmCallback) {
    const modal = document.getElementById('confirm-modal'); document.getElementById('confirm-text').textContent = message; modal.classList.add('show');
    document.getElementById('confirm-ok-btn').onclick = () => { modal.classList.remove('show'); onConfirmCallback(); };
    document.getElementById('confirm-cancel-btn').onclick = () => { modal.classList.remove('show'); };
}

function showInlineMessage(text, isError = false) { const msgEl = document.getElementById('import-msg'); if (msgEl) { msgEl.textContent = text; msgEl.className = 'inline-msg ' + (isError ? 'error' : 'success'); setTimeout(() => msgEl.className = 'inline-msg', 3000); } }
function showToast(text) { const toast = document.getElementById('toast-overlay'); const msgEl = document.getElementById('toast-msg'); if (toast && msgEl) { msgEl.textContent = text; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3000); } }


// =========================================================================
// 4. СИСТЕМА АВТОРИЗАЦІЇ
// =========================================================================
function toggleAuthMode() { const loginForm = document.getElementById('login-form'); const regForm = document.getElementById('register-form'); document.getElementById('auth-msg').textContent = ''; if (loginForm.style.display === 'none') { loginForm.style.display = 'block'; regForm.style.display = 'none'; } else { loginForm.style.display = 'none'; regForm.style.display = 'block'; } }
function showAuthError(text) { const msg = document.getElementById('auth-msg'); msg.textContent = text; msg.style.opacity = 1; }

function register() {
    const email = document.getElementById('reg-email').value.trim().toLowerCase(); const password = document.getElementById('reg-password').value;
    if (!email || !password) return showAuthError("Заповніть всі поля!"); if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return showAuthError(t('invalid_email'));
    if (!isFirebaseConnected) return loginUser(email);
    const encEmail = encodeEmail(email);
    database.ref('users/' + encEmail).once('value').then((snapshot) => { if (snapshot.exists()) showAuthError("Акаунт вже існує!"); else database.ref('users/' + encEmail).set({ password: password }).then(() => { loginUser(email); }); });
}

function login() {
    const email = document.getElementById('login-email').value.trim().toLowerCase(); const password = document.getElementById('login-password').value;
    if (!email || !password) return showAuthError("Заповніть всі поля!"); if (!isFirebaseConnected) return loginUser(email);
    const encEmail = encodeEmail(email);
    database.ref('users/' + encEmail).once('value').then((snapshot) => { const userData = snapshot.val(); if (userData && userData.password === password) loginUser(email); else showAuthError("Невірна пошта або пароль!"); });
}

function loginUser(email) {
    currentUserEmail = email; localStorage.setItem('smart_grades_current_user', email);
    document.getElementById('auth-screen').style.display = 'none'; document.getElementById('app-screen').style.display = 'block'; document.getElementById('user-display-email').textContent = email;
    if (isFirebaseConnected) {
        const encEmail = encodeEmail(email);
        database.ref('users/' + encEmail).on('value', (snapshot) => { if (!snapshot.exists()) { document.getElementById('deleted-modal').classList.add('show'); localStorage.removeItem('smart_grades_current_user'); } });
        const devBtn = document.getElementById('dev-nav-btn');
        if (adminEmails.includes(email)) { devBtn.style.display = 'inline-block'; database.ref('users').on('value', () => { renderAdminConsole(); }); } else { devBtn.style.display = 'none'; document.getElementById('dev-console-card').style.display = 'none'; database.ref('users').off(); }
    }
    loadFromFirebase();
}

function logout() {
    if (isFirebaseConnected) { database.ref('users').off(); if(currentUserEmail) database.ref('grades/' + encodeEmail(currentUserEmail)).off(); }
    currentUserEmail = null; localStorage.removeItem('smart_grades_current_user');
    document.getElementById('app-screen').style.display = 'none'; document.getElementById('auth-screen').style.display = 'flex'; document.getElementById('dev-nav-btn').style.display = 'none'; document.getElementById('dev-console-card').style.display = 'none'; semestersData = { 1: [], 2: [] }; renderSubjects();
}

window.toggleDevConsole = function() { const devConsole = document.getElementById('dev-console-card'); if (devConsole.style.display === 'none') { devConsole.style.display = 'block'; devConsole.scrollIntoView({ behavior: 'smooth' }); } else devConsole.style.display = 'none'; };
function renderAdminConsole() {
    if (!isFirebaseConnected) return; const tbody = document.getElementById('dev-users-list'); tbody.innerHTML = '';
    database.ref('users').once('value').then((usersSnapshot) => {
        const usersData = usersSnapshot.val() || {}; const emailsEncoded = Object.keys(usersData);
        if(emailsEncoded.length === 0) { tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:gray;">Немає користувачів</td></tr>`; return; }
        database.ref('grades').once('value').then((gradesSnapshot) => {
            const allGradesData = gradesSnapshot.val() || {};
            emailsEncoded.forEach(encEmail => {
                const email = decodeEmail(encEmail); const userGrades = allGradesData[encEmail] || {};
                let sem1Count = userGrades.sem1 ? userGrades.sem1.length : 0; let sem2Count = userGrades.sem2 ? userGrades.sem2.length : 0;
                const tr = document.createElement('tr');
                tr.innerHTML = `<td><b>${email}</b> ${adminEmails.includes(email) ? '<span style="color:#F59E0B;">(Dev)</span>' : ''}</td><td>${sem1Count} / ${sem2Count}</td><td><button class="delete-btn" style="font-weight:bold;" onclick="deleteUserAdmin('${email}')">${t('acc_delete')}</button></td>`;
                tbody.appendChild(tr);
            });
        });
    });
}
window.deleteUserAdmin = function(emailToDelete) { if (!isFirebaseConnected) return; customConfirm(`Видалити акаунт ${emailToDelete} з Firebase глобально?`, () => { const encEmail = encodeEmail(emailToDelete); database.ref('users/' + encEmail).remove(); database.ref('grades/' + encEmail).remove(); showToast(`Видалено!`); if (emailToDelete === currentUserEmail) logout(); }); };


// =========================================================================
// 5. ОБЧИСЛЕННЯ ОЦІНОК (ЖОРСТКО РАХУЄ ЛИШЕ ГР ТА СЕМЕСТР)
// =========================================================================
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
    if (isFirebaseConnected) {
        const encEmail = encodeEmail(currentUserEmail);
        database.ref('grades/' + encEmail).on('value', (snapshot) => {
            const data = snapshot.val() || {}; semestersData[1] = data.sem1 || []; semestersData[2] = data.sem2 || []; gradingSystem = data.system || 'new';
            const toggle = document.getElementById('grading-system-toggle'); if (toggle) toggle.checked = (gradingSystem === 'new');
            document.getElementById('label-old').classList.toggle('active-text', gradingSystem === 'old'); document.getElementById('label-new').classList.toggle('active-text', gradingSystem === 'new');
            applyTranslations();
        });
    } else {
        const localGrades = localStorage.getItem('local_grades_' + currentUserEmail);
        if (localGrades) { const parsed = JSON.parse(localGrades); semestersData[1] = parsed.sem1 || []; semestersData[2] = parsed.sem2 || []; }
        applyTranslations();
    }
}

function saveToFirebase() {
    if (!currentUserEmail) return;
    if (isFirebaseConnected) { database.ref('grades/' + encodeEmail(currentUserEmail)).set({ sem1: semestersData[1], sem2: semestersData[2], system: gradingSystem }); } 
    else { localStorage.setItem('local_grades_' + currentUserEmail, JSON.stringify({ sem1: semestersData[1], sem2: semestersData[2] })); }
    renderSubjects();
}

window.toggleSystem = function(checkbox) { gradingSystem = checkbox.checked ? 'new' : 'old'; saveToFirebase(); };
window.switchSemester = function(semesterNum) { currentSemester = semesterNum; document.getElementById('tab-sem1').classList.toggle('active', semesterNum === 1); document.getElementById('tab-sem2').classList.toggle('active', semesterNum === 2); document.getElementById('tab-annual').classList.toggle('active', semesterNum === 'annual'); const importCard = document.getElementById('import-card'); const addCard = document.getElementById('add-subject-card'); const clearBtn = document.getElementById('clear-all-btn'); if (semesterNum === 'annual') { importCard.style.display = 'none'; addCard.style.display = 'none'; clearBtn.style.display = 'none'; } else { importCard.style.display = 'block'; addCard.style.display = 'block'; clearBtn.style.display = 'block'; } applyTranslations(); };

function calculateAverage(gradesString) {
    let sum = 0; let count = 0;
    
    // 1. ШУКАЄМО СЕМЕСТРОВУ ОЦІНКУ (Сем.С, Семестрова)
    let explicitSemester = null;
    const semRegex = /(?:Сем\.?\s*С?|Семестрова|Семестр|Скоригована)[^\d]*([1-9]|1[0-2])\b/i;
    const semMatch = gradesString.match(semRegex);
    
    let stringToParse = gradesString;
    if (semMatch) {
        explicitSemester = parseFloat(semMatch[1]);
        stringToParse = stringToParse.replace(semRegex, ' '); // Вирізаємо з подальшого розрахунку
    }

    // 2. РАХУЄМО ОЦІНКИ ЗАЛЕЖНО ВІД СИСТЕМИ
    if (gradingSystem === 'new') {
        // НОВА СИСТЕМА: РАХУЮТЬСЯ ВИКЛЮЧНО ГР!
        // Ігноруємо ВСІ звичайні оцінки (навіть якщо вони є). Шукаємо тільки "(Гр: 10)", "ГР1: 11" або "10 (ГР)"
        const regexGR = /(?:ГР|Група результатів)\s*\d*[^0-9]*([1-9]|1[0-2])\b|\b([1-9]|1[0-2])\s*\([^)]*ГР[^)]*\)/gi;
        const matches = [...stringToParse.matchAll(regexGR)]; 
        matches.forEach(m => { 
            let val = m[1] || m[2]; // Беремо те число, яке знайшлось
            if (val) { sum += parseFloat(val); count++; } 
        });
        // Все інше просто ігнорується, ніби його там і немає.
        
    } else {
        // СТАРА СИСТЕМА: Рахуються всі поточні оцінки
        let cleanString = stringToParse.replace(/\([^)]*\)/g, ' ').replace(/\[[^\]]*\]/g, ' '); 
        cleanString = cleanString.replace(/(?:зош|онлайн|тема|дз|кр|ср|пр|лр|оцінка)[а-яіїєґa-z.:-]*\s*([1-9]|1[0-2])\b/gi, ' ');
        const rawItems = cleanString.split(/[\s,]+/);
        rawItems.forEach(item => { 
            const num = parseFloat(item.trim()); 
            if (!isNaN(num) && num >= 1 && num <= 12) { sum += num; count++; } 
        });
    }
    
    let finalAvg = count === 0 ? 0 : +(sum / count).toFixed(2);
    let finalSem = count === 0 ? 0 : Math.round(sum / count);

    // 3. СЕМЕСТРОВА ОЦІНКА БЕЗЗАПЕРЕЧНО СТАЄ ФІНАЛЬНОЮ
    if (explicitSemester !== null) {
        finalSem = explicitSemester;
    }

    let gpaValue = explicitSemester !== null ? explicitSemester : finalAvg;

    return { 
        average: finalAvg, 
        count: count, 
        semesterGrade: finalSem, 
        isExplicit: explicitSemester !== null,
        gpaValue: gpaValue
    };
}

function getAnnualSubjects() {
    const list = []; const names1 = semestersData[1].map(s => s.name); const names2 = semestersData[2].map(s => s.name); const allNames = [...new Set([...names1, ...names2])]; 
    allNames.forEach(name => {
        const s1Subj = semestersData[1].find(s => s.name === name); const s2Subj = semestersData[2].find(s => s.name === name);
        const s1Stats = s1Subj ? calculateAverage(s1Subj.grades) : { semesterGrade: 0 }; const s2Stats = s2Subj ? calculateAverage(s2Subj.grades) : { semesterGrade: 0 };
        let annualGrade = 0; if (s1Stats.semesterGrade > 0 && s2Stats.semesterGrade > 0) annualGrade = Math.round((s1Stats.semesterGrade + s2Stats.semesterGrade) / 2); else if (s1Stats.semesterGrade > 0) annualGrade = s1Stats.semesterGrade; else if (s2Stats.semesterGrade > 0) annualGrade = s2Stats.semesterGrade;
        list.push({ name: name, s1Grade: s1Stats.semesterGrade, s2Grade: s2Stats.semesterGrade, annualGrade: annualGrade });
    }); return list;
}

function checkSpecialtyRequirements() {
    const input = document.getElementById('specialty-input').value.toLowerCase(); const resultsContainer = document.getElementById('specialty-results');
    if (!input || !input.trim()) { resultsContainer.innerHTML = ''; return; }
    let matchedCategory = null; for (let cat of specialtyCategories) { if (cat.keys.some(key => input.includes(key))) { matchedCategory = cat; break; } }
    if (!matchedCategory) { resultsContainer.innerHTML = ''; return; }
    let warningsHTML = ''; let coreSum = 0; let coreCount = 0; const currentMinGrade = matchedCategory.minGrade;
    const processSubject = (subject, grade, nameLabel) => {
        if (matchedCategory.core.some(word => subject.name.toLowerCase().includes(word)) && grade > 0) {
            coreSum += (subject.average || grade); coreCount++;
            if (grade < currentMinGrade) warningsHTML += `<div class="alert-item warning">⚠️ <b>${subject.name}</b>: ${nameLabel} <b>${grade}</b>.</div>`; else warningsHTML += `<div class="alert-item success">✅ <b>${subject.name}</b>: ${nameLabel} <b>${grade}</b>.</div>`;
        }
    };
    if (currentSemester === 'annual') getAnnualSubjects().forEach(s => processSubject(s, s.annualGrade, t('ann_score'))); else semestersData[currentSemester].forEach(s => { const stats = calculateAverage(s.grades); processSubject({...s, average: stats.average}, stats.semesterGrade, t('sem_score')); });
    if (coreCount === 0) { resultsContainer.innerHTML = ''; return; }
    resultsContainer.innerHTML = `<div class="core-gpa-box">${t('profile')} ${matchedCategory.name} | ${t('prof_score')} <span style="color:var(--primary)">${(coreSum / coreCount).toFixed(2)}</span></div>${warningsHTML}`;
}

function updateTotalGPA() {
    let totalSum = 0; let validCount = 0;
    if (currentSemester === 'annual') { getAnnualSubjects().forEach(s => { if (s.annualGrade > 0) { totalSum += s.annualGrade; validCount++; } }); } 
    else { semestersData[currentSemester].forEach(s => { const stats = calculateAverage(s.grades); if (stats.gpaValue > 0) { totalSum += stats.gpaValue; validCount++; } }); }
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
        if (!activeSubjects || activeSubjects.length === 0) { listElement.innerHTML = `<p style="text-align:center; color:gray; padding: 20px;">${t('empty_data')}</p>`; } 
        else {
            activeSubjects.forEach((subject, index) => {
                const stats = calculateAverage(subject.grades); 
                const el = document.createElement('div'); el.className = 'subject-item';
                
                // Якщо є Сем.С, то підсвічуємо бейдж
                let explicitStyle = stats.isExplicit ? 'background-color: #10B981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);' : '';
                let explicitIcon = stats.isExplicit ? '🎯 ' : '';

                el.innerHTML = `<div class="subject-header"><span>${subject.name}</span><button class="delete-btn" onclick="deleteSubject(${index})">${t('delete_btn')}</button></div><div class="grades-input-wrapper"><input type="text" value="${subject.grades}" placeholder="${t('grades_ph')}" oninput="updateGrades(${index}, this.value)"></div><div class="subject-stats"><span class="hint">${t('grade_count')} ${stats.count}</span><div class="stats-group"><span>${t('avg_score')} <span class="average-badge">${stats.average.toFixed(2)}</span></span><span>${t('sem_score')} <span class="semester-badge" style="${explicitStyle}">${explicitIcon}${stats.semesterGrade || 'Н/А'}</span></span></div></div>`;
                listElement.appendChild(el);
            });
        }
    }
    updateTotalGPA(); checkSpecialtyRequirements();
}


// =========================================================================
// 6. РОЗУМНИЙ ПАРСЕР ОЦІНОК
// =========================================================================
document.getElementById('parse-btn').addEventListener('click', () => {
    const rawText = document.getElementById('import-text').value; 
    if (!rawText.trim()) return;
    
    let addedCount = 0;
    let appendedCount = 0;
    const lines = rawText.replace(/\r/g, '').split('\n');

    const subTopics = ['зош', 'онлайн', 'тема', 'гр', 'робота', 'урок', 'дз', 'оцінка', 'контрольна', 'самостійна', 'практична', 'лабораторна', 'зошит', 'проєкт', 'тест', 'ведення', 'ср', 'кр', 'пр', 'лр', 'сем', 'семс', 'семестрова', 'семестр', 'скоригована'];

    let lastSubjectRef = null;

    lines.forEach(line => {
        let trimmedLine = line.trim();
        if (!trimmedLine) return;

        trimmedLine = trimmedLine.replace(/^[\d.\s\)]+\s/, '').trim();

        if (/^[\d\s,.\t]+$/.test(trimmedLine)) {
            if (lastSubjectRef) {
                let cleanGrades = trimmedLine.replace(/[.,\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
                lastSubjectRef.grades += " " + cleanGrades;
                appendedCount++;
            }
            return;
        }

        const matchGrades = trimmedLine.match(/(.*?)([\d\s,.\t]+)$/);
        
        if (matchGrades) {
            let textPart = matchGrades[1].trim(); 
            let gradesPart = matchGrades[2].trim().replace(/[.,\t]+/g, ' ').replace(/\s{2,}/g, ' '); 

            let normalizedText = textPart.toLowerCase().replace(/[^а-яіїєґa-z]/g, '');

            if (subTopics.includes(normalizedText) || textPart.includes(')') || textPart.includes('(')) {
                if (lastSubjectRef && /\d/.test(gradesPart)) {
                    let label = textPart.replace(/[()]/g, '').trim();
                    if (!label) label = "Оцінка";
                    label = label.charAt(0).toUpperCase() + label.slice(1);
                    
                    lastSubjectRef.grades += ` (${label}: ${gradesPart})`;
                    appendedCount++;
                }
            } 
            else if (textPart.length > 1) {
                let cleanSubject = textPart.replace(/\(.*\)/g, '').replace(/[()]/g, '').trim();
                if (/\d/.test(gradesPart)) {
                    let newSubj = { name: cleanSubject, grades: gradesPart };
                    semestersData[currentSemester].push(newSubj);
                    lastSubjectRef = newSubj;
                    addedCount++;
                }
            }
        }
    });

    if (addedCount > 0 || appendedCount > 0) { 
        document.getElementById('import-text').value = ''; 
        saveToFirebase(); 
        showInlineMessage(`Розпізнано: ${addedCount} предметів (+ ${appendedCount} дод. оцінок).`); 
    } else {
        showInlineMessage(t('msg_error'), true);
    }
});


// =========================================================================
// 7. СЛУХАЧІ КНОПОК
// =========================================================================
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
    changeTheme(currentTheme); 
    const savedUser = localStorage.getItem('smart_grades_current_user');
    if (savedUser) loginUser(savedUser); 
    else { document.getElementById('auth-screen').style.display = 'flex'; applyTranslations(); }
};