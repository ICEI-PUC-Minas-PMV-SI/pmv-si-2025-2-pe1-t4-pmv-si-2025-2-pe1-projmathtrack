// Perfil do Usuário - Visualização e Edição
(function() {
  const USER_KEY = 'mt_user';
  const USERS_KEY = 'mt_users';

  function getUser() {
    try {
      const txt = localStorage.getItem(USER_KEY);
      if (txt) return JSON.parse(txt);
    } catch (e) {}
    return null;
  }

  function getUsers() {
    try {
      const txt = localStorage.getItem(USERS_KEY);
      return txt ? JSON.parse(txt) : {};
    } catch (e) {
      return {};
    }
  }

  function saveUsers(db) {
    localStorage.setItem(USERS_KEY, JSON.stringify(db || {}));
  }

  function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }

  function localPart(email) {
    return String(email).split('@')[0] || '';
  }

  function formatPhone(phone) {
    if (!phone) return '-';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '-';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR');
    } catch (e) {
      return dateStr;
    }
  }

  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  }

  function loadProfile() {
    const currentUser = getUser();
    if (!currentUser || !currentUser.email) {
      window.location.href = '/src/pages/login.html';
      return;
    }

    const users = getUsers();
    const userData = users[currentUser.email];

    if (!userData) {
      alert('Dados do usuário não encontrados.');
      return;
    }

    // Exibir informações
    const name = userData.name || capitalize(localPart(currentUser.email));
    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('avatarInitial').textContent = getInitials(name);

    document.getElementById('displayName').textContent = name || '-';
    document.getElementById('displayEmail').textContent = currentUser.email || '-';
    document.getElementById('displayBirth').textContent = formatDate(userData.birth);
    document.getElementById('displayPhone').textContent = formatPhone(userData.phone);

    // Data de cadastro (aproximada - usar data atual se não existir)
    const memberSince = userData.createdAt || new Date().toISOString();
    try {
      const date = new Date(memberSince);
      document.getElementById('memberSince').textContent = date.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      document.getElementById('memberSince').textContent = '-';
    }

    // Preencher formulários de edição
    document.getElementById('editName').value = name || '';
    document.getElementById('editEmail').value = currentUser.email || '';
    document.getElementById('editBirth').value = userData.birth || '';
    document.getElementById('editPhone').value = userData.phone || '';
  }

  function setupEditPersonal() {
    const editBtn = document.getElementById('editPersonal');
    const cancelBtn = document.getElementById('cancelPersonal');
    const personalInfo = document.getElementById('personalInfo');
    const personalForm = document.getElementById('personalForm');

    editBtn.addEventListener('click', function(e) {
      e.preventDefault();
      personalInfo.style.display = 'none';
      personalForm.style.display = 'block';
      editBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function(e) {
      e.preventDefault();
      personalInfo.style.display = 'block';
      personalForm.style.display = 'none';
      editBtn.style.display = 'inline';
      loadProfile(); // Recarrega para resetar valores
    });

    personalForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const currentUser = getUser();
      if (!currentUser || !currentUser.email) {
        alert('Erro: usuário não encontrado.');
        return;
      }

      const users = getUsers();
      const userData = users[currentUser.email];

      if (!userData) {
        alert('Erro: dados do usuário não encontrados.');
        return;
      }

      const newName = document.getElementById('editName').value.trim();
      const newEmail = document.getElementById('editEmail').value.trim().toLowerCase();
      const newBirth = document.getElementById('editBirth').value.trim();
      const newPhone = document.getElementById('editPhone').value.trim();

      // Validações
      if (!newName) {
        alert('O nome é obrigatório.');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
        alert('Digite um e-mail válido.');
        return;
      }

      // Se o email mudou, verificar se já existe
      if (newEmail !== currentUser.email) {
        if (users[newEmail]) {
          alert('Este e-mail já está cadastrado.');
          return;
        }

        // Atualizar referência no banco de usuários
        users[newEmail] = {
          ...userData,
          name: newName,
          birth: newBirth,
          phone: newPhone
        };
        delete users[currentUser.email];
        saveUsers(users);

        // Atualizar usuário logado
        setUser({ email: newEmail, name: newName });
      } else {
        // Apenas atualizar dados
        users[currentUser.email] = {
          ...userData,
          name: newName,
          birth: newBirth,
          phone: newPhone
        };
        saveUsers(users);

        // Atualizar usuário logado
        setUser({ email: currentUser.email, name: newName });
      }

      // Atualizar navbar
      if (window.renderAuthUI) {
        window.renderAuthUI();
      }

      // Recarregar perfil
      loadProfile();

      // Voltar para visualização
      personalInfo.style.display = 'block';
      personalForm.style.display = 'none';
      editBtn.style.display = 'inline';

      alert('Perfil atualizado com sucesso!');
    });
  }

  function setupEditPassword() {
    const editBtn = document.getElementById('editPassword');
    const cancelBtn = document.getElementById('cancelPassword');
    const passwordInfo = document.getElementById('passwordInfo');
    const passwordForm = document.getElementById('passwordForm');

    editBtn.addEventListener('click', function(e) {
      e.preventDefault();
      passwordInfo.style.display = 'none';
      passwordForm.style.display = 'block';
      editBtn.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function(e) {
      e.preventDefault();
      passwordInfo.style.display = 'block';
      passwordForm.style.display = 'none';
      editBtn.style.display = 'inline';
      passwordForm.reset();
    });

    passwordForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const currentUser = getUser();
      if (!currentUser || !currentUser.email) {
        alert('Erro: usuário não encontrado.');
        return;
      }

      const users = getUsers();
      const userData = users[currentUser.email];

      if (!userData) {
        alert('Erro: dados do usuário não encontrados.');
        return;
      }

      const currentPassword = document.getElementById('currentPassword').value.trim();
      const newPassword = document.getElementById('newPassword').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();

      // Validações
      if (userData.password !== currentPassword) {
        alert('Senha atual incorreta.');
        return;
      }

      if (newPassword.length < 4) {
        alert('A nova senha deve ter pelo menos 4 caracteres.');
        return;
      }

      if (newPassword !== confirmPassword) {
        alert('As senhas não conferem.');
        return;
      }

      if (currentPassword === newPassword) {
        alert('A nova senha deve ser diferente da senha atual.');
        return;
      }

      // Atualizar senha
      users[currentUser.email] = {
        ...userData,
        password: newPassword
      };
      saveUsers(users);

      // Limpar formulário
      passwordForm.reset();

      // Voltar para visualização
      passwordInfo.style.display = 'block';
      passwordForm.style.display = 'none';
      editBtn.style.display = 'inline';

      alert('Senha alterada com sucesso!');
    });
  }

  // Inicialização
  document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getUser();
    if (!currentUser) {
      return; // O script de proteção já vai lidar com isso
    }

    loadProfile();
    setupEditPersonal();
    setupEditPassword();
  });
})();

