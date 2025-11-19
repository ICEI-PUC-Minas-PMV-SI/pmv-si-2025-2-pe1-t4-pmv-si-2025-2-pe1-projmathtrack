// Script para gerenciar página de módulo individual

let DADOS_MODULO = null;
let moduloId = null;

// Mapeamento de caminhos para número do módulo
const mapeamentoCaminhos = {
    'equacao-primeiro-grau': 1,
    'sistemas-equacao': 2,
    'equacao-segundo-grau': 3,
    'potencia-radiciacao': 4,
    'polinomios-fatoracao': 5,
    'conjuntos-numericos': 6,
    'fundamentos-funcoes': 7,
    'funcoes-polinomiais': 8
};

// Pré-requisitos dos módulos (deve coincidir com modulos.json)
const prerequisitosModulos = {
    1: null, // Nenhum
    2: [1], // Módulo 1
    3: [1], // Módulo 1
    4: null, // Nenhum
    5: [1, 2, 3, 4], // Módulos 1, 2, 3 e 4
    6: null, // Nenhum
    7: [1, 2, 3, 4], // Módulos 1, 2, 3 e 4
    8: [1, 2, 3, 4]  // Módulos 1, 2, 3 e 4
};

// Detectar qual módulo é baseado na URL
function detectarModulo() {
    const url = window.location.pathname;
    
    // Tentar detectar pelo novo formato (nome descritivo)
    for (const [nome, numero] of Object.entries(mapeamentoCaminhos)) {
        if (url.includes(nome)) {
            return numero;
        }
    }
    
    // Fallback para formato antigo (modulo1, modulo2, etc.)
    if (url.includes('modulo1')) return 1;
    if (url.includes('modulo2')) return 2;
    if (url.includes('modulo3')) return 3;
    
    return 1; // padrão
}

// Verificar se o módulo está completo
function verificarModuloCompleto(numeroModulo) {
    // Verificar no sistema de aprovação legado
    const chaveAprovacao = `modulo_${numeroModulo}_aprovado`;
    const aprovadoLegado = localStorage.getItem(chaveAprovacao) === 'true';
    
    if (aprovadoLegado) return true;
    
    // Verificar no sistema de progresso da trilha
    try {
        const dadosUsuario = localStorage.getItem('mathtrack_usuario');
        if (dadosUsuario) {
            const dados = JSON.parse(dadosUsuario);
            const modulo = dados.modulosProgresso.find(m => m.id === numeroModulo);
            return modulo ? modulo.progresso >= 100 : false;
        }
    } catch (e) {
        console.error('Erro ao verificar progresso:', e);
    }
    
    return false;
}

// Verificar acesso ao módulo baseado em pré-requisitos
function verificarAcessoModulo(numeroModulo) {
    const prereqs = prerequisitosModulos[numeroModulo];
    
    // Se não tem pré-requisitos, pode acessar
    if (!prereqs || prereqs.length === 0) {
        return { permitido: true, faltando: [] };
    }
    
    // Verificar quais pré-requisitos não foram cumpridos
    const modulosFaltando = prereqs.filter(num => !verificarModuloCompleto(num));
    
    return {
        permitido: modulosFaltando.length === 0,
        faltando: modulosFaltando
    };
}

// Bloquear acesso ao módulo e redirecionar
function bloquearAcessoModulo(modulosFaltando) {
    const mensagem = `🔒 Este módulo está bloqueado!\n\n` +
                    `Você precisa completar ${modulosFaltando.length === 1 ? 'o módulo' : 'os módulos'} ` +
                    `${modulosFaltando.join(', ')} primeiro.\n\n` +
                    `Você será redirecionado para a página de módulos.`;
    
    alert(mensagem);
    
    // Redirecionar após 1 segundo
    setTimeout(() => {
        window.location.href = '/src/pages/modulos.html';
    }, 1000);
}

// Carregar dados do módulo do JSON
async function carregarDadosModulo() {
    try {
        const response = await fetch('/src/dados.json');
        if (!response.ok) throw new Error('Erro ao carregar dados');
        
        const dados = await response.json();
        moduloId = detectarModulo();
        
        // Verificar acesso ao módulo ANTES de carregar
        const acesso = verificarAcessoModulo(moduloId);
        if (!acesso.permitido) {
            console.log('❌ Acesso negado ao módulo', moduloId);
            bloquearAcessoModulo(acesso.faltando);
            return false;
        }
        
        DADOS_MODULO = dados.modulos.find(m => m.id === moduloId);
        
        if (!DADOS_MODULO) throw new Error('Módulo não encontrado');
        
        console.log('✅ Dados do módulo carregados:', DADOS_MODULO);
        console.log('✅ Acesso permitido ao módulo', moduloId);
        return true;
    } catch (erro) {
        console.error('❌ Erro ao carregar dados do módulo:', erro);
        return false;
    }
}

