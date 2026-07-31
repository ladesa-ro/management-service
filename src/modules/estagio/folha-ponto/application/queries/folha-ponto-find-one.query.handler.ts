import { ForbiddenException } from "@nestjs/common";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import type { FolhaPontoFindOneQuery } from "../../domain/queries/folha-ponto-find-one.query";
import { IFolhaPontoFindOneQueryHandler } from "../../domain/queries/folha-ponto-find-one.query.handler.interface";
import type { FolhaPontoFindOneQueryResult } from "../../domain/queries/folha-ponto-find-one.query.result";
import { IFolhaPontoRepository } from "../../domain/repositories";

@Impl()
export class FolhaPontoFindOneQueryHandlerImpl implements IFolhaPontoFindOneQueryHandler {
  constructor(
    @Dep(IFolhaPontoRepository) private readonly repository: IFolhaPontoRepository,
    @Dep(IEstagioRepository) private readonly estagioRepository: IEstagioRepository,
    @Dep(IEstagiarioRepository) private readonly estagiarioRepository: IEstagiarioRepository,
  ) {}

  async execute(
    accessContext: IAccessContext | null,
    dto: FolhaPontoFindOneQuery,
  ): Promise<FolhaPontoFindOneQueryResult | null> {
    const result = await this.repository.getFindOneQueryResult(accessContext, dto);

    if (result && !accessContext?.requestActor?.isSuperUser) {
      const estagio = await this.estagioRepository.loadById(accessContext, result.estagio.id);
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
          `Apenas o estagiário associado ou um administrador pode visualizar a folha de ponto.`,
        );
      }
    }

    return result;
  }
}
