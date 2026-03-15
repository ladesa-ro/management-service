import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import type { AmbienteUpdateCommand } from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command";
import { IAmbienteUpdateCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import type { AmbienteFindOneQuery } from "@/modules/ambientes/ambiente/domain/queries";
import { IAmbientePermissionChecker } from "../../domain/authorization";
import type { AmbienteFindOneQueryResult } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";

@DeclareImplementation()
export class AmbienteUpdateCommandHandlerImpl implements IAmbienteUpdateCommandHandler {
  constructor(
    @DeclareDependency(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @DeclareDependency(IAmbientePermissionChecker)
    private readonly permissionChecker: IAmbientePermissionChecker,
  ) {}

  async execute(
    accessContext: AccessContext | null,
    dto: AmbienteFindOneQuery & AmbienteUpdateCommand,
  ): Promise<AmbienteFindOneQueryResult> {
    const current = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(current, Ambiente.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    const domain = Ambiente.load(current);
    domain.update({
      nome: dto.nome,
      descricao: dto.descricao,
      codigo: dto.codigo,
      capacidade: dto.capacidade,
      tipo: dto.tipo,
    });

    await this.repository.update(current.id, domain);

    const result = await this.repository.findById(accessContext, { id: dto.id });

    ensureExists(result, Ambiente.entityName, dto.id);

    return result;
  }
}
