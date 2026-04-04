import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { DiarioFindOneQuery } from "../queries";

export type DiarioUpdateImagemCapaCommand = {
  dto: DiarioFindOneQuery;
  file: Express.Multer.File;
};

export const DiarioUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "diarioUpdateImagemCapa",
  summary: "Define imagem de capa de um diário",
});

export const IDiarioUpdateImagemCapaCommandHandler = Symbol(
  "IDiarioUpdateImagemCapaCommandHandler",
);

export type IDiarioUpdateImagemCapaCommandHandler = ICommandHandler<
  DiarioUpdateImagemCapaCommand,
  boolean
>;
