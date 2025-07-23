using Ladesa.ManagementService.Domain.Generics;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma Aula. */
model AulaView {
  ...OmitProperties<Aula, "intervaloDeTempo" | "diario" | "ambiente">;
  intervaloDeTempo: IntervaloDeTempoFindOneOutput;
  diario: DiarioFindOneOutput;
  ambiente: AmbienteFindOneOutput | null;
}

/** Dados de entrada para encontrar uma Aula por ID. */
model AulaFindOneInput {
  id: Aula.id;
}

/** Visão FindOne de uma Aula. */
model AulaFindOneOutput {
  ...PickProperties<AulaView, "id">;
  ...PickProperties<AulaView, "data" | "modalidade">;
  ...PickProperties<AulaView, "intervaloDeTempo" | "diario" | "ambiente">;
  ...PickProperties<AulaView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de uma Aula. */
model AulaCreateInput {
  data: date;
  modalidade: string | null;
  intervaloDeTempo: IntervaloDeTempoInput;
  diario: DiarioFindOneInput;
  ambiente: AmbienteFindOneInput | null;
}

/** Dados de entrada para a atualização de uma Aula. */
model AulaUpdateInput is OptionalProperties<AulaCreateInput>;

/** Dados de entrada para a da busca a Aulas. */
model AulaListInput {
  ...Pagination.Input.View;
  sortBy?: Pagination.Input.SortConstraints<"dateCreated">;
  `filter.id`: Pagination.Input.Filters.eq[];
}

/** Resultados da busca a Aulas. */
model AulaListOutput is Pagination.Output.View<AulaFindOneOutput>;
