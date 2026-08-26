import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { EmpresaScore } from "../domain/empresa-score";
import type { EmpresaScoreFindOneQueryResult } from "../domain/queries/empresa-score-find-one.query.result";
import type { IEmpresaScoreRepository } from "../domain/repositories/empresa-score.repository.interface";
import {
  EmpresaScoreHistoricoTypeormEntity,
  EmpresaScoreTypeormEntity,
  EmpresaScoreTypeormMapper,
} from "./typeorm";

@Impl()
export class EmpresaScoreTypeOrmRepositoryAdapter implements IEmpresaScoreRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async loadByEmpresaId(
    _accessContext: IAccessContext | null,
    empresaId: string,
  ): Promise<EmpresaScore | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaScoreTypeormEntity);
    const entity = await repo.findOne({
      where: { empresa: { id: empresaId }, dateDeleted: IsNull() },
      relations: { empresa: true },
    });

    if (!entity) return null;
    return EmpresaScore.load(EmpresaScoreTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: EmpresaScore): Promise<void> {
    const entityData = EmpresaScoreTypeormMapper.domainToPersistence.map(aggregate);
    const repo = this.appTypeormConnection.getRepository(EmpresaScoreTypeormEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as EmpresaScoreTypeormEntity));
  }

  async saveScoreHistorico(historico: {
    id?: string;
    empresaId: string;
    score: number;
    averageRating: number;
    totalReviews: number;
    scoreVersion: number;
    indicatorsJson?: Record<string, any> | null;
    calculatedAt: string;
  }): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(EmpresaScoreHistoricoTypeormEntity);
    await repo.save({
      id: historico.id,
      empresa: { id: historico.empresaId } as any,
      score: historico.score,
      averageRating: historico.averageRating,
      totalReviews: historico.totalReviews,
      scoreVersion: historico.scoreVersion,
      indicatorsJson: historico.indicatorsJson,
      calculatedAt: historico.calculatedAt,
    });
  }

  async getFindOneQueryResult(
    _accessContext: IAccessContext | null,
    dto: { empresaId: string },
  ): Promise<EmpresaScoreFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaScoreTypeormEntity);
    const entity = await repo.findOne({
      where: { empresa: { id: dto.empresaId }, dateDeleted: IsNull() },
      relations: { empresa: true },
    });

    if (!entity) return null;
    return EmpresaScoreTypeormMapper.entityToFindOneQueryResult.map(entity);
  }
}
