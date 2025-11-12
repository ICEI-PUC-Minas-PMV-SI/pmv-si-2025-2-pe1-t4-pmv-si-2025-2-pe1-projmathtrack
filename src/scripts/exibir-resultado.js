// Script para exibir resultado do teste de nivelamento

function exibirResultado() {
    // Carregar resultado do localStorage
    const resultadoJSON = localStorage.getItem('resultado_nivelamento');
    
    if (!resultadoJSON) {
        // Se não houver resultado, mostrar mensagem e redirecionar
        document.querySelector('.resultado').innerHTML = `
            <h4>Nenhum resultado encontrado</h4>
            <p>Você ainda não fez o teste de nivelamento.</p>
            <br>
            <a href="formulario.html">
                <button class="iniciar">Fazer Teste Agora</button>
            </a>
        `;
        return;
    }
    
    const resultado = JSON.parse(resultadoJSON);
    
    console.log('📊 Resultado carregado:', resultado);
    
    // Atualizar textos
    document.getElementById('nivel-texto').textContent = `Nível: ${resultado.nivel}`;
    document.getElementById('acertos').textContent = resultado.acertos;
    document.getElementById('total').textContent = resultado.total;
    document.getElementById('porcentagem').textContent = resultado.porcentagem;
    document.getElementById('mensagem').textContent = resultado.mensagem;
    
    // Atualizar barra de progresso
    const barraProgresso = document.getElementById('barra-progresso');
    barraProgresso.style.width = `${resultado.porcentagem}%`;
    
    // Definir cor baseada no nível
    const nivelTexto = document.getElementById('nivel-texto');
    if (resultado.porcentagem >= 80) {
        nivelTexto.style.color = '#28a745';
        barraProgresso.style.backgroundColor = '#28a745';
    } else if (resultado.porcentagem >= 60) {
        nivelTexto.style.color = '#007bff';
        barraProgresso.style.backgroundColor = '#007bff';
    } else if (resultado.porcentagem >= 40) {
        nivelTexto.style.color = '#ffc107';
        barraProgresso.style.backgroundColor = '#ffc107';
    } else {
        nivelTexto.style.color = '#dc3545';
        barraProgresso.style.backgroundColor = '#dc3545';
    }
    
    // Salvar nível inicial no perfil do usuário
    salvarNivelUsuario(resultado);
}

// Salvar nível do usuário para a trilha de aprendizado
function salvarNivelUsuario(resultado) {
    const dadosUsuario = JSON.parse(localStorage.getItem('mathtrack_usuario') || 'null');
    
    if (dadosUsuario) {
        dadosUsuario.nivelInicial = resultado.nivel;
        dadosUsuario.testeNivelamento = {
            acertos: resultado.acertos,
            total: resultado.total,
            porcentagem: resultado.porcentagem,
            data: resultado.data
        };
        
        localStorage.setItem('mathtrack_usuario', JSON.stringify(dadosUsuario));
        console.log('✅ Nível do usuário salvo na trilha');
    }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirResultado();
    console.log('✅ Página de resultado carregada');
});
