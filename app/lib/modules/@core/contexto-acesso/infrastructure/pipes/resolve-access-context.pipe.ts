import { Inject, Injectable, Optional, type PipeTransform } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { IRequestActor } from "@/modules/@core/ator-requisicao";
import { CONFIG_PORT, type IConfigPort } from "@/modules/@shared/application/ports/out/config";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { AccessContext } from "../access-context";
import { RESOURCE_AUTHZ_REGISTRY, ResourceAuthzRegistry } from "../resource-authz-registry";

/**
 * Pipe que transforma IRequestActor em AccessContext.
 * Usado pelos decorators AccessContextHttp e AccessContextGraphQL.
 */
@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN)
    private readonly dataSource: DataSource,
    @Inject(CONFIG_PORT)
    private readonly config: IConfigPort,
    @Optional()
    @Inject(RESOURCE_AUTHZ_REGISTRY)
    private readonly resourceRegistry?: ResourceAuthzRegistry,
  ) {}

  async transform(requestActor: IRequestActor | null): Promise<AccessContext> {
    const permissionCheckEnabled = this.config.getPermissionCheckEnabled();

    return new AccessContext(
      this.dataSource,
      requestActor ?? null,
      permissionCheckEnabled,
      this.resourceRegistry,
    );
  }
}
