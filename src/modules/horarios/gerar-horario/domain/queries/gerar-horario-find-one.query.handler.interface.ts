import { createOperationMetadata } from "@/domain/abstractions";
import type { AccessContext } from "@/server/access-context";
import type { IGerarHorario } from "../gerar-horario.types";

export interface IGerarHorarioFindOneQuery {
  id: string;
}

export const GerarHorarioFindOneQueryMetadata = createOperationMetadata({
  operationId: "gerarHorarioFindById",
  summary: "Consulta status de uma geracao de horario",
});

export const IGerarHorarioFindOneQueryHandler = Symbol("IGerarHorarioFindOneQueryHandler");

export interface IGerarHorarioFindOneQueryHandler {
  execute(
    accessContext: AccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<IGerarHorario | null>;
}
