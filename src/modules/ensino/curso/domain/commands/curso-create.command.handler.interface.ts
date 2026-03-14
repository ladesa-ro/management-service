import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { CursoCreateInputDto, CursoFindOneOutputDto } from "../../application/dtos";

export type ICursoCreateCommand = {
  accessContext: AccessContext;
  dto: CursoCreateInputDto;
};

export type ICursoCreateCommandHandler = ICommandHandler<
  ICursoCreateCommand,
  CursoFindOneOutputDto
>;
export const ICursoCreateCommandHandler = Symbol("ICursoCreateCommandHandler");
