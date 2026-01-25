import { Injectable, type PipeTransform } from "@nestjs/common";
import type { IRequestActor } from "@/infrastructure/authentication";
import { DatabaseContextService } from "@/infrastructure/integrations";
import { EnvironmentConfigService } from "@/v2/adapters/out/config/environment-config/environment-config.service";
import { AccessContext } from "../access-context";

@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    private databaseContextService: DatabaseContextService,
    private environmentConfigService: EnvironmentConfigService,
  ) {}

  async transform(requestActor: IRequestActor | null /* _metadata: ArgumentMetadata */) {
    const permissionCheckEnabled = this.environmentConfigService.getPermissionCheckEnabled();
    return new AccessContext(this.databaseContextService, requestActor ?? null, permissionCheckEnabled);
  }
}
