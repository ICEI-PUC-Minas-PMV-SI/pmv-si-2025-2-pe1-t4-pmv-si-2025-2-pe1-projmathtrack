# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | Registrar minhas tarefas           | Não esquecer de fazê-las               |
|Administrador       | Alterar permissões                 | Permitir que possam administrar contas |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| O sistema deve permitir que o usuário realize um cadastro/login na plataforma. | Média |  
|RF-002| O sistema deve emitir um relatório de avaliação do nível que o usuário está em relação a matemática, indicando possíveis defasagens, pontos fortes e pontos que precisam de melhoria.  | Alta | 
|RF-003|O sistema precisa emitir um gráfico com as oscilações de melhoria ou piora em relação ao teste feito anteriormente (histórico). | Médio |  
|RF-004| O sistema deve apresentar links externos contendo referências bibliográficas e/ou indicação de exercícios voltados aos pontos fracos destacados na avaliação.   | Alta | 
|RF-005| O sistema deve permitir ao usuário participar de fóruns online sobre assuntos pontuais voltados à matemática, permitindo interação com outros usuários. | Média |  
|RF-006| O sistema deve fornecer a resolução dos exercícios, com os resultados e apontando as questões acertadas e erradas pelo usuário.   | Alta | 
|RF-007| O sistema deve apresentar uma modularização dos tópicos para o usuário, a fim de facilitar sua navegação. | Alta |  
|RF-008| O sistema deve permitir que o usuário redefina sua senha.   | Média | 
|RF-009| O sistema deve gerar uma trilha de aprendizagem personalizada com base nos resultados da avaliação do usuário.   | Baixa | 
|RF-010| O sistema deve prover uma ferramenta de busca que permita ao usuário encontrar conteúdos específicos por palavra-chave.   | Alta | 
|RF-011| O sistema deve possuir um sistema de gamificação, concedendo medalhas e pontos ao usuário conforme ele completa atividades e atingir metas.   | Baixa | 
|RF-008| O sistema deve permitir que o usuário avalie e forneça feedback sobre os materiais de estudo e exercícios, para ajudar a curadoria de conteúdo da plataforma.  | Baixa | 





### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve funcionar de maneira rápida e responsiva.O sistema deve funcionar de maneira rápida e responsiva. | Alta | 
|RNF-002| O sistema deve ser fácil de navegar, com uma interface intuitiva. |  Alta | 
|RNF-003| O sistema deve ser compatível com dispositivos móveis, tablets e desktops, adaptando-se a diferentes tamanhos de tela. | Alta | 
|RNF-004| O sistema deve estar disponível 24 horas por dia, 7 dias por semana. |  Média | 
|RNF-005| O sistema deve armazenar os dados dos usuários, incluindo seu desempenho e progresso, devem ser armazenados de forma segura e privada.  | Alta | 
|RNF-006| O sistema deve ser compatível com os navegadores de internet mais utilizados. |  Alta | 
|RNF-007| O sistema deve ser escalável para suportar picos de acesso. | Média | 
|RNF-008| O sistema deve ser acessível para pessoas com deficiência visual (daltonismo). |  Média | 
|RNF-009| O sistema deve possuir rotinas de backup diárias e automáticas. | Média | 
|RNF-010| O sistema deve ser de fácil manutenção e bem documentado.|  Baixa | 
|RNF-011| O sistema deve respeitar as leis de direitos autorais em seu conteúdo educacional. |  Alta | 
|RNF-012| Os dados dos usuários devem ser íntegros e consistentes.|  Alta | 

