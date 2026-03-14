import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneInputDto } from "../../application/dtos";

export type IOfertaFormacaoNivelFormacaoDeleteCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoNivelFormacaoFindOneInputDto;
};

export type IOfertaFormacaoNivelFormacaoDeleteCommandHandler = ICommandHandler<
  IOfertaFormacaoNivelFormacaoDeleteCommand,
  boolean
>;
export const IOfertaFormacaoNivelFormacaoDeleteCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoDeleteCommandHandler",
);
