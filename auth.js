const SUPABASE_URL = 'https://pkgaxclfrhaguzbckfdx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_o9oXYMlV59VSZ_rznHdDKg_64yVVY1F';

// ✅ FIX: supabase variable ka naam change kiya
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth Helper Functions
const auth = {
    async signUp(email, password, fullName) {
        const { data, error } = await client.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName }
            }
        });
        return { data, error };
    },

    async signIn(email, password) {
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },

    async signOut() {
        const { error } = await client.auth.signOut();
        if (!error) window.location.href = 'index.html';
        return { error };
    },

    async getUser() {
        const { data: { user } } = await client.auth.getUser();
        return user;
    },

    onAuthStateChange(callback) {
        return client.auth.onAuthStateChange(callback);
    }
};

// Toast
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} animate-up`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleUI(newTheme);
}

function updateThemeToggleUI(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}
