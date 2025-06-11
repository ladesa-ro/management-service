using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma Turma. */
model TurmaView {
  ...OmitProperties<Turma, "curso" | "ambientePadraoAula" | "imagemCapa">;
  curso: CursoFindOneResultView;
  ambientePadraoAula: AmbienteFindOneResultView | null;
  imagemCapa: ImagemFindOneResultView | null;
}

/** Dados de entrada para encontrar uma Turma por ID. */
model TurmaFindOneInputView {
  id: Turma.id;
}

/** Visão FindOne de uma Turma. */
model TurmaFindOneResultView {
  //
  ...PickProperties<TurmaView, "id">;

  ...PickProperties<TurmaView, "periodo">;

  //
  ...PickProperties<TurmaView, "curso" | "ambientePadraoAula" | "imagemCapa">;

  //
  ...PickProperties<TurmaView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de uma Turma. */
model TurmaInputCreateView {
  ...PickProperties<TurmaView, "periodo">;
  curso: CursoFindOneInputView;
  ambientePadraoAula: AmbienteFindOneInputView | null;
}

/** Dados de entrada para a atualização de uma Turma. */
model TurmaInputUpdateView is OptionalProperties<TurmaInputCreateView>;

/** Resultados da busca a Turmas. */
model TurmaListResultView is Pagination.Result.View<TurmaFindOneResultView>;
