import { Inject, Injectable } from "@nestjs/common";
import type { SelectQueryBuilder } from "typeorm";
import { DataSource } from "typeorm";
import type { IArquivoRepositoryPort } from "@/Ladesa.Management.Application/armazenamento/arquivo";
import type { ArquivoEntity } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Entities/ArquivoEntity";
import { createArquivoRepository } from "@/Ladesa.Management.Infrastructure.Database/TypeOrmNew/Repositories/ArquivoRepository";
import { APP_DATA_SOURCE_TOKEN } from "@/Ladesa.Management.Infrastructure.Database/typeorm";

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
