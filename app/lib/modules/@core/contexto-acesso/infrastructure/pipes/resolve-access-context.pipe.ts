import { Inject, Injectable, Optional, type PipeTransform } from "@nestjs/common";
import type { IRequestActor } from "@/modules/@core/ator-requisicao";
import { DatabaseContextService } from "@/modules/@database-context";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";
import { AccessContext } from "../access-context";
import { RESOURCE_AUTHZ_REGISTRY, ResourceAuthzRegistry } from "../resource-authz-registry";

/**
 * Pipe que transforma IRequestActor em AccessContext.
 * Usado pelos decorators AccessContextHttp e AccessContextGraphQL.
 */
@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    private readonly databaseContext: DatabaseContextService,
    @Inject(CONFIG_PORT)
    private readonly config: IConfigPort,
    @Optional()
    @Inject(RESOURCE_AUTHZ_REGISTRY)
    private readonly resourceRegistry?: ResourceAuthzRegistry,
  ) {}

  async transform(requestActor: IRequestActor | null): Promise<AccessContext> {
    const permissionCheckEnabled = this.config.getPermissionCheckEnabled();

    return new AccessContext(
      this.databaseContext,
      requestActor ?? null,
      permissionCheckEnabled,
      this.resourceRegistry,
    );
  }
}
