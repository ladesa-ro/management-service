import { createOperationMetadata } from "@/domain/abstractions";

export const UsuarioDisponibilidadeQueryMetadata = createOperationMetadata({
  operationId: "usuarioDisponibilidade",
  summary: "Consulta grade de disponibilidade de um usuario por campus",
});

export const UsuarioSetDisponibilidadeCommandMetadata = createOperationMetadata({
  operationId: "usuarioSetDisponibilidade",
  summary: "Define grade de disponibilidade de um usuario por campus (bulk replace)",
});
