import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioPreferenciaAgrupamentoFindOneInputDto } from "../../application/dtos";

export type IDiarioPreferenciaAgrupamentoDeleteCommand = {
  accessContext: AccessContext;
  dto: DiarioPreferenciaAgrupamentoFindOneInputDto;
};

export type IDiarioPreferenciaAgrupamentoDeleteCommandHandler = ICommandHandler<
  IDiarioPreferenciaAgrupamentoDeleteCommand,
  boolean
>;
export const IDiarioPreferenciaAgrupamentoDeleteCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoDeleteCommandHandler",
);
