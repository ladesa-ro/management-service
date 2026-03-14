import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
  OfertaFormacaoUpdateInputDto,
} from "../../application/dtos";

export type IOfertaFormacaoUpdateCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoFindOneInputDto & OfertaFormacaoUpdateInputDto;
};

export type IOfertaFormacaoUpdateCommandHandler = ICommandHandler<
  IOfertaFormacaoUpdateCommand,
  OfertaFormacaoFindOneOutputDto
>;
export const IOfertaFormacaoUpdateCommandHandler = Symbol("IOfertaFormacaoUpdateCommandHandler");
