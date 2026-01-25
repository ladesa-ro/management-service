import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import { DatabaseContextService } from "../context/database-context.service";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import type { IHorarioGeradoRepositoryPort } from "@/v2/core/horario-gerado/application/ports";
import type { HorarioGeradoEntity } from "../typeorm/entities";
import type {
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
} from "@/v2/adapters/in/http/horario-gerado/dto";

const aliasHorarioGerado = "horario_gerado";

@Injectable()
export class HorarioGeradoTypeOrmRepositoryAdapter implements IHorarioGeradoRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get repository() {
    return this.databaseContext.horarioGeradoRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutputDto> {
    const qb = this.repository.createQueryBuilder(aliasHorarioGerado);

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    const paginated = await this.paginationAdapter.paginate(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",
        "calendario",

        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      sortableColumns: [
        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",

        "calendario.id",
        "calendario.nome",
        "calendario.ano",
      ],
      searchableColumns: [
        "id",

        "status",
        "tipo",
        "dataGeracao",
        "vigenciaInicio",
        "vigenciaFim",
        "calendario",
      ],
      relations: {
        calendario: true,
      },
      defaultSortBy: [],
      filterableColumns: {
        "calendario.id": [FilterOperator.EQ],
        "calendario.nome": [FilterOperator.EQ],
        "calendario.ano": [FilterOperator.EQ],
      },
    });

    qb.select([]);
    QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as HorarioGeradoListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasHorarioGerado);

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    qb.andWhere(`${aliasHorarioGerado}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    const horarioGerado = await qb.getOne();

    return horarioGerado as HorarioGeradoFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasHorarioGerado);

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    qb.andWhere(`${aliasHorarioGerado}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    const horarioGerado = await qb.getOne();

    return horarioGerado as HorarioGeradoFindOneOutputDto | null;
  }

  async save(horarioGerado: DeepPartial<HorarioGeradoEntity>): Promise<HorarioGeradoEntity> {
    return this.repository.save(horarioGerado as HorarioGeradoEntity);
  }

  create(): HorarioGeradoEntity {
    return this.repository.create();
  }

  merge(horarioGerado: HorarioGeradoEntity, data: DeepPartial<HorarioGeradoEntity>): void {
    this.repository.merge(horarioGerado, data as HorarioGeradoEntity);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder(aliasHorarioGerado)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :horarioGeradoId", { horarioGeradoId: id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }
}
