import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery } from "../queries";
export type IAmbienteUpdateImagemCapaCommand = {
  accessContext: AccessContext;
  dto: AmbienteFindOneQuery;
  file: Express.Multer.File;
};

export type IAmbienteUpdateImagemCapaCommandHandler = ICommandHandler<
  IAmbienteUpdateImagemCapaCommand,
  boolean
>;
export const IAmbienteUpdateImagemCapaCommandHandler = Symbol(
  "IAmbienteUpdateImagemCapaCommandHandler",
);
