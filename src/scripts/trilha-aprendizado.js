// Trilha de Aprendizado - Sistema de Estágios Progressivos

let DADOS_USUARIO = null;

// Organização dos módulos por nível
const MODULOS_POR_NIVEL = {
    'Básico': [1, 2, 3, 4, 6],        // 5 módulos básicos
    'Intermediário': [5, 7, 8]        // 3 módulos intermediários
};

// Pré-requisitos dos módulos
const PREREQUISITOS = {
    1: null,
    2: [1],
    3: [1],
    4: null,
    5: [1, 2, 3, 4],
    6: null,
    7: [1, 2, 3, 4],
    8: [1, 2, 3, 4]
};

// Informações dos módulos
const MODULOS_INFO = {
    1: { nome: 'Equação do Primeiro Grau', nivel: 'Básico', link: 'modulos/basico/equacao-primeiro-grau.html' },
    2: { nome: 'Sistemas de Equação', nivel: 'Básico', link: 'modulos/basico/sistemas-equacao.html' },
    3: { nome: 'Equação do Segundo Grau', nivel: 'Básico', link: 'modulos/basico/equacao-segundo-grau.html' },
    4: { nome: 'Potência e Radiciação', nivel: 'Básico', link: 'modulos/basico/potencia-radiciacao.html' },
    5: { nome: 'Polinômios e Fatoração', nivel: 'Intermediário', link: 'modulos/intermediario/polinomios-fatoracao.html' },
    6: { nome: 'Conjuntos Numéricos', nivel: 'Básico', link: 'modulos/basico/conjuntos-numericos.html' },
    7: { nome: 'Fundamentos de Funções', nivel: 'Intermediário', link: 'modulos/intermediario/fundamentos-funcoes.html' },
    8: { nome: 'Funções Polinomiais', nivel: 'Intermediário', link: 'modulos/intermediario/funcoes-polinomiais.html' }
};

// Carregar dados do usuário
function carregarDadosUsuario() {
    try {
        const dadosSalvos = localStorage.getItem('mathtrack_usuario');
        if (dadosSalvos) {
            DADOS_USUARIO = JSON.parse(dadosSalvos);
            sincronizarAprovacoes();
        } else {
            DADOS_USUARIO = inicializarDadosUsuario();
            salvarDadosUsuario();
        }
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        DADOS_USUARIO = inicializarDadosUsuario();
    }
}

