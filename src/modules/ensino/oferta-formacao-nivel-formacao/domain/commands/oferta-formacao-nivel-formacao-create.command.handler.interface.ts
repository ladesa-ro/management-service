import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoNivelFormacaoCreateInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
} from "../../application/dtos";

export type IOfertaFormacaoNivelFormacaoCreateCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoNivelFormacaoCreateInputDto;
};

export type IOfertaFormacaoNivelFormacaoCreateCommandHandler = ICommandHandler<
  IOfertaFormacaoNivelFormacaoCreateCommand,
  OfertaFormacaoNivelFormacaoFindOneOutputDto
>;
export const IOfertaFormacaoNivelFormacaoCreateCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoCreateCommandHandler",
);
