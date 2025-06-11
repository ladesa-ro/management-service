using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma Disciplina. */
model DisciplinaView {
  ...OmitProperties<Disciplina, "imagemCapa">;
  imagemCapa: ImagemFindOneResultView | null;
}

/** Dados de entrada para encontrar uma Disciplina por ID. */
model DisciplinaFindOneInputView {
  id: Disciplina.id;
}

/** Visão FindOne de uma Disciplina. */
model DisciplinaFindOneResultView {
  //
  ...PickProperties<DisciplinaView, "id">;

  ...PickProperties<DisciplinaView, "nome">;
  ...PickProperties<DisciplinaView, "nomeAbreviado">;
  ...PickProperties<DisciplinaView, "cargaHoraria">;

  //
  ...PickProperties<DisciplinaView, "imagemCapa">;

  //
  ...PickProperties<
    DisciplinaView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma Disciplina. */
model DisciplinaInputCreateView {
  ...PickProperties<DisciplinaView, "nome">;
  ...PickProperties<DisciplinaView, "nomeAbreviado">;
  ...PickProperties<DisciplinaView, "cargaHoraria">;
}

/** Dados de entrada para a atualização de uma Disciplina. */
model DisciplinaInputUpdateView
  is OptionalProperties<DisciplinaInputCreateView>;

/** Resultados da busca a Disciplinas. */
model DisciplinaListResultView
  is Pagination.Result.View<DisciplinaFindOneResultView>;
