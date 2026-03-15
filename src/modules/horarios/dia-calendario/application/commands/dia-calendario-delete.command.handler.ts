import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { IDiaCalendarioDeleteCommandHandler } from "@/modules/horarios/dia-calendario/domain/commands/dia-calendario-delete.command.handler.interface";
import { DiaCalendario } from "@/modules/horarios/dia-calendario/domain/dia-calendario.domain";
import type { DiaCalendarioFindOneQuery } from "@/modules/horarios/dia-calendario/domain/queries";
import { IDiaCalendarioPermissionChecker } from "../../domain/authorization";
import { IDiaCalendarioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class DiaCalendarioDeleteCommandHandlerImpl implements IDiaCalendarioDeleteCommandHandler {
  constructor(
    @DeclareDependency(IDiaCalendarioRepository)
    private readonly repository: IDiaCalendarioRepository,
    @DeclareDependency(IDiaCalendarioPermissionChecker)
    private readonly permissionChecker: IDiaCalendarioPermissionChecker,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: DiaCalendarioFindOneQuery,
  ): Promise<boolean> {
    await this.permissionChecker.ensureCanDelete(accessContext, { dto }, dto.id);

    const entity = await this.repository.findById(accessContext, dto);

    ensureExists(entity, DiaCalendario.entityName, dto.id);

    await this.repository.softDeleteById(entity.id);

    return true;
  }
}
