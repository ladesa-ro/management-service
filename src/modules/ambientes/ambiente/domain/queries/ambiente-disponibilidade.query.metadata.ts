import { createOperationMetadata } from "@/domain/abstractions";

export const AmbienteListDisponiveisQueryMetadata = createOperationMetadata({
  operationId: "ambienteListDisponiveis",
  summary: "Lista ambientes disponiveis",
});

export const AmbienteGetDisponibilidadeQueryMetadata = createOperationMetadata({
  operationId: "ambienteGetDisponibilidade",
  summary: "Grade de disponibilidade de um ambiente",
});
