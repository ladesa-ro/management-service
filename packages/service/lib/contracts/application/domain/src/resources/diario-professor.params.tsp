using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um DiarioProfessor. */
model DiarioProfessorView {
  ...OmitProperties<DiarioProfessor, "perfil" | "diario">;
  perfil: PerfilFindOneOutput;
  diario: DiarioFindOneOutput;
}

/** Dados de entrada para encontrar um DiarioProfessor por ID. */
model DiarioProfessorFindOneInput {
  id: DiarioProfessor.id;
}

/** Visão FindOne de um DiarioProfessor. */
model DiarioProfessorFindOneOutput {
  ...PickProperties<DiarioProfessorView, "id">;
  ...PickProperties<DiarioProfessorView, "situacao">;
  ...PickProperties<DiarioProfessorView, "perfil" | "diario">;
  ...PickProperties<
    DiarioProfessorView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um DiarioProfessor. */
model DiarioProfessorCreateInput {
  situacao: boolean;
  perfil: PerfilFindOneInput;
  diario: DiarioFindOneInput;
}

/** Dados de entrada para a atualização de um DiarioProfessor. */
model DiarioProfessorUpdateInput
  is OptionalProperties<DiarioProfessorCreateInput>;

model DiarioProfessorListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a DiarioProfessor. */
model DiarioProfessorListOutput
  is Pagination.Output.View<DiarioProfessorFindOneOutput>;
