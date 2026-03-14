import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioPreferenciaAgrupamentoFindOneQuery,
  DiarioPreferenciaAgrupamentoFindOneQueryResult,
} from "../queries";
import type { DiarioPreferenciaAgrupamentoUpdateCommand } from "./diario-preferencia-agrupamento-update.command";
export type IDiarioPreferenciaAgrupamentoUpdateCommand = {
  accessContext: AccessContext;
  dto: DiarioPreferenciaAgrupamentoFindOneQuery & DiarioPreferenciaAgrupamentoUpdateCommand;
};

export type IDiarioPreferenciaAgrupamentoUpdateCommandHandler = ICommandHandler<
  IDiarioPreferenciaAgrupamentoUpdateCommand,
  DiarioPreferenciaAgrupamentoFindOneQueryResult
>;
export const IDiarioPreferenciaAgrupamentoUpdateCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoUpdateCommandHandler",
);
