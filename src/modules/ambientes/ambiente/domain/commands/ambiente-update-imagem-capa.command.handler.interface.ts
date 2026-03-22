import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { AmbienteFindOneQuery } from "../queries";

export const AmbienteUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "ambienteUpdateImagemCapa",
  summary: "Define a imagem de capa de um ambiente",
});

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
