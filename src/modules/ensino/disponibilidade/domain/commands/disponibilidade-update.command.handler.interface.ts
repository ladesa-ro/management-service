import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type {
  DisponibilidadeFindOneInputDto,
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeUpdateInputDto,
} from "../../application/dtos";

export type IDisponibilidadeUpdateCommand = {
  accessContext: AccessContext;
  dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto;
};

export type IDisponibilidadeUpdateCommandHandler = ICommandHandler<
  IDisponibilidadeUpdateCommand,
  DisponibilidadeFindOneOutputDto
>;
export const IDisponibilidadeUpdateCommandHandler = Symbol("IDisponibilidadeUpdateCommandHandler");
