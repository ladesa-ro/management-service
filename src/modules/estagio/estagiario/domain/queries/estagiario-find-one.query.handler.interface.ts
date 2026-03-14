import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneInputDto, EstagiarioFindOneOutputDto } from "../../application/dtos";

export type IEstagiarioFindOneQuery = {
  accessContext: AccessContext | null;
  dto: EstagiarioFindOneInputDto;
  selection?: string[] | boolean;
};

export type IEstagiarioFindOneQueryHandler = IQueryHandler<
  IEstagiarioFindOneQuery,
  EstagiarioFindOneOutputDto | null
>;
export const IEstagiarioFindOneQueryHandler = Symbol("IEstagiarioFindOneQueryHandler");
