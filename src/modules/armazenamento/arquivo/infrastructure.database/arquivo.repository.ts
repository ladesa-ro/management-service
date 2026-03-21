import type { SelectQueryBuilder } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IArquivoRepository } from "@/modules/armazenamento/arquivo";
import { ArquivoEntity } from "./typeorm/arquivo.typeorm.entity";

@DeclareImplementation()
export class ArquivoTypeOrmRepositoryAdapter implements IArquivoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection) private appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(ArquivoEntity);
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<ArquivoEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  async save(arquivo: Partial<ArquivoEntity>): Promise<ArquivoEntity> {
    return this.repository.save(arquivo as ArquivoEntity);
  }
}
