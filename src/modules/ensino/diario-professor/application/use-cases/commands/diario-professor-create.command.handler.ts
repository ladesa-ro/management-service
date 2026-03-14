import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { ensureExists, IAuthorizationService } from "@/modules/@shared";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioProfessorCreateCommand,
  IDiarioProfessorCreateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-create.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import { IDiarioProfessorRepository } from "../../../domain/repositories";
import type { DiarioProfessorFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioProfessorCreateCommandHandlerImpl
  implements IDiarioProfessorCreateCommandHandler
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
  }: IDiarioProfessorCreateCommand): Promise<DiarioProfessorFindOneOutputDto> {
    await this.authorizationService.ensurePermission("diario_professor:create", { dto });

    let diarioRef: { id: string } | undefined;
    if (has(dto, "diario") && dto.diario) {
      const diario = await this.diarioFindOneHandler.execute({
        accessContext,
        dto: { id: dto.diario.id },
      });
      ensureExists(diario, "Diario", dto.diario.id);
      diarioRef = { id: diario.id };
    }
    let perfilRef: { id: string } | undefined;
    if (has(dto, "perfil") && dto.perfil) {
      const perfil = await this.perfilFindOneHandler.execute({
        accessContext,
        dto: { id: dto.perfil.id },
      });
      ensureExists(perfil, "Perfil", dto.perfil.id);
      perfilRef = { id: perfil.id };
    }
    const domain = DiarioProfessor.criar({
      situacao: dto.situacao,
      diario: diarioRef!,
      perfil: perfilRef!,
    });
    const { id } = await this.repository.createFromDomain({
      ...domain,
      ...(diarioRef ? { diario: diarioRef } : {}),
      ...(perfilRef ? { perfil: perfilRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, "DiarioProfessor", id);

    return result;
  }
}
