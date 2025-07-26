using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma Disciplina. */
model DisciplinaView {
  ...OmitProperties<Disciplina, "imagemCapa">;
  imagemCapa: ImagemFindOneOutput | null;
}

/** Dados de entrada para encontrar uma Disciplina por ID. */
model DisciplinaFindOneInput {
  id: Disciplina.id;
}

/** Visão FindOne de uma Disciplina. */
model DisciplinaFindOneOutput {
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
model DisciplinaCreateInput {
  ...PickProperties<DisciplinaView, "nome">;
  ...PickProperties<DisciplinaView, "nomeAbreviado">;
  ...PickProperties<DisciplinaView, "cargaHoraria">;
}

/** Dados de entrada para a atualização de uma Disciplina. */
model DisciplinaUpdateInput is OptionalProperties<DisciplinaCreateInput>;

model DisciplinaListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a Disciplinas. */
model DisciplinaListOutput is Pagination.Output.View<DisciplinaFindOneOutput>;
