import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { DiarioListInputDto, DiarioListOutputDto } from "../../application/dtos";

export type IDiarioListQuery = {
  accessContext: AccessContext;
  dto: DiarioListInputDto | null;
  selection?: string[] | boolean;
};

export type IDiarioListQueryHandler = IQueryHandler<IDiarioListQuery, DiarioListOutputDto>;
export const IDiarioListQueryHandler = Symbol("IDiarioListQueryHandler");
