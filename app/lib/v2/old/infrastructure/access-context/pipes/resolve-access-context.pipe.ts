import { Injectable, type PipeTransform } from "@nestjs/common";
import { AppConfigService } from "@/v2/infra/config";
import type { IRequestActor } from "@/v2/old/infrastructure/authentication";
import { DatabaseContextService } from "@/v2/old/infrastructure/integrations";
import { AccessContext } from "../access-context";

@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    private databaseContextService: DatabaseContextService,
    private config: AppConfigService,
  ) {}

  async transform(requestActor: IRequestActor | null /* _metadata: ArgumentMetadata */) {
    const permissionCheckEnabled = this.config.getPermissionCheckEnabled();
    return new AccessContext(
      this.databaseContextService,
      requestActor ?? null,
      permissionCheckEnabled,
    );
  }
}
