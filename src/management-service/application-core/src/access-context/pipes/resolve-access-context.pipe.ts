import type { IRequestActor } from "@/authentication";
import { DatabaseContextService } from "@/integrations";
import { Injectable, type PipeTransform } from "@nestjs/common";
import { AccessContext } from "../access-context";

@Injectable()
export class ResolveAccessContextPipe implements PipeTransform {
  constructor(private databaseContextService: DatabaseContextService) {}

  async transform(requestActor: IRequestActor | null /* _metadata: ArgumentMetadata */) {
    return new AccessContext(this.databaseContextService, requestActor ?? null);
  }
}
