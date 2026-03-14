import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoNivelFormacaoCreateCommand } from "./oferta-formacao-nivel-formacao-create.command";
export type IOfertaFormacaoNivelFormacaoCreateCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoNivelFormacaoCreateCommand;
};

export type IOfertaFormacaoNivelFormacaoCreateCommandHandler = ICommandHandler<
  IOfertaFormacaoNivelFormacaoCreateCommand,
  OfertaFormacaoNivelFormacaoFindOneQueryResult
>;
export const IOfertaFormacaoNivelFormacaoCreateCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoCreateCommandHandler",
);
