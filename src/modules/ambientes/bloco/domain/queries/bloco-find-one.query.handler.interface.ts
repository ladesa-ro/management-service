import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { BlocoFindOneInputDto, BlocoFindOneOutputDto } from "../../application/dtos";

export type IBlocoFindOneQuery = {
  accessContext: AccessContext | null;
  dto: BlocoFindOneInputDto;
  selection?: string[] | boolean;
};

export type IBlocoFindOneQueryHandler = IQueryHandler<
  IBlocoFindOneQuery,
  BlocoFindOneOutputDto | null
>;
export const IBlocoFindOneQueryHandler = Symbol("IBlocoFindOneQueryHandler");
