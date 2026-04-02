import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://nxxnhqtqvrkbdhltoijz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_YKoXoU5eJNy07bYBKWh73g_0RDK7bF0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Kullanıcıyı getir
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data?.user || null;
}

// Kısa alias
export async function getUser() {
  return await getCurrentUser();
}

// Giriş zorunlu sayfalar için
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    window.location.href = '/login.html';
    return null;
  }

  return user;
}

// Kayıt ol
export async function signUp(email, password, username = '') {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (error) throw error;
  return data;
}

// Giriş yap
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// Çıkış yap
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  window.location.href = '/login.html';
}

// Şifre sıfırlama maili
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/profile.html'
  });

  if (error) throw error;
  return data;
}

// Auth değişimini dinle
export function listenAuth(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null, event);
  });
}
