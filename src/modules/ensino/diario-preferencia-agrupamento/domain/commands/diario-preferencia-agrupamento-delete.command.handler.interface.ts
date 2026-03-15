import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoFindOneQuery } from "../queries";

export type IDiarioPreferenciaAgrupamentoDeleteCommandHandler = ICommandHandler<
  DiarioPreferenciaAgrupamentoFindOneQuery,
  boolean
>;
export const IDiarioPreferenciaAgrupamentoDeleteCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoDeleteCommandHandler",
);
