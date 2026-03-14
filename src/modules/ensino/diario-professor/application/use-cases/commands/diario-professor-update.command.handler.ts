import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  type PersistInput,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioProfessorUpdateCommand,
  IDiarioProfessorUpdateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-update.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import type { IDiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.types";
import {
  DIARIO_PROFESSOR_REPOSITORY_PORT,
  type IDiarioProfessorRepositoryPort,
} from "../../../domain/repositories";
import type { DiarioProfessorFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioProfessorUpdateCommandHandlerImpl
  implements IDiarioProfessorUpdateCommandHandler
{
  constructor(
    @Inject(DIARIO_PROFESSOR_REPOSITORY_PORT)
    private readonly repository: IDiarioProfessorRepositoryPort,
    @Inject(AUTHORIZATION_SERVICE_PORT)
    private readonly authorizationService: IAuthorizationServicePort,
    @Inject(IDiarioFindOneQueryHandler)
    private readonly diarioFindOneHandler: IDiarioFindOneQueryHandler,
    @Inject(IPerfilFindOneQueryHandler)
    private readonly perfilFindOneHandler: IPerfilFindOneQueryHandler,
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
      const diario = await this.diarioFindOneHandler.execute({
        accessContext,
        dto: { id: dto.diario.id },
      });
      if (!diario) {
        throw new ResourceNotFoundError("Diario", dto.diario.id);
      }
      updateData.diario = { id: diario.id };
    }
    if (has(dto, "perfil") && dto.perfil !== undefined && dto.perfil !== null) {
      const perfil = await this.perfilFindOneHandler.execute({
        accessContext,
        dto: { id: dto.perfil.id },
      });
      if (!perfil) {
        throw new ResourceNotFoundError("Perfil", dto.perfil.id);
      }
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
