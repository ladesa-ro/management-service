import type { PartialEntity } from "@/domain/abstractions/entities";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type { IImagemArquivoRepository } from "@/modules/armazenamento/imagem/domain/repositories";
import type { ImagemArquivo } from "@/modules/armazenamento/imagem-arquivo/domain/imagem-arquivo";
import { createImagemArquivoRepository } from "./typeorm/imagem-arquivo.typeorm.repository";

@DeclareImplementation()
export class ImagemArquivoTypeOrmRepositoryAdapter implements IImagemArquivoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  create(): ImagemArquivo {
    return createImagemArquivoRepository(
      this.appTypeormConnection,
    ).create() as unknown as ImagemArquivo;
  }

  merge(imagemArquivo: ImagemArquivo, data: PartialEntity<ImagemArquivo>): void {
    createImagemArquivoRepository(this.appTypeormConnection).merge(
      imagemArquivo as any,
      data as any,
    );
  }

  async findLatestArquivoIdForImagem(imagemId: string): Promise<string | null> {
    const versao = await createImagemArquivoRepository(this.appTypeormConnection).findOne({
      where: { imagem: { id: imagemId } },
      relations: { arquivo: true },
      order: { dateCreated: "DESC" },
    });

    return versao?.arquivo?.id ?? null;
  }
}