// Renderizar conteúdo do módulo
function renderizarModulo() {
    if (!DADOS_MODULO) return;

    // Título
    const titulo = document.getElementById('titulo-modulo');
    if (titulo) {
        titulo.textContent = `${DADOS_MODULO.titulo}: ${DADOS_MODULO.descricao}`;
    }

    // Vídeo
    const videoContainer = document.getElementById('video-container');
    if (videoContainer && DADOS_MODULO.videoUrl) {
        videoContainer.innerHTML = `
            <iframe 
                width="560" 
                height="315" 
                src="${DADOS_MODULO.videoUrl}" 
                title="${DADOS_MODULO.descricao}" 
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                id="video-iframe">
            </iframe>
        `;
        
        // Marcar vídeo como visualizado após alguns segundos
        setTimeout(() => {
            marcarVideoVisualizado();
        }, 5000);
    }

    // Conteúdo de texto
    const conteudoTexto = document.getElementById('conteudo-texto');
    if (conteudoTexto && DADOS_MODULO.conteudoTexto) {
        const ct = DADOS_MODULO.conteudoTexto;
        conteudoTexto.innerHTML = `
            <h2>${DADOS_MODULO.descricao} - Métodos de Resolução</h2>
            <p>${ct.introducao}</p>

            <h3>Métodos básicos de resolução</h3>
            <ol>
                ${ct.metodos.map(metodo => `<li>${metodo}</li>`).join('')}
            </ol>

            <h3>Exemplo</h3>
            <p><strong>${ct.exemplo.enunciado}</strong></p>
            <ol>
                ${ct.exemplo.passos.map(passo => `<li>${passo}</li>`).join('')}
            </ol>
        `;
    }

    verificarStatusModulo();
}

// Marcar vídeo como visualizado
function marcarVideoVisualizado() {
    const chave = `modulo_${moduloId}_video_visto`;
    localStorage.setItem(chave, 'true');
    habilitarBotaoTeste();
}

// Verificar se o vídeo foi visualizado
function videoFoiVisualizado() {
    const chave = `modulo_${moduloId}_video_visto`;
    return localStorage.getItem(chave) === 'true';
}

// Verificar se o teste foi aprovado
function testeAprovado() {
    const chave = `modulo_${moduloId}_aprovado`;
    return localStorage.getItem(chave) === 'true';
}

// Habilitar botão de teste
function habilitarBotaoTeste() {
    const btn = document.getElementById('btn-fazer-teste');
    if (btn && videoFoiVisualizado()) {
        btn.disabled = false;
        btn.textContent = '✅ Fazer Teste do Módulo';
        btn.onclick = () => {
            window.location.href = `/src/pages/teste-modulo.html?modulo=${moduloId}`;
        };
    }
}

// Verificar status completo do módulo
function verificarStatusModulo() {
    const statusTeste = document.getElementById('status-teste');
    
    if (testeAprovado()) {
        if (statusTeste) {
            statusTeste.innerHTML = '✅ <strong>Teste aprovado!</strong> Módulo concluído.';
            statusTeste.style.color = '#28a745';
        }
        
        const btn = document.getElementById('btn-fazer-teste');
        if (btn) {
            btn.textContent = '🏆 Módulo Concluído - Ver Próximo';
            btn.disabled = false;
            btn.onclick = () => {
                window.location.href = '/src/pages/trilha-de-aprendizado.html';
            };
        }
    } else if (videoFoiVisualizado()) {
        habilitarBotaoTeste();
        if (statusTeste) {
            statusTeste.textContent = '⏳ Faça o teste para concluir o módulo';
        }
    } else {
        if (statusTeste) {
            statusTeste.textContent = '⏳ Assista ao vídeo para desbloquear o teste';
        }
    }
}

// Simular progresso ao rolar a página
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        // Se rolou mais de 70% da página, considera que visualizou o conteúdo
        if (scrollPercent > 70 && !videoFoiVisualizado()) {
            marcarVideoVisualizado();
        }
    }, 500);
});

// Inicialização
async function inicializar() {
    console.log('🚀 Iniciando página do módulo...');
    
    const sucesso = await carregarDadosModulo();
    if (!sucesso) {
        alert('Erro ao carregar o módulo. Redirecionando...');
        window.location.href = 'trilha-de-aprendizado.html';
        return;
    }
    
    renderizarModulo();
    
    console.log('✅ Página do módulo carregada!');
}

// Aguardar DOM estar pronto
document.addEventListener('DOMContentLoaded', inicializar);

// Exportar para uso global
window.ModuloAtual = {
    obterDados: () => DADOS_MODULO,
    obterModuloId: () => moduloId,
    videoVisualizado: videoFoiVisualizado,
    aprovado: testeAprovado
};
