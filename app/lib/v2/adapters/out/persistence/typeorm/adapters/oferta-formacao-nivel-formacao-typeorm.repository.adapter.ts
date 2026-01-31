import { Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import { NivelFormacaoService } from "@/core/nivel-formacao/application/use-cases/nivel-formacao.service";
import { OfertaFormacaoService } from "@/core/oferta-formacao";
import type {
  IOfertaFormacaoNivelFormacaoRepositoryPort,
  OfertaFormacaoNivelFormacaoCreateInput,
  OfertaFormacaoNivelFormacaoFindOneInput,
  OfertaFormacaoNivelFormacaoFindOneOutput,
  OfertaFormacaoNivelFormacaoListInput,
  OfertaFormacaoNivelFormacaoListOutput,
  OfertaFormacaoNivelFormacaoUpdateInput,
} from "@/core/oferta-formacao-nivel-formacao";
import type { ITypeOrmPaginationConfig } from "../types";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { OfertaFormacaoNivelFormacaoEntity } from "../typeorm/entities";

const aliasOfertaFormacaoNivelFormacao = "oferta_formacao_nivel_formacao";

@Injectable()
export class OfertaFormacaoNivelFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    OfertaFormacaoNivelFormacaoEntity,
    OfertaFormacaoNivelFormacaoListInput,
    OfertaFormacaoNivelFormacaoListOutput,
    OfertaFormacaoNivelFormacaoFindOneInput,
    OfertaFormacaoNivelFormacaoFindOneOutput
  >
  implements IOfertaFormacaoNivelFormacaoRepositoryPort
{
  protected readonly alias = aliasOfertaFormacaoNivelFormacao;
  protected readonly authzAction = "oferta_formacao_nivel_formacao:find";
  protected readonly outputDtoName = "OfertaFormacaoNivelFormacaoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
    private readonly ofertaFormacaoService: OfertaFormacaoService,
    private readonly nivelFormacaoService: NivelFormacaoService,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.ofertaFormacaoNivelFormacaoRepository;
  }

  protected getPaginateConfig(): ITypeOrmPaginationConfig<OfertaFormacaoNivelFormacaoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "dateCreated"],
      relations: {
        nivelFormacao: true,
        ofertaFormacao: {
          modalidade: true,
        },
      },
      sortableColumns: ["dateCreated"],
      searchableColumns: ["id"],
      defaultSortBy: [["dateCreated", "ASC"]],
      filterableColumns: {
        "nivelFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.modalidade.id": [FilterOperator.EQ],
      },
    };
  }

  async createOne(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoCreateInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput> {
    await accessContext.ensurePermission("oferta_formacao_nivel_formacao:create", { dto } as any);

    const dtoOfertaFormacaoNivelFormacao = pick(dto, []);
    const ofertaFormacaoNivelFormacao = this.repository.create();

    this.repository.merge(ofertaFormacaoNivelFormacao, {
      ...dtoOfertaFormacaoNivelFormacao,
    });

    if (dto.ofertaFormacao) {
      const ofertaFormacao = await this.ofertaFormacaoService.findByIdStrict(accessContext, {
        id: dto.ofertaFormacao.id,
      });

      this.repository.merge(ofertaFormacaoNivelFormacao, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    if (dto.nivelFormacao) {
      const nivelFormacao = await this.nivelFormacaoService.findByIdStrict(accessContext, {
        id: dto.nivelFormacao.id,
      });

      this.repository.merge(ofertaFormacaoNivelFormacao, {
        nivelFormacao: {
          id: nivelFormacao.id,
        },
      });
    }

    await this.repository.save(ofertaFormacaoNivelFormacao);

    const result = await this.findById(accessContext, { id: ofertaFormacaoNivelFormacao.id });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async update(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput & OfertaFormacaoNivelFormacaoUpdateInput,
  ): Promise<OfertaFormacaoNivelFormacaoFindOneOutput> {
    const currentOfertaFormacaoNivelFormacao = await this.findById(accessContext, { id: dto.id });

    if (!currentOfertaFormacaoNivelFormacao) {
      throw new NotFoundException();
    }

    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:update",
      { dto },
      dto.id,
      this.repository.createQueryBuilder(aliasOfertaFormacaoNivelFormacao),
    );

    const dtoOfertaFormacaoNivelFormacao = pick(dto, []);

    const ofertaFormacaoNivelFormacao = <OfertaFormacaoNivelFormacaoEntity>{
      id: currentOfertaFormacaoNivelFormacao.id,
    };

    this.repository.merge(ofertaFormacaoNivelFormacao, {
      ...dtoOfertaFormacaoNivelFormacao,
    });

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao =
        dto.ofertaFormacao &&
        (await this.ofertaFormacaoService.findByIdStrict(accessContext, {
          id: dto.ofertaFormacao.id,
        }));

      this.repository.merge(ofertaFormacaoNivelFormacao, {
        ofertaFormacao: ofertaFormacao && {
          id: ofertaFormacao.id,
        },
      });
    }

    if (has(dto, "nivelFormacao") && dto.nivelFormacao !== undefined) {
      const nivelFormacao =
        dto.nivelFormacao &&
        (await this.nivelFormacaoService.findByIdStrict(accessContext, {
          id: dto.nivelFormacao.id,
        }));

      this.repository.merge(ofertaFormacaoNivelFormacao, {
        nivelFormacao: nivelFormacao && {
          id: nivelFormacao.id,
        },
      });
    }

    await this.repository.save(ofertaFormacaoNivelFormacao);

    const result = await this.findById(accessContext, { id: ofertaFormacaoNivelFormacao.id });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async deleteById(
    accessContext: AccessContext,
    dto: OfertaFormacaoNivelFormacaoFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission(
      "oferta_formacao_nivel_formacao:delete",
      { dto },
      dto.id,
      this.repository.createQueryBuilder(aliasOfertaFormacaoNivelFormacao),
    );

    const ofertaFormacaoNivelFormacao = await this.findById(accessContext, dto);

    if (ofertaFormacaoNivelFormacao) {
      await this.repository
        .createQueryBuilder(aliasOfertaFormacaoNivelFormacao)
        .update()
        .set({
          dateDeleted: "NOW()",
        })
        .where("id = :ofertaFormacaoNivelFormacaoId", {
          ofertaFormacaoNivelFormacaoId: ofertaFormacaoNivelFormacao.id,
        })
        .andWhere("dateDeleted IS NULL")
        .execute();
    }

    return true;
  }
}
