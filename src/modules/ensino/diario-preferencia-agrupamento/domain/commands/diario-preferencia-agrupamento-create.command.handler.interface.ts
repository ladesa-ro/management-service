import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "../queries";
import type { DiarioPreferenciaAgrupamentoCreateCommand } from "./diario-preferencia-agrupamento-create.command";

export type IDiarioPreferenciaAgrupamentoCreateCommandHandler = ICommandHandler<
  DiarioPreferenciaAgrupamentoCreateCommand,
  DiarioPreferenciaAgrupamentoFindOneQueryResult
>;
export const IDiarioPreferenciaAgrupamentoCreateCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoCreateCommandHandler",
);
