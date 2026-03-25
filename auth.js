const SUPABASE_URL = 'https://pkgaxclfrhaguzbckfdx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZ2F4Y2xmcmhhZ3V6YmNrZmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDg1NTMsImV4cCI6MjA4OTA4NDU1M30.zrKUzOJOxbyWN9CtNuMD14ZKmNz8jRiW3AkTwOoYVFU';

const { createClient } = window.supabase;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const auth = {
    async signUp(email, password, fullName) {
        return await client.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName }
            }
        });
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
