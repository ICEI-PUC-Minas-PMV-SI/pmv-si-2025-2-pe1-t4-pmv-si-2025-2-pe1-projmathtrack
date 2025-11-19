// Script para gerenciar a página de módulos

let todosModulos = [];
let modulosFiltrados = [];

// Chave do localStorage para progresso - usando o mesmo sistema da trilha
const PROGRESSO_KEY = 'mathtrack_usuario';

// Carregar módulos do JSON
async function carregarModulos() {
  try {
    const response = await fetch('/src/json/modulos.json');
    if (!response.ok) throw new Error('Erro ao carregar módulos');
    
    todosModulos = await response.json();
    modulosFiltrados = [...todosModulos];
    
    console.log('✅ Módulos carregados:', todosModulos);
    renderizarModulos();
    return true;
  } catch (erro) {
    console.error('❌ Erro ao carregar módulos:', erro);
    return false;
  }
}

// Organizar módulos por nível (grupos)
function organizarPorNivel(modulos) {
  const grupos = {};
  
  modulos.forEach(modulo => {
    const nivel = modulo.nivel || 'Outros';
    if (!grupos[nivel]) {
      grupos[nivel] = [];
    }
    grupos[nivel].push(modulo);
  });
  
  return grupos;
}

// Renderizar módulos organizados por grupos
function renderizarModulos() {
  const container = document.getElementById('modulosContainer');
  if (!container) return;
  
  if (modulosFiltrados.length === 0) {
    container.innerHTML = '<p class="sem-resultados">Nenhum módulo encontrado.</p>';
    return;
  }
  
  const grupos = organizarPorNivel(modulosFiltrados);
  const ordemNiveis = ['Básico', 'Intermediário', 'Avançado', 'Outros'];
  
  let html = '';
  
  ordemNiveis.forEach(nivel => {
    if (grupos[nivel] && grupos[nivel].length > 0) {
      html += `
        <div class="grupo-modulos">
          <h2 class="grupo-titulo">
            <span class="grupo-icon">📚</span>
            ${nivel}
            <span class="grupo-count">${grupos[nivel].length} módulo${grupos[nivel].length > 1 ? 's' : ''}</span>
          </h2>
          <div class="modulos-grid">
            ${grupos[nivel].map(modulo => criarCardModulo(modulo)).join('')}
          </div>
        </div>
      `;
    }
  });
  
  container.innerHTML = html;
  
  // Adicionar event listeners aos botões
  adicionarEventListeners();
}

// Criar card de módulo
function criarCardModulo(modulo) {
  const nivelClass = modulo.nivel ? modulo.nivel.toLowerCase().replace('ç', 'c').replace('ã', 'a') : '';
  const prereqCheck = verificarPrerequisitos(modulo);
  const completo = moduloCompleto(modulo.numero);
  const bloqueado = !prereqCheck.permitido;
  
  // Badge de status
  let statusBadge = '';
  if (completo) {
    statusBadge = '<span class="modulo-status completo">✓ Completo</span>';
  } else if (bloqueado) {
    statusBadge = '<span class="modulo-status bloqueado">🔒 Bloqueado</span>';
  }
  
  // Mensagem para módulos bloqueados (mostrar pré-requisitos apenas quando bloqueado)
  let mensagemBloqueio = '';
  if (bloqueado && prereqCheck.faltando.length > 0) {
    const modulosFaltando = prereqCheck.faltando.join(', ');
    mensagemBloqueio = `<div class="modulo-bloqueio-msg">🔒 Complete ${prereqCheck.faltando.length === 1 ? 'o módulo' : 'os módulos'} ${modulosFaltando} primeiro</div>`;
  }
  
  const cardClass = `modulo-card ${nivelClass} ${bloqueado ? 'bloqueado' : ''} ${completo ? 'completo' : ''}`;
  const btnClass = bloqueado ? 'btn-modulo bloqueado' : 'btn-modulo';
  const btnText = bloqueado ? '🔒 Bloqueado' : (completo ? '📖 Revisar Módulo' : 'Acessar Módulo');
  const btnDisabled = bloqueado ? 'disabled' : '';
  
  return `
    <article class="${cardClass}" data-numero="${modulo.numero}">
      <div class="modulo-header">
        <span class="modulo-numero">Módulo ${modulo.numero}</span>
        <div class="modulo-badges">
          <span class="modulo-badge nivel-${nivelClass}">${modulo.nivel}</span>
          ${statusBadge}
        </div>
      </div>
      <h3 class="modulo-titulo">${modulo.conteudo}</h3>
      ${mensagemBloqueio}
      <button class="${btnClass}" data-modulo="${modulo.numero}" ${btnDisabled}>
        ${btnText}
      </button>
    </article>
  `;
}

