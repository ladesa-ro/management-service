import type { PipeTransform } from "@nestjs/common";
import type { IRequestActor } from "@/domain/abstractions/request-actor";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { AccessContext } from "./access-context";

/**
 * Pipe que transforma IRequestActor em AccessContext.
 * Usado pelos decorators AccessContextHttp e AccessContextGraphQL.
 */

@Impl()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async transform(requestActor: IRequestActor | null): Promise<AccessContext> {
    return new AccessContext(this.appTypeormConnection, requestActor ?? null);
  }
}
