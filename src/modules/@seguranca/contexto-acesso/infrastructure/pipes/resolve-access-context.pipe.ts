import type { PipeTransform } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { IRequestActor } from "@/domain/abstractions/request-actor";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AccessContext } from "../access-context";

/**
 * Pipe que transforma IRequestActor em AccessContext.
 * Usado pelos decorators AccessContextHttp e AccessContextGraphQL.
 */
@DeclareImplementation()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN)
    private readonly dataSource: DataSource,
  ) {}

  async transform(requestActor: IRequestActor | null): Promise<AccessContext> {
    return new AccessContext(this.dataSource, requestActor ?? null);
  }
}
