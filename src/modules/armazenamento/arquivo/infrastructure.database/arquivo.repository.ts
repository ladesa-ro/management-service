import type { SelectQueryBuilder } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type { IArquivoRepository } from "@/modules/armazenamento/arquivo";
import type { ArquivoEntity } from "./typeorm/arquivo.typeorm.entity";
import { createArquivoRepository } from "./typeorm/arquivo.typeorm.repository";

@DeclareImplementation()
export class ArquivoTypeOrmRepositoryAdapter implements IArquivoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection) private appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return createArquivoRepository(this.appTypeormConnection);
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<ArquivoEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  async save(arquivo: Partial<ArquivoEntity>): Promise<ArquivoEntity> {
    return this.repository.save(arquivo as ArquivoEntity);
  }
}
