import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { PartialEntity } from "@/Ladesa.Management.Application/@shared";
import type {
  IImagemArquivoRepository,
  IImagemRepository,
  IImagemTransaction,
} from "@/Ladesa.Management.Application/armazenamento/imagem/application/ports";
import type { Imagem } from "@/Ladesa.Management.Domain/Entities/Imagem";
import type { ImagemArquivo } from "@/Ladesa.Management.Domain/Entities/ImagemArquivo";
import { createImagemArquivoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateImagemArquivoRepository";
import { createImagemRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/CreateImagemRepository";
import { APP_DATA_SOURCE_TOKEN } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class ImagemTypeOrmRepositoryAdapter implements IImagemTransaction {
  constructor(@Inject(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource) {}

  async transaction<T>(
    callback: (context: {
      imagemRepository: IImagemRepository;
      imagemArquivoRepository: IImagemArquivoRepository;
    }) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.transaction(async (entityManager) => {
      const imagemRepository = createImagemRepository(entityManager);
      const imagemArquivoRepository = createImagemArquivoRepository(entityManager);

      const imagemRepoAdapter: IImagemRepository = {
        create: () => imagemRepository.create() as unknown as Imagem,
        merge: (imagem: Imagem, data: PartialEntity<Imagem>) => {
          imagemRepository.merge(imagem as any, data as any);
        },
        save: (imagem: PartialEntity<Imagem>) =>
          imagemRepository.save(imagem as any) as Promise<Imagem>,
      };

      const imagemArquivoRepoAdapter: IImagemArquivoRepository = {
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
