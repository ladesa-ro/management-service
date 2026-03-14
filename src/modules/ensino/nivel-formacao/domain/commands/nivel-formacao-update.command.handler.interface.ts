import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
  NivelFormacaoUpdateInputDto,
} from "../../application/dtos";

export type INivelFormacaoUpdateCommand = {
  accessContext: AccessContext;
  dto: NivelFormacaoFindOneInputDto & NivelFormacaoUpdateInputDto;
};

export type INivelFormacaoUpdateCommandHandler = ICommandHandler<
  INivelFormacaoUpdateCommand,
  NivelFormacaoFindOneOutputDto
>;
export const INivelFormacaoUpdateCommandHandler = Symbol("INivelFormacaoUpdateCommandHandler");
