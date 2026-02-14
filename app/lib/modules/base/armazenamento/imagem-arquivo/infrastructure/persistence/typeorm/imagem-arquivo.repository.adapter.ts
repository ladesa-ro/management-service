import { Injectable } from "@nestjs/common";
import { DatabaseContextService } from "@/modules/@database-context";
import type { PartialEntity } from "@/modules/@shared";
import type { IImagemArquivoRepositoryPort } from "@/modules/base/armazenamento/imagem/application/ports";
import type { ImagemArquivo } from "@/modules/base/armazenamento/imagem-arquivo/domain/imagem-arquivo.domain";

@Injectable()
export class ImagemArquivoTypeOrmRepositoryAdapter implements IImagemArquivoRepositoryPort {
  constructor(private readonly databaseContext: DatabaseContextService) {}

  create(): ImagemArquivo {
    return this.databaseContext.imagemArquivoRepository.create() as unknown as ImagemArquivo;
  }

  merge(imagemArquivo: ImagemArquivo, data: PartialEntity<ImagemArquivo>): void {
    this.databaseContext.imagemArquivoRepository.merge(imagemArquivo as any, data as any);
  }

  async findLatestArquivoIdForImagem(imagemId: string): Promise<string | null> {
    const versao = await this.databaseContext.imagemArquivoRepository.findOne({
      where: { imagem: { id: imagemId } },
      relations: { arquivo: true },
      order: { dateCreated: "DESC" },
    });

    return versao?.arquivo?.id ?? null;
  }
}
