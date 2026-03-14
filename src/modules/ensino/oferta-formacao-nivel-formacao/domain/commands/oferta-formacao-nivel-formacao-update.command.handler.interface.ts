import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneQueryResult,
} from "../queries";
import type { OfertaFormacaoNivelFormacaoUpdateCommand } from "./oferta-formacao-nivel-formacao-update.command";
export type IOfertaFormacaoNivelFormacaoUpdateCommand = {
  accessContext: AccessContext;
  dto: OfertaFormacaoNivelFormacaoFindOneQuery & OfertaFormacaoNivelFormacaoUpdateCommand;
};

export type IOfertaFormacaoNivelFormacaoUpdateCommandHandler = ICommandHandler<
  IOfertaFormacaoNivelFormacaoUpdateCommand,
  OfertaFormacaoNivelFormacaoFindOneQueryResult
>;
export const IOfertaFormacaoNivelFormacaoUpdateCommandHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoUpdateCommandHandler",
);
