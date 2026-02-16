import { Inject, Injectable } from "@nestjs/common";
import type { SelectQueryBuilder } from "typeorm";
import { DataSource } from "typeorm";
import type { IArquivoRepositoryPort } from "@/modules/@base/armazenamento/arquivo";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import type { ArquivoEntity } from "./arquivo.entity";
import { createArquivoRepository } from "./arquivo.repository";

@Injectable()
export class ArquivoTypeOrmRepositoryAdapter implements IArquivoRepositoryPort {
  constructor(@Inject(APP_DATA_SOURCE_TOKEN) private dataSource: DataSource) {}

  private get repository() {
    return createArquivoRepository(this.dataSource);
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<ArquivoEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  async save(arquivo: Partial<ArquivoEntity>): Promise<ArquivoEntity> {
    return this.repository.save(arquivo as ArquivoEntity);
  }
}
