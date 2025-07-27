using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma Turma. */
model TurmaView {
  ...OmitProperties<Turma, "curso" | "ambientePadraoAula" | "imagemCapa">;
  curso: CursoFindOneOutput;
  ambientePadraoAula: AmbienteFindOneOutput | null;
  imagemCapa: ImagemFindOneOutput | null;
}

/** Dados de entrada para encontrar uma Turma por ID. */
model TurmaFindOneInput {
  id: Turma.id;
}

/** Visão FindOne de uma Turma. */
model TurmaFindOneOutput {
  //
  ...PickProperties<TurmaView, "id">;

  ...PickProperties<TurmaView, "periodo">;

  //
  ...PickProperties<TurmaView, "curso" | "ambientePadraoAula" | "imagemCapa">;

  //
  ...PickProperties<TurmaView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de uma Turma. */
model TurmaCreateInput {
  ...PickProperties<TurmaView, "periodo">;
  curso: CursoFindOneInput;
  ambientePadraoAula: AmbienteFindOneInput | null;
}

/** Dados de entrada para a atualização de uma Turma. */
model TurmaUpdateInput is OptionalProperties<TurmaCreateInput>;

model TurmaListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a Turmas. */
model TurmaListOutput is Pagination.Output.View<TurmaFindOneOutput>;
