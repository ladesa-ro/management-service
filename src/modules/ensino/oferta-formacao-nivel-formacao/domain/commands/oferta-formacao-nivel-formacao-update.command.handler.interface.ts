import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
  OfertaFormacaoNivelFormacaoUpdateInputDto,
} from "../../application/dtos";

export type IOfertaFormacaoNivelFormacaoUpdateCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoNivelFormacaoFindOneInputDto & OfertaFormacaoNivelFormacaoUpdateInputDto;
};

export type IOfertaFormacaoNivelFormacaoUpdateCommandHandler = ICommandHandler<
  IOfertaFormacaoNivelFormacaoUpdateCommand,
  OfertaFormacaoNivelFormacaoFindOneOutputDto
>;
export const IOfertaFormacaoNivelFormacaoUpdateCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoUpdateCommandHandler",
);
