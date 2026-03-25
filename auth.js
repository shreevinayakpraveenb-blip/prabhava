const SUPABASE_URL = 'https://pkgaxclfrhaguzbckfdx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_o9oXYMlV59VSZ_rznHdDKg_64yVVY1F';

// ✅ Correct import
const { createClient } = window.supabase;

const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
        return await client.auth.signInWithPassword({ email, password });
    },

    async signOut() {
        await client.auth.signOut();
        window.location.href = 'index.html';
    },

    async getUser() {
        const { data: { user } } = await client.auth.getUser();
        return user;
    }
};
