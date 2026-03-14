import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioListInputDto, EstagiarioListOutputDto } from "../../application/dtos";

export type IEstagiarioListQuery = {
  accessContext: AccessContext;
  dto: EstagiarioListInputDto | null;
  selection?: string[] | boolean;
};

export type IEstagiarioListQueryHandler = IQueryHandler<
  IEstagiarioListQuery,
  EstagiarioListOutputDto
>;
export const IEstagiarioListQueryHandler = Symbol("IEstagiarioListQueryHandler");
