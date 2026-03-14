import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoUpdateInputDto,
} from "../../application/dtos";

export type ICursoUpdateCommand = {
  accessContext: AccessContext;
  dto: CursoFindOneInputDto & CursoUpdateInputDto;
};

export type ICursoUpdateCommandHandler = ICommandHandler<
  ICursoUpdateCommand,
  CursoFindOneOutputDto
>;
export const ICursoUpdateCommandHandler = Symbol("ICursoUpdateCommandHandler");
