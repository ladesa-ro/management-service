import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { FilterOperator, FilterSuffix } from "nestjs-paginate";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import type { DisciplinaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad, SearchService } from "@/shared";
import type {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "../dto";

// ============================================================================

const aliasDisciplina = "disciplina";

// ============================================================================

@Injectable()
export class DisciplinaService {
  constructor(
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private searchService: SearchService,
  ) {}

  get disciplinaRepository() {
    return this.databaseContext.disciplinaRepository;
  }

  async disciplinaFindAll(accessContext: AccessContext, dto: DisciplinaListInputDto | null = null, selection?: string[] | boolean): Promise<DisciplinaListOutputDto> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      ...paginateConfig,
      relations: { diarios: true },
      select: [
        "id",

        "nome",
        "nomeAbreviado",
        "cargaHoraria",
      ],
      sortableColumns: ["nome", "cargaHoraria"],
      searchableColumns: [
        "id",

        "nome",
        "nomeAbreviado",
        "cargaHoraria",
      ],
      defaultSortBy: [["nome", "ASC"]],
      filterableColumns: {
        "diarios.id": [FilterOperator.EQ, FilterOperator.NULL, FilterSuffix.NOT],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as DisciplinaListOutputDto;
  }

  async disciplinaFindById(accessContext: AccessContext | null, dto: DisciplinaFindOneInputDto, selection?: string[] | boolean): Promise<DisciplinaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);
    }

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina as DisciplinaFindOneOutputDto | null;
  }

  async disciplinaFindByIdStrict(accessContext: AccessContext | null, dto: DisciplinaFindOneInputDto, selection?: string[] | boolean): Promise<DisciplinaFindOneOutputDto> {
    const disciplina = await this.disciplinaFindById(accessContext, dto, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaFindByIdSimple(accessContext: AccessContext, id: DisciplinaFindOneInputDto["id"], selection?: string[] | boolean): Promise<DisciplinaFindOneOutputDto | null> {
    // =========================================================

    const qb = this.disciplinaRepository.createQueryBuilder(aliasDisciplina);

    // =========================================================

    await accessContext.applyFilter("disciplina:find", qb, aliasDisciplina, null);

    // =========================================================

    qb.andWhere(`${aliasDisciplina}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("DisciplinaFindOneOutput", qb, aliasDisciplina, selection);

    // =========================================================

    const disciplina = await qb.getOne();

    // =========================================================

    return disciplina as DisciplinaFindOneOutputDto | null;
  }

  async disciplinaFindByIdSimpleStrict(accessContext: AccessContext, id: DisciplinaFindOneInputDto["id"], selection?: string[]): Promise<DisciplinaFindOneOutputDto> {
    const disciplina = await this.disciplinaFindByIdSimple(accessContext, id, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaCreate(accessContext: AccessContext, dto: DisciplinaCreateInputDto): Promise<DisciplinaFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("disciplina:create", { dto });

    // =========================================================

    const dtoDisciplina = pick(dto, ["nome", "nomeAbreviado", "cargaHoraria"]);

    const disciplina = this.disciplinaRepository.create();

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(accessContext, { id: disciplina.id });
  }

  async disciplinaUpdate(accessContext: AccessContext, dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto): Promise<DisciplinaFindOneOutputDto> {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission("disciplina:update", { dto }, dto.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    const dtoDisciplina = pick(dto, ["nome", "nomeAbreviado", "cargaHoraria"]);

    const disciplina = {
      id: currentDisciplina.id,
    } as DisciplinaEntity;

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    // =========================================================

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return this.disciplinaFindByIdStrict(accessContext, { id: disciplina.id });
  }

  async disciplinaGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const disciplina = await this.disciplinaFindByIdStrict(accessContext, {
      id: id,
    });

    if (disciplina.imagemCapa) {
      const [versao] = disciplina.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async disciplinaUpdateImagemCapa(accessContext: AccessContext, dto: DisciplinaFindOneInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, { id: dto.id });

    // =========================================================

    await accessContext.ensurePermission(
      "disciplina:update",
      {
        dto: {
          id: currentDisciplina.id,
        },
      },
      currentDisciplina.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveDisciplinaCapa(file);

    const disciplina = this.disciplinaRepository.merge(this.disciplinaRepository.create(), {
      id: currentDisciplina.id,
    });

    this.disciplinaRepository.merge(disciplina, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.disciplinaRepository.save(disciplina);

    // =========================================================

    return true;
  }

  async disciplinaDeleteOneById(accessContext: AccessContext, dto: DisciplinaFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("disciplina:delete", { dto }, dto.id, this.disciplinaRepository.createQueryBuilder(aliasDisciplina));

    // =========================================================

    const disciplina = await this.disciplinaFindByIdStrict(accessContext, dto);

    // =========================================================

    if (disciplina) {
      await this.disciplinaRepository
        .createQueryBuilder(aliasDisciplina)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :disciplinaId", { disciplinaId: disciplina.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
