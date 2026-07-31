import { ForbiddenException, Logger } from "@nestjs/common";
import { ensureExists } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import { IFolhaPontoCancelCommandHandler } from "../../domain/commands/folha-ponto-cancel.command.handler.interface";
import { FolhaPonto } from "../../domain/folha-ponto";
import { IFolhaPontoRepository } from "../../domain/repositories";

@Impl()
export class FolhaPontoCancelCommandHandlerImpl implements IFolhaPontoCancelCommandHandler {
  private readonly logger = new Logger(FolhaPontoCancelCommandHandlerImpl.name);

  constructor(
    @Dep(IFolhaPontoRepository) private readonly repository: IFolhaPontoRepository,
    @Dep(IEstagioRepository) private readonly estagioRepository: IEstagioRepository,
    @Dep(IEstagiarioRepository) private readonly estagiarioRepository: IEstagiarioRepository,
  ) {}

  async execute(accessContext: IAccessContext | null, id: string): Promise<boolean> {
    const folhaPonto = await this.repository.loadById(accessContext, id);
    ensureExists(folhaPonto, FolhaPonto.entityName, id);

    // Verificar autorização
    if (!accessContext?.requestActor?.isSuperUser) {
      const estagio = await this.estagioRepository.loadById(accessContext, folhaPonto.estagio.id);
      if (!estagio?.estagiario?.id) {
        throw new ForbiddenException(`Estágio não possui estagiário associado.`);
      }
      const estagiarioResult = await this.estagiarioRepository.getFindOneQueryResult(
        accessContext,
        { id: estagio.estagiario.id },
      );
      const usuarioId = estagiarioResult?.perfil?.usuario?.id;
      if (usuarioId !== accessContext?.requestActor?.id) {
        throw new ForbiddenException(
          `Apenas o estagiário associado ou um administrador pode cancelar a folha de ponto.`,
        );
      }
    }

    folhaPonto.cancel();

    await this.repository.save(folhaPonto);
    this.logger.log(
      `FolhaPonto ${id} cancelada pelo usuário (accessContext: ${accessContext?.requestActor?.id})`,
    );

    return true;
  }
}
