import type { IQueryHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { CalendarioIndisponibilidadeAmbienteFindOneQuery } from "./calendario-indisponibilidade-ambiente-find-one.query";
import type { CalendarioIndisponibilidadeAmbienteFindOneQueryResult } from "./calendario-indisponibilidade-ambiente-find-one.query.result";

export const CalendarioIndisponibilidadeAmbienteFindOneQueryMetadata = createOperationMetadata({
  operationId: "calendarioIndisponibilidadeAmbienteFindOneById",
  summary: "Busca uma indisponibilidade de ambiente por ID",
});

export const ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler = Symbol(
  "ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler",
);

export type ICalendarioIndisponibilidadeAmbienteFindOneQueryHandler = IQueryHandler<
  CalendarioIndisponibilidadeAmbienteFindOneQuery,
  CalendarioIndisponibilidadeAmbienteFindOneQueryResult | null
>;
