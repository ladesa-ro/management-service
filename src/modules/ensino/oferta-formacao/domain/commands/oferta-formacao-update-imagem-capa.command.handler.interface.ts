import type { ICommandHandler } from "@/domain/abstractions";
import { createOperationMetadata } from "@/domain/abstractions";
import type { OfertaFormacaoFindOneQuery } from "../queries";

export type OfertaFormacaoUpdateImagemCapaCommand = {
  dto: OfertaFormacaoFindOneQuery;
  file: Express.Multer.File;
};

export const OfertaFormacaoUpdateImagemCapaCommandMetadata = createOperationMetadata({
  operationId: "ofertaFormacaoUpdateImagemCapa",
  summary: "Define imagem de capa de uma oferta de formacao",
});

export const IOfertaFormacaoUpdateImagemCapaCommandHandler = Symbol(
  "IOfertaFormacaoUpdateImagemCapaCommandHandler",
);

export type IOfertaFormacaoUpdateImagemCapaCommandHandler = ICommandHandler<
  OfertaFormacaoUpdateImagemCapaCommand,
  boolean
>;
