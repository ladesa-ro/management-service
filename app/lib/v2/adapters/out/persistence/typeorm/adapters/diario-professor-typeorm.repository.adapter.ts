import { Injectable } from "@nestjs/common";
import { map } from "lodash";
import { FilterOperator } from "nestjs-paginate";
import type { DeepPartial } from "typeorm";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { QbEfficientLoad } from "@/shared";
import { DatabaseContextService } from "../context/database-context.service";
import { NestJsPaginateAdapter } from "../../pagination/nestjs-paginate.adapter";
import type { IDiarioProfessorRepositoryPort } from "@/v2/core/diario-professor/application/ports";
import type { DiarioProfessorEntity } from "../typeorm/entities";
import type {
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
} from "@/v2/adapters/in/http/diario-professor/dto";

const aliasDiarioProfessor = "diario_professor";

@Injectable()
export class DiarioProfessorTypeOrmRepositoryAdapter implements IDiarioProfessorRepositoryPort {
  constructor(
    private databaseContext: DatabaseContextService,
    private paginationAdapter: NestJsPaginateAdapter,
  ) {}

  private get repository() {
    return this.databaseContext.diarioProfessorRepository;
  }

  async findAll(
    accessContext: AccessContext,
    dto: DiarioProfessorListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorListOutputDto> {
    const qb = this.repository.createQueryBuilder(aliasDiarioProfessor);

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    const paginated = await this.paginationAdapter.paginate(
      qb,
      {
        ...dto,
        sortBy: dto?.sortBy ? (dto.sortBy as unknown as string[]) : undefined,
      },
      {
        ...paginateConfig,
        select: [
          "id",

          "situacao",

          "diario.id",

          "perfil.id",
          "perfil.campus.id",
          "perfil.usuario.id",
        ],
        relations: {
          diario: true,
          perfil: {
            campus: true,
            usuario: true,
          },
        },
        sortableColumns: ["situacao", "diario.id", "perfil.campus.id", "perfil.usuario.id"],
        searchableColumns: [
          "id",

          "situacao",
          "diario.id",
          "perfil.campus.id",
          "perfil.usuario.id",
        ],
        defaultSortBy: [],
        filterableColumns: {
          "perfil.usuario.id": FilterOperator.EQ,
          "perfil.id": FilterOperator.EQ,
          "diario.id": FilterOperator.EQ,
        },
      },
    );

    qb.select([]);
    QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, "id")).getMany();
    paginated.data = paginated.data.map((p) => pageItemsView.find((i) => i.id === p.id)!);

    return paginated as unknown as DiarioProfessorListOutputDto;
  }

  async findById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasDiarioProfessor);

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id: dto.id });

    qb.select([]);
    QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    const diarioProfessor = await qb.getOne();

    return diarioProfessor as DiarioProfessorFindOneOutputDto | null;
  }

  async findByIdSimple(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    const qb = this.repository.createQueryBuilder(aliasDiarioProfessor);

    await accessContext.applyFilter("diario_professor:find", qb, aliasDiarioProfessor, null);

    qb.andWhere(`${aliasDiarioProfessor}.id = :id`, { id });

    qb.select([]);
    QbEfficientLoad("DiarioProfessorFindOneOutput", qb, aliasDiarioProfessor, selection);

    const diarioProfessor = await qb.getOne();

    return diarioProfessor as DiarioProfessorFindOneOutputDto | null;
  }

  async save(diarioProfessor: DeepPartial<DiarioProfessorEntity>): Promise<DiarioProfessorEntity> {
    return this.repository.save(diarioProfessor as DiarioProfessorEntity);
  }

  create(): DiarioProfessorEntity {
    return this.repository.create();
  }

  merge(diarioProfessor: DiarioProfessorEntity, data: DeepPartial<DiarioProfessorEntity>): void {
    this.repository.merge(diarioProfessor, data as DiarioProfessorEntity);
  }

  async softDeleteById(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder(aliasDiarioProfessor)
      .update()
      .set({
        dateDeleted: "NOW()",
      })
      .where("id = :diarioProfessorId", { diarioProfessorId: id })
      .andWhere("dateDeleted IS NULL")
      .execute();
  }
}
