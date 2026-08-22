import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { CalendarioSolicitacaoMudanca } from "../domain/calendario-solicitacao-mudanca";
import type {
  CalendarioSolicitacaoMudancaFindOneQuery,
  CalendarioSolicitacaoMudancaFindOneQueryResult,
  CalendarioSolicitacaoMudancaListQuery,
  CalendarioSolicitacaoMudancaListQueryResult,
} from "../domain/queries";
import { calendarioSolicitacaoMudancaPaginationSpec } from "../domain/queries";
import type { ICalendarioSolicitacaoMudancaRepository } from "../domain/repositories";
import {
  CalendarioSolicitacaoMudancaEntity,
  CalendarioSolicitacaoMudancaTypeormMapper,
} from "./typeorm";

const config = {
  alias: "calendario_solicitacao_mudanca",
} as const;

const calendarioSolicitacaoMudancaRelations = {
  autor: true,
  calendarioAgendamento: true,
  sessaoEdicao: true,
};

const calendarioSolicitacaoMudancaPaginateConfig =
  buildTypeOrmPaginateConfig<CalendarioSolicitacaoMudancaEntity>(
    calendarioSolicitacaoMudancaPaginationSpec,
    calendarioSolicitacaoMudancaRelations,
  );

const writeRelations = {
  autor: true,
  calendarioAgendamento: true,
  sessaoEdicao: true,
} as const;

@Impl()
export class CalendarioSolicitacaoMudancaTypeOrmRepositoryAdapter
  implements ICalendarioSolicitacaoMudancaRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<CalendarioSolicitacaoMudanca | null> {
    const repo = this.appTypeormConnection.getRepository(CalendarioSolicitacaoMudancaEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return CalendarioSolicitacaoMudanca.load(
      CalendarioSolicitacaoMudancaTypeormMapper.entityToDomain.map(entity),
    );
  }

  async save(aggregate: CalendarioSolicitacaoMudanca): Promise<void> {
    const entityData = CalendarioSolicitacaoMudancaTypeormMapper.domainToPersistence.map({
      ...aggregate,
    });
    const repo = this.appTypeormConnection.getRepository(CalendarioSolicitacaoMudancaEntity);
    await repo.save(
      repo.create({
        id: aggregate.id,
        ...entityData,
      } as CalendarioSolicitacaoMudancaEntity),
    );
  }

  getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioSolicitacaoMudancaFindOneQuery,
  ) {
    return typeormFindById<
      CalendarioSolicitacaoMudancaEntity,
      CalendarioSolicitacaoMudancaFindOneQuery,
      CalendarioSolicitacaoMudancaFindOneQueryResult
    >(
      this.appTypeormConnection,
      CalendarioSolicitacaoMudancaEntity,
      { ...config, paginateConfig: calendarioSolicitacaoMudancaPaginateConfig },
      dto,
      CalendarioSolicitacaoMudancaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: CalendarioSolicitacaoMudancaListQuery | null = null,
  ) {
    return typeormFindAll<
      CalendarioSolicitacaoMudancaEntity,
      CalendarioSolicitacaoMudancaListQuery,
      CalendarioSolicitacaoMudancaListQueryResult
    >(
      this.appTypeormConnection,
      CalendarioSolicitacaoMudancaEntity,
      { ...config, paginateConfig: calendarioSolicitacaoMudancaPaginateConfig },
      this.paginationAdapter,
      dto,
      CalendarioSolicitacaoMudancaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
