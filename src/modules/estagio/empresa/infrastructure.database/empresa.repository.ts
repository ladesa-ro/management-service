import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { NestJsPaginateAdapter } from "@/infrastructure.database/pagination/adapters/nestjs-paginate.adapter";
import { buildTypeOrmPaginateConfig } from "@/infrastructure.database/pagination/adapters/pagination-spec.adapter";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import {
  typeormFindAll,
  typeormFindById,
  typeormSoftDeleteById,
} from "@/infrastructure.database/typeorm/helpers/typeorm-repository-helpers";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import type {
  EmpresaFindOneQuery,
  EmpresaFindOneQueryResult,
  EmpresaListQuery,
  EmpresaListQueryResult,
} from "@/modules/estagio/empresa/domain/queries";
import { empresaPaginationSpec } from "@/modules/estagio/empresa/domain/queries";
import type { IEmpresaRepository } from "@/modules/estagio/empresa/domain/repositories";
import { EmpresaTypeormEntity, EmpresaTypeormMapper } from "./typeorm";

const config = {
  alias: "empresa",
} as const;

const empresaRelations = {
  endereco: {
    cidade: {
      estado: true,
    },
  },
};

const empresaPaginateConfig = buildTypeOrmPaginateConfig<EmpresaTypeormEntity>(
  empresaPaginationSpec,
  empresaRelations,
);

/** Relations para o write side (loadById). */
const writeRelations = {
  endereco: true,
} as const;

@Impl()
export class EmpresaTypeOrmRepositoryAdapter implements IEmpresaRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Empresa | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaTypeormEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Empresa.load(EmpresaTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Empresa): Promise<void> {
    const entityData = EmpresaTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(EmpresaTypeormEntity);
    await repo.save(repo.create({ id: aggregate.id, ...entityData } as EmpresaTypeormEntity));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(this.appTypeormConnection, EmpresaTypeormEntity, config.alias, id);
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: EmpresaFindOneQuery) {
    return typeormFindById<EmpresaTypeormEntity, EmpresaFindOneQuery, EmpresaFindOneQueryResult>(
      this.appTypeormConnection,
      EmpresaTypeormEntity,
      { ...config, paginateConfig: empresaPaginateConfig },
      dto,
      EmpresaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(accessContext: IAccessContext | null, dto: EmpresaListQuery | null = null) {
    return typeormFindAll<EmpresaTypeormEntity, EmpresaListQuery, EmpresaListQueryResult>(
      this.appTypeormConnection,
      EmpresaTypeormEntity,
      { ...config, paginateConfig: empresaPaginateConfig },
      this.paginationAdapter,
      dto,
      EmpresaTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
