using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de uma Etapa. */
model EtapaView {
  ...OmitProperties<Etapa, "calendario">;
  calendario: CalendarioLetivoFindOneOutput;
}

/** Dados de entrada para encontrar uma Etapa por ID. */
model EtapaFindOneInput {
  id: Etapa.id;
}

/** Visão FindOne de uma Etapa. */
model EtapaFindOneOutput {
  ...PickProperties<EtapaView, "id">;
  ...PickProperties<EtapaView, "numero" | "dataInicio" | "dataTermino" | "cor">;
  ...PickProperties<EtapaView, "calendario">;
  ...PickProperties<EtapaView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de uma Etapa. */
model EtapaCreateInput {
  numero: uint8 | null;
  dataInicio: date;
  dataTermino: date;
  cor: string | null;
  calendario: CalendarioLetivoFindOneInput;
}

/** Dados de entrada para a atualização de uma Etapa. */
model EtapaUpdateInput is OptionalProperties<EtapaCreateInput>;

/** Resultados da busca a Etapas. */
model EtapaListOutput is Pagination.Result.View<EtapaFindOneOutput>;
