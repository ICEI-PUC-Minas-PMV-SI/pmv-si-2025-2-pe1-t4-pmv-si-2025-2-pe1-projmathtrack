document.addEventListener('DOMContentLoaded', () => {

    const senhaInput = document.getElementById('input-senha');
    const senhaConfirmaInput = document.getElementById('input-senha-confirma');
    const redefinirButton = document.getElementById('btn-redefinir');

    redefinirButton.addEventListener('click', () => 
        {

        const senha = senhaInput.value;
        const senhaConfirma = senhaConfirmaInput.value;

        if (!senha || !senhaConfirma) {
            alert('Por favor, preencha os dois campos de senha.');
            return; 
        }
        
        if (senha !== senhaConfirma) {
            alert('As senhas não coincidem!');
            return; 
        }

        const dadosRedefinicao = {
            novaSenha: senha
        }

        const dadosJSON = JSON.stringify(dadosRedefinicao);

        console.log("JSON que será enviado ao servidor:");
        console.log(dadosJSON);

        enviarParaServidor(dadosJSON);
    });
});

async function enviarParaServidor(jsonParaEnviar) {
 

    const url = 'https://api.seuservidor.com/redefinir-senha-final';

    try {
        const resposta = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonParaEnviar
        });

        if (resposta.ok) {
            alert('Senha redefinida com sucesso!');

            window.location.href = '/login.html'; 
        } else {
            alert('Erro ao redefinir a senha. O link pode ter expirado.');
        }

    } catch (erro) {
        console.error('Erro na requisição:', erro);
        alert('Não foi possível conectar ao servidor.');
    }
}