import { Injectable } from "@nestjs/common";
import type {
  IUsuarioRepositoryPort,
  UsuarioFindOneInput,
  UsuarioFindOneOutput,
  UsuarioListInput,
  UsuarioListOutput,
} from "@/core/usuario";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { QbEfficientLoad } from "@/v2/old/shared";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { UsuarioEntity } from "../typeorm/entities";

@Injectable()
export class UsuarioTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    UsuarioEntity,
    UsuarioListInput,
    UsuarioListOutput,
    UsuarioFindOneInput,
    UsuarioFindOneOutput
  >
  implements IUsuarioRepositoryPort
{
  protected readonly alias = "usuario";
  protected readonly authzAction = "usuario:find";
  protected readonly outputDtoName = "UsuarioFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.usuarioRepository;
  }

  async findByMatriculaSiape(
    matriculaSiape: string,
    selection?: string[] | boolean,
  ): Promise<UsuarioFindOneOutput | null> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.andWhere(`${this.alias}.matriculaSiape = :matriculaSiape`, {
      matriculaSiape: matriculaSiape,
    });

    qb.select([]);
    QbEfficientLoad(this.outputDtoName, qb, this.alias, selection);

    const usuario = await qb.getOne();

    return usuario as UsuarioFindOneOutput | null;
  }

  // Métodos específicos do Usuario que não estão na classe base

  async isMatriculaSiapeAvailable(
    matriculaSiape: string,
    excludeUsuarioId?: string | null,
  ): Promise<boolean> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.where(`${this.alias}.matriculaSiape = :matriculaSiape`, {
      matriculaSiape: matriculaSiape,
    });

    if (excludeUsuarioId) {
      qb.andWhere(`${this.alias}.id <> :excludeUsuarioId`, { excludeUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    return !exists;
  }

  async isEmailAvailable(email: string, excludeUsuarioId?: string | null): Promise<boolean> {
    const qb = this.repository.createQueryBuilder(this.alias);

    qb.where(`${this.alias}.email = :email`, { email: email });

    if (excludeUsuarioId) {
      qb.andWhere(`${this.alias}.id <> :excludeUsuarioId`, { excludeUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    return !exists;
  }

  async resolveProperty<Property extends keyof UsuarioEntity>(
    id: string,
    property: Property,
  ): Promise<UsuarioEntity[Property]> {
    const qb = this.repository.createQueryBuilder(this.alias);
    qb.select(`${this.alias}.${property}`);
    qb.where(`${this.alias}.id = :usuarioId`, { usuarioId: id });

    const usuario = await qb.getOneOrFail();
    return usuario[property];
  }

  protected getPaginateConfig(): IPaginationConfig<UsuarioEntity> {
    return {
      ...paginateConfig,
      select: ["id", "nome", "matriculaSiape", "email", "dateCreated"],
      sortableColumns: ["nome", "matriculaSiape", "email", "dateCreated"],
      searchableColumns: ["id", "nome", "matriculaSiape", "email"],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
        ["matriculaSiape", "ASC"],
      ],
      filterableColumns: {},
    };
  }
}
