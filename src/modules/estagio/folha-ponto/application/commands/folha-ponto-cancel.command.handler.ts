import { Logger } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IFolhaPontoCancelCommandHandler } from "../../domain/commands/folha-ponto-cancel.command.handler.interface";
import { FolhaPonto } from "../../domain/folha-ponto";
import { IFolhaPontoRepository } from "../../domain/repositories";

@Impl()
export class FolhaPontoCancelCommandHandlerImpl implements IFolhaPontoCancelCommandHandler {
  private readonly logger = new Logger(FolhaPontoCancelCommandHandlerImpl.name);

  constructor(@Dep(IFolhaPontoRepository) private readonly repository: IFolhaPontoRepository) {}

  async execute(accessContext: IAccessContext | null, id: string): Promise<boolean> {
    const folhaPonto = await this.repository.loadById(accessContext, id);
    ensureExists(folhaPonto, FolhaPonto.entityName, id);

    folhaPonto.cancel();

    await this.repository.save(folhaPonto);
    this.logger.log(
      `FolhaPonto ${id} cancelada pelo usuário (accessContext: ${accessContext?.requestActor?.id})`,
    );

    return true;
  }
}
