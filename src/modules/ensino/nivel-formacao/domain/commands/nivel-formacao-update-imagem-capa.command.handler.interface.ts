import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { NivelFormacaoFindOneQuery } from "../queries";

export const NivelFormacaoUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "nivelFormacaoUpdateImagemCapa",
  summary: "Define a imagem de capa de um nivel de formacao",
});

export type NivelFormacaoUpdateImagemCapaCommand = {
  dto: NivelFormacaoFindOneQuery;
  file: Express.Multer.File;
};

export const INivelFormacaoUpdateImagemCapaCommandHandler = Symbol(
  "INivelFormacaoUpdateImagemCapaCommandHandler",
);

export type INivelFormacaoUpdateImagemCapaCommandHandler = ICommandHandler<
  NivelFormacaoUpdateImagemCapaCommand,
  boolean
>;
