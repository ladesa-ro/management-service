import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists, type PersistInput } from "@/modules/@shared";
import { Perfil } from "@/modules/acesso/perfil/domain/perfil.domain";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario.domain";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import type { DiarioProfessorUpdateCommand } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-update.command";
import { IDiarioProfessorUpdateCommandHandler } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-update.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.domain";
import type { IDiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor.types";
import type { DiarioProfessorFindOneQuery } from "@/modules/ensino/diario-professor/domain/queries";
import { IDiarioProfessorPermissionChecker } from "../../domain/authorization";
import type { DiarioProfessorFindOneQueryResult } from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioProfessorUpdateCommandHandlerImpl
  implements IDiarioProfessorUpdateCommandHandler
{
  constructor(
    @DeclareDependency(IDiarioProfessorRepository)
    private readonly repository: IDiarioProfessorRepository,
    @DeclareDependency(IDiarioProfessorPermissionChecker)
    private readonly permissionChecker: IDiarioProfessorPermissionChecker,
    @DeclareDependency(IDiarioFindOneQueryHandler)
    private readonly diarioFindOneHandler: IDiarioFindOneQueryHandler,
    @DeclareDependency(IPerfilFindOneQueryHandler)
    private readonly perfilFindOneHandler: IPerfilFindOneQueryHandler,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiarioProfessorFindOneQuery & DiarioProfessorUpdateCommand,
  ): Promise<DiarioProfessorFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, DiarioProfessor.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = DiarioProfessor.fromData(current);
    domain.atualizar({ situacao: dto.situacao });
    const updateData: Partial<PersistInput<IDiarioProfessor>> = { situacao: domain.situacao };
    if (has(dto, "diario") && dto.diario !== undefined && dto.diario !== null) {
      const diario = await this.diarioFindOneHandler.execute(accessContext, { id: dto.diario.id });
      ensureExists(diario, Diario.entityName, dto.diario.id);
      updateData.diario = { id: diario.id };
    }
    if (has(dto, "perfil") && dto.perfil !== undefined && dto.perfil !== null) {
      const perfil = await this.perfilFindOneHandler.execute(accessContext, { id: dto.perfil.id });
      ensureExists(perfil, Perfil.entityName, dto.perfil.id);
      updateData.perfil = { id: perfil.id };
    }
    await this.repository.updateFromDomain(current.id, updateData);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, DiarioProfessor.entityName, dto.id);

    return result;
  }
}
