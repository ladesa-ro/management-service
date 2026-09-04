import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { ICalendarioColecaoPermissionChecker } from "../../domain/authorization";
import { ICalendarioColecaoRepository } from "../../domain/repositories";
import { CalendarioColecaoAcessoResolverService } from "../calendario-colecao-acesso-resolver.service";

@Impl()
export class CalendarioColecaoPermissionCheckerImpl implements ICalendarioColecaoPermissionChecker {
  constructor(
    @Dep(CalendarioColecaoAcessoResolverService)
    private readonly acessoResolver: CalendarioColecaoAcessoResolverService,
    @Dep(ICalendarioColecaoRepository)
    private readonly colecaoRepository: ICalendarioColecaoRepository,
  ) {}

  async ensureCanCreate(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }
  }

  async ensureCanUpdate(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
    id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (accessContext.requestActor.isSuperUser) {
      return;
    }

    const papel = await this.acessoResolver.resolverPapelEfetivoParaColecao(accessContext, id);
    if (papel !== "EDITOR") {
      throw new ForbiddenError(
        "Sem permissão para alterar esta coleção. É necessário ser dono ou ter papel EDITOR.",
      );
    }
  }

  async ensureCanDelete(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
    id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (accessContext.requestActor.isSuperUser) {
      return;
    }

    const colecao = await this.colecaoRepository.loadById(accessContext, id);
    if (colecao && colecao.dono.id !== accessContext.requestActor.id) {
      throw new ForbiddenError("Apenas o dono pode remover esta coleção.");
    }
  }
}
