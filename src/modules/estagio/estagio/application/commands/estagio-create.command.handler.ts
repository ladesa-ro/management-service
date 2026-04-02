import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { EstagioCreateCommand } from "@/modules/estagio/estagio/domain/commands/estagio-create.command";
import { IEstagioCreateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-create.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@Impl()
export class EstagioCreateCommandHandlerImpl implements IEstagioCreateCommandHandler {
  constructor(
    @Dep(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: EstagioCreateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    const estagio = Estagio.create(dto);

    await this.repository.save(estagio);

    const result = await this.repository.getFindOneQueryResult(accessContext, {
      id: estagio.id,
    });
    ensureExists(result, Estagio.entityName, estagio.id);

    return result;
  }
}
