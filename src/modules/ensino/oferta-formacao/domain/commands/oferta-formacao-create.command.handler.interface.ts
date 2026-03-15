import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { OfertaFormacaoFindOneQueryResult } from "../queries";
import type { OfertaFormacaoCreateCommand } from "./oferta-formacao-create.command";

export type IOfertaFormacaoCreateCommandHandler = ICommandHandler<
  OfertaFormacaoCreateCommand,
  OfertaFormacaoFindOneQueryResult
>;
export const IOfertaFormacaoCreateCommandHandler = Symbol("IOfertaFormacaoCreateCommandHandler");
