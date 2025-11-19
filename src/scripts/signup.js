// Cadastro Salvo no LocalStorage
(function () {
  var USERS_KEY = 'mt_users';
  var USER_KEY  = 'mt_user';

  function getUsers() {
    try {
      var txt = localStorage.getItem(USERS_KEY);
      return txt ? JSON.parse(txt) : {};
    } catch (e) { return {}; }
  }
  function saveUsers(db) {
    localStorage.setItem(USERS_KEY, JSON.stringify(db || {}));
  }
  function setUser(u) {
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  }

  // Eu não to doida com esse tanto de símbulo. É so pra validar o formato do email mesmo. 
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('signupForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nome   = (document.getElementById('nome').value || '').trim();
      var nasc   = (document.getElementById('nascimento').value || '').trim();
      var cel    = (document.getElementById('celular').value || '').trim();
      var email  = (document.getElementById('email').value || '').trim().toLowerCase();
      var email2 = (document.getElementById('email2').value || '').trim().toLowerCase();
      var senha  = (document.getElementById('senha').value || '').trim();

      // validações básicas
      if (!nome) { alert('Informe seu nome.'); return; }
      if (!isValidEmail(email)) { alert('Informe um e-mail válido.'); return; }
      if (email !== email2) { alert('Os e-mails informados não conferem.'); return; }
      if (senha.length < 4) { alert('A senha deve ter pelo menos 4 caracteres.'); return; }

      var db = getUsers();
      if (db[email]) {
        alert('Este e-mail já está cadastrado. Faça login.');
        return;
      }

      // salva usuário no banco local
      db[email] = {
        password: senha,
        name: nome,
        birth: nasc,
        phone: cel,
        createdAt: new Date().toISOString()
      };
      saveUsers(db);

      // já entra logado
      setUser({ email: email, name: nome });

      // redireciona 
      window.location.href = '/src/pages/Home.html';
    });
  });
})();
