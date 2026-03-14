import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { DisponibilidadeFindOneInputDto } from "../../application/dtos";

export type IDisponibilidadeDeleteCommand = {
  accessContext: AccessContext;
  dto: DisponibilidadeFindOneInputDto;
};

export type IDisponibilidadeDeleteCommandHandler = ICommandHandler<
  IDisponibilidadeDeleteCommand,
  boolean
>;
export const IDisponibilidadeDeleteCommandHandler = Symbol("IDisponibilidadeDeleteCommandHandler");
