import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  TurmaDisponibilidadeCreateInputDto,
  TurmaDisponibilidadeFindOneOutputDto,
} from "../../application/dtos";

export type ITurmaDisponibilidadeCreateCommand = {
  accessContext: AccessContext;
  dto: TurmaDisponibilidadeCreateInputDto;
};

export type ITurmaDisponibilidadeCreateCommandHandler = ICommandHandler<
  ITurmaDisponibilidadeCreateCommand,
  TurmaDisponibilidadeFindOneOutputDto
>;
export const ITurmaDisponibilidadeCreateCommandHandler = Symbol(
  "ITurmaDisponibilidadeCreateCommandHandler",
);
