import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import {
  AUTHORIZATION_SERVICE_PORT,
  type IAuthorizationServicePort,
  ResourceNotFoundError,
} from "@/modules/@shared";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioProfessorCreateCommand,
  IDiarioProfessorCreateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-create.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import {
  DIARIO_PROFESSOR_REPOSITORY_PORT,
  type IDiarioProfessorRepositoryPort,
} from "../../../domain/repositories";
import type { DiarioProfessorFindOneOutputDto } from "../../dtos";

@Injectable()
export class DiarioProfessorCreateCommandHandlerImpl
  implements IDiarioProfessorCreateCommandHandler
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
  }: IDiarioProfessorCreateCommand): Promise<DiarioProfessorFindOneOutputDto> {
    await this.authorizationService.ensurePermission("diario_professor:create", { dto });

    let diarioRef: { id: string } | undefined;
    if (has(dto, "diario") && dto.diario) {
      const diario = await this.diarioFindOneHandler.execute({
        accessContext,
        dto: { id: dto.diario.id },
      });
      if (!diario) {
        throw new ResourceNotFoundError("Diario", dto.diario.id);
      }
      diarioRef = { id: diario.id };
    }
    let perfilRef: { id: string } | undefined;
    if (has(dto, "perfil") && dto.perfil) {
      const perfil = await this.perfilFindOneHandler.execute({
        accessContext,
        dto: { id: dto.perfil.id },
      });
      if (!perfil) {
        throw new ResourceNotFoundError("Perfil", dto.perfil.id);
      }
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

    if (!result) {
      throw new ResourceNotFoundError("DiarioProfessor", id);
    }

    return result;
  }
}
