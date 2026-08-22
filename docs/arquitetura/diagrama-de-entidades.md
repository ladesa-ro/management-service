# Diagrama de entidades

**TLDR**: entidades principais e seus relacionamentos, baseado nas entidades TypeORM reais em `src/modules/*/infrastructure.database/typeorm/`.

```mermaid
erDiagram
    Estado ||--o{ Cidade : "contem"
    Cidade ||--o{ Endereco : "localiza"
    Endereco ||--o{ Campus : "endereca"
    Campus ||--o{ Bloco : "contem"
    Bloco ||--o{ Ambiente : "contem"
    Campus ||--o{ Perfil : "vincula"
    Usuario ||--o{ Perfil : "possui"
    Usuario ||--o{ Notificacao : "recebe"

    Modalidade ||--o{ OfertaFormacao : "define tipo"
    OfertaFormacao ||--o{ OfertaFormacaoNivelFormacao : "associa"
    NivelFormacao ||--o{ OfertaFormacaoNivelFormacao : "associa"
    OfertaFormacao ||--o{ OfertaFormacaoPeriodo : "contem periodos"
    OfertaFormacaoPeriodo ||--o{ OfertaFormacaoPeriodoEtapa : "contem etapas"

    Curso ||--o{ Turma : "oferece"
    Ambiente }o--o| Turma : "ambiente padrao"
    Turma ||--o{ Diario : "possui"
    Disciplina ||--o{ Diario : "vincula"
    CalendarioLetivo ||--o{ Diario : "vincula"
    Diario ||--o{ DiarioProfessor : "associa professores"
    Usuario ||--o{ DiarioProfessor : "leciona"
    Diario ||--o{ DiarioPreferenciaAgrupamento : "configura"

    HorarioAulaConfiguracao ||--o{ HorarioAula : "define"
    Turma ||--o{ TurmaDisponibilidadeConfiguracao : "configura"

    Empresa ||--o{ ResponsavelEmpresa : "possui"
    Empresa ||--o{ Estagio : "oferece"
    Estagiario ||--o{ Estagio : "participa"
    Estagio ||--o{ HorarioEstagio : "define horarios"

    Imagem ||--o{ ImagemArquivo : "variacoes"
    Arquivo ||--o{ ImagemArquivo : "armazena"
```

Entidade de agendamento de calendário (`calendario-agendamento-*`) e de geração de horário (`gerar-horario-*`) têm tabela junction adicional não representada aqui, pra manter a legibilidade do diagrama.
