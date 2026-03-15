import { has } from "lodash";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { Perfil } from "@/modules/acesso/perfil/domain/perfil";
import { IPerfilFindOneQueryHandler } from "@/modules/acesso/perfil/domain/queries/perfil-find-one.query.handler.interface";
import { Diario } from "@/modules/ensino/diario/domain/diario";
import { IDiarioFindOneQueryHandler } from "@/modules/ensino/diario/domain/queries/diario-find-one.query.handler.interface";
import type { DiarioProfessorCreateCommand } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-create.command";
import { IDiarioProfessorCreateCommandHandler } from "@/modules/ensino/diario-professor/domain/commands/diario-professor-create.command.handler.interface";
import { DiarioProfessor } from "@/modules/ensino/diario-professor/domain/diario-professor";
import { IDiarioProfessorPermissionChecker } from "../../domain/authorization";
import type { DiarioProfessorFindOneQueryResult } from "../../domain/queries";
import { IDiarioProfessorRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiarioProfessorCreateCommandHandlerImpl
  implements IDiarioProfessorCreateCommandHandler
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
    dto: DiarioProfessorCreateCommand,
  ): Promise<DiarioProfessorFindOneQueryResult> {
    await this.permissionChecker.ensureCanCreate(accessContext, { dto });

    let diarioRef: { id: string } | undefined;
    if (has(dto, "diario") && dto.diario) {
      const diario = await this.diarioFindOneHandler.execute(accessContext, { id: dto.diario.id });
      ensureExists(diario, Diario.entityName, dto.diario.id);
      diarioRef = { id: diario.id };
    }
    let perfilRef: { id: string } | undefined;
    if (has(dto, "perfil") && dto.perfil) {
      const perfil = await this.perfilFindOneHandler.execute(accessContext, { id: dto.perfil.id });
      ensureExists(perfil, Perfil.entityName, dto.perfil.id);
      perfilRef = { id: perfil.id };
    }
    const domain = DiarioProfessor.create({
      situacao: dto.situacao,
      diario: diarioRef!,
      perfil: perfilRef!,
    });
    const { id } = await this.repository.create({
      ...domain,
      ...(diarioRef ? { diario: diarioRef } : {}),
      ...(perfilRef ? { perfil: perfilRef } : {}),
    });

    const result = await this.repository.findById(accessContext, { id });

    ensureExists(result, DiarioProfessor.entityName, id);

    return result;
  }
}
