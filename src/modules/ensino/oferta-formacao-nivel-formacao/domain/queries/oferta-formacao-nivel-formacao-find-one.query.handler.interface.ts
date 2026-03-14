import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoNivelFormacaoFindOneInputDto,
  OfertaFormacaoNivelFormacaoFindOneOutputDto,
} from "../../application/dtos";

export type IOfertaFormacaoNivelFormacaoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: OfertaFormacaoNivelFormacaoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IOfertaFormacaoNivelFormacaoFindOneQueryHandler = IQueryHandler<
  IOfertaFormacaoNivelFormacaoFindOneQuery,
  OfertaFormacaoNivelFormacaoFindOneOutputDto | null
>;
export const IOfertaFormacaoNivelFormacaoFindOneQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoFindOneQueryHandler",
);
