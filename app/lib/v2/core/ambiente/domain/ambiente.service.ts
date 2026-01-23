import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { ArquivoService } from "@/v2/core/arquivo/domain/arquivo.service";
import { BlocoService } from "@/v2/core/bloco/domain/bloco.service";
import { ImagemService } from "@/v2/core/imagem/domain/imagem.service";
import { DatabaseContextService } from "@/v2/infrastructure.database/context/database-context.service";
import { AmbienteEntity } from "@/v2/infrastructure.database/typeorm/entities";
import { AccessContext, IDomain, QbEfficientLoad } from "@/shared";
import { SearchService } from "@/shared/search/search.service";

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

  async ambienteFindAll(accessContext: AccessContext, domain: IDomain.AmbienteListInput | null = null, selection?: string[] | boolean): Promise<IDomain.AmbienteListOutput["success"]> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    await accessContext.applyFilter("ambiente:find", qb, aliasAmbiente, null);

    // =========================================================

    const paginated = await this.searchService.search(qb, domain, {
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

    await QbEfficientLoad("AmbienteFindOneOutput", qb, aliasAmbiente, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;
  }

  async ambienteFindById(accessContext: AccessContext | null, domain: IDomain.AmbienteFindOneInput, selection?: string[] | boolean): Promise<IDomain.AmbienteFindOneOutput | null> {
    // =========================================================

    const qb = this.ambienteRepository.createQueryBuilder(aliasAmbiente);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("ambiente:find", qb, aliasAmbiente, null);
    }

    // =========================================================

    qb.andWhere(`${aliasAmbiente}.id = :id`, { id: domain.id });

    // =========================================================

    qb.select([]);
    await QbEfficientLoad("AmbienteFindOneOutput", qb, aliasAmbiente, selection);

    // =========================================================

    const ambiente = await qb.getOne();

    // =========================================================

    return ambiente;
  }

  async ambienteFindByIdStrict(accessContext: AccessContext | null, domain: IDomain.AmbienteFindOneInput, selection?: string[] | boolean) {
    const ambiente = await this.ambienteFindById(accessContext, domain, selection);

    if (!ambiente) {
      throw new NotFoundException();
    }

    return ambiente;
  }

  async ambienteCreate(accessContext: AccessContext, domain: IDomain.AmbienteCreateInput) {
    // =========================================================

    await accessContext.ensurePermission("ambiente:create", { dto: domain });

    // =========================================================

    const dtoAmbiente = pick(domain, ["nome", "descricao", "codigo", "capacidade", "tipo"]);

    const ambiente = this.ambienteRepository.create();

    this.ambienteRepository.merge(ambiente, {
      ...dtoAmbiente,
    });

    // =========================================================

    const bloco = await this.blocoService.blocoFindByIdSimpleStrict(accessContext, domain.bloco.id);

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

  async ambienteUpdate(accessContext: AccessContext, domain: IDomain.AmbienteFindOneInput & IDomain.AmbienteUpdateInput) {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, domain);

    // =========================================================

    await accessContext.ensurePermission("ambiente:update", { dto: domain }, domain.id, this.ambienteRepository.createQueryBuilder(aliasAmbiente));

    const dtoAmbiente = pick(domain, ["nome", "descricao", "codigo", "capacidade", "tipo"]);

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

  async ambienteUpdateImagemCapa(accessContext: AccessContext, domain: IDomain.AmbienteFindOneInput, file: Express.Multer.File) {
    // =========================================================

    const currentAmbiente = await this.ambienteFindByIdStrict(accessContext, {
      id: domain.id,
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

  async ambienteDeleteOneById(accessContext: AccessContext, domain: IDomain.AmbienteFindOneInput) {
    // =========================================================

    await accessContext.ensurePermission("ambiente:delete", { dto: domain }, domain.id, this.ambienteRepository.createQueryBuilder(aliasAmbiente));

    // =========================================================

    const ambiente = await this.ambienteFindByIdStrict(accessContext, domain);

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
