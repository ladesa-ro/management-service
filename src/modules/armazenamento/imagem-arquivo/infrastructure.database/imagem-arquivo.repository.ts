import type { PartialEntity } from "@/domain/abstractions/entities";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IImagemArquivoRepository } from "@/modules/armazenamento/imagem/domain/repositories";
import type { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
import { ImagemArquivoEntity } from "./typeorm/imagem-arquivo.typeorm.entity";

@DeclareImplementation()
export class ImagemArquivoTypeOrmRepositoryAdapter implements IImagemArquivoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  create(): ImagemArquivo {
    return this.appTypeormConnection
      .getRepository(ImagemArquivoEntity)
      .create() as unknown as ImagemArquivo;
  }

  merge(imagemArquivo: ImagemArquivo, data: PartialEntity<ImagemArquivo>): void {
    this.appTypeormConnection
      .getRepository(ImagemArquivoEntity)
      .merge(
        imagemArquivo as unknown as ImagemArquivoEntity,
        data as unknown as ImagemArquivoEntity,
      );
  }

  async findLatestArquivoIdForImagem(imagemId: string): Promise<string | null> {
    const versao = await this.appTypeormConnection.getRepository(ImagemArquivoEntity).findOne({
      where: { imagem: { id: imagemId } },
      relations: { arquivo: true },
      order: { dateCreated: "DESC" },
    });

    return versao?.arquivo?.id ?? null;
  }
}
