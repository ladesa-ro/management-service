import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoNivelFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoNivelFormacaoCreateCommand } from "./oferta-formacao-nivel-formacao-create.command";

export type IOfertaFormacaoNivelFormacaoCreateCommandHandler = ICommandHandler<
  OfertaFormacaoNivelFormacaoCreateCommand,
  OfertaFormacaoNivelFormacaoFindOneQueryResult
>;
export const IOfertaFormacaoNivelFormacaoCreateCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoCreateCommandHandler",
);
