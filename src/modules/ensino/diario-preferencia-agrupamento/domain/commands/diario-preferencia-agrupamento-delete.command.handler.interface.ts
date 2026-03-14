import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoFindOneQuery } from "../queries";
export type IDiarioPreferenciaAgrupamentoDeleteCommand = {
  accessContext: AccessContext;
  dto: DiarioPreferenciaAgrupamentoFindOneQuery;
};

export type IDiarioPreferenciaAgrupamentoDeleteCommandHandler = ICommandHandler<
  IDiarioPreferenciaAgrupamentoDeleteCommand,
  boolean
>;
export const IDiarioPreferenciaAgrupamentoDeleteCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoDeleteCommandHandler",
);
