import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneOutputDto,
} from "../../application/dtos";

export type IDiarioProfessorCreateCommand = {
  accessContext: AccessContext;
  dto: DiarioProfessorCreateInputDto;
};

export type IDiarioProfessorCreateCommandHandler = ICommandHandler<
  IDiarioProfessorCreateCommand,
  DiarioProfessorFindOneOutputDto
>;
export const IDiarioProfessorCreateCommandHandler = Symbol("IDiarioProfessorCreateCommandHandler");
