import type { SelectQueryBuilder } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type { IArquivoRepository } from "@/modules/armazenamento/arquivo";
import { ArquivoEntity } from "./typeorm/arquivo.typeorm.entity";

@Impl()
export class ArquivoTypeOrmRepositoryAdapter implements IArquivoRepository {
  constructor(@Dep(IAppTypeormConnection) private appTypeormConnection: IAppTypeormConnection) {}

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
