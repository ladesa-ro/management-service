import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioPreferenciaAgrupamentoCreateInputDto,
  DiarioPreferenciaAgrupamentoFindOneOutputDto,
} from "../../application/dtos";

export type IDiarioPreferenciaAgrupamentoCreateCommand = {
  accessContext: AccessContext;
  dto: DiarioPreferenciaAgrupamentoCreateInputDto;
};

export type IDiarioPreferenciaAgrupamentoCreateCommandHandler = ICommandHandler<
  IDiarioPreferenciaAgrupamentoCreateCommand,
  DiarioPreferenciaAgrupamentoFindOneOutputDto
>;
export const IDiarioPreferenciaAgrupamentoCreateCommandHandler = Symbol(
  "IDiarioPreferenciaAgrupamentoCreateCommandHandler",
);
