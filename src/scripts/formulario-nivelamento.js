// Script para processar o formulário de nivelamento

// Respostas corretas
const RESPOSTAS_CORRETAS = {
    p1: '19',    // 15 + 12 - 8 = 19
    p2: '84',    // 12 × 7 = 84
    p3: '12',    // 144 ÷ 12 = 12
    p4: '13',    // 3 + 5 × 2 = 13
    p5: '3/4',   // 1/2 + 1/4 = 3/4
    p6: '30',    // 20% de 150 = 30
    p7: '5',     // 2x + 5 = 15, x = 5
    p8: '8',     // √64 = 8
    p9: '8',     // 2³ = 8
    p10: '5'     // soma das raízes de x² - 5x + 6 = 0 é 5
};

// Processar formulário
function processarFormulario(event) {
    event.preventDefault();
    
    const form = event.target;
    let acertos = 0;
    const totalQuestoes = Object.keys(RESPOSTAS_CORRETAS).length;
    
    // Verificar se todas as questões foram respondidas
    const todasRespondidas = Object.keys(RESPOSTAS_CORRETAS).every(questao => {
        return form.querySelector(`input[name="${questao}"]:checked`) !== null;
    });
    
    if (!todasRespondidas) {
        alert('⚠️ Por favor, responda todas as questões antes de enviar!');
        return;
    }
    
    // Calcular acertos
    Object.keys(RESPOSTAS_CORRETAS).forEach(questao => {
        const respostaSelecionada = form.querySelector(`input[name="${questao}"]:checked`);
        if (respostaSelecionada && respostaSelecionada.value === RESPOSTAS_CORRETAS[questao]) {
            acertos++;
        }
    });
    
    // Calcular porcentagem
    const porcentagem = Math.round((acertos / totalQuestoes) * 100);
    
    // Determinar nível baseado na pontuação
    let nivel = '';
    let mensagem = '';
    
    if (porcentagem >= 80) {
        nivel = 'Avançado';
        mensagem = 'Excelente! Você demonstra domínio avançado em matemática. Continue assim!';
    } else if (porcentagem >= 60) {
        nivel = 'Intermediário';
        mensagem = 'Muito bem! Você tem um bom conhecimento em matemática. Continue praticando!';
    } else if (porcentagem >= 40) {
        nivel = 'Básico';
        mensagem = 'Bom começo! Você tem conhecimentos básicos. Vamos fortalecer suas habilidades!';
    } else {
        nivel = 'Iniciante';
        mensagem = 'Não se preocupe! Vamos começar do básico e construir seu conhecimento passo a passo.';
    }
    
    // Salvar resultado no localStorage
    const resultado = {
        acertos: acertos,
        total: totalQuestoes,
        porcentagem: porcentagem,
        nivel: nivel,
        mensagem: mensagem,
        data: new Date().toISOString()
    };
    
    localStorage.setItem('resultado_nivelamento', JSON.stringify(resultado));
    
    console.log('✅ Resultado calculado:', resultado);
    
    // Redirecionar para página de resultado
    window.location.href = 'resultado.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', processarFormulario);
        console.log('✅ Formulário de nivelamento carregado');
    }
});
