import { Inject, Injectable, type PipeTransform } from "@nestjs/common";
import { CONFIG_PORT, type IConfigPort } from "@/core/@shared/application/ports/out/config";
import type { IRequestActor } from "@/v2/old/infrastructure/authentication";
import { DatabaseContextService } from "@/v2/old/infrastructure/integrations";
import { AccessContext } from "../access-context";

@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(
    private databaseContextService: DatabaseContextService,
    @Inject(CONFIG_PORT)
    private config: IConfigPort,
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