// Inicializar dados
function inicializarDadosUsuario() {
    return {
        nome: 'Usuário',
        modulosProgresso: [
            { id: 1, progresso: 0, ativo: true },
            { id: 2, progresso: 0, ativo: false },
            { id: 3, progresso: 0, ativo: false },
            { id: 4, progresso: 0, ativo: true },
            { id: 5, progresso: 0, ativo: false },
            { id: 6, progresso: 0, ativo: true },
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

// Sincronizar aprovações
function sincronizarAprovacoes() {
    let houveAlteracao = false;
    
    DADOS_USUARIO.modulosProgresso.forEach(modulo => {
        const chaveAprovacao = `modulo_${modulo.id}_aprovado`;
        const aprovado = localStorage.getItem(chaveAprovacao) === 'true';
        
        if (aprovado && modulo.progresso < 100) {
            modulo.progresso = 100;
            houveAlteracao = true;
        }
    });
    
    if (houveAlteracao) {
        recalcularDados();
        desbloquearModulosDependentes();
        salvarDadosUsuario();
    }
}

// Verificar se módulo está completo
function moduloCompleto(numeroModulo) {
    const chaveAprovacao = `modulo_${numeroModulo}_aprovado`;
    if (localStorage.getItem(chaveAprovacao) === 'true') return true;
    
    const modulo = DADOS_USUARIO.modulosProgresso.find(m => m.id === numeroModulo);
    return modulo ? modulo.progresso >= 100 : false;
}

// Verificar pré-requisitos
function verificarPrerequisitos(numeroModulo) {
    const prereqs = PREREQUISITOS[numeroModulo];
    
    if (!prereqs || prereqs.length === 0) {
        return { permitido: true, faltando: [] };
    }
    
    const faltando = prereqs.filter(num => !moduloCompleto(num));
    
    return {
        permitido: faltando.length === 0,
        faltando: faltando
    };
}

// Verificar se todos os módulos de um nível estão completos
function nivelCompleto(nivel) {
    const modulosDoNivel = MODULOS_POR_NIVEL[nivel];
    return modulosDoNivel.every(num => moduloCompleto(num));
}

// Determinar estágio atual do usuário
function determinarEstagio() {
    const todosBasicosCompletos = nivelCompleto('Básico');
    
    if (!todosBasicosCompletos) {
        return {
            nivel: 'Básico',
            titulo: 'Estágio Básico',
            descricao: 'Complete os módulos básicos para avançar',
            badge: 'badge-basico'
        };
    }
    
    const todosIntermediariosCompletos = nivelCompleto('Intermediário');
    
    if (!todosIntermediariosCompletos) {
        return {
            nivel: 'Intermediário',
            titulo: 'Estágio Intermediário',
            descricao: 'Você está no nível intermediário!',
            badge: 'badge-intermediario'
        };
    }
    
    return {
        nivel: 'Avançado',
        titulo: 'Todos os Estágios Completos!',
        descricao: 'Parabéns! Você completou todos os módulos',
        badge: 'badge-avancado'
    };
}

// Obter módulos a serem exibidos (3 por vez)
function obterModulosVisiveis() {
    const estagio = determinarEstagio();
    const modulosDoNivel = MODULOS_POR_NIVEL[estagio.nivel];
    
    if (!modulosDoNivel) return [];
    
    // Encontrar quantos módulos já foram completos neste nível
    let modulosCompletos = 0;
    for (const num of modulosDoNivel) {
        if (moduloCompleto(num)) {
            modulosCompletos++;
        }
    }
    
    // Calcular qual "página" de 3 módulos mostrar
    const paginaAtual = Math.floor(modulosCompletos / 3);
    const inicio = paginaAtual * 3;
    const fim = inicio + 3;
    
    return modulosDoNivel.slice(inicio, Math.min(fim, modulosDoNivel.length));
}

// Desbloquear módulos
function desbloquearModulosDependentes() {
    for (let i = 1; i <= 8; i++) {
        const verificacao = verificarPrerequisitos(i);
        if (verificacao.permitido) {
            const modulo = DADOS_USUARIO.modulosProgresso.find(m => m.id === i);
            if (modulo && !modulo.ativo) {
                modulo.ativo = true;
            }
        }
    }
}

// Recalcular pontos
function recalcularDados() {
    DADOS_USUARIO.ranking.pontos = DADOS_USUARIO.modulosProgresso.reduce(
        (total, m) => total + (m.progresso * 10), 0
    );
    
    if (DADOS_USUARIO.ranking.pontos <= 500) {
        DADOS_USUARIO.ranking.nivel = 'Iniciante';
    } else if (DADOS_USUARIO.ranking.pontos <= 2000) {
        DADOS_USUARIO.ranking.nivel = 'Intermediário';
    } else {
        DADOS_USUARIO.ranking.nivel = 'Avançado';
    }
}

// Salvar dados
function salvarDadosUsuario() {
    try {
        localStorage.setItem('mathtrack_usuario', JSON.stringify(DADOS_USUARIO));
    } catch (erro) {
        console.error('Erro ao salvar dados:', erro);
    }
}

// Calcular progresso geral
function calcularProgressoGeral() {
    const totalModulos = DADOS_USUARIO.modulosProgresso.length;
    const somaProgresso = DADOS_USUARIO.modulosProgresso.reduce((acc, mod) => acc + mod.progresso, 0);
    return Math.round(somaProgresso / totalModulos);
}

// Renderizar estágio atual
function renderizarEstagio() {
    const container = document.getElementById('estagioContainer');
    if (!container) return;
    
    const estagio = determinarEstagio();
    const modulosDoNivel = MODULOS_POR_NIVEL[estagio.nivel] || [];
    const modulosCompletos = modulosDoNivel.filter(num => moduloCompleto(num)).length;
    const totalModulos = modulosDoNivel.length;
    const progressoNivel = totalModulos > 0 ? Math.round((modulosCompletos / totalModulos) * 100) : 0;
    
    container.innerHTML = `
        <h3>Seu Estágio Atual</h3>
        <div class="estagio-info">
            <div class="estagio-titulo">${estagio.titulo}</div>
            <div class="estagio-descricao">${estagio.descricao}</div>
            <span class="estagio-badge ${estagio.badge}">${estagio.nivel}</span>
            <div class="estagio-progresso">
                <p>Módulos completados: ${modulosCompletos}/${totalModulos}</p>
                <div class="progresso">
                    <div class="barra-progresso" style="width: ${progressoNivel}%;"></div>
                </div>
                <span class="texto-progresso">${progressoNivel}%</span>
            </div>
        </div>
    `;
}

// Renderizar módulos (3 por vez)
function renderizarModulos() {
    const container = document.getElementById('modulosContainer');
    if (!container) return;
    
    const modulosVisiveis = obterModulosVisiveis();
    
    if (modulosVisiveis.length === 0) {
        container.innerHTML = `
            <div class="modulo">
                <h3>🎉 Parabéns!</h3>
                <p>Você completou todos os módulos!</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    
    for (const i of modulosVisiveis) {
        const modulo = DADOS_USUARIO.modulosProgresso.find(m => m.id === i);
        const info = MODULOS_INFO[i];
        const completo = moduloCompleto(i);
        const verificacao = verificarPrerequisitos(i);
        const bloqueado = !verificacao.permitido;
        
        let badgeHtml = '';
        let bloqueioMsg = '';
        let moduloClass = 'modulo';
        
        if (completo) {
            badgeHtml = '<span class="badge-status badge-completo">✓ Completo</span>';
        } else if (bloqueado) {
            moduloClass += ' modulo-bloqueado';
            badgeHtml = '<span class="badge-status badge-bloqueado">🔒 Bloqueado</span>';
            if (verificacao.faltando.length > 0) {
                bloqueioMsg = `<p class="bloqueio-msg">Complete módulo(s) ${verificacao.faltando.join(', ')} primeiro</p>`;
            }
        }
        
        html += `
            <div class="${moduloClass}">
                <a href="${bloqueado ? '#' : info.link}" ${bloqueado ? 'onclick="return false;"' : ''}> 
                    <h3>Módulo ${i}</h3> 
                </a> 
                <p>${info.nome}</p>
                ${badgeHtml}
                <br>
                <div class="progresso">
                    <div class="barra-progresso" style="width: ${modulo ? modulo.progresso : 0}%;"></div>
                </div>
                <span class="texto-progresso">${modulo ? modulo.progresso : 0}%</span>
                ${bloqueioMsg}
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Renderizar continuar (formato original)
function renderizarContinuar() {
    const container = document.getElementById('continuarContainer');
    if (!container) return;
    
    const moduloAtual = DADOS_USUARIO.modulosProgresso.find(m => m.ativo && m.progresso < 100);
    
    if (!moduloAtual) {
        container.innerHTML = `
            <h3>Continuar onde parou</h3>
            <div class="continuar-modulo"> 
                <h3>🎉 Parabéns!</h3>
                <p>Você completou todos os módulos disponíveis!</p>
            </div>
        `;
        return;
    }
    
    const info = MODULOS_INFO[moduloAtual.id];
    const dataFormatada = new Date(DADOS_USUARIO.continuar.ultimoAcesso).toLocaleDateString('pt-BR');
    
    container.innerHTML = `
        <h3>Continuar onde parou</h3>
        <div class="continuar-modulo"> 
            <h3>Módulo ${moduloAtual.id}: ${info.nome}</h3>
            <p>Nível: ${info.nivel}</p>
            <p>Progresso: ${moduloAtual.progresso}%</p>
        </div>
        <div class="continuar-data">
            <small>Último acesso: ${dataFormatada}</small>
        </div>
        <a href="${info.link}" class="btn-continuar">
            <button class="btn-acao">Continuar Estudando →</button>
        </a>
    `;
}

// Renderizar fórum (formato original)
function renderizarForum() {
    const container = document.getElementById('forumContainer');
    if (!container) return;
    
    container.innerHTML = `
        <h3>Fóruns</h3>
        <div class="caixa-forum">
            <a href="Forum.html"> 
                <h4>Dúvida sobre equações</h4> 
            </a>
            <p>Como resolver uma equação do segundo grau?</p>
            <small>Por João Silva • Hoje</small>
        </div>
        <div class="caixa-forum">
            <a href="Forum.html"> 
                <h4>Ajuda com sistemas</h4> 
            </a>
            <p>Não estou conseguindo resolver sistemas de equação...</p>
            <small>Por Maria Santos • Ontem</small>
        </div>
        <a href="Forum.html" class="btn-ver-mais">Ver todos os fóruns →</a>
    `;
}

// Renderizar evolução (formato original)
function renderizarEvolucao() {
    const container = document.getElementById('evolucaoContainer');
    if (!container) return;
    
    const progressoGeral = calcularProgressoGeral();
    const modulosCompletos = DADOS_USUARIO.modulosProgresso.filter(m => m.progresso >= 100).length;
    
    container.innerHTML = `
        <a href="historico.html"> 
            <h3>Desempenho: Evolução dos Estudos</h3> 
        </a>
        <div class="evolucao-stats">
            <div class="stat-item">
                <span class="stat-label">Progresso Geral:</span>
                <span class="stat-valor">${progressoGeral}%</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Módulos Completos:</span>
                <span class="stat-valor">${modulosCompletos}/8</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Pontos:</span>
                <span class="stat-valor">${DADOS_USUARIO.ranking.pontos}</span>
            </div>
            <div class="progresso-geral">
                <div class="barra-progresso" style="width: ${progressoGeral}%;"></div>
            </div>
        </div>
        <p class="evolucao-msg">${obterMensagem(progressoGeral)}</p>
    `;
}

// Renderizar testes (formato original)
function renderizarTestes() {
    const container = document.getElementById('tarefaContainer');
    if (!container) return;
    
    const verificarStatus = (moduloId) => {
        if (moduloCompleto(moduloId)) return { status: 'Completo', icone: '✅' };
        const modulo = DADOS_USUARIO.modulosProgresso.find(m => m.id === moduloId);
        if (modulo && modulo.ativo) return { status: 'Disponível', icone: '📝' };
        return { status: 'Bloqueado', icone: '🔒' };
    };
    
    const modulosVisiveis = obterModulosVisiveis();
    
    let html = '<h3>Testes</h3><div class="testes-info">';
    
    for (const i of modulosVisiveis) {
        const status = verificarStatus(i);
        html += `<p>${status.icone} Avaliação Módulo ${i} - ${status.status}</p>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// Mensagem motivacional
function obterMensagem(progresso) {
    if (progresso === 0) return '🚀 Comece sua jornada!';
    if (progresso < 25) return '🌱 Ótimo começo!';
    if (progresso < 50) return '📈 Você está indo bem!';
    if (progresso < 75) return '🔥 Mais da metade completa!';
    if (progresso < 100) return '🎯 Quase lá!';
    return '🏆 Parabéns! Tudo completo!';
}

// Renderizar tudo
function renderizarTodosComponentes() {
    renderizarEstagio();
    renderizarModulos();
    renderizarContinuar();
    renderizarForum();
    renderizarEvolucao();
    renderizarTestes();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando Trilha de Aprendizado...');
    
    carregarDadosUsuario();
    recalcularDados();
    desbloquearModulosDependentes();
    salvarDadosUsuario();
    renderizarTodosComponentes();
    
    const estagio = determinarEstagio();
    console.log(`📊 Estágio: ${estagio.nivel}`);
    console.log(`📊 Progresso: ${calcularProgressoGeral()}%`);
    console.log('✅ Trilha carregada!');
});
