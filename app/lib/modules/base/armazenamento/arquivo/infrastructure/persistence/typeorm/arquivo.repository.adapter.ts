import { Injectable } from "@nestjs/common";
import type { SelectQueryBuilder } from "typeorm";
import { DatabaseContextService } from "@/modules/@database-context";
import type { IArquivoRepositoryPort } from "@/modules/base/armazenamento/arquivo";
import type { ArquivoEntity } from "./arquivo.entity";

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
