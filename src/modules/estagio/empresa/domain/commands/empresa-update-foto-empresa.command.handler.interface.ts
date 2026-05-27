import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { EmpresaFindOneQuery } from "../queries";

export const EmpresaUpdateFotoEmpresaCommandMetadata = createOperationMetadata({
  operationId: "empresaUpdateFotoEmpresa",
  summary: "Define a foto da empresa",
});

export type EmpresaUpdateFotoEmpresaCommand = {
  dto: EmpresaFindOneQuery;
  file: Express.Multer.File;
};

export const IEmpresaUpdateFotoEmpresaCommandHandler = Symbol(
  "IEmpresaUpdateFotoEmpresaCommandHandler",
);

export type IEmpresaUpdateFotoEmpresaCommandHandler = ICommandHandler<
  EmpresaUpdateFotoEmpresaCommand,
  boolean
>;
