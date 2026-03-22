import { createOperationMetadata } from "@/domain/abstractions";

export const UsuarioHorarioSemanalQueryMetadata = createOperationMetadata({
  operationId: "usuarioHorarioSemanal",
  summary: "Consulta horario semanal de um usuario (professor)",
});
