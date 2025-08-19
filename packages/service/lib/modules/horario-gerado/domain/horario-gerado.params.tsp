using Ladesa.ManagementService.Generics;

namespace Ladesa.ManagementService;

/** Visão completa de um HorarioGerado. */
model HorarioGeradoView {
  ...OmitProperties<HorarioGerado, "calendario">;
  calendario: CalendarioLetivoFindOneOutput;
}

/** Dados de entrada para encontrar um HorarioGerado por ID. */
model HorarioGeradoFindOneInput {
  id: HorarioGerado.id;
}

/** Visão FindOne de um HorarioGerado. */
model HorarioGeradoFindOneOutput {
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
model HorarioGeradoCreateInput {
  status: HorarioGerado.status;
  tipo: HorarioGerado.tipo;
  dataGeracao: HorarioGerado.dataGeracao;
  vigenciaInicio: HorarioGerado.vigenciaInicio;
  vigenciaFim: HorarioGerado.vigenciaFim;

  calendario: CalendarioLetivoFindOneInput;
}

/** Dados de entrada para a atualização de um HorarioGerado. */
model HorarioGeradoUpdateInput is OptionalProperties<HorarioGeradoCreateInput>;

/** Resultados da busca de HorariosGerados. */
model HorarioGeradoListOutput
  is Pagination.Output.View<HorarioGeradoFindOneOutput>;
