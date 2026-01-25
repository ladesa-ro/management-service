import { Injectable, type PipeTransform } from "@nestjs/common";
import type { IRequestActor } from "@/infrastructure/authentication";
import { DatabaseContextService } from "@/infrastructure/integrations";
import { AccessContext } from "../access-context";
import { AppConfigService } from "@/v2/infra/config";

@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    private databaseContextService: DatabaseContextService,
    private config: AppConfigService,
  ) {}

  async transform(requestActor: IRequestActor | null /* _metadata: ArgumentMetadata */) {
    const permissionCheckEnabled = this.config.getPermissionCheckEnabled();
    return new AccessContext(this.databaseContextService, requestActor ?? null, permissionCheckEnabled);
  }
}
