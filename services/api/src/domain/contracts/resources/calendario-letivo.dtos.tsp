using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.ManagementService.Domain.Contracts;

/** Visão completa de um calendário letivo. */
model CalendarioLetivoView {
  ...OmitProperties<CalendarioLetivo, "campus" | "ofertaFormacao">;
  campus: CampusFindOneOutput;
  ofertaFormacao: OfertaFormacaoFindOneOutput;
}

/** Dados de entrada para encontrar um calendário letivo por ID. */
model CalendarioLetivoFindOneInput {
  id: CalendarioLetivo.id;
}

/** Visão FindOne de um calendário letivo. */
model CalendarioLetivoFindOneOutput {
  //
  ...PickProperties<CalendarioLetivoView, "id">;

  ...PickProperties<CalendarioLetivoView, "nome" | "ano">;

  //
  ...PickProperties<CalendarioLetivoView, "campus" | "ofertaFormacao">;

  //
  ...PickProperties<
    CalendarioLetivoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um calendário letivo. */
model CalendarioLetivoCreateInput {
  ...PickProperties<CalendarioLetivoView, "nome" | "ano">;
  campus: CampusFindOneInput;
  ofertaFormacao: OfertaFormacaoFindOneInput;
}

/** Dados de entrada para a atualização de um calendário letivo. */
model CalendarioLetivoUpdateInput
  is OptionalProperties<CalendarioLetivoCreateInput>;

/** Resultados da busca a CalendarioLetivos. */
model CalendarioLetivoListOutput
  is Pagination.Result.View<CalendarioLetivoFindOneOutput>;
