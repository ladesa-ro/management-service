import { Injectable } from "@nestjs/common";
import type { DeepPartial } from "typeorm";
import type { IImagemArquivoRepositoryPort } from "@/core/imagem/application/ports";
import { DatabaseContextService } from "../context/database-context.service";
import type { ImagemArquivoEntity } from "../typeorm/entities";

@Injectable()
export class ImagemArquivoTypeOrmRepositoryAdapter implements IImagemArquivoRepositoryPort {
  constructor(private readonly databaseContext: DatabaseContextService) {}

  create(): ImagemArquivoEntity {
    return this.databaseContext.imagemArquivoRepository.create();
  }

  merge(imagemArquivo: ImagemArquivoEntity, data: DeepPartial<ImagemArquivoEntity>): void {
    this.databaseContext.imagemArquivoRepository.merge(imagemArquivo, data as ImagemArquivoEntity);
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
