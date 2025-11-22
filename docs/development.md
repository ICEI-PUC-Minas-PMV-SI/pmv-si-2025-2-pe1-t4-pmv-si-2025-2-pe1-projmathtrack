## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| O sistema deve permitir que o usuário realize um cadastro/login na plataforma.	 | Boris, Bianca | criar-conta.html |
|RF-002| O sistema deve emitir um relatório de avaliação do nível que o usuário está em relação a matemática, indicando possíveis defasagens, pontos fortes e pontos que precisam de melhoria. | Iury, Bianca, Boris | historico.html |
|RF-003| O sistema precisa emitir um gráfico com as oscilações de melhoria ou piora em relação ao teste feito anteriormente (histórico). | Wallison, Bianca, Boris | trilha-de-aprendizado.html |
|RF-004| O sistema deve apresentar links externos contendo referências bibliográficas e/ou indicação de exercícios voltados aos pontos fracos destacados na avaliação. |  Patrick, Boris, Bianca | Página-do-Módulo_MT.html |
|RF-005| O sistema deve permitir ao usuário participar de fóruns online sobre assuntos pontuais voltados à matemática, permitindo interação com outros usuários. | Bianca, Patrick, Boris | forum.html, Fórum_MT.html |
|RF-006| O sistema deve fornecer a resolução dos exercícios, com os resultados e apontando as questões acertadas e erradas pelo usuário.|  |  |
|RF-007| O sistema deve apresentar uma modularização dos tópicos para o usuário, a fim de facilitar sua navegação. | Wallison, Patrick, Boris, Bianca | trilha-de-aprendizado.html, modulos.html |
|RF-008| O sistema deve permitir que o usuário redefina sua senha. | Bóris, Bianca | recuperar-senha.html, redefinir-senha.html |
|RF-009| O sistema deve gerar uma trilha de aprendizagem personalizada com base nos resultados da avaliação do usuário.	 | Wallison, Patrick, Bianca, Bóris | trilha-de-aperendizado.html |
|RF-010|  o usuário deverá ter acesso ao perfil onde possa alterar seus dados e visualizar a pontuação da gamificacao | Rayane, Bianca, Bóris, | cadastro-noticia.html |
|RF-011| O sistema deve possuir um sistema de gamificação, concedendo medalhas e pontos ao usuário conforme ele completa atividades e atingir metas. | Wallison, Bianca, Bóris | trilha-de-aprendizado.html |
|RF-012| O sistema deve permitir que o usuário avalie e forneça feedback sobre os materiais de estudo e exercícios, para ajudar a curadoria de conteúdo da plataforma. | Wallison, Patrick, Bóris, Bianca | conteudo.html, |


src
Ao acessar o site, o usuário será direcionada a página principial “Home”. Nessa página, o usuário poderá visualizar toda a estrutura de páginas. Na navbar, o usuário poderá acessar as demais páginas por meio de links feitos em html. 
Para acessar as funcionalidades do site, o usuário deverá fazer login – caso já esteja cadastrado – ou realizar um cadastro. Para criar o cadastro, o usuário deverá fazer fornecer informações como nome, email, data de nascimento e telefone, que serão armazenados em um localstorage. Campos do tipo input, cada um com sua respectiva id, foram definidos para receber esses dados. Após preenchê-los, o usuário conclui o processo clicando no botão “Criar conta”, implementado por meio de uma tag HTML do tipo button.

  <img src="criarconta.jpg" alt="Texto Alternativo">
Antes de salvar ou processar os dados, o JavaScript realiza verificações para garantir que: nenhum campo obrigatório esteja vazio; o email tenha um formato válido; a data de nascimento tenha sido informada corretamente; o telefone contenha apenas números ou siga um padrão determinado.
Se algum campo não atender aos requisitos, o script impede a continuação do cadastro e exibe mensagens de alerta. Após validar os dados, o JavaScript reúne todas as informações em um objeto e o armazena no localStorage. Esse armazenamento permite persistência dos dados mesmo após o fechamento do navegador. O script utiliza a função localStorage.setItem(), geralmente convertendo o objeto em JSON com JSON.stringify(). 

