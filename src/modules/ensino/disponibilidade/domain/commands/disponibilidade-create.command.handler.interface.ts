import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DisponibilidadeCreateInputDto,
  DisponibilidadeFindOneOutputDto,
} from "../../application/dtos";

export type IDisponibilidadeCreateCommand = {
  accessContext: AccessContext;
  dto: DisponibilidadeCreateInputDto;
};

export type IDisponibilidadeCreateCommandHandler = ICommandHandler<
  IDisponibilidadeCreateCommand,
  DisponibilidadeFindOneOutputDto
>;
export const IDisponibilidadeCreateCommandHandler = Symbol("IDisponibilidadeCreateCommandHandler");
