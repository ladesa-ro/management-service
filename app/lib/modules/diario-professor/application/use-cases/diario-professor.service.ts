import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService } from "@/modules/@shared";
import { DiarioService } from "@/modules/diario/application/use-cases/diario.service";
import type { DiarioProfessorEntity } from "@/modules/diario-professor/infrastructure/persistence/typeorm";
import { PerfilService } from "@/modules/perfil";
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

  protected override async beforeCreate(
    accessContext: AccessContext,
    entity: DiarioProfessorEntity,
    dto: DiarioProfessorCreateInput,
  ): Promise<void> {
    if (has(dto, "diario") && dto.diario) {
      const diario = await this.diarioService.findByIdStrict(accessContext, {
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
      const diario = await this.diarioService.findByIdStrict(accessContext, {
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
