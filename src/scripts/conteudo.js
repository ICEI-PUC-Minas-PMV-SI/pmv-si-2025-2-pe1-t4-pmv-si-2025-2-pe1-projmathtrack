
fetch("conteudo.json")
  .then((resposta) => resposta.json()) 
  .then((dados) => {

    document.getElementById("titulo-modulo").textContent = dados.titulo;

    document.getElementById("video-container").innerHTML = `
      <iframe width="560" height="315" 
        src="${dados.video}" 
        title="Vídeo do Módulo" 
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    `;

    document.getElementById("conteudo-texto").innerHTML = dados.descricao;
  })
  .catch((erro) => {
    console.error("Erro no JSON:", erro);
  });
