import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneInputDto } from "../../application/dtos";

export type IAmbienteUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: AmbienteFindOneInputDto;
  file: Express.Multer.File;
};

export type IAmbienteUpdateImagemCapaCommandHandler = ICommandHandler<
  IAmbienteUpdateImagemCapaCommand,
  boolean
>;
export const IAmbienteUpdateImagemCapaCommandHandler = Symbol(
  "IAmbienteUpdateImagemCapaCommandHandler",
);
