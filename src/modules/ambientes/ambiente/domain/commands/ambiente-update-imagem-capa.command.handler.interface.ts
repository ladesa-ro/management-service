import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { AmbienteFindOneQuery } from "../queries";

export const IAmbienteUpdateImagemCapaCommandHandler = Symbol(
  "IAmbienteUpdateImagemCapaCommandHandler",
);

export type AmbienteUpdateImagemCapaCommand = {
  dto: AmbienteFindOneQuery;
  file: Express.Multer.File;
};

export type IAmbienteUpdateImagemCapaCommandHandler = ICommandHandler<
  AmbienteUpdateImagemCapaCommand,
  boolean
>;
