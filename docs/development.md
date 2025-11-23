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

## Teste de nivelamento

![Image](https://github.com/user-attachments/assets/4df3b5b0-2474-40e5-a81f-9009e13a9506)

![Image](https://github.com/user-attachments/assets/3c12b840-6bbe-4227-9b75-700ef5a7a650)

Está página em JavaScript é responsável pelo formulário de nivelamento de matemática, validar respostas, calcular a pontuação do aluno, determinar seu nível de conhecimento e armazenar o resultado no localStorage para uso posterior na página de resultados.
Ele é carregado assim que a página inicia e funciona de forma totalmente automática após o envio do formulário.

RESPOSTAS_CORRETAS: objeto que contém cada questão e seu respectivo resultado correto. 
processsar_formulario(): responsável pelo processamento das respostas fornecidas pelo usuário, verificando se todas as questões foram respondidas, os acertos do usuário e seu desempenho percentual. O resultado será salvo em um localStorage. 

window.location.href = 'resultado.html': envia o usuário para tela final 
document.addEventListener('DOMContentLoaded', () => { ... }): responsável por localizar o formulário, ativar o listener de envio e registrar no console que tudo está funcionando.

## Resultados 

![Image](https://github.com/user-attachments/assets/b7d8a95f-24db-486b-bf02-ada6ac13d06a)

Está página é responsável por carregar e exibir os resultados do teste de nivelamento realizado pelo usuário. Ela também integra esses resultados ao perfil salvo no sistema, permitindo que a plataforma personalize a trilha de aprendizado com base no desempenho do estudante.

exibirResultado(): inicia carregando, via localStorage, o JSON previamente salvo durante o envio do formulário.

document.getElementById('nivel-texto').textContent = `Nível: ${resultado.nivel}`: Exibe o nível do usuário. 

document.getElementById('acertos').textContent = resultado.acertos: Exibe número de acertos.

document.getElementById('total').textContent = resultado.total: Exibe o total de questões.

document.getElementById('porcentagem').textContent = resultado.porcentagem: Exibe a porcentagem de desempenho.

document.getElementById('mensagem').textContent = resultado.mensagem: Renderiza a mensagem personalizada de acordo com o nível.

salvarNivelUsuario(resultado): carrega o objeto mathtrack_usuario, atualiza os nivel do usuário e salva no LocalStorage. 




## Trilha de Aprendizado 

![Image](https://github.com/user-attachments/assets/1dd9c63b-2e79-4abb-9580-c498301c38a6)
![Image](https://github.com/user-attachments/assets/9fb77ef6-fb15-43db-9054-330b4ac9e584)
Esta página em JavaScript implementa executa a progressão de estudos do MathTrack. Ele controla os módulos, progresso do usuário, desbloqueios, rankings, armazenamento de dados, renderização dinâmica da interface e controle das trilhas de estudo.

Suas principais estruturas são: 

DADOS_USUARIO:  A variável  que armazena todas as informações do usuário carregadas do localStorage, tais como nome,  módulo atual, progresso por módulo, posição no ranking, acesso. 
MODULOS_POR_NIVEL: Organiza os módulos por nível de dificuldade e permite saber quais módulos percentem a cada nível. 

PREREQUISITOS: Tabela que define os módulos que precisam ser concluídos para desbloquear os posteriores. 

MODULOS_INFO: Armazena informações de cada módulo. 

CarregarDadosUsuario(): Carrega os dados do usuário do localStorage. 

InicializarDadosUsuario(): cria uma estrutura padrão para novos usuários contendo progressos inificial, módulos liberados e bloqueados, ranking e controle de onde o usuário parou. 

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


## Módulo

![Image](https://github.com/user-attachments/assets/a89bb62e-d92f-420c-b661-a1b2d6ff07f8)

Esta página em JavaScript é responsável por gerenciar o funcionamento da página de módulo individual. Suas principais tarefas são: detectar qual módulo está atrasado; validar os pré-requisitos; carregar dados de um JSON; monitorar os progresso do usuário, liberando o teste após o vídeo ou o conteúdo ser visualizado, monitorar o progresso do usuário. 

Suas estruturas principais são: 

let moduloId = null: guarda o número do módulo detectado pela URL 

MapeamentoCaminho: relaciona trechos da URL com o número do módulo 

prerequisitosModulos: estabele quais módulos precisam ser finalizados antes do usuário acessar o módulo atual. 

detectarModulo(): identifica o módulo atual.

verificarModuloCompleto(numeroModulo): identifica se o módulo foi finalizado pelo usuário.

verificarAcessoModulo(numeroModulo): a partir do pré-requisito definido, libera ou bloqueia o módulo. 

bloqeuarAcessoModulo: exibe um alerta informando que módulos obrigatórios que ainda não foram concluídos e direciona o usuário automaticamente para página geral de módulos. 

async function carregarDadosModulo(): responsável or buscar o arquivo em dados.json, detectar qual módulo está seno acesso e se o usuário tem os pré-requisitos, seleciona os dados do módulo dentro do JSON e os armazena em DADOS_MODULO, liberar o acesso a página caso tudo esteja correto. 

renderizarModulo(): exibe o conteúdo carregado no html. 

marcarVideoVisualizado(): salva no localStorage que o usuário assistiu o vídeo ou rolou a página, liberando o botão "Fazer Teste".

habilitarBotaoTeste(): Ativa o botão para fazer o teste quando a visualização do vídeo é confirmada. 

verificarStatusModulo(): Exibe "Assista ao vídeo para desbloquear o teste" caso o vídeo não tenha sido visto, "Faça o teste para concluir o módulo" caso o video tenha sido visto, e "Módulo concluido" e "Ver próximo" caso o usuário tenha sido aprovado no módulo. 

Scroll listener: se o usuário scrollar mais de 70% da página, o módulo registra o vídeo como visualizado; 

async function inicializar(): Executa a iniciação da página, carrega os dados do módulo, renderiza o conteúdo e finaliza com "página do módulo carregada!"

document.addEventListener('DOMContentLoaded', inicializar): carrega o html antes do JS  funcionar. 

window.ModuloAtual = {}: permite que outras parte do sistema consultem os dados do módulo atual, o ID do módulo atual, se o vídeo foi visualizado e o módulo aprovado.


## Módulos 

![Image](https://github.com/user-attachments/assets/6f1604d7-eb11-4499-9754-bd730b851494)

Essa página em JavaScript é responsável pela organização dos módulos do MahtTrack, controle do proogresso do usuário, bloqueio ou desbloqueio com base nos pré-requisitos e navegação para os modulos individuais. 

Suas estruturas principais são: 

todosModulos: lista completa vinda do JSON 

modulosFiltrados: lista módificada após os filtros

async function carregarModulos(): busca o arquivo JSON com a lista de módulos, salva os módulos carregados e inicializa a renderização na página. 

organizarPorNivel(modulos): agrupa os módulos conforme o campo "nível". 

renderizarModulos(): Organiza os módulos por nível, monta dinamicamente o html dos grupos e card, ativ os event listener de cada módulo. 

criarCardModulo(modulo): Gera o bloco HTML de cada módulo, definindo a classe visual com base no nível, badge de status, mensagem indicando os pré-requisitos em falta, identificação numérica do módulo, verificar  prérequisito e o progresso. 

adicionarEventListeners(): relaciona eventos aos botões, sendo que cada botão leva o usuário ao módulo correspondente. 

mapeamentoModulos: um objeto que relaciona o número do módulo ao arquivo da página de conteúdo. 

carregarDadosUsuario(): Carrega o progresso salvo no localStorage. 

moduloCompleto(numero): verifica se o módulo foi concluído. 

marcarModuloCompleto(numero): marca um módulo como finalizado

desbloquearModulosDependentes(numeroCompleto, dados): ao completar um módulo, a função irá verificar quais módulos dependem dele, confere os pré-requisitos e desbloqueia o p´roximo. 

verificarPrerequisitos(modulo): Extrai do texto os números dos módulos requeridos e verifica se o usuário já os concluiu. 

navegarParaModulo(numero): valida os pré-requisitos, exibe alert caso esteja bloqueado e redireciona para a página html correspondente. 

buscarModulos(termo): realiza uma busca por meio do nome do conteúdo, do nível, pré-requisito e número do módulo. 

DOMContentLoaded: executa inicializarDadosSeNecessario(), carregarModulos(), configuração da busca em tempo real e exibição do progresso no console. 

## Testes

![Image](https://github.com/user-attachments/assets/84dee19b-22ef-4c6f-b0d5-26e2eba55fbb)
![Image](https://github.com/user-attachments/assets/4165d2b3-20d5-4b33-8df0-ee523effe221)

Está página é responsável pela execução do testes dos módulos. O JavaScript é responsável pelo carregamento das questões, renderização da interface, coleta de respostas, cálculo da nota, atualização do progresso e salvamento dos resultados no localStorage. 
Suas principais estruturas são: 

let DADOS_TESTE = null: armaneza as informações do teste 

let moduloId = null: guardo o ID do módulo 

let respostasUsuario={}: Objeto que registra todas as respostas escolhidas pelo usuário durante o teste. 

obterModuloDaURL: extrai modulo dos query params da URL e retorna o número do módulo. 

async carregarDadosTeste(): carrega o arquivo /src/dados.json e extrai os dados do módulo. 

renderizarQuestoes(): para cada questão cria um label com a pergunta, um grupo de pergunta, input radio com identificação única, atualiza o título do teste e mostra o número total de questões. 

coletarRespostas(): analisa todas as questões renderizadas e identifica qual alternativa foi escolhida.

CalcularResultado(): Calcula o número de acertos e a porcentagem da nota. 

exibirResultado(resultado): mostra o número de acertos, nota final, botão de refazer. Caso o usuáro seja aprovado, chama a função salvarAprovacao() e atualiza o estilo visual. 

salvarAprovacao(): registra no localStorage que o módulo foi concluído e chama a função atualizarProgressocTrilha()

atualizarProgressoTrilha(): atualiza o progresso módulo e o nível do usuário, libera o próximo modulo e atualiza a seção "continue de onde parou", ajusta a posição do ranking com base nos pontos. 

salvarTentativa(resultado): salva todas as tentativas o usuario no histórico. 

refazerTeste(): recarrega a página para zerar tudo. 

voltarModulo(): Redireciona o usuário de volta para a página do módulo. 

voltarTrilha(): leva diretamente para a página de trilha de aprendizado. 

handleSubmit(event): função ativada quando o usuário envia o teste. 

async inicializar(): executada quando o DOM carrega. 

window.refazerTeste: acessa funções pelo console e por botões do HTML

window.voltarModulo: acessa funções pelo console e por botões do HTML

window.voltarTrilha: acessa funções pelo console e por botões do HTML

window.TesteModulo: acessa funções pelo console e por botões do HTML

