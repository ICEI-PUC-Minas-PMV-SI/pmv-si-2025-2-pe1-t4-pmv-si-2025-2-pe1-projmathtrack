// Script para gerenciar teste do módulo

let DADOS_TESTE = null;
let moduloId = null;
let respostasUsuario = {};

// Obter ID do módulo da URL
function obterModuloDaURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('modulo')) || 1;
}

// Carregar dados do teste
async function carregarDadosTeste() {
    try {
        const response = await fetch('/src/dados.json');
        if (!response.ok) throw new Error('Erro ao carregar dados');
        
        const dados = await response.json();
        moduloId = obterModuloDaURL();
        
        const modulo = dados.modulos.find(m => m.id === moduloId);
        if (!modulo || !modulo.teste) throw new Error('Teste não encontrado');
        
        DADOS_TESTE = {
            moduloId: moduloId,
            titulo: modulo.titulo,
            descricao: modulo.descricao,
            questoes: modulo.teste
        };
        
        console.log('✅ Dados do teste carregados:', DADOS_TESTE);
        return true;
    } catch (erro) {
        console.error('❌ Erro ao carregar teste:', erro);
        return false;
    }
}

// Renderizar questões do teste
function renderizarQuestoes() {
    if (!DADOS_TESTE) return;

    const titulo = document.getElementById('titulo-teste');
    if (titulo) {
        titulo.textContent = `Teste - ${DADOS_TESTE.titulo}: ${DADOS_TESTE.descricao}`;
    }

    const totalQuestoes = document.getElementById('total-questoes');
    if (totalQuestoes) {
        totalQuestoes.textContent = DADOS_TESTE.questoes.length;
    }

    const container = document.getElementById('questoes-container');
    if (!container) return;

    container.innerHTML = DADOS_TESTE.questoes.map((questao, index) => `
        <div class="input-group questao-item">
            <label class="questao-label">
                <strong>Questão ${index + 1}:</strong> ${questao.pergunta}
            </label>
            <div class="opcoes-radio">
                ${questao.opcoes.map((opcao, opcaoIndex) => `
                    <label class="radio-opcao">
                        <input 
                            type="radio" 
                            name="questao_${questao.id}" 
                            value="${opcaoIndex}"
                            required
                        />
                        <span>${opcao}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Coletar respostas do formulário
function coletarRespostas() {
    respostasUsuario = {};
    
    DADOS_TESTE.questoes.forEach(questao => {
        const respostaSelecionada = document.querySelector(
            `input[name="questao_${questao.id}"]:checked`
        );
        
        if (respostaSelecionada) {
            respostasUsuario[questao.id] = parseInt(respostaSelecionada.value);
        }
    });
    
    return respostasUsuario;
}

// Calcular resultado do teste
function calcularResultado() {
    let acertos = 0;
    const total = DADOS_TESTE.questoes.length;
    
    DADOS_TESTE.questoes.forEach(questao => {
        const respostaUsuario = respostasUsuario[questao.id];
        if (respostaUsuario === questao.respostaCorreta) {
            acertos++;
        }
    });
    
    const nota = Math.round((acertos / total) * 100);
    const aprovado = nota >= 60;
    
    return {
        acertos,
        total,
        nota,
        aprovado
    };
}

// Exibir resultado
function exibirResultado(resultado) {
    // Esconder formulário
    const form = document.getElementById('form-teste');
    if (form) form.style.display = 'none';
    
    const infoTeste = document.querySelector('.info-teste');
    if (infoTeste) infoTeste.style.display = 'none';
    
    // Mostrar resultado
    const resultadoDiv = document.getElementById('resultado-teste');
    if (!resultadoDiv) return;
    
    resultadoDiv.style.display = 'block';
    
    // Preencher dados
    document.getElementById('acertos').textContent = resultado.acertos;
    document.getElementById('total').textContent = resultado.total;
    document.getElementById('nota').textContent = resultado.nota;
    
    const statusAprovacao = document.getElementById('status-aprovacao');
    const resultadoTitulo = document.getElementById('resultado-titulo');
    const btnRefazer = document.getElementById('btn-refazer');
    
    if (resultado.aprovado) {
        resultadoTitulo.textContent = '🎉 Parabéns! Você foi aprovado!';
        resultadoTitulo.style.color = '#28a745';
        statusAprovacao.innerHTML = '✅ <strong>Aprovado!</strong> Você pode avançar para o próximo módulo.';
        statusAprovacao.style.color = '#28a745';
        btnRefazer.style.display = 'none';
        
        // Salvar aprovação
        salvarAprovacao();
    } else {
        resultadoTitulo.textContent = '📝 Não foi desta vez...';
        resultadoTitulo.style.color = '#dc3545';
        statusAprovacao.innerHTML = `❌ <strong>Reprovado.</strong> Você precisa de no mínimo 60% para ser aprovado. Revise o conteúdo e tente novamente!`;
        statusAprovacao.style.color = '#dc3545';
        btnRefazer.style.display = 'inline-block';
    }
    
    // Rolar para o resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Salvar aprovação no localStorage
function salvarAprovacao() {
    const chave = `modulo_${moduloId}_aprovado`;
    localStorage.setItem(chave, 'true');
    
    // Atualizar progresso na trilha diretamente
    atualizarProgressoTrilha();
    
    console.log(`✅ Módulo ${moduloId} aprovado e salvo!`);
}

// Atualizar progresso na trilha de aprendizado
function atualizarProgressoTrilha() {
    try {
        // Carregar dados do usuário
        const dadosSalvos = localStorage.getItem('mathtrack_usuario');
        let dadosUsuario;
        
        if (dadosSalvos) {
            dadosUsuario = JSON.parse(dadosSalvos);
        } else {
            // Inicializar dados se não existir
            dadosUsuario = {
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
        
        // Atualizar progresso do módulo atual
        const modulo = dadosUsuario.modulosProgresso.find(m => m.id === moduloId);
        if (modulo) {
            modulo.progresso = 100;
            
            // Calcular total de pontos
            dadosUsuario.ranking.pontos = dadosUsuario.modulosProgresso.reduce(
                (total, m) => total + (m.progresso * 10), 0
            );
            
            // Determinar nível
            if (dadosUsuario.ranking.pontos <= 500) {
                dadosUsuario.ranking.nivel = 'Iniciante';
            } else if (dadosUsuario.ranking.pontos <= 2000) {
                dadosUsuario.ranking.nivel = 'Intermediário';
            } else {
                dadosUsuario.ranking.nivel = 'Avançado';
            }
            
            // Desbloquear próximo módulo
            const proximoModulo = dadosUsuario.modulosProgresso.find(m => m.id === moduloId + 1);
            if (proximoModulo) {
                proximoModulo.ativo = true;
                dadosUsuario.continuar.moduloId = moduloId + 1;
                dadosUsuario.continuar.unidadeIndex = 0;
                console.log(`🔓 Módulo ${moduloId + 1} desbloqueado!`);
            } else {
                // Se não há próximo módulo, mantém no atual
                dadosUsuario.continuar.moduloId = moduloId;
                dadosUsuario.continuar.unidadeIndex = 0;
            }
            
            // Atualizar data de último acesso
            dadosUsuario.continuar.ultimoAcesso = new Date().toISOString().split('T')[0];
            
            // Atualizar posição no ranking (simulado)
            const baseRanking = 200;
            dadosUsuario.ranking.posicao = Math.max(1, baseRanking - Math.floor(dadosUsuario.ranking.pontos / 20));
        }
        
        // Salvar dados atualizados
        localStorage.setItem('mathtrack_usuario', JSON.stringify(dadosUsuario));
        console.log('✅ Progresso atualizado na trilha:', dadosUsuario);
        
    } catch (erro) {
        console.error('❌ Erro ao atualizar progresso na trilha:', erro);
    }
}

// Salvar tentativa de teste (mesmo se reprovado)
function salvarTentativa(resultado) {
    const chave = `modulo_${moduloId}_tentativas`;
    const tentativas = JSON.parse(localStorage.getItem(chave) || '[]');
    
    tentativas.push({
        data: new Date().toISOString(),
        nota: resultado.nota,
        aprovado: resultado.aprovado
    });
    
    localStorage.setItem(chave, JSON.stringify(tentativas));
}

// Função para refazer teste
function refazerTeste() {
    window.location.reload();
}

// Função para voltar ao módulo
function voltarModulo() {
    window.location.href = `modulo${moduloId}.html`;
}

// Função para voltar à trilha
function voltarTrilha() {
    window.location.href = 'trilha-de-aprendizado.html';
}

// Handler do formulário
function handleSubmit(event) {
    event.preventDefault();
    
    // Coletar respostas
    const respostas = coletarRespostas();
    
    // Verificar se todas as questões foram respondidas
    if (Object.keys(respostas).length < DADOS_TESTE.questoes.length) {
        alert('Por favor, responda todas as questões antes de enviar!');
        return;
    }
    
    console.log('📝 Respostas coletadas:', respostas);
    
    // Calcular resultado
    const resultado = calcularResultado();
    console.log('📊 Resultado:', resultado);
    
    // Salvar tentativa
    salvarTentativa(resultado);
    
    // Exibir resultado
    exibirResultado(resultado);
}

// Inicialização
async function inicializar() {
    console.log('🚀 Iniciando teste do módulo...');
    
    const sucesso = await carregarDadosTeste();
    if (!sucesso) {
        alert('Erro ao carregar o teste. Redirecionando...');
        window.location.href = 'trilha-de-aprendizado.html';
        return;
    }
    
    renderizarQuestoes();
    
    // Adicionar handler ao formulário
    const form = document.getElementById('form-teste');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    console.log('✅ Teste carregado com sucesso!');
}

// Aguardar DOM estar pronto
document.addEventListener('DOMContentLoaded', inicializar);

// Exportar funções globais
window.refazerTeste = refazerTeste;
window.voltarModulo = voltarModulo;
window.voltarTrilha = voltarTrilha;

// Exportar para uso global
window.TesteModulo = {
    obterDados: () => DADOS_TESTE,
    obterModuloId: () => moduloId,
    obterRespostas: () => respostasUsuario
};
