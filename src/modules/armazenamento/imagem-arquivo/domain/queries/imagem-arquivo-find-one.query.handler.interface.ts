import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { IQueryHandler } from "@/modules/@shared/domain/abstractions";
import type {
  ImagemArquivoFindOneInputDto,
  ImagemArquivoFindOneOutputDto,
} from "../../application/dtos";

export type IImagemArquivoFindOneQuery = {
  accessContext: AccessContext;
  dto: ImagemArquivoFindOneInputDto;
};

export type IImagemArquivoFindOneQueryHandler = IQueryHandler<
  IImagemArquivoFindOneQuery,
  ImagemArquivoFindOneOutputDto | null
>;
export const IImagemArquivoFindOneQueryHandler = Symbol("IImagemArquivoFindOneQueryHandler");
