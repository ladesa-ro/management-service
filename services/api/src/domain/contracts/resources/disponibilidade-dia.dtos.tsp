using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um DisponibilidadeDia. */
model DisponibilidadeDiaView {
  ...OmitProperties<DisponibilidadeDia, "intervaloDeTempo" | "disponibilidade">;
  intervaloDeTempo: IntervaloDeTempoFindOneOutput;
  disponibilidade: DisponibilidadeFindOneOutput;
}

/** Dados de entrada para encontrar um DisponibilidadeDia por ID. */
model DisponibilidadeDiaFindOneInput {
  id: DisponibilidadeDia.id;
}

/** Visão FindOne de um DisponibilidadeDia. */
model DisponibilidadeDiaFindOneOutput {
  ...PickProperties<DisponibilidadeDiaView, "id">;
  ...PickProperties<DisponibilidadeDiaView, "rrule">;
  ...PickProperties<
    DisponibilidadeDiaView,
    "intervaloDeTempo" | "disponibilidade"
  >;
  ...PickProperties<
    DisponibilidadeDiaView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um DisponibilidadeDia. */
model DisponibilidadeDiaCreateInput {
  rrule: DisponibilidadeDia.rrule;
  intervaloDeTempo: IntervaloDeTempoInput;
  disponibilidade: DisponibilidadeFindOneInput;
}

/** Dados de entrada para a atualização de um DisponibilidadeDia. */
model DisponibilidadeDiaUpdateInput
  is OptionalProperties<DisponibilidadeDiaCreateInput>;

/** Resultados da busca a DisponibilidadeDia. */
model DisponibilidadeDiaListOutput
  is Pagination.Result.View<DisponibilidadeDiaFindOneOutput>;
