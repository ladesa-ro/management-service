import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { BlocoService } from "@/v2/core/bloco/application/use-cases/bloco.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm/context/database-context.service";
import type { AmbienteEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { QbEfficientLoad } from "@/shared";
import { SearchService } from "@/shared/search/search.service";
import type {
  AmbienteCreateInputDto,
  AmbienteFindOneInputDto,
  AmbienteFindOneOutputDto,
  AmbienteListInputDto,
  AmbienteListOutputDto,
  AmbienteUpdateInputDto,
} from "../dto";

// ============================================================================

const aliasAmbiente = "ambiente";

// ============================================================================

@Injectable()
export class AmbienteService {
  constructor(
    private blocoService: BlocoService,
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
    private searchService: SearchService,
  ) {}

  get ambienteRepository() {
    return this.databaseContext.ambienteRepository;
  }

  async ambienteFindAll(accessContext: AccessContext, dto: AmbienteListInputDto | null = null, selection?: string[] | boolean): Promise<AmbienteListOutputDto> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    await accessContext.applyFilter("ambiente:find", qb, aliasAmbiente, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, dto, {
      select: [
        "id",

        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
        "dateCreated",

        "bloco.id",
        "bloco.campus.id",
      ],
      relations: {
        bloco: {
          campus: true,
        },
      },
      sortableColumns: [
        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",

        "dateCreated",

        "bloco.id",
        "bloco.campus.id",
      ],
      searchableColumns: [
        "id",

        "nome",
        "descricao",
        "codigo",
        "capacidade",
        "tipo",
      ],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "bloco.id": [FilterOperator.EQ],
        "bloco.campus.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);

    QbEfficientLoad("AmbienteFindOneOutput", qb, aliasAmbiente, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated as AmbienteListOutputDto;
  }

  async ambienteFindById(accessContext: AccessContext | null, dto: AmbienteFindOneInputDto, selection?: string[] | boolean): Promise<AmbienteFindOneOutputDto | null> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("ambiente:find", qb, aliasAmbiente, null);
    }

    // =========================================================

    qb.andWhere(`${aliasAmbiente}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad("AmbienteFindOneOutput", qb, aliasAmbiente, selection);

    // =========================================================

    const ambiente = await qb.getOne();

    // =========================================================

    return ambiente as AmbienteFindOneOutputDto | null;
  }

  async ambienteFindByIdStrict(accessContext: AccessContext | null, dto: AmbienteFindOneInputDto, selection?: string[] | boolean): Promise<AmbienteFindOneOutputDto> {
    const ambiente = await this.ambienteFindById(accessContext, dto, selection);

    if (!ambiente) {
      throw new NotFoundException();
    }

    return ambiente;
  }

  async ambienteCreate(accessContext: AccessContext, dto: AmbienteCreateInputDto): Promise<AmbienteFindOneOutputDto> {
    // =========================================================

    await accessContext.ensurePermission("ambiente:create", { dto });

    // =========================================================

    const dtoAmbiente = pick(dto, ["nome", "descricao", "codigo", "capacidade", "tipo"]);

    const ambiente = this.ambienteRepository.create();

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    const bloco = await this.blocoService.blocoFindByIdSimpleStrict(accessContext, dto.bloco.id);

    this.ambienteRepository.merge(ambiente, {
      bloco: {
        id: bloco.id,
      },
    });

    // =========================================================

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return this.ambienteFindByIdStrict(accessContext, { id: ambiente.id });
  }

  async ambienteUpdate(accessContext: AccessContext, dto: AmbienteFindOneInputDto & AmbienteUpdateInputDto): Promise<AmbienteFindOneOutputDto> {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, dto);

    // =========================================================

    await accessContext.ensurePermission("ambiente:update", { dto }, dto.id, this.ambienteRepository.createQueryBuilder(aliasAmbiente));

    const dtoAmbiente = pick(dto, ["nome", "descricao", "codigo", "capacidade", "tipo"]);

    const ambiente = <AmbienteEntity>{
      id: currentAmbiente.id,
    };

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return this.ambienteFindByIdStrict(accessContext, { id: ambiente.id });
  }

  async ambienteGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const ambiente = await this.ambienteFindByIdStrict(accessContext, {
      id: id,
    });

    if (ambiente.imagemCapa) {
      const [versao] = ambiente.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async ambienteUpdateImagemCapa(accessContext: AccessContext, dto: AmbienteFindOneInputDto, file: Express.Multer.File): Promise<boolean> {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, {
      id: dto.id,
    });

    // =========================================================

    await accessContext.ensurePermission(
      "ambiente:update",
      {
        dto: {
          id: currentAmbiente.id,
        },
      },
      currentAmbiente.id,
      this.ambienteRepository.createQueryBuilder(aliasAmbiente),
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveAmbienteCapa(file);

    const ambiente = this.ambienteRepository.merge(this.ambienteRepository.create(), {
      id: currentAmbiente.id,
    });

    this.ambienteRepository.merge(ambiente, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.ambienteRepository.save(ambiente);

    // =========================================================

    return true;
  }

  async ambienteDeleteOneById(accessContext: AccessContext, dto: AmbienteFindOneInputDto): Promise<boolean> {
    // =========================================================

    await accessContext.ensurePermission("ambiente:delete", { dto }, dto.id, this.ambienteRepository.createQueryBuilder(aliasAmbiente));

    // =========================================================

    const ambiente = await this.ambienteFindByIdStrict(accessContext, dto);

    // =========================================================

    if (ambiente) {
      await this.ambienteRepository
        .createQueryBuilder(aliasAmbiente)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :blocoId", { blocoId: ambiente.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
