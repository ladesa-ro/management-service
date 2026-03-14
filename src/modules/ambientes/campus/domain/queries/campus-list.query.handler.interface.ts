import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusListInputDto, CampusListOutputDto } from "../../application/dtos";

export type ICampusListQuery = {
  accessContext: AccessContext;
  dto: CampusListInputDto | null;
  selection?: string[] | boolean;
};

export type ICampusListQueryHandler = IQueryHandler<ICampusListQuery, CampusListOutputDto>;
export const ICampusListQueryHandler = Symbol("ICampusListQueryHandler");
