# Planos de testes

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.


**Caso de Teste** | **CT01 - Criar conta parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://verdant-moxie-2ab9ab.netlify.app/src/pages/modulos <br> 2) Clique em cadastra-se <br> 2) Preencha todos os campos do formulário <br> 3) Criar conta

**Requisitos associados** | RF-001
**Resultado esperado** | Realizar o cadastro. 
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Fazer Teste/Teste de nivelamento**
 :--------------: | ------------
**Procedimento**  | Clicar em “Fazer Teste”; Responder as perguntas do teste de nivelamento 
**Requisitos associados** | RF-002
**Resultado esperado** | Direcionar o usuário para página de teste; Direcionar o usuário para página de resultados ao finalizar o teste. 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário poderá fazer o teste. O usuário será direcionado para página de “resultados” 


**Caso de Teste** | **CT03 - Resultados**
 :--------------: | ------------
**Procedimento**  | 1) Mostrar o resultado  <br> 2) Clicar em “Ir para a trilha de aprendizado” <br> 3) Clicar em “refazer teste”
**Requisitos associados** | RF-002
**Resultado esperado** | Prosseguir para trilha de aprendizado ou refazer o teste. 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página que clicou. 

**Caso de Teste** | **CT04 - Trilha de Aprendizado**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Módulo X” <br> 2) Exibir o estágio do usuário <br> 3) Clicar em “Continuar estudando”  <br> 4) Clicar em post do fórum; <br> 5) Clicar em “Ver todos os fóruns”; <br> 6) Exibir “Desempenho: evolução dos estudos” <br> 7) Exibir em testes disponíveis e os que se encontram bloqueados. 
**Requisitos associados** | RF-007
**Resultado esperado** | Direiconar para “Módulo”; <br> Direcionar para o módulo que o usuário parou; <br> Direcionar para publicação do fórum; <br> Direcionar para página do fórum;  
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página que clicou. 

**Caso de Teste** | **CT05 - Módulo**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Fazer teste do módulo” <br> 2) Clicar em vídeo 
**Requisitos associados** | RF-004
**Resultado esperado** | Direcionar o usuário para página de teste do módulo ; <br> Exibir vídeo de link externo dentro da página.  
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página “Testes do módulo”.

**Caso de Teste** | **CT06 - Teste do módulo**
 :--------------: | ------------
**Procedimento**  | 1) Clicar na opção desejada. <br> 2) Clicar em “enviar respostas” <br> 3) Clicar em “voltar”
**Requisitos associados** | RF-004
**Resultado esperado** | Direcionar o usuário para página contendo o resultado do teset <br> Direcionar o usuário para página “Módulo  
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página “Testes do módulo”.

**Caso de Teste** | **CT07 - Teste do módulo-Resultado**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Voltar para trilha” <br> 2) Clicar em “Refazer o teste”
**Requisitos associados** | RF-004
**Resultado esperado** | Exibir o resultado do teste. Caso o usuário tenha acertado acima de 60%, o usuário poderá clicar em “Voltar para trilha de aprendizado”. Se o usuário obter uma pontuação inferior a 60%, deverá refazer o teste ou “Voltara para Trilha” 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário poderá escolher qual página seguir com base no resultado do teste. 

**Caso de Teste** | **CT08 - Forum/Comunidade**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Novo Tópico” <br> 2) Clicar em “Salvar” <br> 3) Clicar em “Home” <br> 4) Clicar em “Seus tópicos” <br> 5) Clicar em “Álgebra” <br> 6) Clicar em “Cálculo I” <br> 7) Clicar em “Estruturas lógicas" <br> 7) Clicar em “Curtir” <br> 8) Clicar em “Salvar” <br> 9) Clicar em “Editar” <br> 10) Clicar em “Excluir" <br> 11) Clicar em “Publicar” <br> 12) Clicar em “Cancelar”
**Requisitos associados** | RF-005
**Resultado esperado** | O usuário deve ser capaz de criar um novo tópico, adicionando um título, associando o tópico a um conteúdo, e escrever o conteúdo principal. Ao clicar em “Publicar”, o tópico ficará disponível para outros usuários. 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário irá fazer uma publicação e/ou acessar outras que estejam disponíveis. 


**Caso de Teste** | **CT9 - Módulos**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Acessar módulo” <br> 2) Clicar em “Revisar módulo” <br> 3) Preencher campo de formulário <br> 4) Clicar em ”buscar”
**Requisitos associados** | RF-008; RF-010;
**Resultado esperado** | O usuário poderá realizar buscas do conteúdo por meio de palavras-chaves e acessar os módulos. 
**Dados de entrada** | Acesso via cliques <br> Inserção de dados
**Resultado obtido** | Sucesso. O usuário conseguirá acessar os módulos diretamente ou por meio de pesquisa.

