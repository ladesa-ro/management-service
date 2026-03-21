import type { PipeTransform } from "@nestjs/common";
import type { IRequestActor } from "@/domain/abstractions/request-actor";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AccessContext } from "../access-context";

/**
 * Pipe que transforma IRequestActor em AccessContext.
 * Usado pelos decorators AccessContextHttp e AccessContextGraphQL.
 */

@DeclareImplementation()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async transform(requestActor: IRequestActor | null): Promise<AccessContext> {
    return new AccessContext(this.appTypeormConnection, requestActor ?? null);
  }
}
