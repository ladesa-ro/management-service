import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneInputDto, AmbienteFindOneOutputDto } from "../../application/dtos";

export type IAmbienteFindOneQuery = {
  accessContext: AccessContext | null;
  dto: AmbienteFindOneInputDto;
  selection?: string[] | boolean;
};

export type IAmbienteFindOneQueryHandler = IQueryHandler<
  IAmbienteFindOneQuery,
  AmbienteFindOneOutputDto | null
>;
export const IAmbienteFindOneQueryHandler = Symbol("IAmbienteFindOneQueryHandler");
