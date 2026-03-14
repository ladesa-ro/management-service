import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  NivelFormacaoCreateInputDto,
  NivelFormacaoFindOneOutputDto,
} from "../../application/dtos";

export type INivelFormacaoCreateCommand = {
  accessContext: AccessContext;
  dto: NivelFormacaoCreateInputDto;
};

export type INivelFormacaoCreateCommandHandler = ICommandHandler<
  INivelFormacaoCreateCommand,
  NivelFormacaoFindOneOutputDto
>;
export const INivelFormacaoCreateCommandHandler = Symbol("INivelFormacaoCreateCommandHandler");
