import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/infrastructure.database";
import type { DisponibilidadeEntity } from "@/v2/infrastructure.database/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  DisponibilidadeFindOneOutputDto,
  DisponibilidadeListInputDto,
  DisponibilidadeListOutputDto,
  DisponibilidadeCreateInputDto,
  DisponibilidadeUpdateInputDto,
  DisponibilidadeFindOneInputDto,
} from "../dto";

// ============================================================================

const aliasDisponibilidade = "disponibilidade";

// ============================================================================

@Injectable()
export class DisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get disponibilidadeRepository() {
    return this.databaseContext.disponibilidadeRepository;
  }

  async disponibilidadeFindAll(accessContext: AccessContext, dto: DisponibilidadeListInputDto | null = null, selection?: string[]): Promise<DisponibilidadeListOutputDto> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      ...paginateConfig,
      select: [
        "id",

        "dataInicio",
        "dataFim",
        "dateCreated",
      ],
      sortableColumns: ["dataInicio", "dataFim", "dateCreated"],
      searchableColumns: [
        "id",

        "dataInicio",
        "dataFim",
      ],
      defaultSortBy: [
        ["dataInicio", "ASC"],
        ["dataFim", "ASC"],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();

    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as DisponibilidadeListOutputDto;
  }

  async disponibilidadeFindById(accessContext: AccessContext | null, dto: DisponibilidadeFindOneInputDto, selection?: string[]): Promise<DisponibilidadeFindOneOutputDto | null> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);
    }

    // =========================================================

    qb.andWhere(`${aliasDisponibilidade}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    // =========================================================

    const disponibilidade = await qb.getOne();

    // =========================================================

    return disponibilidade as DisponibilidadeFindOneOutputDto | null;
  }

  async disponibilidadeFindByIdStrict(accessContext: AccessContext, dto: DisponibilidadeFindOneInputDto, selection?: string[]): Promise<DisponibilidadeFindOneOutputDto> {
    const disponibilidade = await this.disponibilidadeFindById(accessContext, dto, selection);

    if (!disponibilidade) {
      throw new NotFoundException();
    }

    return disponibilidade;
  }

  async disponibilidadeFindByIdSimple(accessContext: AccessContext, id: string, selection?: string[]): Promise<DisponibilidadeFindOneOutputDto | null> {
    // =========================================================

    const qb = this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade);

    // =========================================================

    await accessContext.applyFilter("disponibilidade:find", qb, aliasDisponibilidade, null);

    // =========================================================

    qb.andWhere(`${aliasDisponibilidade}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DisponibilidadeFindOneOutput", qb, aliasDisponibilidade, selection);

    // =========================================================

    const disponibilidade = await qb.getOne();

    // =========================================================

    return disponibilidade as DisponibilidadeFindOneOutputDto | null;
  }

  async disponibilidadeFindByIdSimpleStrict(accessContext: AccessContext, id: string, selection?: string[]): Promise<DisponibilidadeFindOneOutputDto> {
    const disponibilidade = await this.disponibilidadeFindByIdSimple(accessContext, id, selection);

    if (!disponibilidade) {
      throw new NotFoundException();
    }

    return disponibilidade;
  }

  async disponibilidadeCreate(accessContext: AccessContext, dto: DisponibilidadeCreateInputDto): Promise<DisponibilidadeFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade:create", { dto });

    // =========================================================

    const dtoDisponibilidade = pick(dto, ["dataInicio", "dataFim"]);

    const disponibilidade = this.disponibilidadeRepository.create();

    this.disponibilidadeRepository.merge(disponibilidade, {
      ...dtoDisponibilidade,
    });

    // =========================================================

    await this.disponibilidadeRepository.save(disponibilidade);

    // =========================================================

    return this.disponibilidadeFindByIdStrict(accessContext, {
      id: disponibilidade.id,
    });
  }

  async disponibilidadeUpdate(accessContext: AccessContext, dto: DisponibilidadeFindOneInputDto & DisponibilidadeUpdateInputDto): Promise<DisponibilidadeFindOneOutputDto> {
    // =========================================================

    const currentDisponibilidade = await this.disponibilidadeFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("disponibilidade:update", { dto }, dto.id, this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade));

    const dtoDisponibilidade = pick(dto, ["dataInicio", "dataFim"]);

    const disponibilidade = <DisponibilidadeEntity>{
      id: currentDisponibilidade.id,
    };

    this.disponibilidadeRepository.merge(disponibilidade, {
      ...dtoDisponibilidade,
    });

    // =========================================================

    await this.disponibilidadeRepository.save(disponibilidade);

    // =========================================================

    return this.disponibilidadeFindByIdStrict(accessContext, {
      id: disponibilidade.id,
    });
  }

  async disponibilidadeDeleteOneById(accessContext: AccessContext, dto: DisponibilidadeFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("disponibilidade:delete", { dto }, dto.id, this.disponibilidadeRepository.createQueryBuilder(aliasDisponibilidade));

    // =========================================================

    const disponibilidade = await this.disponibilidadeFindByIdStrict(accessContext, dto);

    // =========================================================

    if (disponibilidade) {
      await this.disponibilidadeRepository
        .createQueryBuilder(aliasDisponibilidade)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disponibilidadeId", {
          disponibilidadeId: disponibilidade.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
