document.addEventListener('DOMContentLoaded', () => {

    const nomeInput = document.getElementById('input-nome');
    const nascimentoInput = document.getElementById('input-nascimento');
    const emailInput = document.getElementById('input-email');
    const emailConfirmaInput = document.getElementById('input-email-confirma');
    const enviarButton = document.getElementById('btn-enviar');

    enviarButton.addEventListener('click', () => {
        
        const nome = nomeInput.value;
        const dataNascimento = nascimentoInput.value;
        const email = emailInput.value;
        const emailConfirma = emailConfirmaInput.value;

        if (email !== emailConfirma) {
            alert('Os emails não coincidem!');
            return; 
        }
        
        if (!nome || !email || !dataNascimento) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const dadosDoUsuario = {
            nome: nome,
            dataNascimento: dataNascimento,
            email: email
        };

        const dadosJSON = JSON.stringify(dadosDoUsuario);

       
        console.log("Dados que serão enviados (em formato JSON):");
        console.log(dadosJSON);
  
        enviarParaServidor(dadosJSON);
    });
});

async function enviarParaServidor(jsonParaEnviar) {
    try {
        const resposta = await fetch('https://api.seuservidor.com/recuperar-senha', {
            method: 'POST', 
            headers: {
               
                'Content-Type': 'application/json'
            },
            body: jsonParaEnviar 
        });

        if (resposta.ok) {
           
            const dadosResposta = await resposta.json(); 
            console.log('Resposta do servidor:', dadosResposta);
            alert('Email de recuperação enviado com sucesso!');
        } else {
           
            alert('Erro ao processar a solicitação. Verifique os dados.');
        }

    } catch (erro) {
        
        console.error('Erro na requisição:', erro);
        alert('Não foi possível conectar ao servidor.');
    }
}