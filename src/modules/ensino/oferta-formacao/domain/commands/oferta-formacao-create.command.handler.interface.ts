import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoCreateCommand } from "./oferta-formacao-create.command";
export type IOfertaFormacaoCreateCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoCreateCommand;
};

export type IOfertaFormacaoCreateCommandHandler = ICommandHandler<
  IOfertaFormacaoCreateCommand,
  OfertaFormacaoFindOneQueryResult
>;
export const IOfertaFormacaoCreateCommandHandler = Symbol("IOfertaFormacaoCreateCommandHandler");
