using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um Curso. */
model CursoView {
  ...OmitProperties<Curso, "campus" | "ofertaFormacao" | "imagemCapa">;
  campus: CampusFindOneResultView;
  ofertaFormacao: OfertaFormacaoFindOneResultView;
  imagemCapa: ImagemFindOneResultView | null;
}

/** Dados de entrada para encontrar um Curso por ID. */
model CursoFindOneInputView {
  id: Curso.id;
}

/** Visão FindOne de um Curso. */
model CursoFindOneResultView {
  //
  ...PickProperties<CursoView, "id">;

  ...PickProperties<CursoView, "nome" | "nomeAbreviado">;

  //
  ...PickProperties<CursoView, "campus" | "ofertaFormacao" | "imagemCapa">;

  //
  ...PickProperties<CursoView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de um Curso. */
model CursoInputCreateView {
  ...PickProperties<CursoView, "nome" | "nomeAbreviado">;
  campus: CampusFindOneInputView;
  ofertaFormacao: OfertaFormacaoFindOneInputView;
}

/** Dados de entrada para a atualização de um Curso. */
model CursoInputUpdateView is OptionalProperties<CursoInputCreateView>;

/** Resultados da busca a Cursos. */
model CursoListResultView is Pagination.Result.View<CursoFindOneResultView>;
