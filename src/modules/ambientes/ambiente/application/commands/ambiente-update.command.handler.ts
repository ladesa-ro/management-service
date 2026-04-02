import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { Ambiente } from "@/modules/ambientes/ambiente/domain/ambiente";
import type { AmbienteUpdateCommand } from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command";
import { IAmbienteUpdateCommandHandler } from "@/modules/ambientes/ambiente/domain/commands/ambiente-update.command.handler.interface";
import type { AmbienteFindOneQuery } from "@/modules/ambientes/ambiente/domain/queries";
import { IAmbientePermissionChecker } from "../../domain/authorization";
import type { AmbienteFindOneQueryResult } from "../../domain/queries";
import { IAmbienteRepository } from "../../domain/repositories";

@Impl()
export class AmbienteUpdateCommandHandlerImpl implements IAmbienteUpdateCommandHandler {
  constructor(
    @Dep(IAmbienteRepository)
    private readonly repository: IAmbienteRepository,
    @Dep(IAmbientePermissionChecker)
    private readonly permissionChecker: IAmbientePermissionChecker,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: AmbienteFindOneQuery & AmbienteUpdateCommand,
  ): Promise<AmbienteFindOneQueryResult> {
    const domain = await this.repository.loadById(accessContext, dto.id);
    ensureExists(domain, Ambiente.entityName, dto.id);

    await this.permissionChecker.ensureCanUpdate(accessContext, { dto }, dto.id);

    domain.update({
      nome: dto.nome,
      descricao: dto.descricao,
      codigo: dto.codigo,
      capacidade: dto.capacidade,
      tipo: dto.tipo,
    });

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id: dto.id });
    ensureExists(result, Ambiente.entityName, dto.id);

    return result;
  }
}
