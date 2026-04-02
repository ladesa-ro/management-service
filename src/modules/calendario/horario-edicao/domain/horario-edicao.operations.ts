import { createOperationMetadata } from "@/domain/abstractions";

export const HorarioEdicaoCreateCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoCreate",
  summary: "Cria nova sessao de edicao de horario",
});

export const HorarioEdicaoApplyChangeCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoApplyChange",
  summary: "Aplica uma mudanca a sessao de edicao de horario",
});

export const HorarioEdicaoSalvarCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoSalvar",
  summary: "Salva sessao de edicao permanentemente",
});

export const HorarioEdicaoCancelarCommandMetadata = createOperationMetadata({
  operationId: "horarioEdicaoCancelar",
  summary: "Cancela e descarta sessao de edicao",
});
