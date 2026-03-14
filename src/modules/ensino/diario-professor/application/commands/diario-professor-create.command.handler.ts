import { Inject, Injectable } from "@nestjs/common";
import { has } from "lodash";
import { ensureExists } from "@/modules/@shared";
import { Perfil } from "@/modules/acesso/perfil/domain/perfil.domain";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import {
  type IDiarioProfessorCreateCommand,
  IDiarioProfessorCreateCommandHandler,
} from "@/modules/ensino/diario-professor/domain/commands/diario-professor-create.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import { IDiarioProfessorPermissionChecker } from "../../domain/authorization";
import { IDiarioProfessorRepository } from "../../domain/repositories";
import type { DiarioProfessorFindOneOutputDto } from "../dtos";

@Injectable()
export class DiarioProfessorCreateCommandHandlerImpl
  implements IDiarioProfessorCreateCommandHandler
{
  constructor(
    @Inject(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
    @Inject(IDiarioProfessorPermissionChecker)
    private readonly permissionChecker: IDiarioProfessorPermissionChecker,
    @Inject(IDiarioFindOneQueryHandler)
    private readonly diarioFindOneHandler: IDiarioFindOneQueryHandler,
    @Inject(IPerfilFindOneQueryHandler)
    private readonly perfilFindOneHandler: IPerfilFindOneQueryHandler,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IDiarioProfessorCreateCommand): Promise<DiarioProfessorFindOneOutputDto> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    let diarioRef: { id: string } | undefined;
    if (has(dto, "diario") && dto.diario) {
      const diario = await this.diarioFindOneHandler.execute({
        accessContext,
        dto: { id: dto.diario.id },
      });
      ensureExists(diario, Diario.entityName, dto.diario.id);
      diarioRef = { id: diario.id };
    }
    let perfilRef: { id: string } | undefined;
    if (has(dto, "perfil") && dto.perfil) {
      const perfil = await this.perfilFindOneHandler.execute({
        accessContext,
        dto: { id: dto.perfil.id },
      });
      ensureExists(perfil, Perfil.entityName, dto.perfil.id);
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

    ensureExists(result, DiarioProfessor.entityName, id);

    return result;
  }
}
