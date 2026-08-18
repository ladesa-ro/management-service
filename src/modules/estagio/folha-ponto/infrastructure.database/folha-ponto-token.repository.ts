import { IsNull, Not } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { getNowISO } from "@/utils/date";

import { FolhaPontoToken } from "../domain/folha-ponto-token";
import type { IFolhaPontoTokenRepository } from "../domain/repositories";
import { FolhaPontoTokenTypeormEntity } from "./typeorm/folha-ponto-token.typeorm.entity";
import { FolhaPontoTokenTypeormMapper } from "./typeorm/folha-ponto-token.typeorm.mapper";

@Impl()
export class FolhaPontoTokenTypeOrmRepositoryAdapter implements IFolhaPontoTokenRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async save(token: FolhaPontoToken): Promise<void> {
    const entity = FolhaPontoTokenTypeormMapper.domainToPersistence.map(token);
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTokenTypeormEntity);
    await repo.save(entity);
  }

  async findById(id: string): Promise<FolhaPontoToken | null> {
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTokenTypeormEntity);
    const entity = await repo.findOne({
      where: { id },
      relations: { folhaPonto: true },
    });
    if (!entity) return null;
    return FolhaPontoTokenTypeormMapper.entityToDomain.map(entity);
  }

  async findAllByFolhaPontoId(folhaPontoId: string): Promise<FolhaPontoToken[]> {
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTokenTypeormEntity);
    const entities = await repo.find({
      where: { folhaPonto: { id: folhaPontoId } },
      relations: { folhaPonto: true },
      order: { dateCreated: "ASC" },
    });
    return entities.map(FolhaPontoTokenTypeormMapper.entityToDomain.map);
  }

  async invalidateAllExcept(folhaPontoId: string, exceptTokenId: string): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTokenTypeormEntity);

    await repo.update(
      {
        folhaPonto: { id: folhaPontoId },
        id: Not(exceptTokenId),
        usedAt: IsNull(),
      },
      {
        usedAt: getNowISO(),
        // Auditoria básica informando que foi invalidado em cascata
        userAgent: "System Cascade Invalidation",
      },
    );
  }

  async saveUsed(token: FolhaPontoToken): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(FolhaPontoTokenTypeormEntity);
    // Atualiza apenas os campos mutáveis para evitar overwrite acidental de outros tokens
    await repo.update(
      { id: token.id },
      {
        usedAt: token.usedAt,
        ipAddress: token.ipAddress,
        userAgent: token.userAgent,
      },
    );
  }
}
