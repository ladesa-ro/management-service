import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { ModalidadeFindOneQuery } from "../queries";

export const ModalidadeUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "modalidadeUpdateImagemCapa",
  summary: "Define a imagem de capa de uma modalidade",
});

export type ModalidadeUpdateImagemCapaCommand = {
  dto: ModalidadeFindOneQuery;
  file: Express.Multer.File;
};

export const IModalidadeUpdateImagemCapaCommandHandler = Symbol(
  "IModalidadeUpdateImagemCapaCommandHandler",
);

export type IModalidadeUpdateImagemCapaCommandHandler = ICommandHandler<
  ModalidadeUpdateImagemCapaCommand,
  boolean
>;
