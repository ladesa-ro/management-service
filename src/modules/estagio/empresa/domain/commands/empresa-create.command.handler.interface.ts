import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaCreateInputDto, EmpresaFindOneOutputDto } from "../../application/dtos";

export type IEmpresaCreateCommand = {
  accessContext: AccessContext;
  dto: EmpresaCreateInputDto;
};

export type IEmpresaCreateCommandHandler = ICommandHandler<
  IEmpresaCreateCommand,
  EmpresaFindOneOutputDto
>;
export const IEmpresaCreateCommandHandler = Symbol("IEmpresaCreateCommandHandler");
