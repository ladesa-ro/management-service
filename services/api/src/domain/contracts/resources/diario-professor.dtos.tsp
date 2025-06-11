using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um DiarioProfessor. */
model DiarioProfessorView {
  ...OmitProperties<DiarioProfessor, "perfil" | "diario">;
  perfil: PerfilFindOneResultView;
  diario: DiarioFindOneResultView;
}

/** Dados de entrada para encontrar um DiarioProfessor por ID. */
model DiarioProfessorFindOneInputView {
  id: DiarioProfessor.id;
}

/** Visão FindOne de um DiarioProfessor. */
model DiarioProfessorFindOneResultView {
  ...PickProperties<DiarioProfessorView, "id">;
  ...PickProperties<DiarioProfessorView, "situacao">;
  ...PickProperties<DiarioProfessorView, "perfil" | "diario">;
  ...PickProperties<
    DiarioProfessorView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um DiarioProfessor. */
model DiarioProfessorInputCreateView {
  situacao: boolean;
  perfil: PerfilFindOneInputView;
  diario: DiarioFindOneInputView;
}

/** Dados de entrada para a atualização de um DiarioProfessor. */
model DiarioProfessorInputUpdateView
  is OptionalProperties<DiarioProfessorInputCreateView>;

/** Resultados da busca a DiarioProfessor. */
model DiarioProfessorListResultView
  is Pagination.Result.View<DiarioProfessorFindOneResultView>;
