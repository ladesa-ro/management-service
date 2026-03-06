import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { PartialEntity } from "@/Ladesa.Management.Application/@shared";
import type { IImagemArquivoRepositoryPort } from "@/Ladesa.Management.Application/armazenamento/imagem/application/ports";
import type { ImagemArquivo } from "@/Ladesa.Management.Application/armazenamento/imagem-arquivo/domain/imagem-arquivo.domain";
import { createImagemArquivoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ImagemArquivoRepository";
import { APP_DATA_SOURCE_TOKEN } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

@Injectable()
export class ImagemArquivoTypeOrmRepositoryAdapter implements IImagemArquivoRepositoryPort {
  constructor(@Inject(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource) {}

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
