import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import type {
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
} from "@/v2/adapters/in/http/horario-gerado-aula/dto";
import type { IHorarioGeradoAulaRepositoryPort } from "@/v2/core/horario-gerado-aula/application/ports";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { DatabaseContextService } from "../context/database-context.service";
import type { HorarioGeradoAulaEntity } from "../typeorm/entities";

const aliasHorarioGeradoAula = "horario_gerado_dia";

@Injectable()
export class HorarioGeradoAulaTypeOrmRepositoryAdapter implements IHorarioGeradoAulaRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get repository() {
    return this.databaseContext.horarioGeradoAulaRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutputDto> {
    const qb = this.repository.createQueryBuilder(aliasHorarioGeradoAula);

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    const paginated = await this.paginationAdapter.paginate(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",

        "diarioProfessor.id",
        "diarioProfessor.situacao",

        "intervaloDeTempo.id",
        "intervaloDeTempo.periodoInicio",
        "intervaloDeTempo.periodoFim",

        "horarioGerado.id",
        "horarioGerado.status",
        "horarioGerado.tipo",
        "horarioGerado.dataGeracao",
        "horarioGerado.vigenciaInicio",
        "horarioGerado.vigenciaFim",
      ],
      sortableColumns: [
        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",

        "diarioProfessor.id",
        "intervaloDeTempo.id",
        "horarioGerado.id",
      ],
      searchableColumns: [
        "id",

        "diaSemanaIso",
        "horarioGerado",
        "diarioProfessor",
        "intervaloDeTempo",
      ],
      relations: {
        diarioProfessor: true,
        intervaloDeTempo: true,
        horarioGerado: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "horarioGerado.id": [FilterOperator.EQ],
      },
    });

    qb.select([]);
    QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as HorarioGeradoAulaListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasHorarioGeradoAula);

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    qb.andWhere(`${aliasHorarioGeradoAula}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);

    const horarioGeradoAula = await qb.getOne();

    return horarioGeradoAula as HorarioGeradoAulaFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasHorarioGeradoAula);

    await accessContext.applyFilter("horario_gerado_aula:find", qb, aliasHorarioGeradoAula, null);

    qb.andWhere(`${aliasHorarioGeradoAula}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("HorarioGeradoAulaFindOneOutput", qb, aliasHorarioGeradoAula, selection);

    const horarioGeradoAula = await qb.getOne();

    return horarioGeradoAula as HorarioGeradoAulaFindOneOutputDto | null;
  }

  async save(
    horarioGeradoAula: DeepPartial<HorarioGeradoAulaEntity>,
  ): Promise<HorarioGeradoAulaEntity> {
    return this.repository.save(horarioGeradoAula as HorarioGeradoAulaEntity);
  }

  create(): HorarioGeradoAulaEntity {
    return this.repository.create();
  }

  merge(
    horarioGeradoAula: HorarioGeradoAulaEntity,
    data: DeepPartial<HorarioGeradoAulaEntity>,
  ): void {
    this.repository.merge(horarioGeradoAula, data as HorarioGeradoAulaEntity);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder(aliasHorarioGeradoAula)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :horarioGeradoAulaId", { horarioGeradoAulaId: id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }
}
