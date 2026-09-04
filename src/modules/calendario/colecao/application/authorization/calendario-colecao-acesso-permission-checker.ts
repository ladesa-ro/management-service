import { ForbiddenError, UnauthorizedError } from "@/application/errors";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { ICalendarioColecaoAcessoPermissionChecker } from "../../domain/authorization";
import { ICalendarioColecaoRepository } from "../../domain/repositories";

@Impl()
export class CalendarioColecaoAcessoPermissionCheckerImpl
  implements ICalendarioColecaoAcessoPermissionChecker
{
  constructor(
    @Dep(ICalendarioColecaoRepository)
    private readonly colecaoRepository: ICalendarioColecaoRepository,
  ) {}

  async ensureCanCreate(
    accessContext: IAccessContext | null,
    payload: { dto: unknown },
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (accessContext.requestActor.isSuperUser) {
      return;
    }

    const dto = payload?.dto as { colecao?: { id: string } } | undefined;
    const colecaoId = dto?.colecao?.id;
    if (colecaoId) {
      const colecao = await this.colecaoRepository.loadById(accessContext, colecaoId);
      if (colecao && colecao.dono.id !== accessContext.requestActor.id) {
        throw new ForbiddenError("Apenas o dono da coleção pode conceder acessos.");
      }
    }
  }

  async ensureCanUpdate(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
    _id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }

    if (!accessContext.requestActor.isSuperUser) {
      throw new ForbiddenError("Apenas administradores podem atualizar diretamente este acesso.");
    }
  }

  async ensureCanDelete(
    accessContext: IAccessContext | null,
    _payload: { dto: unknown },
    _id: string,
  ): Promise<void> {
    if (!accessContext?.requestActor) {
      throw new UnauthorizedError();
    }
  }
}
