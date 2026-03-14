import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  NivelFormacaoFindOneInputDto,
  NivelFormacaoFindOneOutputDto,
} from "../../application/dtos";

export type INivelFormacaoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: NivelFormacaoFindOneInputDto;
  selection?: string[] | boolean;
};

export type INivelFormacaoFindOneQueryHandler = IQueryHandler<
  INivelFormacaoFindOneQuery,
  NivelFormacaoFindOneOutputDto | null
>;
export const INivelFormacaoFindOneQueryHandler = Symbol("INivelFormacaoFindOneQueryHandler");
