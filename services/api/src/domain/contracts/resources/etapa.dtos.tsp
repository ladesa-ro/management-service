using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de uma Etapa. */
model EtapaView {
  ...OmitProperties<Etapa, "calendario">;
  calendario: CalendarioLetivoFindOneResultView;
}

/** Dados de entrada para encontrar uma Etapa por ID. */
model EtapaFindOneInputView {
  id: Etapa.id;
}

/** Visão FindOne de uma Etapa. */
model EtapaFindOneResultView {
  ...PickProperties<EtapaView, "id">;
  ...PickProperties<EtapaView, "numero" | "dataInicio" | "dataTermino" | "cor">;
  ...PickProperties<EtapaView, "calendario">;
  ...PickProperties<EtapaView, "dateCreated" | "dateUpdated" | "dateDeleted">;
}

/** Dados de entrada para a criação de uma Etapa. */
model EtapaInputCreateView {
  numero: uint8 | null;
  dataInicio: date;
  dataTermino: date;
  cor: string | null;
  calendario: CalendarioLetivoFindOneInputView;
}

/** Dados de entrada para a atualização de uma Etapa. */
model EtapaInputUpdateView is OptionalProperties<EtapaInputCreateView>;

/** Resultados da busca a Etapas. */
model EtapaListResultView is Pagination.Result.View<EtapaFindOneResultView>;
