import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioFindOneInputDto, DiarioFindOneOutputDto } from "../../application/dtos";

export type IDiarioFindOneQuery = {
  accessContext: AccessContext | null;
  dto: DiarioFindOneInputDto;
  selection?: string[] | boolean;
};

export type IDiarioFindOneQueryHandler = IQueryHandler<
  IDiarioFindOneQuery,
  DiarioFindOneOutputDto | null
>;
export const IDiarioFindOneQueryHandler = Symbol("IDiarioFindOneQueryHandler");
