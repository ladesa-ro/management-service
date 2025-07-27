using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um Curso. */
model CursoView {
  ...OmitProperties<Curso, "campus" | "ofertaFormacao" | "imagemCapa">;
  campus: CampusFindOneOutput;
  ofertaFormacao: OfertaFormacaoFindOneOutput;
  imagemCapa: ImagemFindOneOutput | null;
}

/** Dados de entrada para encontrar um Curso por ID. */
model CursoFindOneInput {
  id: Curso.id;
}

/** Visão FindOne de um Curso. */
model CursoFindOneOutput {

  ...PickProperties<CursoView, "id">;

  ...PickProperties<CursoView, "nome" | "nomeAbreviado">;

  ...PickProperties<CursoView, "campus" | "ofertaFormacao" | "imagemCapa">;

  ...PickProperties<CursoView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de um Curso. */
model CursoCreateInput {
  ...PickProperties<CursoView, "nome" | "nomeAbreviado">;
  campus: CampusFindOneInput;
  ofertaFormacao: OfertaFormacaoFindOneInput;
}

/** Dados de entrada para a atualização de um Curso. */
model CursoUpdateInput is OptionalProperties<CursoCreateInput>;

/** Dados de entrada para a da busca a campi. */
model CursoListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a Cursos. */
model CursoListOutput is Pagination.Output.View<CursoFindOneOutput>;
