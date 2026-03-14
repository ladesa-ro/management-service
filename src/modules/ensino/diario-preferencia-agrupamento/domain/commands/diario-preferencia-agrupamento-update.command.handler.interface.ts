import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioPreferenciaAgrupamentoFindOneInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
  DiarioPreferenciaAgrupamentoUpdateInputDto,
} from "../../application/dtos";

export type IDiarioPreferenciaAgrupamentoUpdateCommand = {
  accessContext: AccessContext;
  dto: DiarioPreferenciaAgrupamentoFindOneInputDto & DiarioPreferenciaAgrupamentoUpdateInputDto;
};

export type IDiarioPreferenciaAgrupamentoUpdateCommandHandler = ICommandHandler<
  IDiarioPreferenciaAgrupamentoUpdateCommand,
  DiarioPreferenciaAgrupamentoFindOneOutputDto
>;
export const IDiarioPreferenciaAgrupamentoUpdateCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoUpdateCommandHandler",
);
