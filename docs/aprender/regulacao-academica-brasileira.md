# Regulação acadêmica brasileira

**TLDR**: parte do que parece preferência de coordenação em calendário e carga horária — geminada, intervalo, limite diário, reposição — pode já estar escrita em norma federal, não em conhecimento tácito de quem monta horário. Esta página aponta onde procurar, sem afirmar o que já está implementado neste serviço — isso depende de ler também a Organização Didática da própria instituição, que esta página não substitui.

## LDB, a lei de base

A [Lei de Diretrizes e Bases da Educação Nacional, Lei nº 9.394/1996](http://www.planalto.gov.br/ccivil_03/leis/L9394.htm) é o marco legal geral da educação no Brasil, e é o ponto de partida antes de qualquer resolução específica: define dias letivos mínimos, carga horária mínima por etapa, e delega ao Conselho Nacional de Educação (CNE) o detalhamento por modalidade e nível.

## Resoluções do CNE/CES

O Conselho Nacional de Educação, Câmara de Educação Superior (CNE/CES), publica as resoluções que detalham carga horária mínima e procedimentos de integralização para cursos de graduação presenciais. Vale consultar o [portal de legislação do CNE](http://portal.mec.gov.br/cne) pela resolução vigente para a modalidade do curso antes de tratar qualquer regra de carga horária como preferência institucional — se estiver na resolução, é norma, não escolha de produto.

Duas categorias que a regulação trata como obrigação formal, não como conveniência de UX:

- **Carga horária mínima e integralização** — o modelo de dados deste serviço já tem `curso.cargaHoraria` e `disciplina.cargaHoraria`, o que sugere que o requisito regulatório influenciou o desenho original, mesmo sem estar documentado como tal em nenhum lugar do código.
- **Reposição de carga horária** — aula perdida por feriado, greve ou falta do professor tem regra própria de reposição no arcabouço do CNE, não é decisão livre de cada coordenação.

## Antes de desenhar regra pedagógica nova

Regras que parecem tácitas — quantas disciplinas diferentes uma turma aguenta por dia, se aula geminada é permitida, intervalo mínimo entre atividades — costumam já estar escritas no regulamento acadêmico da própria instituição (a Organização Didática, ou equivalente). Tratar isso como conhecimento a descobrir por entrevista, quando na verdade está documentado, transforma uma leitura de meia hora numa rodada de investigação inteira. Vale ler o regulamento interno antes de desenhar qualquer restrição pedagógica nova.

## O que esta página não é

Não é parecer jurídico, e não afirma que qualquer resolução citada aqui é a vigente ou a aplicável a um caso concreto — legislação educacional muda, e a leitura precisa ser confirmada contra o texto oficial atualizado e contra a norma interna da instituição no momento da decisão.
