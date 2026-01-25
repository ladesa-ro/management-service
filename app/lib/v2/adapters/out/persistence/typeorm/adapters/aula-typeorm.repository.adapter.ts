import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import type {
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
} from "@/v2/adapters/in/http/aula/dto";
import type { IAulaRepositoryPort } from "@/v2/core/aula/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { DatabaseContextService } from "../context/database-context.service";
import type { AulaEntity } from "../typeorm/entities";

const aliasAula = "aula";

@Injectable()
export class AulaTypeOrmRepositoryAdapter implements IAulaRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get repository() {
    return this.databaseContext.aulaRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: AulaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutputDto> {
    const qb = this.repository.createQueryBuilder(aliasAula);

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    const paginated = await this.paginationAdapter.paginate(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "formato",
        "data",

        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",
        "diario.id",
        "diario.ativo",
        "ambiente.id",
        "ambiente.nome",
      ],
      sortableColumns: [
        "data",
        "formato",

        "diario.ativo",
        "ambiente.nome",
      ],
      relations: {
        ambiente: true,
        diario: true,
        intervaloDeTempo: true,
      },
      searchableColumns: [
        "id",

        "formato",
        "data",
        "ambiente.nome",
      ],
      defaultSortBy: [],
      filterableColumns: {
        "intervaloDeTempo.id": [FilterOperator.EQ],
        "diario.id": [FilterOperator.EQ],
        "ambiente.id": [FilterOperator.EQ],
      },
    });

    qb.select([]);
    QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as AulaListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasAula);

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    qb.andWhere(`${aliasAula}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    const aula = await qb.getOne();

    return aula as AulaFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasAula);

    await accessContext.applyFilter("aula:find", qb, aliasAula, null);

    qb.andWhere(`${aliasAula}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("AulaFindOneOutput", qb, aliasAula, selection);

    const aula = await qb.getOne();

    return aula as AulaFindOneOutputDto | null;
  }

  async save(aula: DeepPartial<AulaEntity>): Promise<AulaEntity> {
    return this.repository.save(aula as AulaEntity);
  }

  create(): AulaEntity {
    return this.repository.create();
  }

  merge(aula: AulaEntity, data: DeepPartial<AulaEntity>): void {
    this.repository.merge(aula, data as AulaEntity);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder(aliasAula)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :aulaId", { aulaId: id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }
}
