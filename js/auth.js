export async function getUser() {
  const { data } = await supabaseClient.auth.getUser();
  return data?.user;
}

export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    window.location.href = '/login.html';
    return null;
  }

  return user;
}

export async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = '/login.html';
}

export function listenAuth(callback) {
  supabaseClient.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
}
