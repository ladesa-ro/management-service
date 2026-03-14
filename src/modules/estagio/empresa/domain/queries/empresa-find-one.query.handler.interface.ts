import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneInputDto, EmpresaFindOneOutputDto } from "../../application/dtos";

export type IEmpresaFindOneQuery = {
  accessContext: AccessContext | null;
  dto: EmpresaFindOneInputDto;
  selection?: string[] | boolean;
};

export type IEmpresaFindOneQueryHandler = IQueryHandler<
  IEmpresaFindOneQuery,
  EmpresaFindOneOutputDto | null
>;
export const IEmpresaFindOneQueryHandler = Symbol("IEmpresaFindOneQueryHandler");
