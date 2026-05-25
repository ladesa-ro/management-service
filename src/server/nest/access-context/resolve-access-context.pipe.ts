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

  async transform(
    input:
      | { requestActor: IRequestActor | null; currentCampusId: string | null }
      | IRequestActor
      | null,
  ): Promise<AccessContext> {
    let requestActor: IRequestActor | null = null;
    let currentCampusId: string | null = null;

    if (input) {
      if ("requestActor" in input || "currentCampusId" in input) {
        requestActor = (input as any).requestActor ?? null;
        currentCampusId = (input as any).currentCampusId ?? null;
      } else {
        requestActor = input as IRequestActor;
      }
    }

    return new AccessContext(this.appTypeormConnection, requestActor, currentCampusId);
  }
}
