using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Visão completa de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeView {
  ...OmitProperties<ProfessorDisponibilidade, "disponibilidade" | "perfil">;
  disponibilidade: DisponibilidadeFindOneOutput;
  perfil: PerfilFindOneOutput;
}

/** Dados de entrada para encontrar uma ProfessorDisponibilidade por ID. */
model ProfessorDisponibilidadeFindOneInput {
  id: ProfessorDisponibilidade.id;
}

/** Visão FindOne de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeFindOneOutput {
  ...PickProperties<ProfessorDisponibilidadeView, "id">;
  ...PickProperties<ProfessorDisponibilidadeView, "disponibilidade" | "perfil">;
  ...PickProperties<
    ProfessorDisponibilidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeCreateInput {
  disponibilidade: DisponibilidadeFindOneInput;
  perfil: PerfilFindOneInput;
}

/** Dados de entrada para a atualização de uma ProfessorDisponibilidade. */
model ProfessorDisponibilidadeUpdateInput
  is OptionalProperties<ProfessorDisponibilidadeCreateInput>;

model ProfessorDisponibilidadeListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a ProfessorDisponibilidades. */
model ProfessorDisponibilidadeListOutput
  is Pagination.Output.View<ProfessorDisponibilidadeFindOneOutput>;
