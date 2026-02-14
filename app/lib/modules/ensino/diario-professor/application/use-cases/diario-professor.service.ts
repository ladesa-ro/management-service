import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { BaseCrudService, type PersistInput } from "@/modules/@shared";
import { PerfilService } from "@/modules/acesso/perfil";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import { DiarioProfessor, type IDiarioProfessor } from "@/modules/ensino/diario-professor";
import type {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "../dtos";
import { DIARIO_PROFESSOR_REPOSITORY_PORT, type IDiarioProfessorRepositoryPort } from "../ports";

@Injectable()
export class DiarioProfessorService extends BaseCrudService<
  IDiarioProfessor,
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

  constructor(
    @Inject(DIARIO_PROFESSOR_REPOSITORY_PORT)
    protected readonly repository: IDiarioProfessorRepositoryPort,
    private readonly diarioService: DiarioService,
    private readonly perfilService: PerfilService,
  ) {
    super();
  }

  protected async buildCreateData(
    accessContext: AccessContext,
    dto: DiarioProfessorCreateInputDto,
  ): Promise<Partial<PersistInput<IDiarioProfessor>>> {
    let diarioRef: { id: string } | undefined;
    if (has(dto, "diario") && dto.diario) {
      const diario = await this.diarioService.findByIdStrict(accessContext, { id: dto.diario.id });
      diarioRef = { id: diario.id };
    }

    let perfilRef: { id: string } | undefined;
    if (has(dto, "perfil") && dto.perfil) {
      const perfil = await this.perfilService.findByIdStrict(accessContext, { id: dto.perfil.id });
      perfilRef = { id: perfil.id };
    }

    const domain = DiarioProfessor.criar({
      situacao: dto.situacao,
      diario: diarioRef!,
      perfil: perfilRef!,
    });
    return {
      ...domain,
      ...(diarioRef ? { diario: diarioRef } : {}),
      ...(perfilRef ? { perfil: perfilRef } : {}),
    };
  }

  protected async buildUpdateData(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto,
    current: DiarioProfessorFindOneOutputDto,
  ): Promise<Partial<PersistInput<IDiarioProfessor>>> {
    const domain = DiarioProfessor.fromData(current);
    domain.atualizar({ situacao: dto.situacao });
    const result: Partial<PersistInput<IDiarioProfessor>> = { situacao: domain.situacao };

    if (has(dto, "diario") && dto.diario !== undefined && dto.diario !== null) {
      const diario = await this.diarioService.findByIdStrict(accessContext, { id: dto.diario.id });
      result.diario = { id: diario.id };
    }

    if (has(dto, "perfil") && dto.perfil !== undefined && dto.perfil !== null) {
      const perfil = await this.perfilService.findByIdStrict(accessContext, { id: dto.perfil.id });
      result.perfil = { id: perfil.id };
    }

    return result;
  }
}
