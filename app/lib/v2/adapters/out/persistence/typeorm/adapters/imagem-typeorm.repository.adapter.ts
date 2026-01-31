import { Injectable } from "@nestjs/common";
import type { DeepPartial } from "typeorm";
import type {
  IImagemArquivoRepositoryPort,
  IImagemRepositoryPort,
  IImagemTransactionPort,
} from "@/core/imagem/application/ports";
import { DatabaseContextService } from "../context/database-context.service";
import type { ImagemArquivoEntity, ImagemEntity } from "../typeorm/entities";

@Injectable()
export class ImagemTypeOrmRepositoryAdapter implements IImagemTransactionPort {
  constructor(private databaseContext: DatabaseContextService) {}

  async transaction<T>(
    callback: (context: {
      imagemRepository: IImagemRepositoryPort;
      imagemArquivoRepository: IImagemArquivoRepositoryPort;
    }) => Promise<T>,
  ): Promise<T> {
    return this.databaseContext.transaction(
      async ({ databaseContext: { imagemRepository, imagemArquivoRepository } }) => {
        const imagemRepoAdapter: IImagemRepositoryPort = {
          create: () => imagemRepository.create(),
          merge: (imagem: ImagemEntity, data: DeepPartial<ImagemEntity>) => {
            imagemRepository.merge(imagem, data as ImagemEntity);
          },
          save: (imagem: ImagemEntity) => imagemRepository.save(imagem),
        };

        const imagemArquivoRepoAdapter: IImagemArquivoRepositoryPort = {
          create: () => imagemArquivoRepository.create(),
          merge: (imagemArquivo: ImagemArquivoEntity, data: DeepPartial<ImagemArquivoEntity>) => {
            imagemArquivoRepository.merge(imagemArquivo, data as ImagemArquivoEntity);
          },
          findLatestArquivoIdForImagem: async (imagemId: string) => {
            const versao = await imagemArquivoRepository.findOne({
              where: { imagem: { id: imagemId } },
              relations: { arquivo: true },
              order: { dateCreated: "DESC" },
            });
            return versao?.arquivo?.id ?? null;
          },
        };

        return callback({
          imagemRepository: imagemRepoAdapter,
          imagemArquivoRepository: imagemArquivoRepoAdapter,
        });
      },
    );
  }
}
