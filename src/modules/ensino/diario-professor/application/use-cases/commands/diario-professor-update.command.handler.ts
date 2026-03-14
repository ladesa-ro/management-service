import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { PerfilService } from "@/modules/acesso/perfil";
import { DiarioService } from "@/modules/ensino/diario/application/use-cases/diario.service";
import {
  type IDiarioProfessorUpdateCommand,
  IDiarioProfessorUpdateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-update.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import type { IDiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.types";
import type { DiarioProfessorFindOneOutputDto } from "../../dtos";
import { DIARIO_PROFESSOR_REPOSITORY_PORT, type IDiarioProfessorRepositoryPort } from "../../ports";

@Injectable()
export class DiarioProfessorUpdateCommandHandlerImpl
  implements IDiarioProfessorUpdateCommandHandler
{
  constructor(
    @Inject(DIARIO_PROFESSOR_REPOSITORY_PORT)
    private readonly repository: IDiarioProfessorRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    private readonly diarioService: DiarioService,
    private readonly perfilService: PerfilService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiarioProfessorUpdateCommand): Promise<DiarioProfessorFindOneOutputDto> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    if (!current) {
      throw new ResourceNotFoundError("DiarioProfessor", dto.id);
    }

    await this.authorizationService.ensurePermission("diario_professor:update", { dto }, dto.id);

    const domain = DiarioProfessor.fromData(current);
    domain.atualizar({ situacao: dto.situacao });
    const updateData: Partial<PersistInput<IDiarioProfessor>> = { situacao: domain.situacao };
    if (has(dto, "diario") && dto.diario !== undefined && dto.diario !== null) {
      const diario = await this.diarioService.findByIdStrict(accessContext, { id: dto.diario.id });
      updateData.diario = { id: diario.id };
    }
    if (has(dto, "perfil") && dto.perfil !== undefined && dto.perfil !== null) {
      const perfil = await this.perfilService.findByIdStrict(accessContext, { id: dto.perfil.id });
      updateData.perfil = { id: perfil.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    if (!result) {
      throw new ResourceNotFoundError("DiarioProfessor", dto.id);
    }

    return result;
  }
}
