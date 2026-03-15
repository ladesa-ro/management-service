import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
} from "../queries";
import type { DiarioPreferenciaAgrupamentoUpdateCommand } from "./diario-preferencia-agrupamento-update.command";

export type IDiarioPreferenciaAgrupamentoUpdateCommandHandler = ICommandHandler<
  DiarioPreferenciaAgrupamentoFindOneQuery & DiarioPreferenciaAgrupamentoUpdateCommand,
  DiarioPreferenciaAgrupamentoFindOneQueryResult
>;
export const IDiarioPreferenciaAgrupamentoUpdateCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoUpdateCommandHandler",
);
