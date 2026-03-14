import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoFindOneQueryResult } from "../queries";
import type { DiarioPreferenciaAgrupamentoCreateCommand } from "./diario-preferencia-agrupamento-create.command";
export type IDiarioPreferenciaAgrupamentoCreateCommand = {
  accessContext: AccessContext;
  dto: DiarioPreferenciaAgrupamentoCreateCommand;
};

export type IDiarioPreferenciaAgrupamentoCreateCommandHandler = ICommandHandler<
  IDiarioPreferenciaAgrupamentoCreateCommand,
  DiarioPreferenciaAgrupamentoFindOneQueryResult
>;
export const IDiarioPreferenciaAgrupamentoCreateCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoCreateCommandHandler",
);
