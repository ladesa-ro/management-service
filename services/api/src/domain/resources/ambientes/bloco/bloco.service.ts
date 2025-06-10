import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaPaginatedResultDto, LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { BlocoEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { map, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { ArquivoService } from "../../base/arquivo/arquivo.service";
import { ImagemService } from "../../base/imagem/imagem.service";
import { CampusService } from "../campus/campus.service";

// ============================================================================

const aliasBloco = "bloco";

// ============================================================================

@Injectable()
export class BlocoService {
  constructor(
    private campusService: CampusService,
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  get blocoRepository() {
    return this.databaseContext.blocoRepository;
  }

  //

  async blocoFindAll(
    //
    accessContext: AccessContext,
    dto: LadesaTypings.BlocoListOperationInput | null = null,
    selection?: string[] | boolean,
  ): Promise<LadesaTypings.BlocoListOperationOutput["success"]> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);

    // =========================================================

    const paginated = await LadesaSearch("/blocos", dto, qb, {
      ...paginateConfig,
      select: [
        //
        "id",
        //
        "nome",
        "codigo",
        "dateCreated",
        //
        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      relations: {
        campus: true,
      },
      sortableColumns: [
        //
        "nome",
        "codigo",
        "dateCreated",
        //
        "campus.id",
        "campus.razaoSocial",
        "campus.nomeFantasia",
      ],
      searchableColumns: [
        //
        "id",
        //
        "nome",
        "codigo",
        //
      ],
      defaultSortBy: [
        ["nome", "ASC"],
        ["dateCreated", "ASC"],
      ],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
      },
    });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.BlocoFindOneResultView, qb, aliasBloco, selection);

    // =========================================================
    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);
    // =========================================================

    return LadesaPaginatedResultDto(paginated);
  }

  async blocoFindById(accessContext: AccessContext | null, dto: LadesaTypings.BlocoFindOneInputView, selection?: string[] | boolean): Promise<LadesaTypings.BlocoFindOneResultView | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    if (accessContext) {
      await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);
    }

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.BlocoFindOneResultView, qb, aliasBloco, selection);

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco;
  }

  async blocoFindByIdStrict(accessContext: AccessContext | null, dto: LadesaTypings.BlocoFindOneInputView, selection?: string[] | boolean) {
    const bloco = await this.blocoFindById(accessContext, dto, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  async blocoFindByIdSimple(accessContext: AccessContext, id: LadesaTypings.BlocoFindOneInputView["id"], selection?: string[]): Promise<LadesaTypings.BlocoFindOneResultView | null> {
    // =========================================================

    const qb = this.blocoRepository.createQueryBuilder(aliasBloco);

    // =========================================================

    await accessContext.applyFilter("bloco:find", qb, aliasBloco, null);

    // =========================================================

    qb.andWhere(`${aliasBloco}.id = :id`, { id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.BlocoFindOneResultView, qb, aliasBloco, selection);

    // =========================================================

    const bloco = await qb.getOne();

    // =========================================================

    return bloco;
  }

  async blocoFindByIdSimpleStrict(accessContext: AccessContext, id: LadesaTypings.BlocoFindOneInputView["id"], selection?: string[]) {
    const bloco = await this.blocoFindByIdSimple(accessContext, id, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  //

  async blocoGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const bloco = await this.blocoFindByIdStrict(accessContext, { id: id });

    if (bloco.imagemCapa) {
      const [versao] = bloco.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async blocoUpdateImagemCapa(accessContext: AccessContext, dto: LadesaTypings.BlocoFindOneInputView, file: Express.Multer.File) {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    // =========================================================

    await accessContext.ensurePermission("bloco:update", { dto: { id: currentBloco.id } }, currentBloco.id, this.blocoRepository.createQueryBuilder(aliasBloco));

    // =========================================================

    const { imagem } = await this.imagemService.saveBlocoCapa(file);

    const bloco = {
      id: currentBloco.id,
    } as BlocoEntity;

    this.blocoRepository.merge(bloco, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.blocoRepository.save(bloco);

    // =========================================================

    return true;
  }

  //

  async blocoCreate(accessContext: AccessContext, dto: LadesaTypings.BlocoCreateOperationInput) {
    // =========================================================

    await accessContext.ensurePermission("bloco:create", { dto });

    // =========================================================

    const dtoBloco = pick(dto.body, ["nome", "codigo"]);

    const bloco = this.blocoRepository.create();

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);

    this.blocoRepository.merge(bloco, {
      campus: {
        id: campus.id,
      },
    });

    // =========================================================

    await this.blocoRepository.save(bloco);

    // =========================================================

    return this.blocoFindByIdStrict(accessContext, { id: bloco.id });
  }

  async blocoUpdate(accessContext: AccessContext, dto: LadesaTypings.BlocoUpdateByIdOperationInput) {
    // =========================================================

    const currentBloco = await this.blocoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });

    // =========================================================

    await accessContext.ensurePermission("bloco:update", { dto }, dto.params.id, this.blocoRepository.createQueryBuilder(aliasBloco));

    // =========================================================

    const dtoBloco = pick(dto.body, ["nome", "codigo"]);

    const bloco = {
      id: currentBloco.id,
    } as BlocoEntity;

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    // =========================================================

    await this.blocoRepository.save(bloco);

    // =========================================================

    return this.blocoFindByIdStrict(accessContext, { id: bloco.id });
  }

  //

  async blocoDeleteOneById(accessContext: AccessContext, dto: LadesaTypings.BlocoFindOneInputView) {
    // =========================================================

    await accessContext.ensurePermission("bloco:delete", { dto }, dto.id, this.blocoRepository.createQueryBuilder(aliasBloco));

    // =========================================================

    const bloco = await this.blocoFindByIdStrict(accessContext, dto);

    // =========================================================

    if (bloco) {
      await this.blocoRepository
        .createQueryBuilder(aliasBloco)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :blocoId", { blocoId: bloco.id })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    // =========================================================

    return true;
  }
}
