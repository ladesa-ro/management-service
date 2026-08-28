import { createOperationMetadata } from "@/domain/abstractions";

export const HorarioEdicaoCreateCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoCreate",
  summary: "Cria nova sessao de edicao de horario",
});

export const HorarioEdicaoFindOneQueryMetadata = createOperationMetadata({
  operationId: "horarioEdicaoFindOne",
  summary: "Busca uma sessao de edicao de horario por id",
});

export const HorarioEdicaoApplyChangeCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoApplyChange",
  summary: "Aplica uma mudanca a sessao de edicao de horario",
});

export const HorarioEdicaoSalvarCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoSalvar",
  summary: "Salva sessao de edicao permanentemente",
});

export const HorarioEdicaoPublicarCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoPublicar",
  summary: "Publica as mudancas da sessao de edicao no calendario oficial",
});

export const HorarioEdicaoCancelarCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoCancelar",
  summary: "Cancela e descarta sessao de edicao",
});

export const HorarioEdicaoDesfazerMudancaCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoDesfazerMudanca",
  summary: "Desfaz uma mudanca pendente da sessao de edicao",
});
