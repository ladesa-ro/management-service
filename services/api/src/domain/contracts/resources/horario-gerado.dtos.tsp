using Ladesa.Domain.v4.Generics;
using Ladesa.Domain.v4.Generics.Entities;

namespace Ladesa.Domain.v4.Schemas;

/** Visão completa de um HorarioGerado. */
model HorarioGeradoView {
  ...OmitProperties<HorarioGerado, "calendario">;
  calendario: CalendarioLetivoFindOneResultView;
}

/** Dados de entrada para encontrar um HorarioGerado por ID. */
model HorarioGeradoFindOneInputView {
  id: HorarioGerado.id;
}

/** Visão FindOne de um HorarioGerado. */
model HorarioGeradoFindOneResultView {
  ...PickProperties<HorarioGeradoView, "id">;
  ...PickProperties<
    HorarioGeradoView,
    "status" | "tipo" | "dataGeracao" | "vigenciaInicio" | "vigenciaFim"
  >;
  ...PickProperties<HorarioGeradoView, "calendario">;
  ...PickProperties<
    HorarioGeradoView,
    "dateCreated" | "dateUpdated" | "dateDeleted"
  >;
}

/** Dados de entrada para a criação de um HorarioGerado. */
model HorarioGeradoInputCreateView {
  status: HorarioGerado.status;
  tipo: HorarioGerado.tipo;
  dataGeracao: HorarioGerado.dataGeracao;
  vigenciaInicio: HorarioGerado.vigenciaInicio;
  vigenciaFim: HorarioGerado.vigenciaFim;

  //
  calendario: CalendarioLetivoFindOneInputView;
}

/** Dados de entrada para a atualização de um HorarioGerado. */
model HorarioGeradoInputUpdateView
  is OptionalProperties<HorarioGeradoInputCreateView>;

/** Resultados da busca de HorariosGerados. */
model HorarioGeradoListResultView
  is Pagination.Result.View<HorarioGeradoFindOneResultView>;
