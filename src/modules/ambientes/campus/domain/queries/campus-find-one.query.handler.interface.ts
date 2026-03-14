import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { CampusFindOneInputDto, CampusFindOneOutputDto } from "../../application/dtos";

export type ICampusFindOneQuery = {
  accessContext: AccessContext | null;
  dto: CampusFindOneInputDto;
  selection?: string[] | boolean;
};

export type ICampusFindOneQueryHandler = IQueryHandler<
  ICampusFindOneQuery,
  CampusFindOneOutputDto | null
>;
export const ICampusFindOneQueryHandler = Symbol("ICampusFindOneQueryHandler");
