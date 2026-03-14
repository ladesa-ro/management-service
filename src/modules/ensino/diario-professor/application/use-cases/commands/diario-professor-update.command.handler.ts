import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { ensureExists, IAuthorizationService, type PersistInput } from "@/modules/@shared";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioProfessorUpdateCommand,
  IDiarioProfessorUpdateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-update.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import type { IDiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.types";
import { IDiarioProfessorRepository } from "../../../domain/repositories";
import type { DiarioProfessorFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioProfessorUpdateCommandHandlerImpl
  implements IDiarioProfessorUpdateCommandHandler
{
  constructor(
    @Inject(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
    @Inject(IAuthorizationService)
    private readonly authorizationService: IAuthorizationService,
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

    ensureExists(current, "DiarioProfessor", dto.id);

    await this.authorizationService.ensurePermission("diario_professor:update", { dto }, dto.id);

    const domain = DiarioProfessor.fromData(current);
    domain.atualizar({ situacao: dto.situacao });
    const updateData: Partial<PersistInput<IDiarioProfessor>> = { situacao: domain.situacao };
    if (has(dto, "diario") && dto.diario !== undefined && dto.diario !== null) {
      const diario = await this.diarioFindOneHandler.execute({
        accessContext,
        dto: { id: dto.diario.id },
      });
      ensureExists(diario, "Diario", dto.diario.id);
      updateData.diario = { id: diario.id };
    }
    if (has(dto, "perfil") && dto.perfil !== undefined && dto.perfil !== null) {
      const perfil = await this.perfilFindOneHandler.execute({
        accessContext,
        dto: { id: dto.perfil.id },
      });
      ensureExists(perfil, "Perfil", dto.perfil.id);
      updateData.perfil = { id: perfil.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, "DiarioProfessor", dto.id);

    return result;
  }
}
