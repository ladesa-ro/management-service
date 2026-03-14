import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoListInputDto,
  OfertaFormacaoListOutputDto,
} from "../../application/dtos";

export type IOfertaFormacaoListQuery = {
  accessContext: AccessContext;
  dto: OfertaFormacaoListInputDto | null;
  selection?: string[] | boolean;
};

export type IOfertaFormacaoListQueryHandler = IQueryHandler<
  IOfertaFormacaoListQuery,
  OfertaFormacaoListOutputDto
>;
export const IOfertaFormacaoListQueryHandler = Symbol("IOfertaFormacaoListQueryHandler");
