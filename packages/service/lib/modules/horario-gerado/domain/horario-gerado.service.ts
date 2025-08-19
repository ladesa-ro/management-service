import { Injectable, NotFoundException } from "@nestjs/common";
import { has, map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { QbEfficientLoad } from "@/contracts/qb-efficient-load";
import { SearchService } from "@/legacy/application/helpers/search.service";
import { CalendarioLetivoService } from "@/legacy/application/resources/calendario/calendario-letivo/calendario-letivo.service";
import { type IDomain } from "@/legacy/domain/contracts/integration";
import type { AccessContext } from "@/shared/infrastructure/access-context";
import { paginateConfig } from "@/shared/infrastructure/fixtures";
import { DatabaseContextService } from "@/shared/infrastructure/integrations/database";
import type { HorarioGeradoEntity } from "@/shared/infrastructure/integrations/database/typeorm/entities";

// ============================================================================

const aliasHorarioGerado = "horario_gerado";

// ============================================================================

@Injectable()
export class HorarioGeradoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private calendarioLetivoService: CalendarioLetivoService,
    private searchService: SearchService,
  ) {}

  get horarioGeradoRepository() {
    return this.databaseContext.horarioGeradoRepository;
  }

  async horarioGeradoFindAll(accessContext: AccessContext, domain: IDomain.HorarioGeradoListInput | null = null, selection?: string[] | boolean): Promise<IDomain.HorarioGeradoListOutput["success"]> {
    // =========================================================

    const qb = this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    // =========================================================

    const paginated = await this.searchService.search(
      qb,
      { ...domain },
      {
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
      },
    );

    // =========================================================

    qb.select([]);

    await QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async horarioGeradoFindById(accessContext: AccessContext, domain: IDomain.HorarioGeradoFindOneInput, selection?: string[] | boolean): Promise<IDomain.HorarioGeradoFindOneOutput | null> {
    // =========================================================

    const qb = this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGerado}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);

    await QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    // =========================================================

    const horario = await qb.getOne();

    // =========================================================

    return horario;
  }

  async horarioGeradoFindByIdStrict(accessContext: AccessContext, domain: IDomain.HorarioGeradoFindOneInput, selection?: string[] | boolean) {
    const horario = await this.horarioGeradoFindById(accessContext, domain, selection);

    if (!horario) {
      throw new NotFoundException();
    }

    return horario;
  }

  async horarioGeradoFindByIdSimple(accessContext: AccessContext, id: IDomain.HorarioGeradoFindOneInput["id"], selection?: string[]): Promise<IDomain.HorarioGeradoFindOneOutput | null> {
    // =========================================================

    const qb = this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado);

    // =========================================================

    await accessContext.applyFilter("horario_gerado:find", qb, aliasHorarioGerado, null);

    // =========================================================

    qb.andWhere(`${aliasHorarioGerado}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("HorarioGeradoFindOneOutput", qb, aliasHorarioGerado, selection);

    // =========================================================

    const horario = await qb.getOne();

    // =========================================================

    return horario;
  }

  async horarioGeradoFindByIdSimpleStrict(accessContext: AccessContext, id: IDomain.HorarioGeradoFindOneInput["id"], selection?: string[]) {
    const horarioGerado = await this.horarioGeradoFindByIdSimple(accessContext, id, selection);

    if (!horarioGerado) {
      throw new NotFoundException();
    }

    return horarioGerado;
  }

  async horarioGeradoCreate(accessContext: AccessContext, domain: IDomain.HorarioGeradoCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado:create", { dto: domain });

    // =========================================================

    const dtoHorarioGerado = pick(domain, ["status", "tipo", "dataGeracao", "vigenciaInicio", "vigenciaFim"]);

    const horarioGerado = this.horarioGeradoRepository.create();

    this.horarioGeradoRepository.merge(horarioGerado, {
      ...dtoHorarioGerado,
    });

    // =========================================================

    if (domain.calendario) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, domain.calendario.id);

      this.horarioGeradoRepository.merge(horarioGerado, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoRepository.save(horarioGerado);

    // =========================================================

    return this.horarioGeradoFindByIdStrict(accessContext, {
      id: horarioGerado.id,
    });
  }

  async horarioGeradoUpdate(accessContext: AccessContext, domain: IDomain.HorarioGeradoUpdateInput) {
    // =========================================================

    const currentHorarioGerado = await this.horarioGeradoFindByIdStrict(accessContext, { id: domain.id });

    // =========================================================

    await accessContext.ensurePermission("horario_gerado:update", { dto: domain }, domain.id, this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado));

    const dtoHorarioGerado = pick(domain, ["status", "tipo", "dataGeracao", "vigenciaInicio", "vigenciaFim"]);

    const horarioGerado = {
      id: currentHorarioGerado.id,
    } as HorarioGeradoEntity;

    this.horarioGeradoRepository.merge(horarioGerado, {
      ...dtoHorarioGerado,
    });

    // =========================================================

    if (has(domain, "calendario") && domain.calendario !== undefined) {
      const calendario = await this.calendarioLetivoService.calendarioLetivoFindByIdSimpleStrict(accessContext, domain.calendario!.id);

      this.horarioGeradoRepository.merge(horarioGerado, {
        calendario: {
          id: calendario.id,
        },
      });
    }

    // =========================================================

    await this.horarioGeradoRepository.save(horarioGerado);

    // =========================================================

    return this.horarioGeradoFindByIdStrict(accessContext, {
      id: horarioGerado.id,
    });
  }

  async horarioGeradoDeleteOneById(accessContext: AccessContext, domain: IDomain.HorarioGeradoFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("horario_gerado:delete", { dto: domain }, domain.id, this.horarioGeradoRepository.createQueryBuilder(aliasHorarioGerado));

    // =========================================================

    const horarioGerado = await this.horarioGeradoFindByIdStrict(accessContext, domain);

    // =========================================================

    if (horarioGerado) {
      await this.horarioGeradoRepository
        .createQueryBuilder(aliasHorarioGerado)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :horarioGeradoId", { horarioGeradoId: horarioGerado.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
