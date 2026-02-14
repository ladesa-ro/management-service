import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/modules/@database-context";
import type { PartialEntity } from "@/modules/@shared";
import type {
  IImagemArquivoRepositoryPort,
  IImagemRepositoryPort,
  IImagemTransactionPort,
} from "@/modules/base/armazenamento/imagem/application/ports";
import type { Imagem } from "@/modules/base/armazenamento/imagem/domain/imagem.domain";
import type { ImagemArquivo } from "@/modules/base/armazenamento/imagem-arquivo/domain/imagem-arquivo.domain";

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
