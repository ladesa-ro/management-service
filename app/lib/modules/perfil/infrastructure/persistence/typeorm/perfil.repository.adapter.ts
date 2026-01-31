import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import { DatabaseContextService } from "@/modules/@database-context";
import type { IPaginationCriteria, IPaginationResult } from "@/modules/@shared";
import {
  BaseTypeOrmRepositoryAdapter,
  type ITypeOrmPaginationConfig,
  NestJsPaginateAdapter,
  paginateConfig,
  QbEfficientLoad,
} from "@/modules/@shared/infrastructure/persistence/typeorm";
import type {
  PerfilFindOneInput,
  PerfilFindOneOutput,
  PerfilListInput,
  PerfilListOutput,
} from "@/modules/perfil/application/dtos";
import type { IPerfilRepositoryPort } from "@/modules/perfil/application/ports";
import type { UsuarioEntity } from "@/modules/usuario/infrastructure/persistence/typeorm";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type { PerfilEntity } from "./perfil.entity";

@Injectable()
export class PerfilTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    PerfilEntity,
    PerfilListInput,
    PerfilListOutput,
    PerfilFindOneInput,
    PerfilFindOneOutput
  >
  implements IPerfilRepositoryPort
{
  protected readonly alias = "vinculo";
  protected readonly authzAction = "vinculo:find";
  protected readonly outputDtoName = "PerfilFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.perfilRepository;
  }

  async findAllActiveByUsuarioId(
    accessContext: AccessContext | null,
    usuarioId: UsuarioEntity["id"],
  ): Promise<PerfilFindOneOutput[]> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.innerJoin(`${this.alias}.usuario`, "usuario");
    qb.where("usuario.id = :usuarioId", { usuarioId });
    qb.andWhere(`${this.alias}.ativo = :ativo`, { ativo: true });

    if (accessContext) {
      await accessContext.applyFilter(this.authzAction, qb, this.alias, null);
    }

    QbEfficientLoad(this.outputDtoName, qb, this.alias);

    const vinculos = await qb.getMany();

    return vinculos as unknown as PerfilFindOneOutput[];
  }

  // Métodos específicos do Perfil que não estão na classe base

  async findPaginated(
    accessContext: AccessContext,
    criteria: IPaginationCriteria | null,
    config: ITypeOrmPaginationConfig<PerfilFindOneOutput>,
    selection?: string[] | boolean,
  ): Promise<IPaginationResult<PerfilFindOneOutput>> {
    const qb = this.repository.createQueryBuilder(this.alias);

    QbEfficientLoad(this.outputDtoName, qb, this.alias, selection);

    await accessContext.applyFilter(this.authzAction, qb, this.alias, null);

    return this.paginationAdapter.paginate(qb, criteria, config) as unknown as Promise<
      IPaginationResult<PerfilFindOneOutput>
    >;
  }

  async saveMany(perfis: DeepPartial<PerfilEntity>[]): Promise<void> {
    for (const perfil of perfis) {
      await this.repository.save(perfil);
    }
  }

  async findByUsuarioAndCampus(
    usuarioId: string,
    campusId: string,
  ): Promise<PerfilFindOneOutput[]> {
    const vinculos = await this.repository
      .createQueryBuilder(this.alias)
      .innerJoin(`${this.alias}.campus`, "campus")
      .innerJoin(`${this.alias}.usuario`, "usuario")
      .andWhere("campus.id = :campusId", { campusId })
      .andWhere("usuario.id = :usuarioId", { usuarioId })
      .select([this.alias, "campus", "usuario"])
      .getMany();

    return vinculos as unknown as PerfilFindOneOutput[];
  }

  async deactivateByIds(ids: string[]): Promise<void> {
    if (ids.length === 0) return;

    await this.repository
      .createQueryBuilder(this.alias)
      .update()
      .set({
        ativo: false,
      })
      .where("ativo = :isActive", { isActive: true })
      .andWhereInIds(ids)
      .execute();
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<PerfilEntity> {
    return {
      ...paginateConfig,
      relations: {
        campus: true,
        usuario: true,
      },
      select: [
        "id",
        "ativo",
        "cargo",
        "usuario.nome",
        "campus.id",
        "campus.nomeFantasia",
        "campus.razaoSocial",
        "campus.apelido",
        "campus.cnpj",
        "usuario.id",
        "usuario.matriculaSiape",
        "usuario.email",
        "dateCreated",
      ],
      searchableColumns: ["cargo"],
      filterableColumns: {
        ativo: [FilterOperator.EQ],
        cargo: [FilterOperator.EQ],
        "campus.id": [FilterOperator.EQ],
        "usuario.id": [FilterOperator.EQ],
      },
    };
  }
}
