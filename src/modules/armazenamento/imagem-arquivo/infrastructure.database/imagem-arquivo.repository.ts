import { DataSource } from "typeorm";
import type { PartialEntity } from "@/domain/abstractions/entities";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type { IImagemArquivoRepository } from "@/modules/armazenamento/imagem/domain/repositories";
import type { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
import { createImagemArquivoRepository } from "./typeorm/imagem-arquivo.typeorm.repository";

@DeclareImplementation()
export class ImagemArquivoTypeOrmRepositoryAdapter implements IImagemArquivoRepository {
  constructor(@DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource) {}

  create(): ImagemArquivo {
    return createImagemArquivoRepository(this.dataSource).create() as unknown as ImagemArquivo;
  }

  merge(imagemArquivo: ImagemArquivo, data: PartialEntity<ImagemArquivo>): void {
    createImagemArquivoRepository(this.dataSource).merge(imagemArquivo as any, data as any);
  }

  async findLatestArquivoIdForImagem(imagemId: string): Promise<string | null> {
    const versao = await createImagemArquivoRepository(this.dataSource).findOne({
      where: { imagem: { id: imagemId } },
      relations: { arquivo: true },
      order: { dateCreated: "DESC" },
    });

    return versao?.arquivo?.id ?? null;
  }
}
