# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

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

**Caso de Teste** | **CT10 - Forum/Comunidade**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Novo Tópico” <br> 2) Clicar em “Salvar” <br> 3) Clicar em “Home” <br> 4) Clicar em “Seus tópicos” <br> 5) Clicar em “Álgebra” <br> 6) Clicar em “Cálculo I” <br> 7) Clicar em “Estruturas lógicas" <br> 7) Clicar em “Curtir” <br> 8) Clicar em “Salvar” <br> 9) Clicar em “Editar” <br> 10) Clicar em “Excluir" <br> 11) Clicar em “Publicar” <br> 12) Clicar em “Cancelar”
**Requisitos associados** | RF-005
**Resultado esperado** | O usuário deve ser capaz de criar um novo tópico, adicionando um título, associando o tópico a um conteúdo, e escrever o conteúdo principal. Ao clicar em “Publicar”, o tópico ficará disponível para outros usuários. 
**Dados de entrada** | Acesso via cliques
**Resultado obtido** | Sucesso. O usuário irá fazer uma publicação e/ou acessar outras que estejam disponíveis. 

**Caso de Teste** | **CT11 - Módulos**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “Acessar módulo” <br> 2) Clicar em “Revisar módulo” <br> 3) Preencher campo de formulário <br> 4) Clicar em ”buscar”
**Requisitos associados** | RF-008; RF-010;
**Resultado esperado** | O usuário poderá realizar buscas do conteúdo por meio de palavras-chaves e acessar os módulos. 
**Dados de entrada** | Acesso via cliques <br> Inserção de dados
**Resultado obtido** | Sucesso. O usuário conseguirá acessar os módulos diretamente ou por meio de pesquisa.

**Caso de Teste** | **CT12 - Perfil**
 :--------------: | ------------
**Procedimento**  | 1) Clicar em “editar” <br> 2) Clicar em alterar senha <br> 3) Preencher campo de formulário
**Requisitos associados** | RF-008; RF-010;
**Resultado esperado** | O usuário poderá alterar as informações pessoais e de segurança.  
**Dados de entrada** | Acesso via cliques <br> Inserção de dados
**Resultado obtido** | Sucesso. 

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - Criar conta parte 1*                                         |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/u/s!AhD2JqpOUvJChapRtRSQ9vPzbNLwGA?e=mxZs6t| 

|*Caso de Teste*                                 |*CT02 - Criar conta parte 2*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/v/s!AhD2JqpOUvJChapQ8CPXL-TI_A7iVg?e=spD3Ar | 


## Avaliação dos Testes de Software

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando. |
| 2             | Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2: Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 113 segundos — média usuários — contra 25 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.



