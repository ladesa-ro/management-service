import { Injectable } from "@nestjs/common";
import type { PartialEntity } from "@/core/@shared";
import type { IImagemArquivoRepositoryPort } from "@/core/imagem/application/ports";
import type { ImagemArquivo } from "@/core/imagem-arquivo/domain/imagem-arquivo.domain";
import { DatabaseContextService } from "../context/database-context.service";

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
