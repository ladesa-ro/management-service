import type { IAccessContext } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioOcupacaoSemDetalheQuery } from "./calendario-ocupacao-sem-detalhe.query";
import type { CalendarioOcupacaoSemDetalheQueryResult } from "./calendario-ocupacao-sem-detalhe.query.result";

export const CalendarioOcupacaoSemDetalheQueryMetadata = createOperationMetadata({
  operationId: "calendarioOcupacaoSemDetalhe",
  summary: "Consulta ocupação sem detalhe por campus e período",
});

export const ICalendarioOcupacaoSemDetalheQueryHandler = Symbol(
  "ICalendarioOcupacaoSemDetalheQueryHandler",
);

export interface ICalendarioOcupacaoSemDetalheQueryHandler {
  execute(
    accessContext: IAccessContext | null,
    query: CalendarioOcupacaoSemDetalheQuery,
  ): Promise<CalendarioOcupacaoSemDetalheQueryResult>;
}
