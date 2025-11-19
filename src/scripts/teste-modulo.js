let DADOS_TESTE = null;
let moduloId = null;
let respostasUsuario = {};

function obterModuloDaURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('modulo')) || 1;
}

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

function exibirResultado(resultado) {
    const form = document.getElementById('form-teste');
    if (form) form.style.display = 'none';
    
    const infoTeste = document.querySelector('.info-teste');
    if (infoTeste) infoTeste.style.display = 'none';
    
    const resultadoDiv = document.getElementById('resultado-teste');
    if (!resultadoDiv) return;
    
    resultadoDiv.style.display = 'block';
    
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
        
        salvarAprovacao();
    } else {
        resultadoTitulo.textContent = '📝 Não foi desta vez...';
        resultadoTitulo.style.color = '#dc3545';
        statusAprovacao.innerHTML = `❌ <strong>Reprovado.</strong> Você precisa de no mínimo 60% para ser aprovado. Revise o conteúdo e tente novamente!`;
        statusAprovacao.style.color = '#dc3545';
        btnRefazer.style.display = 'inline-block';
    }
    
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function salvarAprovacao() {
    const chave = `modulo_${moduloId}_aprovado`;
    localStorage.setItem(chave, 'true');
    
    atualizarProgressoTrilha();
    
    console.log(`✅ Módulo ${moduloId} aprovado e salvo!`);
}

function atualizarProgressoTrilha() {
    try {
        const dadosSalvos = localStorage.getItem('mathtrack_usuario');
        let dadosUsuario;
        
        if (dadosSalvos) {
            dadosUsuario = JSON.parse(dadosSalvos);
        } else {
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
        
        const modulo = dadosUsuario.modulosProgresso.find(m => m.id === moduloId);
        if (modulo) {
            modulo.progresso = 100;
            
            dadosUsuario.ranking.pontos = dadosUsuario.modulosProgresso.reduce(
                (total, m) => total + (m.progresso * 10), 0
            );
            
            if (dadosUsuario.ranking.pontos <= 500) {
                dadosUsuario.ranking.nivel = 'Iniciante';
            } else if (dadosUsuario.ranking.pontos <= 2000) {
                dadosUsuario.ranking.nivel = 'Intermediário';
            } else {
                dadosUsuario.ranking.nivel = 'Avançado';
            }
            
            const proximoModulo = dadosUsuario.modulosProgresso.find(m => m.id === moduloId + 1);
            if (proximoModulo) {
                proximoModulo.ativo = true;
                dadosUsuario.continuar.moduloId = moduloId + 1;
                dadosUsuario.continuar.unidadeIndex = 0;
                console.log(`🔓 Módulo ${moduloId + 1} desbloqueado!`);
            } else {
                dadosUsuario.continuar.moduloId = moduloId;
                dadosUsuario.continuar.unidadeIndex = 0;
            }
            
            dadosUsuario.continuar.ultimoAcesso = new Date().toISOString().split('T')[0];
            
            const baseRanking = 200;
            dadosUsuario.ranking.posicao = Math.max(1, baseRanking - Math.floor(dadosUsuario.ranking.pontos / 20));
        }
        
        localStorage.setItem('mathtrack_usuario', JSON.stringify(dadosUsuario));
        console.log('✅ Progresso atualizado na trilha:', dadosUsuario);
        
    } catch (erro) {
        console.error('❌ Erro ao atualizar progresso na trilha:', erro);
    }
}

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

function refazerTeste() {
    window.location.reload();
}

const MODULO_CAMINHOS = {
    1: '/src/pages/modulos/basico/equacao-primeiro-grau.html',
    2: '/src/pages/modulos/basico/sistemas-equacao.html',
    3: '/src/pages/modulos/basico/equacao-segundo-grau.html',
    4: '/src/pages/modulos/basico/potencia-radiciacao.html',
    5: '/src/pages/modulos/intermediario/polinomios-fatoracao.html',
    6: '/src/pages/modulos/basico/conjuntos-numericos.html',
    7: '/src/pages/modulos/intermediario/fundamentos-funcoes.html',
    8: '/src/pages/modulos/intermediario/funcoes-polinomiais.html'
};

function voltarModulo() {
    const caminho = MODULO_CAMINHOS[moduloId];
    if (caminho) {
        window.location.href = caminho;
    } else {
        window.location.href = '/src/pages/trilha-de-aprendizado.html';
    }
}

function voltarTrilha() {
    window.location.href = '/src/pages/trilha-de-aprendizado.html';
}

function handleSubmit(event) {
    event.preventDefault();
    
    const respostas = coletarRespostas();
    
    if (Object.keys(respostas).length < DADOS_TESTE.questoes.length) {
        alert('Por favor, responda todas as questões antes de enviar!');
        return;
    }
    
    console.log('📝 Respostas coletadas:', respostas);
    
    const resultado = calcularResultado();
    console.log('📊 Resultado:', resultado);
    
    salvarTentativa(resultado);
    
    exibirResultado(resultado);
}

async function inicializar() {
    console.log('🚀 Iniciando teste do módulo...');
    
    const sucesso = await carregarDadosTeste();
    if (!sucesso) {
        alert('Erro ao carregar o teste. Redirecionando...');
        window.location.href = '/src/pages/trilha-de-aprendizado.html';
        return;
    }
    
    renderizarQuestoes();
    
    const form = document.getElementById('form-teste');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
    
    console.log('✅ Teste carregado com sucesso!');
}

document.addEventListener('DOMContentLoaded', inicializar);

window.refazerTeste = refazerTeste;
window.voltarModulo = voltarModulo;
window.voltarTrilha = voltarTrilha;

window.TesteModulo = {
    obterDados: () => DADOS_TESTE,
    obterModuloId: () => moduloId,
    obterRespostas: () => respostasUsuario
};
