import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { GerarHorario } from "../gerar-horario";

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
    accessContext: IAccessContext | null,
    query: IGerarHorarioFindOneQuery,
  ): Promise<GerarHorario | null>;
}