// Adicionar event listeners
function adicionarEventListeners() {
  const botoes = document.querySelectorAll('.btn-modulo');
  botoes.forEach(btn => {
    btn.addEventListener('click', function() {
      const numeroModulo = this.getAttribute('data-modulo');
      navegarParaModulo(numeroModulo);
    });
  });
}

// Mapeamento de número do módulo para caminho do arquivo
const mapeamentoModulos = {
  1: '/src/pages/modulos/basico/equacao-primeiro-grau.html',
  2: '/src/pages/modulos/basico/sistemas-equacao.html',
  3: '/src/pages/modulos/basico/equacao-segundo-grau.html',
  4: '/src/pages/modulos/basico/potencia-radiciacao.html',
  5: '/src/pages/modulos/intermediario/polinomios-fatoracao.html',
  6: '/src/pages/modulos/basico/conjuntos-numericos.html',
  7: '/src/pages/modulos/intermediario/fundamentos-funcoes.html',
  8: '/src/pages/modulos/intermediario/funcoes-polinomiais.html'
};

// Gerenciamento de progresso - Sincronizado com trilha-aprendizado.js
function carregarDadosUsuario() {
  try {
    const txt = localStorage.getItem(PROGRESSO_KEY);
    if (txt) {
      return JSON.parse(txt);
    }
  } catch (e) {
    console.error('Erro ao carregar dados do usuário:', e);
  }
  
  // Inicializar estrutura de dados se não existir
  return {
    nome: 'Usuário',
    modulosProgresso: [
      { id: 1, progresso: 0, ativo: true },
      { id: 2, progresso: 0, ativo: false },
      { id: 3, progresso: 0, ativo: false },
      { id: 4, progresso: 0, ativo: false },
      { id: 5, progresso: 0, ativo: false },
      { id: 6, progresso: 0, ativo: false },
      { id: 7, progresso: 0, ativo: false },
      { id: 8, progresso: 0, ativo: false }
    ],
    continuar: {
      moduloId: 1,
      unidadeIndex: 0,
      ultimoAcesso: new Date().toISOString().split('T')[0]
    },
    ranking: {
      posicao: 156,
      pontos: 0,
      nivel: 'Iniciante'
    }
  };
}

function salvarDadosUsuario(dados) {
  try {
    localStorage.setItem(PROGRESSO_KEY, JSON.stringify(dados));
  } catch (e) {
    console.error('Erro ao salvar dados do usuário:', e);
  }
}

function moduloCompleto(numero) {
  // Verificar tanto no sistema de progresso quanto no sistema de aprovação legado
  const chaveAprovacao = `modulo_${numero}_aprovado`;
  const aprovadoLegado = localStorage.getItem(chaveAprovacao) === 'true';
  
  if (aprovadoLegado) return true;
  
  // Verificar no sistema de progresso da trilha
  const dados = carregarDadosUsuario();
  const modulo = dados.modulosProgresso.find(m => m.id === numero);
  return modulo ? modulo.progresso >= 100 : false;
}

function marcarModuloCompleto(numero) {
  const dados = carregarDadosUsuario();
  const modulo = dados.modulosProgresso.find(m => m.id === numero);
  
  if (modulo) {
    modulo.progresso = 100;
    
    // Recalcular pontos
    dados.ranking.pontos = dados.modulosProgresso.reduce(
      (total, m) => total + (m.progresso * 10), 0
    );
    
    // Atualizar nível
    if (dados.ranking.pontos <= 500) {
      dados.ranking.nivel = 'Iniciante';
    } else if (dados.ranking.pontos <= 2000) {
      dados.ranking.nivel = 'Intermediário';
    } else {
      dados.ranking.nivel = 'Avançado';
    }
    
    // Desbloquear próximos módulos baseado nos pré-requisitos
    desbloquearModulosDependentes(numero, dados);
    
    salvarDadosUsuario(dados);
    console.log('✅ Módulo', numero, 'marcado como completo');
  }
}

// Desbloquear módulos que dependem do módulo completado
function desbloquearModulosDependentes(numeroCompleto, dados) {
  todosModulos.forEach(modulo => {
    if (modulo.prerequisito && modulo.prerequisito !== 'Nenhum') {
      const regex = /\d+/g;
      const numerosPrereq = modulo.prerequisito.match(regex);
      
      if (numerosPrereq) {
        const modulosNecessarios = numerosPrereq.map(n => parseInt(n));
        
        // Verificar se o módulo completado está nos pré-requisitos
        if (modulosNecessarios.includes(numeroCompleto)) {
          // Verificar se todos os pré-requisitos foram cumpridos
          const todosCumpridos = modulosNecessarios.every(num => moduloCompleto(num));
          
          if (todosCumpridos) {
            const moduloParaDesbloquear = dados.modulosProgresso.find(m => m.id === modulo.numero);
            if (moduloParaDesbloquear && !moduloParaDesbloquear.ativo) {
              moduloParaDesbloquear.ativo = true;
              console.log(`🔓 Módulo ${modulo.numero} desbloqueado!`);
            }
          }
        }
      }
    }
  });
}

