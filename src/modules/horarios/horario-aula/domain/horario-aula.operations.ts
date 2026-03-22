import { createOperationMetadata } from "@/domain/abstractions";

export const HorarioAulaFindAllQueryMetadata = createOperationMetadata({
  operationId: "horarioAulaFindAll",
  summary: "Lista horarios de aula (intervalos)",
});

export const HorarioAulaFindByIdQueryMetadata = createOperationMetadata({
  operationId: "horarioAulaFindById",
  summary: "Busca um horario de aula por ID",
});

export const HorarioAulaCreateCommandMetadata = createOperationMetadata({
  operationId: "horarioAulaCreate",
  summary: "Cria um horario de aula",
});

export const HorarioAulaUpdateCommandMetadata = createOperationMetadata({
  operationId: "horarioAulaUpdate",
  summary: "Atualiza um horario de aula",
});

export const HorarioAulaDeleteCommandMetadata = createOperationMetadata({
  operationId: "horarioAulaDelete",
  summary: "Remove um horario de aula",
});
