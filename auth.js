const SUPABASE_URL = 'https://pkgaxclfrhaguzbckfdx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZ2F4Y2xmcmhhZ3V6YmNrZmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MDg1NTMsImV4cCI6MjA4OTA4NDU1M30.zrKUzOJOxbyWN9CtNuMD14ZKmNz8jRiW3AkTwOoYVFU';

const { createClient } = window.supabase;
const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ================= AUTH =================
const auth = {

  async signUp(email, password, fullName) {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) {
      alert(error.message);
      return null;
    }

    alert("Signup successful! Check your email.");
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
      return null;
    }

    // 🔥 redirect after login
    window.location.href = "dashboard.html";
    return data;
  },

  async signOut() {
    await client.auth.signOut();
    window.location.href = "index.html";
  },

  async getUser() {
    const { data, error } = await client.auth.getUser();

    if (error) {
      console.log(error.message);
      return null;
    }

    return data.user;
  },

  // 🔐 protect pages
  async requireAuth() {
    const user = await this.getUser();

    if (!user) {
      window.location.href = "index.html";
    }

    return user;
  }
};
