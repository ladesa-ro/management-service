using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um calendário letivo. */
model CalendarioLetivoView {
  ...OmitProperties<CalendarioLetivo, "campus" | "ofertaFormacao">;
  campus: CampusFindOneResultView;
  ofertaFormacao: OfertaFormacaoFindOneResultView;
}

/** Dados de entrada para encontrar um calendário letivo por ID. */
model CalendarioLetivoFindOneInputView {
  id: CalendarioLetivo.id;
}

/** Visão FindOne de um calendário letivo. */
model CalendarioLetivoFindOneResultView {
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
model CalendarioLetivoInputCreateView {
  ...PickProperties<CalendarioLetivoView, "nome" | "ano">;
  campus: CampusFindOneInputView;
  ofertaFormacao: OfertaFormacaoFindOneInputView;
}

/** Dados de entrada para a atualização de um calendário letivo. */
model CalendarioLetivoInputUpdateView
  is OptionalProperties<CalendarioLetivoInputCreateView>;

/** Resultados da busca a CalendarioLetivos. */
model CalendarioLetivoListResultView
  is Pagination.Result.View<CalendarioLetivoFindOneResultView>;
