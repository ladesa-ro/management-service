import type { DeepPartial } from "typeorm";
import type {
  ImagemArquivoEntity,
  ImagemEntity,
} from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";

export interface IImagemRepositoryPort {
  create(): ImagemEntity;

  merge(imagem: ImagemEntity, data: DeepPartial<ImagemEntity>): void;

  save(imagem: ImagemEntity): Promise<ImagemEntity>;
}

export interface IImagemArquivoRepositoryPort {
  create(): ImagemArquivoEntity;

  merge(imagemArquivo: ImagemArquivoEntity, data: DeepPartial<ImagemArquivoEntity>): void;
}

export interface IImagemTransactionPort {
  transaction<T>(
    callback: (context: {
      imagemRepository: IImagemRepositoryPort;
      imagemArquivoRepository: IImagemArquivoRepositoryPort;
    }) => Promise<T>,
  ): Promise<T>;
}
