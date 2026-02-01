import { Inject, Injectable } from "@nestjs/common";
import {
  type IRequestActor,
  type IRequestActorResolverPort,
  REQUEST_ACTOR_RESOLVER_PORT,
} from "@/modules/@core/request-actor";

/**
 * @deprecated Use `REQUEST_ACTOR_RESOLVER_PORT` from `@/modules/@core/request-actor` instead.
 * Este service será removido na próxima versão major.
 */
@Injectable()
export class RequestActorService {
  constructor(
    @Inject(REQUEST_ACTOR_RESOLVER_PORT)
    private readonly requestActorResolver: IRequestActorResolverPort,
  ) {}

  /**
   * @deprecated Use `IRequestActorResolverPort.resolveFromAccessToken()` instead.
   */
  async getCurrentFuncionarioByAccessToken(accessToken?: string): Promise<IRequestActor> {
    return this.requestActorResolver.resolveFromAccessToken(accessToken);
  }
}
