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
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type {
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioListQueryResult,
} from "@/modules/estagio/estagiario/domain/queries";
import { estagiarioPaginationSpec } from "@/modules/estagio/estagiario/domain/queries";
import type { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { EstagiarioTypeormEntity, EstagiarioTypeormMapper } from "./typeorm";

const config = {
  alias: "estagiario",
} as const;

const estagiarioRelations = {
  perfil: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
    usuario: true,
  },
  curso: {
    campus: {
      endereco: {
        cidade: {
          estado: true,
        },
      },
    },
    ofertaFormacao: {
      modalidade: true,
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
    },
  },
  turma: {
    curso: {
      campus: {
        endereco: {
          cidade: {
            estado: true,
          },
        },
      },
      ofertaFormacao: {
        modalidade: true,
        campus: {
          endereco: {
            cidade: {
              estado: true,
            },
          },
        },
      },
    },
  },
};

const estagiarioPaginateConfig = buildTypeOrmPaginateConfig<EstagiarioTypeormEntity>(
  estagiarioPaginationSpec,
  estagiarioRelations,
);

/** Relations para o write side (loadById). */
const writeRelations = {
  perfil: true,
  curso: true,
  turma: true,
} as const;

@Impl()
export class EstagiarioTypeOrmRepositoryAdapter implements IEstagiarioRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
    private readonly paginationAdapter: NestJsPaginateAdapter,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(_accessContext: IAccessContext | null, id: string): Promise<Estagiario | null> {
    const repo = this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);

    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: writeRelations,
    });

    if (!entity) return null;

    return Estagiario.load(EstagiarioTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: Estagiario): Promise<void> {
    const entityData = EstagiarioTypeormMapper.domainToPersistence.map({ ...aggregate });
    const repo = this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);
    await repo.save(repo.create(entityData));
  }

  softDeleteById(id: string) {
    return typeormSoftDeleteById(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      config.alias,
      id,
    );
  }

  // ==========================================
  // Read side
  // ==========================================

  getFindOneQueryResult(accessContext: IAccessContext | null, dto: EstagiarioFindOneQuery) {
    return typeormFindById<
      EstagiarioTypeormEntity,
      EstagiarioFindOneQuery,
      EstagiarioFindOneQueryResult
    >(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      { ...config, paginateConfig: estagiarioPaginateConfig },
      dto,
      EstagiarioTypeormMapper.entityToFindOneQueryResult.map,
    );
  }

  getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: EstagiarioListQuery | null = null,
  ) {
    return typeormFindAll<EstagiarioTypeormEntity, EstagiarioListQuery, EstagiarioListQueryResult>(
      this.appTypeormConnection,
      EstagiarioTypeormEntity,
      { ...config, paginateConfig: estagiarioPaginateConfig },
      this.paginationAdapter,
      dto,
      EstagiarioTypeormMapper.entityToFindOneQueryResult.map,
    );
  }
}
