// Esse arquivo faz muita coisa! Tem muito detalhe, cuidado para não excluir nada ou gerar algum erro. 
// Lembre-se um arquivo longo é BEM DIFICIL ACHAR O ERRO!
// Aqui tem: criar/abrir tópicos, comentar, editar, excluir, curtir, salvar e exige login do usuário para algumas coisas.

// Configuração das chaves localStorage
var DB_KEY = 'mt_forum_v1';

// Estado
var estado = carregar();
var mostrarSalvos = false;
var termoBusca = "";
var assuntoFiltro = ""; // Filtro por assunto (vazio = todos)
var mostrarMeusTopicos = false; // Filtro para mostrar apenas tópicos do usuário logado

// Elementos da página 
var elBusca = document.getElementById('busca');
var btnNovo = document.getElementById('btnNovoTopico');
var btnFiltrarSalvos = document.getElementById('btnFiltrarSalvos');
var boxNovo = document.getElementById('boxNovoTopico');
var listaTopicos = document.getElementById('listaTopicos');
var visaoTopico = document.getElementById('visaoTopico');

// Se não houver dados ainda, cria um exemplo
if (!estado || !estado.topicos || estado.topicos.length === 0) {
  estado = {
    topicos: [
      {
        id: gerarId(),
        titulo: "Bem-vindo ao Fórum MathTrack",
        corpo: "Neste espaço, você pode discutir tópicos relacionados à matemática, compartilhar dúvidas e ajudar outros membros da comunidade. Sinta-se à vontade para criar novos tópicos e participar das discussões!",
        autor: "Equipe",
        assunto: "Álgebra",
        criadoEm: Date.now(),
        curtidas: 2,
        salvo: false,
        comentarios: [
          {
            id: gerarId(),
            autor: "Bianca",
            corpo: "Primeiro comentário! 🎉",
            criadoEm: Date.now(),
            curtidas: 1
          }
        ]
      }
    ]
  };
  salvar(estado);
}


function getUser() {
  // Usa a função global do auth.js 
  if (window.getUser) {
    return window.getUser();
  }
  return null;
}

function isLogged() {
  return !!getUser();
}

// Bloqueia ações se não estiver logado e usa o popup de login do auth.js
function requireLogin() {
  if (!isLogged()) {
    // Usa o popup do auth.js 
    if (window.requireLoginPopup) {
      window.requireLoginPopup('Você precisa estar logado para realizar esta ação.');
    }
    return false;
  }
  return true;
}

// Armazenamento
function carregar() {
  try {
    var txt = localStorage.getItem(DB_KEY);
    if (txt) return JSON.parse(txt);
  } catch (e) {}
  return { topicos: [] };
}

function salvar(dados) {
  localStorage.setItem(DB_KEY, JSON.stringify(dados));
}

// Util 
function gerarId() {
  return 'id_' + Math.random().toString(36).substring(2) + '_' + new Date().getTime();
}

function formatarData(ms) {
  try { return new Date(ms).toLocaleString('pt-BR'); }
  catch (e) { return ""; }
}