**Caso de Teste** | **CT10 - Perfil**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “editar” <br> 2) Clicar em alterar senha <br> 3) Preencher campo de formulário
**Requisitos associados** | RF-008; RF-010;
**Resultado esperado** | O usuário poderá alterar as informações pessoais e de segurança.  
**Dados de entrada** | Acesso via cliques <br> Inserção de dados
**Resultado obtido** | Sucesso. 


# Plano de Teste de Usabilidade

## Introdução 

O objetivo deste plano de testes de usabilidade é validar a experiência do usuário na plataforma MathTrack, garantindo que ela cumpra seu propósito de auxiliar no nivelamento matemático de forma intuitiva, fluida e acessível. Os testes verificarão a aderência da interface aos objetivos de reduzir a evasão acadêmica e promover o engajamento, conforme as especificações do projeto. A validação será realizada percorrendo os fluxos reais de navegação implementados no site, desde o acesso à página inicial até as funcionalidades de diagnóstico, estudo modular, interação comunitária e registro de conta. 

## Objetivos dos Testes 

Avaliar a Navegabilidade: Verificar se a estrutura de menus e botões direciona o usuário corretamente para as seções de Diagnóstico, Módulos, Fórum e Cadastro. 

Validar o Fluxo de Diagnóstico: Confirmar se o usuário consegue acessar e submeter o formulário de teste de nível sem impedimentos. 

Verificar a Acessibilidade do Conteúdo: Garantir que os módulos de ensino estão organizados e visíveis. 

Testar a Interação Social: Checar o acesso à área de Fórum para troca de conhecimentos. 

Validar o Registro de Usuário: Assegurar que o processo de criação de conta e acesso à área de membros funciona conforme a lógica do sistema. 

## Público-Alvo e Participantes 

Os testes serão conduzidos com participantes que representam os perfis reais descritos na documentação do projeto: 

Estudantes do Ensino Médio: Focados em revisão para vestibulares e uso via dispositivos móveis. 

Estudantes do Ensino Superior: Recém-ingressos em Computação/Exatas que necessitam preencher lacunas de base. 

Profissionais em Transição: Buscam atualização rápida e objetiva para o mercado de TI. 

Monitores: Interessados na organização das dúvidas e acompanhamento dos alunos. 

## Cenários de Teste de Usabilidade (Passo a Passo Detalhado) 

Abaixo estão descritos os cenários de teste, mapeando a jornada do usuário através das páginas reais do site. 

Cenário 1: Navegação Inicial e Compreensão da Proposta 

Objetivo: Avaliar se a página inicial comunica claramente o propósito da ferramenta e se os elementos de navegação funcionam de forma responsiva e rápida. Requisitos Verificados: Responsividade, Facilidade de Navegação, Clareza da Interface. 

Passo 1: O usuário acessa a URL principal da aplicação. 

Passo 2: O usuário deve visualizar o cabeçalho "MathTrack — Home" e a chamada principal "Prepare-se Para Seu Futuro: Seu Livro de Matemática Personalizado". 

Passo 3: O usuário realiza a rolagem (scroll) da página para identificar as seções principais disponíveis: Conteúdos, Nosso Fórum e Participe do Projeto. 

Passo 4: O usuário clica no botão "Saiba Mais" (vinculado à página /sobreoprojeto) para buscar informações institucionais. 

Critério de Sucesso: A página deve carregar rapidamente, adaptar-se à tela do dispositivo (mobile/desktop) e os textos devem ser legíveis, permitindo que o usuário entenda que se trata de uma plataforma de nivelamento. 

Cenário 2: Realização da Avaliação Diagnóstica 

Objetivo: Testar o fluxo de acesso e preenchimento do teste que define o nível de conhecimento do usuário. Requisitos Verificados: Avaliação de Nível, Envio de Formulário, Interface Intuitiva. 

Passo 1: Na página inicial (Home), o usuário localiza e clica no botão destacado "Fazer o teste". 

Passo 2: O sistema deve redirecionar o usuário para a página de formulário. 

Passo 3: O usuário interage com os campos apresentados para responder às questões de diagnóstico. 

Passo 4: O usuário finaliza o preenchimento e busca a opção de submissão/envio das respostas. 

Critério de Sucesso: O botão de ação deve ser visível, os campos devem permitir a entrada de dados e o usuário não deve encontrar erros de validação impeditivos ao tentar enviar suas respostas. 

