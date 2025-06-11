using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

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

/** Resultados da busca a Aulas. */
model AulaListOutput is Pagination.Result.View<AulaFindOneOutput>;
