import { Injectable } from "@nestjs/common";
import type { PartialEntity } from "@/core/@shared";
import type {
  IImagemArquivoRepositoryPort,
  IImagemRepositoryPort,
  IImagemTransactionPort,
} from "@/core/imagem/application/ports";
import type { Imagem } from "@/core/imagem/domain/imagem.domain";
import type { ImagemArquivo } from "@/core/imagem-arquivo/domain/imagem-arquivo.domain";
import { DatabaseContextService } from "../context/database-context.service";

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
          create: () => imagemRepository.create() as unknown as Imagem,
          merge: (imagem: Imagem, data: PartialEntity<Imagem>) => {
            imagemRepository.merge(imagem as any, data as any);
          },
          save: (imagem: PartialEntity<Imagem>) =>
            imagemRepository.save(imagem as any) as Promise<Imagem>,
        };

        const imagemArquivoRepoAdapter: IImagemArquivoRepositoryPort = {
          create: () => imagemArquivoRepository.create() as unknown as ImagemArquivo,
          merge: (imagemArquivo: ImagemArquivo, data: PartialEntity<ImagemArquivo>) => {
            imagemArquivoRepository.merge(imagemArquivo as any, data as any);
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
