import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { EstagioUpdateCommand } from "@/modules/estagio/estagio/domain/commands/estagio-update.command";
import { IEstagioUpdateCommandHandler } from "@/modules/estagio/estagio/domain/commands/estagio-update.command.handler.interface";
import { Estagio } from "@/modules/estagio/estagio/domain/estagio";
import type { EstagioFindOneQuery } from "@/modules/estagio/estagio/domain/queries";
import type { EstagioFindOneQueryResult } from "../../domain/queries";
import { IEstagioRepository } from "../../domain/repositories";

@DeclareImplementation()
export class EstagioUpdateCommandHandlerImpl implements IEstagioUpdateCommandHandler {
  constructor(
    @DeclareDependency(IEstagioRepository)
    private readonly repository: IEstagioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    command: EstagioFindOneQuery & EstagioUpdateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    const { id, ...dto } = command;

    const current = await this.repository.findById(accessContext, { id });
    ensureExists(current, Estagio.entityName, id);

    await this.repository.update(id, dto);

    if (dto.horariosEstagio !== undefined) {
      await this.repository.replaceHorariosEstagio(id, dto.horariosEstagio ?? []);
    }

    const result = await this.repository.findById(accessContext, { id });
    ensureExists(result, Estagio.entityName, id);

    return result;
  }
}
