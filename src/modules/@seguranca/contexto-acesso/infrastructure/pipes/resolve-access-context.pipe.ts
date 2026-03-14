import { Optional, type PipeTransform } from "@nestjs/common";
import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import {
  IRuntimeOptions,
  IRuntimeOptions as IRuntimeOptionsToken,
} from "@/infrastructure.config/options/runtime/runtime-options.interface";
import type { IRequestActor } from "@/modules/@seguranca/ator-requisicao";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AccessContext } from "../access-context";
import { RESOURCE_AUTHZ_REGISTRY, ResourceAuthzRegistry } from "../resource-authz-registry";

/**
 * Pipe que transforma IRequestActor em AccessContext.
 * Usado pelos decorators AccessContextHttp e AccessContextGraphQL.
 */
@DeclareImplementation()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    @DeclareDependency(APP_DATA_SOURCE_TOKEN)
    private readonly dataSource: DataSource,
    @DeclareDependency(IRuntimeOptionsToken)
    private readonly runtimeOptions: IRuntimeOptions,
    @Optional()
    @DeclareDependency(RESOURCE_AUTHZ_REGISTRY)
    private readonly resourceRegistry?: ResourceAuthzRegistry,
  ) {}

  async transform(requestActor: IRequestActor | null): Promise<AccessContext> {
    return new AccessContext(
      this.dataSource,
      requestActor ?? null,
      this.runtimeOptions.permissionCheckEnabled,
      this.resourceRegistry,
    );
  }
}
