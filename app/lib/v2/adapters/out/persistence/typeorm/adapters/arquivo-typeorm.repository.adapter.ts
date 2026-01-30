import { Injectable } from "@nestjs/common";
import type { SelectQueryBuilder } from "typeorm";
import type { IArquivoRepositoryPort } from "@/core/arquivo";
import { DatabaseContextService } from "../context/database-context.service";
import type { ArquivoEntity } from "../typeorm/entities";

@Injectable()
export class ArquivoTypeOrmRepositoryAdapter implements IArquivoRepositoryPort {
  constructor(private databaseContext: DatabaseContextService) {}

  private get repository() {
    return this.databaseContext.arquivoRepository;
  }

  createQueryBuilder(alias: string): SelectQueryBuilder<ArquivoEntity> {
    return this.repository.createQueryBuilder(alias);
  }

  async save(arquivo: Partial<ArquivoEntity>): Promise<ArquivoEntity> {
    return this.repository.save(arquivo as ArquivoEntity);
  }
}