Cenário 3: Acesso aos Conteúdos e Módulos de Estudo 

Objetivo: Verificar a facilidade de encontrar e acessar os materiais didáticos organizados por módulos. Requisitos Verificados: Modularização dos Tópicos, Trilha de Aprendizagem, Links para Referências. 

Passo 1: A partir da página inicial, o usuário navega até a seção identificada como "Conteúdos". 

Passo 2: O usuário lê a descrição sobre "aprender no seu ritmo" e clica no botão "Learn more" (ou "Saiba Mais") associado a esta seção. 

Passo 3: O sistema redireciona para a página de módulos. 

Passo 4: O usuário deve visualizar a lista de tópicos ou módulos interativos disponíveis para estudo. 

Critério de Sucesso: A transição entre a Home e a página de Módulos deve ser fluida. A organização visual deve permitir que o aluno identifique claramente os diferentes tópicos de matemática disponíveis. 

Cenário 4: Interação e Colaboração no Fórum 

Objetivo: Avaliar o acesso à área comunitária destinada à retirada de dúvidas e interação entre estudantes e monitores. Requisitos Verificados: Fórum Online, Interação entre Usuários, Ferramenta de Busca (se disponível na interface). 

Passo 1: Na página inicial, o usuário localiza a seção "Nosso Fórum". 

Passo 2: O usuário clica no botão de acesso "Learn more" correspondente a esta seção. 

Passo 3: O sistema carrega a página dedicada ao fórum. 

Passo 4: O usuário verifica a visualização das discussões ou a interface para postagem de dúvidas. 

Critério de Sucesso: O usuário deve compreender que entrou em um ambiente colaborativo. A interface deve deixar claro como visualizar ou iniciar interações. 

Cenário 5: Área de Membros e Cadastro 

Objetivo: Testar a funcionalidade técnica de registro de novos usuários e o acesso à área restrita da plataforma. Requisitos Verificados: Cadastro/Login, Segurança dos Dados, Criação de Conta. 

Passo 1: O usuário navega até a seção "Participe do Projeto" na página inicial. 

Passo 2: O usuário clica no botão "Learn more" para iniciar o processo de registro. 

Passo 3: O sistema direciona para a página de criação de conta. 

Passo 4: O usuário visualiza os campos necessários para o registro (nome, e-mail, senha) e simula o preenchimento. 

Passo 5: O usuário aciona o comando para finalizar a criação da conta. 

Critério de Sucesso: O formulário de cadastro deve ser claro e objetivo. O sistema deve processar a solicitação ou fornecer feedback visual ao usuário, garantindo que ele entenda que o acesso aos recursos exclusivos (como salvar progresso) depende desta etapa. 

## Registro e Análise dos Resultados 

Após a conclusão dos cenários por todos os participantes, os dados serão consolidados em um relatório descritivo contendo: 

Taxa de Sucesso por Tarefa: Porcentagem de usuários que completaram cada cenário sem ajuda. 

Tempo Médio de Execução: Tempo gasto em cada fluxo (ex: tempo entre clicar em "Fazer o teste" e submeter o formulário). 

Problemas Identificados: Descrição narrativa de quaisquer obstáculos, links quebrados ou confusões mentais relatadas pelos usuários durante a navegação. 

Sugestões de Otimização: Recomendações baseadas nas observações para refinar a interface, como ajustes no tamanho das fontes, cores dos botões ou clareza dos textos instrucionais. 

## Conclusão 

A execução deste plano de testes garantirá que a plataforma MathTrack esteja alinhada com as necessidades reais de seus usuários. Ao validar cada passo — do diagnóstico ao estudo e interação — asseguramos que a tecnologia atue como uma facilitadora no processo de aprendizagem, contribuindo diretamente para a diminuição da evasão nos cursos de exatas e tecnologia. 


 

# Plano de teste dos requisitos não-funcionais

## Responsividade

**Objetivo**: O sistema deve ser intuitivo, fácil navegabilidade e compatível com dispositivos móveis, tablets e desktops. 
**Funcionalidade avaliada**: responsividade em diferentes dispositivos e fácil navegação. 
**Grupo de usuários**: Todos os usuários. 
**Requisitos**: RNF-001, RNF-002, RNF-003, RNF-004, RNF-006, RNF-007, RNF-008.

## Dados 

**Objetivo**: O sistema deve ser capaz de armanezar dados fornecidos pelo usuário na sua interação com a interface.
**Funcionalidade avaliada**: armazenamento de dados.
**Grupo de usuários**: Todos os usuários. 
**Requisitos**: RNF-005, RNF-007, RNF-009, RNF-010 e RNF-012.

