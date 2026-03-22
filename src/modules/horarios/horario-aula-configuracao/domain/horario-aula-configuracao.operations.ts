import { createOperationMetadata } from "@/domain/abstractions";

export const HorarioAulaConfiguracaoFindAllQueryMetadata = createOperationMetadata({
  operationId: "horarioAulaConfiguracaoFindAll",
  summary: "Lista configuracoes de horario de aula",
});

export const HorarioAulaConfiguracaoFindByIdQueryMetadata = createOperationMetadata({
  operationId: "horarioAulaConfiguracaoFindById",
  summary: "Busca uma configuracao de horario de aula por ID",
});

export const HorarioAulaConfiguracaoCreateCommandMetadata = createOperationMetadata({
  operationId: "horarioAulaConfiguracaoCreate",
  summary: "Cria uma configuracao de horario de aula",
});

export const HorarioAulaConfiguracaoUpdateCommandMetadata = createOperationMetadata({
  operationId: "horarioAulaConfiguracaoUpdate",
  summary: "Atualiza uma configuracao de horario de aula",
});

export const HorarioAulaConfiguracaoDeleteCommandMetadata = createOperationMetadata({
  operationId: "horarioAulaConfiguracaoDelete",
  summary: "Remove uma configuracao de horario de aula",
});