Para usuário já cadastrados, o JavaScript irá recuperar os dados utilizando o localStorage.setItem(). O JavaScript também pode controlar elementos visuais da página, como exibir mensagem de sucesso ou erro, habilitar/desabilitar botões conforme os inputs, alterar CSS para enfatizar campos inválidos. Essas ações são feitas usando métodos como: document.getElementById(); element.classList.add(); element.textContent = ""

# Trilha de Aprendizado 

![Image](https://github.com/user-attachments/assets/1dd9c63b-2e79-4abb-9580-c498301c38a6)
![Image](https://github.com/user-attachments/assets/9fb77ef6-fb15-43db-9054-330b4ac9e584)
Esta página em JavaScript implementa executa a progressão de estudos do MathTrack. Ele controla os módulos, progresso do usuário, desbloqueios, rankings, armazenamento de dados, renderização dinâmica da interface e controle das trilhas de estudo.

DADOS_USUARIO:  A variável  que armazena todas as informações do usuário carregadas do localStorage, tais como nome,  módulo atual, progresso por módulo, posição no ranking, acesso. 
MODULOS_POR_NIVEL: Organiza os módulos por nível de dificuldade e permite saber quais módulos percentem a cada nível. 
PREREQUISITOS: Tabela que define os módulos que precisam ser concluídos para desbloquear os posteriores. 
MODULOS_INFO: Armazena informações de cada módulo. 
CarregarDadosUsuario(): Carrega os dados do usuário do localStorage. 
InicializarDadosUsuario(): cria uma estrutura padrão para novos usuários contendo progressos inificial, módulos liberados e bloqueados, ranking e controle de onde o usuário parou. 
SincronizarAprovacoes()
sincronizarAprovacoes(): verifica os módulos marcados como aprovados no localStorage e permite que o progresso seja ajustado para 100%.
moduloCompleto(id): verifica se o módulo foi concluído pelo usuário. 
VerificarPrerequisitos(id): verifica se o módulo já pode ser acessado e quais pré-requisitos ainda faltam. 
nivelCompleto(nivel): verifica se todos os módulos de um determinado nível foram completados. 
DeterminarEstagio(): delimita o estágio do usuário e quais módulos serão exibidos. 
obterModulosVisiveis(): Controla a exibição dos módulos em “páginas” de 3 módulos por vez, conforme a evolução do usuário. 
desbloquarModulosdependentes(): libera os módulos após os pré-requisitos terem sido atingidos
recalcularDados(): recalcula os pontos do usuário e determina seu nível no ranking com base no total acumulado. 
salvarDadosUsuario(): salva DADOS_USUARIOS no localStorage. 
RenderizarEstagio(): a função determina o estágio do usuário, a porcentagem concluída em cada nível, barra de progresso e o número de módulos finalizados.
RenderizarModulos(): Mostra os módulos visíveis. 
RenderizarContinuar(): Mostra o próximo módulo que o usuário deve continuar estudando.
RenderizarForum(): Mostra exemplos estáticos de tópicos recentes do fórum. 
RenderizarEvolucao()> Mostra o progresso do usuário. 
RenderizarTeste(): Mostra se a atividade está completa, bloqueada ou disponível. 
calcularProgressoGeral(): Calcula a média do progresso entre os módulos. 
ObterMensagem(progresso): retorna mensagem com base no progresso total. 
renderizarTodosComponentes(): renderiza todos os blocos da página em sequência. 
DOMContentLoaded: Ao carregar a página os dados do usuário são recarregados, os pontos recalculados, desbloqueia módulos, salva todos os dados, renderiza toda a interface e exibe logs no console para depuração. 

