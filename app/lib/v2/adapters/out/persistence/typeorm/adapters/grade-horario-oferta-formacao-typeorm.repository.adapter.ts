import { Injectable } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type {
  GradeHorarioOfertaFormacaoCreateInput,
  GradeHorarioOfertaFormacaoFindOneInput,
  GradeHorarioOfertaFormacaoFindOneOutput,
  GradeHorarioOfertaFormacaoListInput,
  GradeHorarioOfertaFormacaoListOutput,
  GradeHorarioOfertaFormacaoUpdateInput,
} from "@/core/grade-horario-oferta-formacao";
import type { IGradeHorarioOfertaFormacaoRepositoryPort } from "@/core/grade-horario-oferta-formacao/application/ports";
import type { IPaginationConfig } from "@/v2/application/ports/pagination";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import { paginateConfig } from "@/v2/old/infrastructure/fixtures";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import { BaseTypeOrmRepositoryAdapter } from "../base";
import { DatabaseContextService } from "../context/database-context.service";
import type { GradeHorarioOfertaFormacaoEntity } from "../typeorm/entities";

@Injectable()
export class GradeHorarioOfertaFormacaoTypeOrmRepositoryAdapter
  extends BaseTypeOrmRepositoryAdapter<
    GradeHorarioOfertaFormacaoEntity,
    GradeHorarioOfertaFormacaoListInput,
    GradeHorarioOfertaFormacaoListOutput,
    GradeHorarioOfertaFormacaoFindOneInput,
    GradeHorarioOfertaFormacaoFindOneOutput
  >
  implements IGradeHorarioOfertaFormacaoRepositoryPort
{
  protected readonly alias = "grade_horario_oferta_formacao";
  protected readonly authzAction = "grade_horario_oferta_formacao:find";
  protected readonly outputDtoName = "GradeHorarioOfertaFormacaoFindOneOutput";

  constructor(
    protected readonly databaseContext: DatabaseContextService,
    protected readonly paginationAdapter: NestJsPaginateAdapter,
  ) {
    super();
  }

  protected get repository() {
    return this.databaseContext.gradeHorarioOfertaFormacaoRepository;
  }

  protected getPaginateConfig(): IPaginationConfig<GradeHorarioOfertaFormacaoEntity> {
    return {
      ...paginateConfig,
      select: ["id", "dateCreated"],
      relations: {
        campus: true,
        ofertaFormacao: {
          modalidade: true,
        },
      },
      sortableColumns: ["dateCreated"],
      searchableColumns: ["id"],
      defaultSortBy: [["dateCreated", "ASC"]],
      filterableColumns: {
        "campus.id": [FilterOperator.EQ],
        "ofertaFormacao.id": [FilterOperator.EQ],
        "ofertaFormacao.modalidade.id": [FilterOperator.EQ],
      },
    };
  }

  async createOne(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoCreateInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput> {
    await accessContext.ensurePermission("grade_horario_oferta_formacao:create", { dto } as any);

    const entity = this.repository.create();

    this.repository.merge(entity, {
      campus: { id: dto.campus.id },
      ofertaFormacao: { id: dto.ofertaFormacao.id },
    } as any);

    await this.repository.save(entity);

    const result = await this.findById(accessContext, { id: entity.id });
    return result!;
  }

  async update(
    accessContext: AccessContext,
    id: string,
    dto: GradeHorarioOfertaFormacaoUpdateInput,
  ): Promise<GradeHorarioOfertaFormacaoFindOneOutput> {
    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao:update",
      { dto },
      id,
      this.repository.createQueryBuilder(this.alias),
    );

    const entity = { id } as GradeHorarioOfertaFormacaoEntity;

    if (dto.campus !== undefined) {
      this.repository.merge(entity, {
        campus: dto.campus ? { id: dto.campus.id } : null,
      } as any);
    }

    if (dto.ofertaFormacao !== undefined) {
      this.repository.merge(entity, {
        ofertaFormacao: dto.ofertaFormacao ? { id: dto.ofertaFormacao.id } : null,
      } as any);
    }

    await this.repository.save(entity);

    const result = await this.findById(accessContext, { id });
    return result!;
  }

  async deleteById(
    accessContext: AccessContext,
    dto: GradeHorarioOfertaFormacaoFindOneInput,
  ): Promise<boolean> {
    await accessContext.ensurePermission(
      "grade_horario_oferta_formacao:delete",
      { dto },
      dto.id,
      this.repository.createQueryBuilder(this.alias),
    );

    await super.softDeleteById(dto.id);
    return true;
  }
}