// Verificar se os pré-requisitos foram cumpridos
function verificarPrerequisitos(modulo) {
  if (!modulo.prerequisito || modulo.prerequisito === 'Nenhum') {
    return { permitido: true, faltando: [] };
  }
  
  // Extrair números dos pré-requisitos (ex: "Módulo 1, 2, 3 e 4" -> [1, 2, 3, 4])
  const regex = /\d+/g;
  const numerosPrereq = modulo.prerequisito.match(regex);
  
  if (!numerosPrereq) {
    return { permitido: true, faltando: [] };
  }
  
  const modulosNecessarios = numerosPrereq.map(n => parseInt(n));
  const modulosFaltando = [];
  
  for (const num of modulosNecessarios) {
    if (!moduloCompleto(num)) {
      modulosFaltando.push(num);
    }
  }
  
  return {
    permitido: modulosFaltando.length === 0,
    faltando: modulosFaltando
  };
}

// Navegar para módulo individual
function navegarParaModulo(numero) {
  // Buscar informações do módulo
  const modulo = todosModulos.find(m => m.numero === parseInt(numero));
  
  if (!modulo) {
    console.error('Módulo não encontrado:', numero);
    alert('Módulo não encontrado. Por favor, tente novamente.');
    return;
  }
  
  // Verificar pré-requisitos
  const prereqCheck = verificarPrerequisitos(modulo);
  
  if (!prereqCheck.permitido) {
    const modulosFaltando = prereqCheck.faltando.join(', ');
    alert(`Este módulo está bloqueado!\n\nVocê precisa completar ${prereqCheck.faltando.length === 1 ? 'o módulo' : 'os módulos'} ${modulosFaltando} primeiro.`);
    return;
  }
  
  const caminho = mapeamentoModulos[numero];
  if (caminho) {
    window.location.href = caminho;
  } else {
    console.error('Caminho não encontrado para módulo:', numero);
    alert('Erro ao acessar o módulo. Por favor, tente novamente.');
  }
}

// Função de busca
function buscarModulos(termo) {
  if (!termo || termo.trim() === '') {
    modulosFiltrados = [...todosModulos];
  } else {
    const termoLower = termo.toLowerCase().trim();
    modulosFiltrados = todosModulos.filter(modulo => {
      return (
        modulo.conteudo.toLowerCase().includes(termoLower) ||
        modulo.nivel.toLowerCase().includes(termoLower) ||
        (modulo.prerequisito && modulo.prerequisito.toLowerCase().includes(termoLower)) ||
        modulo.numero.toString().includes(termoLower)
      );
    });
  }
  
  renderizarModulos();
}

// Expor funções globalmente para uso em outras páginas
window.marcarModuloCompleto = marcarModuloCompleto;
window.moduloCompleto = moduloCompleto;
window.verificarPrerequisitosModulo = verificarPrerequisitos;

// Inicializar dados do usuário se necessário
function inicializarDadosSeNecessario() {
  const dados = carregarDadosUsuario();
  
  // Verificar se os dados estão completos (8 módulos)
  if (!dados.modulosProgresso || dados.modulosProgresso.length < 8) {
    const novosModulos = [];
    for (let i = 1; i <= 8; i++) {
      const moduloExistente = dados.modulosProgresso?.find(m => m.id === i);
      if (moduloExistente) {
        novosModulos.push(moduloExistente);
      } else {
        // Módulos sem pré-requisitos (1, 4, 6) começam desbloqueados
        const semPrerequisitos = [1, 4, 6];
        novosModulos.push({
          id: i,
          progresso: 0,
          ativo: semPrerequisitos.includes(i)
        });
      }
    }
    dados.modulosProgresso = novosModulos;
    salvarDadosUsuario(dados);
    console.log('✅ Dados do usuário inicializados/atualizados');
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar dados primeiro
  inicializarDadosSeNecessario();
  
  // Carregar módulos
  carregarModulos();
  
  // Busca em tempo real
  const inputBusca = document.getElementById('Buscar');
  if (inputBusca) {
    inputBusca.addEventListener('input', function() {
      buscarModulos(this.value);
    });
  }
  
  // Botão de busca
  const btnBuscar = document.getElementById('botaoBuscar');
  if (btnBuscar) {
    btnBuscar.addEventListener('click', function() {
      const termo = inputBusca ? inputBusca.value : '';
      buscarModulos(termo);
    });
  }
  
  // Busca ao pressionar Enter
  if (inputBusca) {
    inputBusca.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        buscarModulos(this.value);
      }
    });
  }
  
  console.log('📊 Progresso atual:', carregarDadosUsuario());
});

