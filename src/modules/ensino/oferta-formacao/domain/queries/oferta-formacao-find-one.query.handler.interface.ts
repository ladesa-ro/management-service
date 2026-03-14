import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoFindOneInputDto,
  OfertaFormacaoFindOneOutputDto,
} from "../../application/dtos";

export type IOfertaFormacaoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: OfertaFormacaoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IOfertaFormacaoFindOneQueryHandler = IQueryHandler<
  IOfertaFormacaoFindOneQuery,
  OfertaFormacaoFindOneOutputDto | null
>;
export const IOfertaFormacaoFindOneQueryHandler = Symbol("IOfertaFormacaoFindOneQueryHandler");
