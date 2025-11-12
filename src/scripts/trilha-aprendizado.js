// Variáveis globais
let DADOS_BASE = null; // Dados carregados do JSON
let DADOS_USUARIO = null; // Dados específicos do usuário (localStorage)

// Inicializar dados do usuário com valores padrão
function inicializarDadosUsuario() {
    return {
        nome: 'Usuário',
        modulosProgresso: [
            { id: 1, progresso: 0, ativo: true },
            { id: 2, progresso: 0, ativo: false },
            { id: 3, progresso: 0, ativo: false }
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

// Carregar dados base do JSON
async function carregarDadosBase() {
    try {
        const response = await fetch('/src/dados.json');
        if (!response.ok) throw new Error('Erro ao carregar dados.json');
        DADOS_BASE = await response.json();
        console.log('✅ Dados base carregados do JSON:', DADOS_BASE);
        return true;
    } catch (erro) {
        console.error('❌ Erro ao carregar dados base:', erro);
        return false;
    }
}

// Carregar dados do usuário do localStorage
function carregarDadosUsuario() {
    try {
        const dadosSalvos = localStorage.getItem('mathtrack_usuario');
        if (dadosSalvos) {
            DADOS_USUARIO = JSON.parse(dadosSalvos);
            console.log('✅ Dados do usuário carregados do localStorage:', DADOS_USUARIO);
        } else {
            DADOS_USUARIO = inicializarDadosUsuario();
            salvarDadosUsuario();
            console.log('ℹ️ Dados do usuário inicializados com valores padrão');
        }
        
        // Sincronizar com aprovações de módulos salvas
        sincronizarAprovacoes();
        
    } catch (erro) {
        console.error('❌ Erro ao carregar dados do usuário:', erro);
        DADOS_USUARIO = inicializarDadosUsuario();
    }
}

// Sincronizar aprovações dos módulos com progresso
function sincronizarAprovacoes() {
    let houveAlteracao = false;
    
    DADOS_USUARIO.modulosProgresso.forEach(modulo => {
        const chaveAprovacao = `modulo_${modulo.id}_aprovado`;
        const aprovado = localStorage.getItem(chaveAprovacao) === 'true';
        
        if (aprovado && modulo.progresso < 100) {
            modulo.progresso = 100;
            houveAlteracao = true;
            console.log(`🔄 Sincronizado módulo ${modulo.id} - 100%`);
            
            // Desbloquear próximo módulo
            const proximoModulo = DADOS_USUARIO.modulosProgresso.find(m => m.id === modulo.id + 1);
            if (proximoModulo && !proximoModulo.ativo) {
                proximoModulo.ativo = true;
                houveAlteracao = true;
                console.log(`🔓 Módulo ${modulo.id + 1} desbloqueado na sincronização`);
            }
        }
    });
    
    if (houveAlteracao) {
        // Recalcular pontos
        DADOS_USUARIO.ranking.pontos = DADOS_USUARIO.modulosProgresso.reduce(
            (total, m) => total + (m.progresso * 10), 0
        );
        
        // Atualizar nível
        if (DADOS_USUARIO.ranking.pontos <= 500) {
            DADOS_USUARIO.ranking.nivel = 'Iniciante';
        } else if (DADOS_USUARIO.ranking.pontos <= 2000) {
            DADOS_USUARIO.ranking.nivel = 'Intermediário';
        } else {
            DADOS_USUARIO.ranking.nivel = 'Avançado';
        }
        
        // Atualizar "continuar" para o primeiro módulo incompleto
        atualizarContinuarAutomatico();
        
        salvarDadosUsuario();
        console.log('✅ Dados sincronizados e salvos');
    }
}

// Atualizar automaticamente o módulo para "continuar"
function atualizarContinuarAutomatico() {
    // Encontrar o primeiro módulo ativo que não está completo
    const moduloEmAndamento = DADOS_USUARIO.modulosProgresso.find(m => 
        m.ativo && m.progresso < 100
    );
    
    if (moduloEmAndamento) {
        DADOS_USUARIO.continuar.moduloId = moduloEmAndamento.id;
        DADOS_USUARIO.continuar.unidadeIndex = Math.floor(moduloEmAndamento.progresso / 25); // Estima unidade baseado no progresso
        console.log(`📍 Continuar atualizado para Módulo ${moduloEmAndamento.id}`);
    } else {
        // Se todos completos, deixa no último
        const ultimoModulo = DADOS_USUARIO.modulosProgresso[DADOS_USUARIO.modulosProgresso.length - 1];
        if (ultimoModulo) {
            DADOS_USUARIO.continuar.moduloId = ultimoModulo.id;
            DADOS_USUARIO.continuar.unidadeIndex = 0;
        }
    }
}

// Salvar dados do usuário no localStorage
function salvarDadosUsuario() {
    try {
        localStorage.setItem('mathtrack_usuario', JSON.stringify(DADOS_USUARIO));
        console.log('💾 Dados do usuário salvos no localStorage');
    } catch (erro) {
        console.error('❌ Erro ao salvar dados do usuário:', erro);
    }
}

// Obter progresso de um módulo específico
function obterProgressoModulo(moduloId) {
    const moduloProgresso = DADOS_USUARIO.modulosProgresso.find(m => m.id === moduloId);
    return moduloProgresso || { id: moduloId, progresso: 0, ativo: false };
}

// Determinar nível do usuário baseado nos pontos
function determinarNivel(pontos) {
    if (pontos <= 500) return 'Iniciante';
    if (pontos <= 2000) return 'Intermediário';
    return 'Avançado';
}

// Renderizar módulos
function renderizarModulos() {
    const containerModulos = document.querySelector('.modulos');
    if (!containerModulos || !DADOS_BASE) return;

    containerModulos.innerHTML = DADOS_BASE.modulos.map(modulo => {
        const progressoUsuario = obterProgressoModulo(modulo.id);
        
        return `
            <div class="modulo ${!progressoUsuario.ativo ? 'modulo-bloqueado' : ''}">
                <a href="${modulo.link}" ${!progressoUsuario.ativo ? 'onclick="return false;"' : ''}> 
                    <h3>${modulo.titulo}</h3> 
                </a> 
                <p>${modulo.descricao}</p>
                <br>
                <div class="progresso">
                    <div class="barra-progresso" style="width: ${progressoUsuario.progresso}%;"></div>
                </div>
                <span class="texto-progresso">${progressoUsuario.progresso}%</span>
                ${!progressoUsuario.ativo ? '<p class="bloqueio-msg">🔒 Bloqueado</p>' : ''}
            </div>
        `;
    }).join('');
}

// Renderizar ranking
// Renderizar seção "Continuar onde parou"
function renderizarContinuar() {
    const containerContinuar = document.querySelector('.continuar');
    if (!containerContinuar || !DADOS_BASE) return;

    const moduloAtual = DADOS_BASE.modulos.find(m => m.id === DADOS_USUARIO.continuar.moduloId);
    const unidadeAtual = moduloAtual ? moduloAtual.unidades[DADOS_USUARIO.continuar.unidadeIndex] : 'N/A';
    
    // Determinar link correto baseado no status do módulo
    let linkDestino = 'trilha-de-aprendizado.html';
    let textoLink = 'Continuar onde parou';
    
    if (moduloAtual) {
        const progressoModulo = obterProgressoModulo(moduloAtual.id);
        
        // Se módulo não está completo e está ativo, vai para o módulo
        if (progressoModulo.progresso < 100 && progressoModulo.ativo) {
            linkDestino = moduloAtual.link;
            textoLink = 'Continuar Estudando';
        } else if (progressoModulo.progresso >= 100) {
            // Se módulo está completo, encontra próximo módulo disponível
            const proximoModulo = DADOS_BASE.modulos.find(m => {
                const prog = obterProgressoModulo(m.id);
                return prog.ativo && prog.progresso < 100;
            });
            
            if (proximoModulo) {
                linkDestino = proximoModulo.link;
                textoLink = `Ir para ${proximoModulo.titulo}`;
            }
        }
    }

    containerContinuar.innerHTML = `
        <h3>${textoLink}</h3>
        <div class="continuar-modulo"> 
            <h3>Módulo:</h3>
            <p>${moduloAtual ? moduloAtual.titulo + ' - ' + moduloAtual.descricao : 'Nenhum módulo em andamento'}</p>
        </div>
        <div class="continuar-modulo"> 
            <h3>Unidade:</h3>
            <p>${unidadeAtual}</p>
        </div>
        <div class="continuar-data">
            <small>Último acesso: ${formatarData(DADOS_USUARIO.continuar.ultimoAcesso)}</small>
        </div>
        <a href="${linkDestino}" class="btn-continuar">
            <button class="btn-acao">${textoLink} →</button>
        </a>
    `;
}

// Renderizar fórum
function renderizarForum() {
    const containerForum = document.querySelector('.forum');
    if (!containerForum || !DADOS_BASE) return;

    containerForum.innerHTML = `
        <h3>Fóruns Recentes</h3>
        ${DADOS_BASE.forumRecentes.map(forum => `
            <div class="caixa-forum">
                <a href="${forum.link}"> 
                    <h4>${forum.titulo}</h4> 
                </a>
                <p>${forum.preview}</p>
                <small>Por ${forum.autor} em ${formatarData(forum.data)}</small>
            </div>
        `).join('')}
        <a href="Forum.html" class="btn-ver-mais">Ver todos os fóruns →</a>
    `;
}

// Renderizar pontos fortes
// Renderizar evolução
function renderizarEvolucao() {
    const containerEvolucao = document.querySelector('.evolucao');
    if (!containerEvolucao) return;

    const progressoGeral = calcularProgressoGeral();
    
    containerEvolucao.innerHTML = `
        <a href="historico.html"> 
            <h3>Desempenho: Evolução dos Estudos</h3> 
        </a>
        <div class="evolucao-stats">
            <div class="stat-item">
                <span class="stat-label">Progresso Geral:</span>
                <span class="stat-valor">${progressoGeral}%</span>
            </div>
            <div class="progresso-geral">
                <div class="barra-progresso" style="width: ${progressoGeral}%;"></div>
            </div>
        </div>
        <p class="evolucao-msg">Continue assim! Você está indo muito bem! 🎯</p>
    `;
}

// Renderizar testes/tarefas
function renderizarTestes() {
    const containerTarefa = document.querySelector('.tarefa');
    if (!containerTarefa) return;

    // Função auxiliar para verificar se o módulo foi aprovado
    const verificarAprovacao = (moduloId) => {
        const aprovado = localStorage.getItem(`modulo_${moduloId}_aprovado`) === 'true';
        const progresso = obterProgressoModulo(moduloId);
        
        if (aprovado || progresso.progresso === 100) {
            return { status: 'Completo', icone: '✅' };
        } else if (progresso.ativo) {
            return { status: 'Disponível', icone: '📝' };
        } else {
            return { status: 'Bloqueado', icone: '🔒' };
        }
    };

    const statusModulo1 = verificarAprovacao(1);
    const statusModulo2 = verificarAprovacao(2);
    const statusModulo3 = verificarAprovacao(3);

    containerTarefa.innerHTML = `
        <h3>Testes Disponíveis</h3>
        <div class="testes-info">
            <p>✅ Teste de Nivelamento - Completo</p>
            <p>${statusModulo1.icone} Avaliação Módulo 1 - ${statusModulo1.status}</p>
            <p>${statusModulo2.icone} Avaliação Módulo 2 - ${statusModulo2.status}</p>
            <p>${statusModulo3.icone} Avaliação Módulo 3 - ${statusModulo3.status}</p>
        </div>
    `;
}

// Função auxiliar para formatar data
function formatarData(dataString) {
    const data = new Date(dataString);
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return data.toLocaleDateString('pt-BR', opcoes);
}

// Calcular progresso geral
function calcularProgressoGeral() {
    if (!DADOS_USUARIO || !DADOS_USUARIO.modulosProgresso) return 0;
    
    const totalModulos = DADOS_USUARIO.modulosProgresso.length;
    const somaProgresso = DADOS_USUARIO.modulosProgresso.reduce((acc, mod) => acc + mod.progresso, 0);
    return Math.round(somaProgresso / totalModulos);
}

// Atualizar progresso de um módulo
function atualizarProgressoModulo(moduloId, novoProgresso) {
    const modulo = DADOS_USUARIO.modulosProgresso.find(m => m.id === moduloId);
    if (modulo) {
        modulo.progresso = Math.min(100, Math.max(0, novoProgresso));
        
        // Atualizar pontos (10 pontos por 1% de progresso)
        DADOS_USUARIO.ranking.pontos = DADOS_USUARIO.modulosProgresso.reduce(
            (total, m) => total + (m.progresso * 10), 0
        );
        
        // Atualizar nível
        DADOS_USUARIO.ranking.nivel = determinarNivel(DADOS_USUARIO.ranking.pontos);
        
        // Desbloquear próximo módulo se completar 100%
        if (modulo.progresso === 100) {
            const proximoModulo = DADOS_USUARIO.modulosProgresso.find(m => m.id === moduloId + 1);
            if (proximoModulo) {
                proximoModulo.ativo = true;
                console.log(`🔓 Módulo ${moduloId + 1} desbloqueado!`);
            }
            
            // Atualizar continuar para o próximo módulo
            if (proximoModulo) {
                DADOS_USUARIO.continuar.moduloId = moduloId + 1;
                DADOS_USUARIO.continuar.unidadeIndex = 0;
            }
        }
        
        // Atualizar última data de acesso
        DADOS_USUARIO.continuar.ultimoAcesso = new Date().toISOString().split('T')[0];
        
        salvarDadosUsuario();
        renderizarTodosComponentes();
        
        console.log(`✅ Módulo ${moduloId} atualizado para ${novoProgresso}%`);
    }
}

// Atualizar posição no ranking (exemplo)
function atualizarRanking() {
    // Simulação simples: quanto mais pontos, melhor a posição
    const baseRanking = 200;
    const posicaoCalculada = Math.max(1, baseRanking - Math.floor(DADOS_USUARIO.ranking.pontos / 20));
    DADOS_USUARIO.ranking.posicao = posicaoCalculada;
    salvarDadosUsuario();
}

// Renderizar todos os componentes
function renderizarTodosComponentes() {
    renderizarModulos();
    renderizarContinuar();
    renderizarForum();
    renderizarEvolucao();
    renderizarTestes();
}

// Inicialização principal
async function inicializar() {
    console.log('🚀 Iniciando Trilha de Aprendizado...');
    
    // Carregar dados base do JSON
    const sucessoCarregamento = await carregarDadosBase();
    if (!sucessoCarregamento) {
        console.error('❌ Falha ao carregar dados base. Verifique o arquivo dados.json');
        return;
    }
    
    // Carregar dados do usuário do localStorage
    carregarDadosUsuario();
    
    // Renderizar todos os componentes
    renderizarTodosComponentes();
    
    // Atualizar ranking
    atualizarRanking();
    
    console.log(`📊 Progresso geral: ${calcularProgressoGeral()}%`);
    console.log('✅ Trilha de Aprendizado carregada com sucesso!');
}

// Aguardar o DOM estar pronto
document.addEventListener('DOMContentLoaded', inicializar);
