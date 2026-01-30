import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { BaseCrudService } from "@/core/@shared";
import { DiarioService } from "@/core/diario/application/use-cases/diario.service";
import { PerfilService } from "@/core/perfil";
import type { DiarioProfessorEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioProfessorCreateInput,
  DiarioProfessorFindOneInput,
  DiarioProfessorFindOneOutput,
  DiarioProfessorListInput,
  DiarioProfessorListOutput,
  DiarioProfessorUpdateInput,
} from "../dtos";
import { DIARIO_PROFESSOR_REPOSITORY_PORT, type IDiarioProfessorRepositoryPort } from "../ports";

@Injectable()
export class DiarioProfessorService extends BaseCrudService<
  DiarioProfessorEntity,
  DiarioProfessorListInput,
  DiarioProfessorListOutput,
  DiarioProfessorFindOneInput,
  DiarioProfessorFindOneOutput,
  DiarioProfessorCreateInput,
  DiarioProfessorUpdateInput
> {
  protected readonly resourceName = "DiarioProfessor";
  protected readonly createAction = "diario_professor:create";
  protected readonly updateAction = "diario_professor:update";
  protected readonly deleteAction = "diario_professor:delete";
  protected readonly createFields = ["situacao"] as const;
  protected readonly updateFields = ["situacao"] as const;

  constructor(
    @Inject(DIARIO_PROFESSOR_REPOSITORY_PORT)
    protected readonly repository: IDiarioProfessorRepositoryPort,
    private readonly diarioService: DiarioService,
    private readonly perfilService: PerfilService,
  ) {
    super();
  }

  async diarioProfessorFindAll(
    accessContext: AccessContext,
    dto: DiarioProfessorListInput | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorListOutput> {
    return this.findAll(accessContext, dto, selection);
  }

  async diarioProfessorFindById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutput | null> {
    return this.findById(accessContext, dto, selection);
  }

  // Métodos prefixados para compatibilidade com IDiarioProfessorUseCasePort

  async diarioProfessorFindByIdStrict(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutput> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async diarioProfessorFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutput | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async diarioProfessorFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutput> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async diarioProfessorCreate(
    accessContext: AccessContext,
    dto: DiarioProfessorCreateInput,
  ): Promise<DiarioProfessorFindOneOutput> {
    return this.create(accessContext, dto);
  }

  async diarioProfessorUpdate(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInput & DiarioProfessorUpdateInput,
  ): Promise<DiarioProfessorFindOneOutput> {
    return this.update(accessContext, dto);
  }

  async diarioProfessorDeleteOneById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInput,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiarioProfessorEntity,
    dto: DiarioProfessorCreateInput,
  ): Promise<void> {
    if (has(dto, "diario") && dto.diario) {
      const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
        id: dto.diario.id,
      });
      this.repository.merge(entity, { diario: { id: diario.id } });
    }

    if (has(dto, "perfil") && dto.perfil) {
      const perfil = await this.perfilService.findByIdStrict(accessContext, {
        id: dto.perfil.id,
      });
      this.repository.merge(entity, { perfil: { id: perfil.id } });
    }
  }

  protected override async beforeUpdate(
    accessContext: AccessContext,
    entity: DiarioProfessorEntity,
    dto: DiarioProfessorFindOneInput & DiarioProfessorUpdateInput,
  ): Promise<void> {
    if (has(dto, "diario") && dto.diario !== undefined && dto.diario !== null) {
      const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
        id: dto.diario.id,
      });
      this.repository.merge(entity, { diario: { id: diario.id } });
    }

    if (has(dto, "perfil") && dto.perfil !== undefined && dto.perfil !== null) {
      const perfil = await this.perfilService.findByIdStrict(accessContext, {
        id: dto.perfil.id,
      });
      this.repository.merge(entity, { perfil: { id: perfil.id } });
    }
  }
}