## Direitos autorais 
**Objetivo**: O sistema deve respeitar a lei de direitos autorais.
**Funcionalidade avaliada**: proteção de direitos autorais.
**Grupo de Usuários**: Todos os usuários.
**Requisitos**: RNF-011.

# Registro de Teste de Software 

| **Caso de Teste** | CT01 - Criar conta|
|------------------|------------------------------------------------------------------------------------|
| **Requisitos Associados** | RF-01 - O sistema deve permitir que o usuário realize um cadastro/login na plataforma.	|
| **Objetivo do Teste** | Verificar se é possível realizar o cadastro e login do usuário de forma correta. <br> Verificar se é possível alterar as informações como nome, e-mail e senha. |
| **Passos** | 1. Testar, na tela de cadastro, se o sistema permite a criação de conta com sucesso. <br> 2. Testar, na tela de login, se o sistema permite o acesso apenas a contas previamente cadastradas. <br> |
| **Critérios de Êxito** | O usuário é criado com sucesso. <br> O usuário consegue alterar as informações do cadastro. |
| **Critérios de Não Êxito** | O usuário não consegue efetuar o cadastro e consequentemente o login. <br> As alterações na tela de edição de perfil não são efetuadas. |

https://github.com/user-attachments/assets/d4d2d033-0557-4627-b83d-1d71eba848a6



| **Caso de Teste** | CT02 e CT03 - Criar conta e Resultado|
|------------------|------------------------------------------------------------------------------------|
| **Requisitos Associados** | RF-02 - O sistema deve emitir um relatório de avaliação do nível que o usuário está em relação a matemática, indicando possíveis defasagens, pontos fortes e pontos que precisam de melhoria.		|
| **Objetivo do Teste** | Verificar se o usuário consegue acessar a página de teste, fazer o teste e obter o nível de conhecimento matemático |
| **Passos** | 1. Clicar em fazer teste. <br> 2. Clicar nos itens de formulário que indicam a resposta. <br> 3. Clicar em enviar teste|
| **Critérios de Êxito** | O usuário será direcionado para uma página que exibirá seu nível de conhecimento e poderá escolher seguir para trilha de aprendizado ou refazer o teste. |
| **Critérios de Não Êxito** | O usuário não consegue enviar as respotas. <br> O usuário não é direcionado para página que contém o nível do usuário. |

https://github.com/user-attachments/assets/9589a6ce-a717-4a9a-9187-6821954c2077


| **Caso de Teste** | CT04 - Trilha de Aprendizado|
|------------------|------------------------------------------------------------------------------------|
| **Requisitos Associados** | RF-009 - O sistema deve gerar uma trilha de aprendizagem personalizada com base nos resultados da avaliação do usuário.	 		|
| **Objetivo do Teste** | Verificar se o usuário consegue acessar a página de teste, fazer o teste e obter o nível de conhecimento matemático |
| **Passos** | 1) Clicar em “Módulo X” <br> 2) Exibir o estágio do usuário <br> 3) Clicar em “Continuar estudando” <br> 4) Clicar em post do fórum; <br> 5) Clicar em “Ver todos os fóruns”; <br> 6) Exibir “Desempenho: evolução dos estudos” <br> 7) Exibir em testes disponíveis e os que se encontram bloqueados.| 
| **Critérios de Êxito** | Direcionar  para “Módulo”; <br> Direcionar para o módulo que o usuário parou; <br> Direcionar para publicação do fórum; <br> Direcionar para página do fórum; <br> Exibir estágio atual do usuário <br> Exibir desempenho do usuário <br> Exibir testes feitos e aqueles que estão disponíveis|
| **Critérios de Não Êxito** | O usuário não é direcionado às páginas. <br> A página não exibe o desempenho dos usuários nem os teste feitos/disponíveis. |

https://github.com/user-attachments/assets/9a71ffe9-87da-49b0-8a8d-960326953fa6

| **Caso de Teste** | CT05 - Módulo|
|------------------|------------------------------------------------------------------------------------|
| **Requisitos Associados** | RF-004  - O sistema deve apresentar links externos contendo referências bibliográficas e/ou indicação de exercícios voltados aos pontos fracos destacados na avaliação. |
| **Objetivo do Teste** | 	Direcionar o usuário para página de teste do módulo ; <br> Exibir vídeo de link externo dentro da página. |
| **Passos** | liberar o acesso ao teste de módulo após o usuário assistir alguns segundos de vídeo e scrollar a tela <br> Clicar em "enviar resposta" <br> Mostrar resultado do teste|  
| **Critérios de Êxito** | Liberar o botão que irá direcionar para página de tste do módulo|
| **Critérios de Não Êxito** | O botão não é disponibilizado após o usuário clicar no vídeo e scrollar a página. <br> O usuário não é direcionado para página de teste do módulo. |

