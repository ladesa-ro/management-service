import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoCreateInputDto,
  OfertaFormacaoFindOneOutputDto,
} from "../../application/dtos";

export type IOfertaFormacaoCreateCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoCreateInputDto;
};

export type IOfertaFormacaoCreateCommandHandler = ICommandHandler<
  IOfertaFormacaoCreateCommand,
  OfertaFormacaoFindOneOutputDto
>;
export const IOfertaFormacaoCreateCommandHandler = Symbol("IOfertaFormacaoCreateCommandHandler");
