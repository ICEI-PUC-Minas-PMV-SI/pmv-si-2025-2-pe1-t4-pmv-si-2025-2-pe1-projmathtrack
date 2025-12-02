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

**Caso de Teste** | **CT02 - Criar conta parte 2**
 :--------------: | ------------
**Procedimento**  | Clicar em “Fazer Teste”  
**Requisitos associados** | RF-002
**Resultado esperado** | Direcionar o usuário para página de teste 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário poderá fazer o teste. 

**Caso de Teste** | **CT03 - Teste de Nivelamento**
 :--------------: | ------------
**Procedimento**  | Responder as perguntas do teste de nivelamento 
**Requisitos associados** | RF-002
**Resultado esperado** | Direcionar o usuário para página de resultados ao finalizar o teste. 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página de “resultados” 

**Caso de Teste** | **CT04 - Resultados**
 :--------------: | ------------
**Procedimento**  | 1) Mostrar o resultado  <br> 2) Clicar em “Ir para a trilha de aprendizado” <br> 3) Clicar em “refazer teste”
**Requisitos associados** | RF-002
**Resultado esperado** | Prosseguir para trilha de aprendizado ou refazer o teste. 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página que clicou. 

**Caso de Teste** | **CT05 - Trilha de Aprendizado**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Módulo X” <br> 2) Exibir o estágio do usuário <br> 3) Clicar em “Continuar estudando”  <br> 4) Clicar em post do fórum; <br> 5) Clicar em “Ver todos os fóruns”; <br> 6) Exibir “Desempenho: evolução dos estudos” <br> 7) Exibir em testes disponíveis e os que se encontram bloqueados. 
**Requisitos associados** | RF-007
**Resultado esperado** | Direiconar para “Módulo”; <br> Direcionar para o módulo que o usuário parou; <br> Direcionar para publicação do fórum; <br> Direcionar para página do fórum;  
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página que clicou. 

**Caso de Teste** | **CT06 - Módulo**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Fazer teste do módulo” <br> 2) Clicar em vídeo 
**Requisitos associados** | RF-004
**Resultado esperado** | Direcionar o usuário para página de teste do módulo ; <br> Exibir vídeo de link externo dentro da página.  
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página “Testes do módulo”.

**Caso de Teste** | **CT07 - Teste do módulo**
 :--------------: | ------------
**Procedimento**  | 1) Clicar na opção desejada. <br> 2) Clicar em “enviar respostas” <br> 3) Clicar em “voltar”
**Requisitos associados** | RF-004
**Resultado esperado** | Direcionar o usuário para página contendo o resultado do teset <br> Direcionar o usuário para página “Módulo  
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário será direcionado para página “Testes do módulo”.

**Caso de Teste** | **CT08 - Teste do módulo-Resultado**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Voltar para trilha” <br> 2) Clicar em “Refazer o teste”
**Requisitos associados** | RF-004
**Resultado esperado** | Exibir o resultado do teste. Caso o usuário tenha acertado acima de 60%, o usuário poderá clicar em “Voltar para trilha de aprendizado”. Se o usuário obter uma pontuação inferior a 60%, deverá refazer o teste ou “Voltara para Trilha” 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário poderá escolher qual página seguir com base no resultado do teste. 

**Caso de Teste** | **CT09 - Forum/Comunidade**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Novo Tópico” <br> 2) Clicar em “Salvar” <br> 3) Clicar em “Home” <br> 4) Clicar em “Seus tópicos” <br> 5) Clicar em “Álgebra” <br> 6) Clicar em “Cálculo I” <br> 7) Clicar em “Estruturas lógicas" <br> 7) Clicar em “Curtir” <br> 8) Clicar em “Salvar” <br> 9) Clicar em “Editar” <br> 10) Clicar em “Excluir" <br> 11) Clicar em “Publicar” <br> 12) Clicar em “Cancelar”
**Requisitos associados** | RF-005
**Resultado esperado** | O usuário deve ser capaz de criar um novo tópico, adicionando um título, associando o tópico a um conteúdo, e escrever o conteúdo principal. Ao clicar em “Publicar”, o tópico ficará disponível para outros usuários. 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário irá fazer uma publicação e/ou acessar outras que estejam disponíveis. 


**Caso de Teste** | **CT10 - Módulos**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Acessar módulo” <br> 2) Clicar em “Revisar módulo” <br> 3) Preencher campo de formulário <br> 4) Clicar em ”buscar”
**Requisitos associados** | RF-008; RF-010;
**Resultado esperado** | O usuário poderá realizar buscas do conteúdo por meio de palavras-chaves e acessar os módulos. 
**Dados de entrada** | Acesso via cliques <br> Inserção de dados
**Resultado obtido** | Sucesso. O usuário conseguirá acessar os módulos diretamente ou por meio de pesquisa.

**Caso de Teste** | **CT11 - Perfil**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “editar” <br> 2) Clicar em alterar senha <br> 3) Preencher campo de formulário
**Requisitos associados** | RF-008; RF-010;
**Resultado esperado** | O usuário poderá alterar as informações pessoais e de segurança.  
**Dados de entrada** | Acesso via cliques <br> Inserção de dados
**Resultado obtido** | Sucesso. 


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