https://github.com/user-attachments/assets/9397775c-6b02-4489-87d5-4a8ccb6c88c5

| **Caso de Teste** | CT06, CT07 e CT09 - Testes do módulo, Resultados e Módulos |
|------------------|------------------------------------------------------------------------------------|
| **Requisitos Associados** | RF-010  - O sistema deve prover uma ferramenta de busca que permita ao usuário encontrar conteúdos específicos por palavra-chave.	. |
| **Objetivo do Teste** | 	Exibir os módulos da página ; <br> realizar pesquisa por palavras-chaves dos conteúdos. |
| **Passos** | 1) Clicar em “Acessar módulo” <br> Preencher campo de formulário <br> Clicar em ”buscar” <br> 	Clicar em “Voltar para trilha” <br> Clicar em “Refazer o teste”|  
| **Critérios de Êxito** | Acessar o módulo <br> Encontrar objeto da pesquisa <br> Mostrar o resultado após o usuário realizar os testes|
| **Critérios de Não Êxito** | O usuário não consegue realizar pesquisa. <br> O usuário não visualiza os módulos <br> O usuário não consegue ver o resultado do teste. |

 https://github.com/user-attachments/assets/4dcd40ef-db4d-4e90-a9da-768eefed1e57

 | **Caso de Teste** | CT9 - Fórum |
|------------------|------------------------------------------------------------------------------------|
| **Requisitos Associados** | RF-005 - O sistema deve permitir ao usuário participar de fóruns online sobre assuntos pontuais voltados à matemática, permitindo interação com outros usuários.		. |
| **Objetivo do Teste** | 	O usuário deve ser capaz de criar um novo tópico, adicionando um título, associando o tópico a um conteúdo, e escrever o conteúdo principal. Ao clicar em “Publicar”, o tópico ficará disponível para outros usuários. . |
| **Passos** | 	1) Clicar em “Novo Tópico” <br> Clicar em “Salvar” <br> Clicar em “Home” <br> Clicar em “Seus tópicos” <br> Clicar em “Álgebra” <br> Clicar em “Cálculo I” <br> Clicar em “Estruturas lógicas" <br> Clicar em “Curtir” <br> Clicar em “Salvar” <br> Clicar em “Editar” <br> Clicar em “Excluir" <br> Clicar em “Publicar” <br> Clicar em “Cancelar”|  
| **Critérios de Êxito** | O usuário consegue acessar o fórum e suas funcionalidades|
| **Critérios de Não Êxito** | O usuário não consegue fazer publicações, editar, curtir ou excluir a publicação |

https://github.com/user-attachments/assets/ba7eb34a-1760-4617-8e1c-1f0196f8ef5b

# Teste de Usabilidade 

| Cenário de Teste | Participante (Perfil) | Tempo para Completar (min) | Número de Erros | Feedback Qualitativo | Observações |
|------------------|------------------------|-----------------------------|------------------|-----------------------|-------------|
| **Cenário 1: Navegação Inicial e Compreensão** | Estudante do Ensino Médio | 1 | 0 | “O visual é muito moderno e carregou instantaneamente no meu celular. Entendi fácil onde clicar.” | Nenhuma alteração necessária. |
| **Cenário 2: Realização da Avaliação Diagnóstica** | Estudante Universitário | 8 | 0 | “O teste fluiu muito bem. As questões apareceram na ordem certa e o envio foi imediato.” | Nenhuma alteração necessária. |
| **Cenário 3: Acesso aos Módulos de Estudo** | Profissional em Transição | 3 | 0 | “Encontrei o tópico de ‘Matemática Básica’ rapidamente. A organização dos conteúdos é excelente.” | Nenhuma alteração necessária. |
| **Cenário 4: Interação no Fórum** | Monitor | 4 | 1 | “A página do fórum é boa, mas a barra de busca demorou um pouco para filtrar o assunto que eu digitei.” | Otimizar a velocidade de resposta da ferramenta de busca (RF-10). |
| **Cenário 5: Cadastro e Acesso à Área de Membros** | Estudante do Ensino Médio | 2 | 1 | “Preenchi os dados e cliquei em cadastrar, mas a tela não mudou logo para ‘Minha Conta’, fiquei na dúvida se tinha ido.” | Adicionar um feedback visual de carregamento (loading spinner) ou redirecionamento mais ágil após o clique. |




