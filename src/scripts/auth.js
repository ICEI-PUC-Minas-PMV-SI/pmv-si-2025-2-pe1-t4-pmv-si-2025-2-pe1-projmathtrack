//Login via pop-up e atualiza a navbar 
const USER_KEY  = 'mt_user';
const USERS_KEY = 'mt_users'; // { email: { password, name } }

// Storage básico 
function getUser() {
  try { const txt = localStorage.getItem(USER_KEY); if (txt) return JSON.parse(txt); } catch (e) {}
  return null;
}
function setUser(user) { localStorage.setItem(USER_KEY, JSON.stringify(user)); }
function clearUser() { localStorage.removeItem(USER_KEY); }

function getUsers() {
  try { const txt = localStorage.getItem(USERS_KEY); if (txt) return JSON.parse(txt); } catch (e) {}
  return {}; // vazio
}
function saveUsers(db) { localStorage.setItem(USERS_KEY, JSON.stringify(db || {})); }

// Navbar
function localPart(email){ return String(email).split('@')[0] || ''; }
function capitalize(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function renderAuthUI() {
  const u = getUser();
  const guest = document.getElementById('actionsGuest');
  const user  = document.getElementById('actionsUser');
  const info  = document.getElementById('userInfo');
  if (!guest || !user || !info) return;

  if (u) {
    const shownName = u.name || (u.email ? capitalize(localPart(u.email)) : 'Usuário');
    info.textContent = shownName;
    guest.style.display = 'none';
    user.style.display  = 'flex';
  } else {
    guest.style.display = 'flex';
    user.style.display  = 'none';
  }
}

function bindLogout() {
  const btn = document.getElementById('btnLogout');
  if (!btn) return;
  btn.onclick = function(){
    clearUser();
    const toggle = document.getElementById('navToggle');
    if (toggle) toggle.checked = false;
    renderAuthUI();
  };
}

// Pop-up 
function showLoginPopup(message) {
  const mainEl = document.querySelector('main');
  if (mainEl) mainEl.style.filter = 'blur(2px)';

  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';

  const box = document.createElement('div');
  box.className = 'popup-box';
  box.innerHTML = `
    <h3>Login necessário</h3>
    <p>${message || 'Você precisa estar logado para continuar.'}</p>

    <form id="popupForm" novalidate>
      <div class="popup-field">
        <label for="popupEmail">E-mail</label>
        <input type="email" id="popupEmail" placeholder="seuemail@exemplo.com" required />
      </div>

      <div class="popup-field">
        <label for="popupPass">Senha</label>
        <div class="popup-passwrap">
          <input type="password" id="popupPass" placeholder="Sua senha" required />
          <button type="button" id="popupTogglePass" class="popup-eye" aria-label="Mostrar senha">👁️</button>
        </div>
        <div id="popupError" class="error-text" style="display:none"></div>
      </div>

      <div class="popup-links">
        <a href="/src/pages/recuperar-senha.html" id="popupForgot">Esqueceu a senha?</a>
        <a href="/src/pages/criar-conta.html" id="popupSignup">Criar conta</a>
      </div>

      <div class="popup-actions">
        <button id="popupCancel" class="btn btn--ghost" type="button">Cancelar</button>
        <button id="popupConfirm" class="btn btn--primary" type="submit">Entrar</button>
      </div>
    </form>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  const emailEl = document.getElementById('popupEmail');
  const passEl  = document.getElementById('popupPass');
  const formEl  = document.getElementById('popupForm');
  const togglePassBtn = document.getElementById('popupTogglePass');
  const cancelBtn = document.getElementById('popupCancel');
  const forgotA  = document.getElementById('popupForgot');
  const signupA  = document.getElementById('popupSignup');
  const errorEl  = document.getElementById('popupError');

  if (emailEl) emailEl.focus();

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.style.display = 'block';
    passEl.classList.add('is-invalid');
  }
  function clearError() {
    errorEl.style.display = 'none';
    passEl.classList.remove('is-invalid');
  }

  togglePassBtn.addEventListener('click', function(){
    const isPwd = passEl.type === 'password';
    passEl.type = isPwd ? 'text' : 'password';
    this.textContent = isPwd ? '🙈' : '👁️';
  });

  cancelBtn.addEventListener('click', function(){
    overlay.remove();
    if (mainEl) mainEl.style.filter = 'none';
  });

  function closeAndGo() {
    overlay.remove();
    if (mainEl) mainEl.style.filter = 'none';
  }
  forgotA.addEventListener('click', closeAndGo);
  signupA.addEventListener('click', closeAndGo);

  passEl.addEventListener('input', clearError);
  emailEl.addEventListener('input', clearError);

  formEl.addEventListener('submit', function(e){
    e.preventDefault();
    clearError();

    const email = (emailEl.value || '').trim().toLowerCase();
    const pass  = (passEl.value  || '').trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('Digite um e-mail válido.'); emailEl.focus(); return; }
    if (pass.length < 4) { showError('A senha deve ter ao menos 4 caracteres.'); passEl.focus(); return; }

    const users = getUsers();
    const userData = users[email];

    // Verificações detalhadas:
    if (!userData) {
      showError('E-mail não cadastrado. Clique em "Criar conta".');
      emailEl.focus();
      return;
    }

    if (userData.password !== pass) {
      showError('Senha incorreta. Tente novamente.');
      passEl.focus();
      return;
    }

    // Login OK
    setUser({ email, name: userData.name || capitalize(localPart(email)) });
    overlay.remove();
    if (mainEl) mainEl.style.filter = 'none';
    renderAuthUI();
  });
}

//  Guard 
function requireLoginPopup(message) {
  if (!getUser()) {
    showLoginPopup(message);
    return false;
  }
  return true;
}

//  Inicialização
function initAuth() {
  const ok = document.getElementById('actionsGuest') || document.getElementById('actionsUser');
  if (!ok) { setTimeout(initAuth, 120); return; }
  renderAuthUI();
  bindLogout();
}
document.addEventListener('DOMContentLoaded', initAuth);
window.requireLoginPopup = requireLoginPopup;
