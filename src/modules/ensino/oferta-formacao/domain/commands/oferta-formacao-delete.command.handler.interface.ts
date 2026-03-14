import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneInputDto } from "../../application/dtos";

export type IOfertaFormacaoDeleteCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoFindOneInputDto;
};

export type IOfertaFormacaoDeleteCommandHandler = ICommandHandler<
  IOfertaFormacaoDeleteCommand,
  boolean
>;
export const IOfertaFormacaoDeleteCommandHandler = Symbol("IOfertaFormacaoDeleteCommandHandler");
