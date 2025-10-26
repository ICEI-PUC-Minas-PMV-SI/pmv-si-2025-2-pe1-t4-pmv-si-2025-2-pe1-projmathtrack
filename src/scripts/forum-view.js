// Guarda a visão original da lista para restaurar depois
const feed = document.querySelector('.feed');
const listViewHTML = feed ? feed.innerHTML : '';

// Mock de dados do tópico
const THREADS = {
  'thread-1': {
    title: 'Representação gráfica',
    tags: ['Álgebra Básica', 'Dúvida'],
    author: 'Nome do aluno',
    time: 'há 2h',
    avatar: '/assets/avatar1.jpg',
    body: `Pessoal, estou com uma dúvida sobre como fazer representação
           gráfica de retas e coeficiente angular. Teriam dicas ou macetes
           para fazer os gráficos de uma forma que eu fixe o conteúdo?`,
    stats: { replies: 8, views: 214 },
    // respostas de exemplo 
    replies: [
      {
        author: 'Ana P.',
        avatar: '/assets/avatar2.jpg',
        time: '1h',
        body:
          'Uma dica é usar a forma y = mx + b e variar m para ver a inclinação. Tenta plotar 3 retas com m diferentes.'
      },
      {
        author: 'Carlos M.',
        avatar: '/assets/avatar3.jpg',
        time: '45min',
        body:
          'No GeoGebra fica bem intuitivo. Arrasta o slider de m (coeficiente angular) e observa a rotação da reta.'
      },
      {
        author: 'Tutor',
        avatar: '/assets/avatar4.jpg',
        time: '10min',
        body:
          'Postei um PDF com exercícios graduais na seção de Álgebra. Comece pela página 3 para fixar melhor.'
      }
    ]
  }
};

// Visão detalhada do tópico
function renderThreadView(thread) {
  const tagsHTML = thread.tags
    .map((t, i) => `<span class="chip ${i === 1 ? '-alt' : ''}">${t}</span>`)
    .join('');

  const repliesHTML = thread.replies
    .map(
      (r) => `
      <article class="comment">
        <div class="comment-meta">
          <img class="avatar" src="${r.avatar}" alt="" />
          <div class="who">
            <strong>${r.author}</strong>
            <span>${r.time}</span>
          </div>
        </div>
        <p class="comment-body">${r.body}</p>
        <div class="comment-actions">
          <button class="btn btn--ghost btn-sm">Responder</button>
          <button class="btn-link btn-sm">Compartilhar</button>
        </div>
      </article>
    `
    )
    .join('');

  return `
    <section class="thread-view">
      <header class="thread-head">
        <h1 class="thread-title">${thread.title}</h1>
        <div class="thread-tags">${tagsHTML}</div>
      </header>

      <div class="thread-meta">
        <img class="avatar" src="${thread.avatar}" alt="" />
        <div class="who">
          <strong>${thread.author}</strong>
          <span>${thread.time}</span>
        </div>
        <div class="counters">
          <span title="Respostas">💬 ${thread.stats.replies}</span>
          <span title="Visualizações">👁️ ${thread.stats.views}</span>
        </div>
      </div>

      <p class="thread-body">${thread.body}</p>

      <div class="thread-actions-bar">
        <button class="btn btn--primary">Responder</button>
        <button class="btn btn--ghost" id="btn-back-to-list">Voltar</button>
      </div>

      <hr class="divider" />

      <h3 class="comments-title">Respostas</h3>
      <div class="comments-list">
        ${repliesHTML}
      </div>
    </section>
  `;
}

//Esconde a lista e mostra a visão detalhada
function openThread(threadId) {
  const data = THREADS[threadId];
  if (!feed || !data) return;
  feed.innerHTML = renderThreadView(data);

  // botão voltar restaura a lista original
  const backBtn = document.getElementById('btn-back-to-list');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      feed.innerHTML = listViewHTML;
      attachOpenListeners();
    });
  }
}

function attachOpenListeners() {
  const openBtns = document.querySelectorAll('.thread-open');
  openBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.threadId;
      openThread(id);
    });
  });
}

// inicializa
attachOpenListeners();
