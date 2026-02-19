import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type {
  IImagemArquivoRepositoryPort,
  IImagemRepositoryPort,
  IImagemTransactionPort,
} from "@/modules/@base/armazenamento/imagem/application/ports";
import type { Imagem } from "@/modules/@base/armazenamento/imagem/domain/imagem.domain";
import type { ImagemArquivo } from "@/modules/@base/armazenamento/imagem-arquivo/domain/imagem-arquivo.domain";
import type { PartialEntity } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { createImagemArquivoRepository } from "../../../../imagem-arquivo/infrastructure/persistence/typeorm/imagem-arquivo.repository";
import { createImagemRepository } from "./imagem.repository";

@Injectable()
export class ImagemTypeOrmRepositoryAdapter implements IImagemTransactionPort {
  constructor(@Inject(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource) {}

  async transaction<T>(
    callback: (context: {
      imagemRepository: IImagemRepositoryPort;
      imagemArquivoRepository: IImagemArquivoRepositoryPort;
    }) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(async (entityManager) => {
      const imagemRepository = createImagemRepository(entityManager);
      const imagemArquivoRepository = createImagemArquivoRepository(entityManager);

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
    });
  }
}
