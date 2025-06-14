using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma TurmaDisponibilidade. */
model TurmaDisponibilidadeView {
  ...OmitProperties<TurmaDisponibilidade, "disponibilidade" | "turma">;
  disponibilidade: DisponibilidadeFindOneOutput;
  turma: TurmaFindOneOutput;
}

/** Dados de entrada para encontrar uma TurmaDisponibilidade por ID. */
model TurmaDisponibilidadeFindOneInput {
  id: TurmaDisponibilidade.id;
}

/** Visão FindOne de uma TurmaDisponibilidade. */
model TurmaDisponibilidadeFindOneOutput {
  ...PickProperties<TurmaDisponibilidadeView, "id">;
  ...PickProperties<TurmaDisponibilidadeView, "disponibilidade" | "turma">;
  ...PickProperties<
    TurmaDisponibilidadeView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de uma TurmaDisponibilidade. */
model TurmaDisponibilidadeCreateInput {
  disponibilidade: DisponibilidadeFindOneInput;
  turma: TurmaFindOneInput;
}

/** Dados de entrada para a atualização de uma TurmaDisponibilidade. */
model TurmaDisponibilidadeUpdateInput
  is OptionalProperties<TurmaDisponibilidadeCreateInput>;

model TurmaDisponibilidadeListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a TurmaDisponibilidades. */
model TurmaDisponibilidadeListOutput
  is Pagination.Output.View<TurmaDisponibilidadeFindOneOutput>;
