import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { DiarioProfessorEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";
import { PerfilService } from "@/core/perfil";
import { BaseCrudService } from "@/v2/core/shared";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "@/v2/server/modules/diario-professor/http/dto";
import type { IDiarioProfessorRepositoryPort } from "../ports";

@Injectable()
export class DiarioProfessorService extends BaseCrudService<
  DiarioProfessorEntity,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorCreateInputDto,
  DiarioProfessorUpdateInputDto
> {
  protected readonly resourceName = "DiarioProfessor";
  protected readonly createAction = "diario_professor:create";
  protected readonly updateAction = "diario_professor:update";
  protected readonly deleteAction = "diario_professor:delete";
  protected readonly createFields = ["situacao"] as const;
  protected readonly updateFields = ["situacao"] as const;

  constructor(
    @Inject("IDiarioProfessorRepositoryPort")
    protected readonly repository: IDiarioProfessorRepositoryPort,
    private readonly diarioService: DiarioService,
    private readonly perfilService: PerfilService,
  ) {
    super();
  }

  async diarioProfessorFindAll(
    accessContext: AccessContext,
    dto: DiarioProfessorListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorListOutputDto> {
    return this.findAll(accessContext, dto, selection);
  }

  async diarioProfessorFindById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    return this.findById(accessContext, dto, selection);
  }

  // Métodos prefixados para compatibilidade com IDiarioProfessorUseCasePort

  async diarioProfessorFindByIdStrict(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.findByIdStrict(accessContext, dto, selection);
  }

  async diarioProfessorFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    return this.findByIdSimple(accessContext, id, selection);
  }

  async diarioProfessorFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.findByIdSimpleStrict(accessContext, id, selection);
  }

  async diarioProfessorCreate(
    accessContext: AccessContext,
    dto: DiarioProfessorCreateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.create(accessContext, dto);
  }

  async diarioProfessorUpdate(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    return this.update(accessContext, dto);
  }

  async diarioProfessorDeleteOneById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
  ): Promise<boolean> {
    return this.deleteOneById(accessContext, dto);
  }

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiarioProfessorEntity,
    dto: DiarioProfessorCreateInputDto,
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
    dto: DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto,
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
