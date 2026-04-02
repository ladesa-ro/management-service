import { ensureActiveEntity, ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { EstagioUpdateCommand } from "@/modules/estagio/estagio/domain/commands/estagio-update.command";
import { IEstagioUpdateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-update.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQuery } from "@/modules/estagio/estagio/domain/queries";
import type { EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@Impl()
export class EstagioUpdateCommandHandlerImpl implements IEstagioUpdateCommandHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EstagioFindOneQuery & EstagioUpdateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    const { id, ...dto } = command;

    const domain = await this.repository.loadById(accessContext, id);
    ensureExists(domain, Estagio.entityName, id);
    ensureActiveEntity(domain, Estagio.entityName, id);

    domain.update(dto);

    await this.repository.save(domain);

    const result = await this.repository.getFindOneQueryResult(accessContext, { id });
    ensureExists(result, Estagio.entityName, id);

    return result;
  }
}
