import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EmpresaFindOneOutputDto, EmpresaUpdateInputDto } from "../../application/dtos";

export type IEmpresaUpdateCommand = {
  accessContext: AccessContext;
  id: string;
  dto: EmpresaUpdateInputDto;
};

export type IEmpresaUpdateCommandHandler = ICommandHandler<
  IEmpresaUpdateCommand,
  EmpresaFindOneOutputDto
>;
export const IEmpresaUpdateCommandHandler = Symbol("IEmpresaUpdateCommandHandler");
