import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import { DatabaseContextService } from "../context/database-context.service";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import type { IDiarioRepositoryPort } from "@/v2/core/diario/application/ports";
import type { DiarioEntity } from "../typeorm/entities";
import type {
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
} from "@/v2/adapters/in/http/diario/dto";

const aliasDiario = "diario";

@Injectable()
export class DiarioTypeOrmRepositoryAdapter implements IDiarioRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get repository() {
    return this.databaseContext.diarioRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto> {
    const qb = this.repository.createQueryBuilder(aliasDiario);

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    const paginated = await this.paginationAdapter.paginate(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "ativo",

        "turma.id",
        "turma.periodo",
        "disciplina.id",
        "disciplina.nome",
        "ambientePadrao.id",
        "ambientePadrao.nome",
      ],
      sortableColumns: [
        "ativo",

        "disciplina.nome",
        "ambientePadrao.nome",
      ],
      relations: {
        turma: true,
        disciplina: true,
        ambientePadrao: true,
      },
      searchableColumns: [
        "id",

        "ativo",
        "ano",
        "etapa",
        "turma.periodo",
        "disciplina.nome",
      ],
      defaultSortBy: [],
      filterableColumns: {
        "turma.id": [FilterOperator.EQ],
        "disciplina.id": [FilterOperator.EQ],
        "ambientePadrao.id": [FilterOperator.EQ],
      },
    });

    qb.select([]);
    QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as DiarioListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasDiario);

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    qb.andWhere(`${aliasDiario}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    const diario = await qb.getOne();

    return diario as DiarioFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasDiario);

    await accessContext.applyFilter("diario:find", qb, aliasDiario, null);

    qb.andWhere(`${aliasDiario}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("DiarioFindOneOutput", qb, aliasDiario, selection);

    const diario = await qb.getOne();

    return diario as DiarioFindOneOutputDto | null;
  }

  async save(diario: DeepPartial<DiarioEntity>): Promise<DiarioEntity> {
    return this.repository.save(diario as DiarioEntity);
  }

  create(): DiarioEntity {
    return this.repository.create();
  }

  merge(diario: DiarioEntity, data: DeepPartial<DiarioEntity>): void {
    this.repository.merge(diario, data as DiarioEntity);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder(aliasDiario)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :diarioId", { diarioId: id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }
}