function escaparHTML(s) {
  if (!s && s !== 0) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Lista 
function obterTopicosFiltrados() {
  var arr = [];
  var i;

  for (i = 0; i < estado.topicos.length; i++) {
    arr.push(estado.topicos[i]);
  }

  // Filtro por assunto
  if (assuntoFiltro && assuntoFiltro.trim() !== "") {
    var filtradosAssunto = [];
    for (i = 0; i < arr.length; i++) {
      if (arr[i].assunto === assuntoFiltro) {
        filtradosAssunto.push(arr[i]);
      }
    }
    arr = filtradosAssunto;
  }

  // Filtro "Seus tópicos" - mostra apenas tópicos do usuário logado
  if (mostrarMeusTopicos) {
    var u = getUser();
    if (u && u.name) {
      var meusTopicos = [];
      for (i = 0; i < arr.length; i++) {
        if (arr[i].autor === u.name) {
          meusTopicos.push(arr[i]);
        }
      }
      arr = meusTopicos;
    } else {
      // Se não estiver logado, não mostra nada
      arr = [];
    }
  }

  if (mostrarSalvos) {
    var salvos = [];
    for (i = 0; i < arr.length; i++) if (arr[i].salvo) salvos.push(arr[i]);
    arr = salvos;
  }

  if (termoBusca && termoBusca.trim() !== "") {
    var q = termoBusca.trim().toLowerCase();
    var filtrados = [];
    for (i = 0; i < arr.length; i++) {
      var t = arr[i];
      var txt = (t.titulo + " " + t.corpo).toLowerCase();
      if (txt.indexOf(q) !== -1) filtrados.push(t);
    }
    arr = filtrados;
  }

  arr.sort(function (a, b) { return b.criadoEm - a.criadoEm; });
  return arr;
}

function renderLista() {
  visaoTopico.style.display = "none";
  listaTopicos.innerHTML = "";

  var itens = obterTopicosFiltrados();
  if (itens.length === 0) {
    listaTopicos.innerHTML = '<div class="thread-card"><p>Nenhum tópico encontrado.</p></div>';
    return;
  }

  for (var i = 0; i < itens.length; i++) {
    var t = itens[i];
    var salvoBadge = t.salvo ? '<span class="chip -alt">Salvo</span>' : '';
    var assuntoBadge = t.assunto ? '<span class="chip">' + escaparHTML(t.assunto) + '</span>' : '';
    var html = ''
      + '<article class="thread-card">'
      + '  <header class="thread-head">'
      + '    <h2 class="thread-title">' + escaparHTML(t.titulo) + '</h2>'
      + '    <div class="thread-tags">' + assuntoBadge + salvoBadge + '</div>'
      + '  </header>'
      + '  <div class="thread-meta">'
      + '    <img class="avatar" src="/assets/avatar1.jpg" alt="">'
      + '    <div class="who">'
      + '      <strong>' + escaparHTML(t.autor || "Anônimo") + '</strong>'
      + '      <span>' + formatarData(t.criadoEm) + '</span>'
      + '    </div>'
      + '    <div class="counters"><span>👍 ' + (t.curtidas || 0) + '</span><span>💬 ' + t.comentarios.length + '</span></div>'
      + '  </div>'
      + '  <p class="thread-body">' + escaparHTML(t.corpo) + '</p>'
      + '  <footer class="thread-foot">'
      + '    <button class="btn btn--ghost btn-sm" data-abrir="' + t.id + '">Abrir</button>'
      + '    <div>'
      + '      <button class="btn btn--ghost btn-sm" data-curtir-topico="' + t.id + '">Curtir</button> '
      + '      <button class="btn btn--ghost btn-sm" data-salvar-topico="' + t.id + '">' + (t.salvo ? 'Remover dos salvos' : 'Salvar') + '</button> '
      + '      <button class="btn btn--ghost btn-sm" data-editar-topico="' + t.id + '">Editar</button> '
      + '      <button class="btn btn--ghost btn-sm" data-excluir-topico="' + t.id + '">Excluir</button>'
      + '    </div>'
      + '  </footer>'
      + '</article>';

    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    listaTopicos.appendChild(wrap.firstChild);
  }
}

// Visão do tópico
function abrirTopico(id) {
  var t = encontrarTopico(id);
  if (!t) return;

  listaTopicos.innerHTML = "";
  visaoTopico.style.display = "block";

  var html = '';
  html += '<section class="thread-card">';
  html += '  <header class="thread-head">';
  html += '    <h1 class="thread-title">' + escaparHTML(t.titulo) + '</h1>';
  html += '    <div class="thread-tags">' + (t.assunto ? '<span class="chip">' + escaparHTML(t.assunto) + '</span>' : '') + (t.salvo ? '<span class="chip -alt">Salvo</span>' : '') + '</div>';
  html += '  </header>';
  html += '  <div class="thread-meta">';
  html += '    <img class="avatar" src="/assets/avatar1.jpg" alt="">';
  html += '    <div class="who"><strong>' + escaparHTML(t.autor || "Anônimo") + '</strong><span>' + formatarData(t.criadoEm) + '</span></div>';
  html += '    <div class="counters"><span>👍 ' + (t.curtidas || 0) + '</span><span>💬 ' + t.comentarios.length + '</span></div>';
  html += '  </div>';
  html += '  <p class="thread-body">' + escaparHTML(t.corpo) + '</p>';

  html += '  <div class="thread-actions-bar" style="display:flex; gap:8px; margin:10px 0">';
  html += '    <button class="btn btn--primary btn-sm" id="btnVoltarLista">Voltar</button>';
  html += '    <button class="btn btn--ghost btn-sm" data-curtir-topico="' + t.id + '">Curtir</button>';
  html += '    <button class="btn btn--ghost btn-sm" data-salvar-topico="' + t.id + '">' + (t.salvo ? 'Remover dos salvos' : 'Salvar') + '</button>';
  html += '    <button class="btn btn--ghost btn-sm" data-editar-topico="' + t.id + '">Editar</button>';
  html += '    <button class="btn btn--ghost btn-sm" data-excluir-topico="' + t.id + '">Excluir</button>';
  html += '  </div>';

  html += '  <hr class="divider">';
  html += '  <h3 class="comments-title">Comentários</h3>';

  // Comentários
  var i;
  for (i = 0; i < t.comentarios.length; i++) {
    var c = t.comentarios[i];
    html += ''
      + '<article class="comment" data-id="' + c.id + '">'
      + '  <div class="comment-meta">'
      + '    <img class="avatar" src="/assets/avatar2.jpg" alt="">'
      + '    <div class="who"><strong>' + escaparHTML(c.autor || "Anônimo") + '</strong> <span>' + formatarData(c.criadoEm) + '</span></div>'
      + '  </div>'
      + '  <p class="comment-body">' + escaparHTML(c.corpo) + '</p>'
      + '  <div class="comment-actions">'
      + '    <button class="btn btn--ghost btn-sm" data-curtir-comentario="' + t.id + '::' + c.id + '">Curtir (' + (c.curtidas || 0) + ')</button>'
      + '    <button class="btn btn--ghost btn-sm" data-editar-comentario="' + t.id + '::' + c.id + '">Editar</button>'
      + '    <button class="btn btn--ghost btn-sm" data-excluir-comentario="' + t.id + '::' + c.id + '">Excluir</button>'
      + '  </div>'
      + '</article>';
  }

  // Formulário de novo comentário
  html += ''
    + '<div style="margin-top:12px; display:grid; gap:8px">'
    + '  <input id="novoAutorComent" class="search-input" placeholder="Seu nome (opcional)">'
    + '  <textarea id="novoComentario" class="search-input" placeholder="Escreva um comentário…"></textarea>'
    + '  <div style="display:flex; gap:8px; justify-content:flex-end">'
    + '    <button class="btn btn--ghost btn-sm" id="btnComentar">Comentar</button>'
    + '  </div>'
    + '</div>';

  html += '</section>';

  visaoTopico.innerHTML = html;

  document.getElementById('btnVoltarLista').addEventListener('click', function () {
    renderLista();
  });
}

// CRUD do Tópico 
function encontrarTopico(id) {
  var i;
  for (i = 0; i < estado.topicos.length; i++) {
    if (estado.topicos[i].id === id) return estado.topicos[i];
  }
  return null;
}

function criarTopico(titulo, autor, corpo, assunto) {
  var t = {
    id: gerarId(),
    titulo: titulo,
    corpo: corpo,
    autor: autor,
    assunto: assunto || "",
    criadoEm: Date.now(),
    curtidas: 0,
    salvo: false,
    comentarios: []
  };
  estado.topicos.push(t);
  salvar(estado);
  return t.id;
}

function editarTopico(id, novoTitulo, novoCorpo) {
  var t = encontrarTopico(id);
  if (!t) return;
  if (novoTitulo && novoTitulo.trim() !== "") t.titulo = novoTitulo.trim();
  if (novoCorpo && novoCorpo.trim() !== "") t.corpo = novoCorpo.trim();
  salvar(estado);
}

function excluirTopico(id) {
  var nova = [];
  var i;
  for (i = 0; i < estado.topicos.length; i++) {
    if (estado.topicos[i].id !== id) nova.push(estado.topicos[i]);
  }
  estado.topicos = nova;
  salvar(estado);
}

function curtirTopico(id) {
  var t = encontrarTopico(id);
  if (!t) return;
  t.curtidas = (t.curtidas || 0) + 1;
  salvar(estado);
}

function alternarSalvo(id) {
  var t = encontrarTopico(id);
  if (!t) return;
  t.salvo = !t.salvo;
  salvar(estado);
}

// CRUD do Comentário
function comentar(idTopico, autor, corpo) {
  var t = encontrarTopico(idTopico);
  if (!t) return;
  t.comentarios.push({
    id: gerarId(),
    autor: autor,
    corpo: corpo,
    criadoEm: Date.now(),
    curtidas: 0
  });
  salvar(estado);
}

function curtirComentario(idTopico, idComentario) {
  var t = encontrarTopico(idTopico);
  if (!t) return;
  var i;
  for (i = 0; i < t.comentarios.length; i++) {
    if (t.comentarios[i].id === idComentario) {
      t.comentarios[i].curtidas = (t.comentarios[i].curtidas || 0) + 1;
      break;
    }
  }
  salvar(estado);
}

function editarComentario(idTopico, idComentario, novoTexto) {
  var t = encontrarTopico(idTopico);
  if (!t) return;
  var i;
  for (i = 0; i < t.comentarios.length; i++) {
    if (t.comentarios[i].id === idComentario) {
      if (novoTexto && novoTexto.trim() !== "") {
        t.comentarios[i].corpo = novoTexto.trim();
      }
      break;
    }
  }
  salvar(estado);
}

function excluirComentario(idTopico, idComentario) {
  var t = encontrarTopico(idTopico);
  if (!t) return;
  var nova = [];
  var i;
  for (i = 0; i < t.comentarios.length; i++) {
    if (t.comentarios[i].id !== idComentario) nova.push(t.comentarios[i]);
  }
  t.comentarios = nova;
  salvar(estado);
}

// Eventos globais 
document.addEventListener('click', function (e) {
  var alvo = e.target;

  // abrir tópico
  if (alvo.getAttribute('data-abrir')) {
    abrirTopico(alvo.getAttribute('data-abrir'));
    return;
  }

  // Curtir / Salvar / Editar / Excluir (tópico) — exigem login
  if (alvo.getAttribute('data-curtir-topico')) {
    if (!requireLogin()) return;
    var idC = alvo.getAttribute('data-curtir-topico');
    curtirTopico(idC);
    if (visaoTopico.style.display === "block") abrirTopico(idC); else renderLista();
    return;
  }

  if (alvo.getAttribute('data-salvar-topico')) {
    if (!requireLogin()) return;
    var idS = alvo.getAttribute('data-salvar-topico');
    alternarSalvo(idS);
    if (visaoTopico.style.display === "block") abrirTopico(idS); else renderLista();
    return;
  }

  if (alvo.getAttribute('data-excluir-topico')) {
    var idDel = alvo.getAttribute('data-excluir-topico');
    if (confirm('Excluir este tópico?')) {
      excluirTopico(idDel);
      renderLista();
    }
    return;
  }

  if (alvo.getAttribute('data-editar-topico')) {
    var idEd = alvo.getAttribute('data-editar-topico');
    var t = encontrarTopico(idEd);
    if (!t) return;
    var novoTitulo = prompt('Novo título:', t.titulo);
    if (novoTitulo === null) return;
    var novoCorpo = prompt('Novo conteúdo:', t.corpo);
    if (novoCorpo === null) return;
    editarTopico(idEd, novoTitulo, novoCorpo);
    if (visaoTopico.style.display === "block") abrirTopico(idEd); else renderLista();
    return;
  }

  // Comentários: curtir / editar / excluir — exigem login; edição/exclusão só do autor
  if (alvo.getAttribute('data-curtir-comentario')) {
    if (!requireLogin()) return;
    var p = alvo.getAttribute('data-curtir-comentario').split('::');
    curtirComentario(p[0], p[1]);
    abrirTopico(p[0]);
    return;
  }

  if (alvo.getAttribute('data-excluir-comentario')) {
    if (!requireLogin()) return;
    var p2 = alvo.getAttribute('data-excluir-comentario').split('::');
    var t2 = encontrarTopico(p2[0]); if (!t2) return;
    var u2 = getUser();
    var i2;
    for (i2 = 0; i2 < t2.comentarios.length; i2++) {
      if (t2.comentarios[i2].id === p2[1]) {
        // Verifica se o usuário existe e se o nome corresponde
        var userName = u2 && u2.name ? u2.name : null;
        if (!userName || t2.comentarios[i2].autor !== userName) {
          alert('Você só pode excluir seus próprios comentários.');
          return;
        }
        if (confirm('Excluir este comentário?')) {
          excluirComentario(p2[0], p2[1]);
          abrirTopico(p2[0]);
        }
        break;
      }
    }
    return;
  }

  if (alvo.getAttribute('data-editar-comentario')) {
    if (!requireLogin()) return;
    var p3 = alvo.getAttribute('data-editar-comentario').split('::');
    var t3 = encontrarTopico(p3[0]); if (!t3) return;
    var u3 = getUser();
    var i3;
    for (i3 = 0; i3 < t3.comentarios.length; i3++) {
      if (t3.comentarios[i3].id === p3[1]) {
        // Verifica se o usuário existe e se o nome corresponde
        var userName3 = u3 && u3.name ? u3.name : null;
        if (!userName3 || t3.comentarios[i3].autor !== userName3) {
          alert('Você só pode editar seus próprios comentários.');
          return;
        }
        var novoTxt = prompt('Editar comentário:', t3.comentarios[i3].corpo);
        if (novoTxt === null) return;
        editarComentario(p3[0], p3[1], novoTxt);
        abrirTopico(p3[0]);
        break;
      }
    }
    return;
  }
});

// Comentar (botão dentro da visão do tópico) — exige login
document.addEventListener('click', function (e) {
  if (e.target && e.target.id === 'btnComentar') {
    if (!requireLogin()) return;

    // localizar tópico aberto pelo título exibido
    var h1 = visaoTopico.querySelector('.thread-title');
    if (!h1) return;

    var idTopico = null;
    var i;
    for (i = 0; i < estado.topicos.length; i++) {
      if (estado.topicos[i].titulo === h1.textContent) {
        idTopico = estado.topicos[i].id;
        break;
      }
    }
    if (!idTopico) return;

    var autor = document.getElementById('novoAutorComent').value;
    // Auto-preencher com usuário logado se vazio
    if ((!autor || autor.trim() === "") && isLogged()) {
      var u = getUser();
      if (u && u.name) {
        autor = u.name;
      }
    }

    var corpo = document.getElementById('novoComentario').value;

    if (!corpo || corpo.trim() === "") {
      alert('Escreva um comentário.');
      return;
    }
    comentar(idTopico, autor, corpo);
    abrirTopico(idTopico);
  }
});

// Novo tópico 
btnNovo.addEventListener('click', function () {
  boxNovo.style.display = boxNovo.style.display === "none" ? "block" : "none";
});

document.getElementById('btnCancelarTopico').addEventListener('click', function () {
  boxNovo.style.display = "none";
});

// Publicar tópico — exige login! 
document.getElementById('btnPublicarTopico').addEventListener('click', function () {
  if (!requireLogin()) return;

  var titulo = document.getElementById('novoTitulo').value;
  var assunto = document.getElementById('novoAssunto').value;
  var autor = document.getElementById('novoAutor').value;
  if ((!autor || autor.trim() === "") && isLogged()) {
    var u = getUser();
    if (u && u.name) {
      autor = u.name;
    }
  }
  var corpo = document.getElementById('novoCorpo').value;

  if (!titulo || titulo.trim() === "" || !corpo || corpo.trim() === "" || !assunto || assunto.trim() === "") {
    alert('Informe título, assunto e conteúdo.');
    return;
  }

  var novoId = criarTopico(titulo, autor, corpo, assunto);

  // limpar Formulário
  document.getElementById('novoTitulo').value = "";
  document.getElementById('novoAssunto').value = "";
  document.getElementById('novoAutor').value = "";
  document.getElementById('novoCorpo').value = "";
  boxNovo.style.display = "none";

  renderLista();
  abrirTopico(novoId);
});

// Busca
elBusca.addEventListener('input', function () {
  termoBusca = elBusca.value;
  renderLista();
});

// Filtro "Salvos"
btnFiltrarSalvos.addEventListener('click', function () {
  mostrarSalvos = !mostrarSalvos;
  btnFiltrarSalvos.textContent = mostrarSalvos ? "Todos" : "Salvos";
  renderLista();
});

// Filtro por assunto e "Seus tópicos" (sidebar)
document.addEventListener('click', function (e) {
  var alvo = e.target;
  var filtroAssunto = alvo.getAttribute('data-filtro-assunto');
  var meusTopicos = alvo.getAttribute('data-meus-topicos');
  
  if (filtroAssunto !== null || meusTopicos !== null) {
    e.preventDefault();
    
    if (meusTopicos !== null) {
      // Filtro "Seus tópicos"
      mostrarMeusTopicos = true;
      assuntoFiltro = ""; // Limpa o filtro de assunto
      
      // Verifica se o usuário está logado
      if (!isLogged()) {
        if (window.requireLoginPopup) {
          window.requireLoginPopup('Você precisa estar logado para ver seus tópicos.');
        }
    return;
  }
    } else {
      // Filtro por assunto ou Home
      mostrarMeusTopicos = false;
      assuntoFiltro = filtroAssunto || "";
    }
    
    // Atualiza a classe ativa na sidebar
    var links = document.querySelectorAll('.side-link, .side-list a');
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('is-active');
    }
    alvo.classList.add('is-active');
    
    // Renderiza a lista filtrada
    renderLista();
}
});

// Primeira renderização
// Nota: A autenticação é gerenciada pelo auth.js, não precisamos mais de initAuthBindings()
renderLista();
