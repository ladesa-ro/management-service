import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
} from "../queries";
import type { OfertaFormacaoNivelFormacaoUpdateCommand } from "./oferta-formacao-nivel-formacao-update.command";

export type IOfertaFormacaoNivelFormacaoUpdateCommandHandler = ICommandHandler<
  OfertaFormacaoNivelFormacaoFindOneQuery & OfertaFormacaoNivelFormacaoUpdateCommand,
  OfertaFormacaoNivelFormacaoFindOneQueryResult
>;
export const IOfertaFormacaoNivelFormacaoUpdateCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoUpdateCommandHandler",
);
