# Especificações do Projeto

## Perfis de Usuário 

## Perfil: Estudantes do Ensino Médio

| **Descrição** | Um estudante do ensino médio em preparação para exames que envolva matemática e busca recursos que o ajudem a revisar e fixar os conteúdos. |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| **Necessidades** | - Identificar quais conteúdos precisa reforçar para ter melhor desempenho nas provas e exames.<br> - Resolver exercícios com correção automática.<br> - Medir sua evolução ao longo do tempo, identificando quais tópicos domina e quais precisa revisar.<br> - Ter uma plataforma de fácil acesso (computador ou celular) e que seja confiável, interativa e motivadora. |

---

## Perfil: Estudantes do Ensino Superior

| **Descrição** | Estudante do ensino superior recém-ingresso em um curso da área de Computação. Apesar de ter concluído o ensino médio, sente que possui lacunas na base matemática o que prejudica seu desempenho nas disciplinas iniciais da graduação. É motivado, busca melhorar e valoriza ferramentas que facilitem o aprendizado de forma prática e personalizada. |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Necessidades** | - Identificar seu nível de conhecimento em matemática e quais tópicos precisa revisar.<br> - Ter acesso a conteúdo didático objetivo e de fácil compreensão, com exemplos práticos e exercícios interativos.<br> - Realizar testes de forma recorrente para acompanhar sua evolução.<br> - Estudar de forma autônoma, mas com feedback imediato sobre acertos e erros. |

---

## Perfil: Monitor

| **Descrição** | Responsável por ajudar estudantes nas disciplinas da Universidade. |
|---------------|--------------------------------------------------------------------|
| **Necessidades** | - Utilizar uma plataforma que centralize as dúvidas dos alunos e permita responder de forma rápida e organizada, e que registre a interação com os alunos.<br> - Acompanhar o progresso dos alunos para identificar quais tópicos precisam ser reforçados em plantões de dúvidas.<br> - Ambiente para indicar listas de exercícios, livros e outros materiais. |

---

## Perfil: Profissional em Transição de Carreira

| **Descrição** | Profissional formado em alguma área de conhecimento. Após alguns anos no mercado de trabalho, decidiu realizar uma transição de carreira para a área de computação. Percebe nos seus estudos que a falta de familiaridade e prática com conteúdo matemático dificulta seu aprendizado em cursos de programação. Deseja se atualizar para acompanhar as demandas do mercado e conquistar melhores oportunidades de emprego. |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Necessidades** | - Realizar um diagnóstico inicial que mostre em quais tópicos matemáticos revisar.<br> - Ter acesso a um plano de estudos objetivo, com conteúdos práticos e recomendações de materiais.<br> - Receber feedback imediato sobre seu desempenho para corrigir erros rapidamente.<br> - Estudar de forma flexível, conciliando aprendizado com rotina de trabalho.<br> - Garantir que está adquirindo a base matemática necessária para se sentir seguro em cursos de programação, análise de dados ou áreas correlatas. |



## Histórias de Usuários

Com base na análise  nos perfis de usuários foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Estudante do Ensino Médio.  | Eu quero identificar os tópicos em que tenho mais dificuldade em matemática e acessar materiais explicativos adaptados, mesmo utilizando apenas meu celular e sem precisar de conhecimentos avançados em tecnologia.          | Para que eu possa estudá-los de forma direcionada e melhorar meu desempenho escolar. |
|Estudante do Ensino Superior.       | Eu quero melhorar meus conhecimentos em matemática e acompanhar minha evolução em tempo real, mesmo que eu tenha pouco tempo disponível para estudar e precise de uma interface intuitiva que facilite o aprendizado. | Para acompanhar o ritmo da turma e obter aprovação nas disciplinas que exigem base matemática.|
|Monitor. |Eu quero utilizar uma plataforma com comunicação imediata, mesmo quando o atendimento ocorrer de forma remota ou assíncrona. | Para auxiliar individualmente ou em grupo os estudantes com dúvidas em matemática, registrar essas interações e acompanhar o progresso dos usuários.|
|Profissional em transição de carreira. | Eu quero praticar e atualizar meus conhecimentos em matemática por meio de exercícios práticos e feedbacks automáticos, mesmo conciliando meus estudos com uma rotina de tempo reduzido e precisando de recursos acessíveis em qualquer dispositivo.| Para me manter competitivo no mercado e conquistar novas oportunidades de trabalho. |


## Requisitos


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

