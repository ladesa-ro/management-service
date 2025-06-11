using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um diário. */
model DiarioView {
  ...OmitProperties<
    Diario,

      | "calendarioLetivo"
      | "turma"
      | "disciplina"
      | "ambientePadrao"
      | "imagemCapa"
  >;
  calendarioLetivo: CalendarioLetivoFindOneResultView;
  turma: TurmaFindOneResultView;
  disciplina: DisciplinaFindOneResultView;
  ambientePadrao: AmbienteFindOneResultView | null;
  imagemCapa: ImagemFindOneResultView | null;
}

/** Dados de entrada para encontrar um diário por ID. */
model DiarioFindOneInputView {
  id: Diario.id;
}

/** Visão FindOne de um diário. */
model DiarioFindOneResultView {
  ...PickProperties<DiarioView, "id" | "ativo">;
  ...PickProperties<
    DiarioView,

      | "calendarioLetivo"
      | "turma"
      | "disciplina"
      | "ambientePadrao"
      | "imagemCapa"
  >;
  ...PickProperties<DiarioView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de um diário. */
model DiarioInputCreateView {
  ativo: boolean;
  calendarioLetivo: CalendarioLetivoFindOneInputView;
  turma: TurmaFindOneInputView;
  disciplina: DisciplinaFindOneInputView;
  ambientePadrao: AmbienteFindOneInputView | null;
}

/** Dados de entrada para a atualização de um diário. */
model DiarioInputUpdateView is OptionalProperties<DiarioInputCreateView>;

/** Resultados da busca a Diarios. */
model DiarioListResultView is Pagination.Result.View<DiarioFindOneResultView>;
