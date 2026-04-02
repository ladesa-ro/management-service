import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { EstagiarioUpdateCommand } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command";
import { IEstagiarioUpdateCommandHandler } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command.handler.interface";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type { EstagiarioFindOneQuery } from "@/modules/estagio/estagiario/domain/queries";
import type { EstagiarioFindOneQueryResult } from "../../domain/queries";
import { IEstagiarioRepository } from "../../domain/repositories";

@Impl()
export class EstagiarioUpdateCommandHandlerImpl implements IEstagiarioUpdateCommandHandler {
  constructor(
    @Dep(IEstagiarioRepository)
    private readonly repository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EstagiarioFindOneQuery & EstagiarioUpdateCommand,
  ): Promise<EstagiarioFindOneQueryResult> {
    const { id, ...dto } = command;

    const domain = await this.repository.loadById(accessContext, id);
    ensureExists(domain, Estagiario.entityName, id);
    ensureActiveEntity(domain, Estagiario.entityName, id);

    domain.update(dto);

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id });
    ensureExists(result, Estagiario.entityName, id);

    return result;
  }
}
