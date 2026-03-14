import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  OfertaFormacaoNivelFormacaoListInputDto,
  OfertaFormacaoNivelFormacaoListOutputDto,
} from "../../application/dtos";

export type IOfertaFormacaoNivelFormacaoListQuery = {
  accessContext: AccessContext;
  dto: OfertaFormacaoNivelFormacaoListInputDto | null;
  selection?: string[] | boolean;
};

export type IOfertaFormacaoNivelFormacaoListQueryHandler = IQueryHandler<
  IOfertaFormacaoNivelFormacaoListQuery,
  OfertaFormacaoNivelFormacaoListOutputDto
>;
export const IOfertaFormacaoNivelFormacaoListQueryHandler = Symbol(
  "IOfertaFormacaoNivelFormacaoListQueryHandler",
);
