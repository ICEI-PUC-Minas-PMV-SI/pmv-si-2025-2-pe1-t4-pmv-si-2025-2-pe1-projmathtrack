// Login usando localStorage (mesmo padrão do auth.js e signup.js)
(function () {
  const USER_KEY  = 'mt_user';
  const USERS_KEY = 'mt_users';

  function getUsers() {
    try {
      const txt = localStorage.getItem(USERS_KEY);
      return txt ? JSON.parse(txt) : {};
    } catch (e) { return {}; }
  }

  function setUser(u) {
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  }

  function localPart(email) {
    return String(email).split('@')[0] || '';
  }

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    if (!form) return;

    const emailInput = document.getElementById('loginEmail');
    const passInput = document.getElementById('loginSenha');
    const errorDiv = document.getElementById('loginError');

    function showError(msg) {
      if (errorDiv) {
        errorDiv.textContent = msg;
        errorDiv.style.display = 'block';
      } else {
        alert(msg);
      }
      if (passInput) passInput.classList.add('is-invalid');
    }

    function clearError() {
      if (errorDiv) {
        errorDiv.style.display = 'none';
      }
      if (passInput) passInput.classList.remove('is-invalid');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      const email = (emailInput.value || '').trim().toLowerCase();
      const senha = (passInput.value || '').trim();

      // Validações
      if (!email) {
        showError('Informe seu e-mail.');
        emailInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        showError('Informe um e-mail válido.');
        emailInput.focus();
        return;
      }

      if (!senha) {
        showError('Informe sua senha.');
        passInput.focus();
        return;
      }

      if (senha.length < 4) {
        showError('A senha deve ter pelo menos 4 caracteres.');
        passInput.focus();
        return;
      }

      // Busca usuário no localStorage
      const db = getUsers();
      const userData = db[email];

      if (!userData) {
        showError('E-mail não cadastrado. Clique em "Criar conta".');
        emailInput.focus();
        return;
      }

      if (userData.password !== senha) {
        showError('Senha incorreta. Tente novamente.');
        passInput.focus();
        return;
      }

      // Login bem-sucedido
      setUser({
        email: email,
        name: userData.name || capitalize(localPart(email))
      });

      // Redireciona para Home
      window.location.href = '/src/pages/Home.html';
    });

    // Limpa erro ao digitar
    if (emailInput) {
      emailInput.addEventListener('input', clearError);
    }
    if (passInput) {
      passInput.addEventListener('input', clearError);
    }
  });
})();

