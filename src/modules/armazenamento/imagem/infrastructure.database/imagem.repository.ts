import type { PartialEntity } from "@/domain/abstractions/entities";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { Imagem } from "@/modules/armazenamento/imagem/domain/imagem";
import type { IImagemRepository } from "@/modules/armazenamento/imagem/domain/repositories";
import { ImagemEntity } from "./typeorm/imagem.typeorm.entity";

@DeclareImplementation()
export class ImagemTypeOrmRepositoryAdapter implements IImagemRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  create(): Imagem {
    const repo = this.appTypeormConnection.getRepository(ImagemEntity);
    return repo.create() as unknown as Imagem;
  }

  merge(entity: Imagem, data: PartialEntity<Imagem>): void {
    const repo = this.appTypeormConnection.getRepository(ImagemEntity);
    repo.merge(entity as unknown as ImagemEntity, data as unknown as ImagemEntity);
  }

  async save(entity: PartialEntity<Imagem>): Promise<Imagem> {
    const repo = this.appTypeormConnection.getRepository(ImagemEntity);
    return repo.save(entity as unknown as ImagemEntity) as unknown as Promise<Imagem>;
  }
}
