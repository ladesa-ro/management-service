import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { AulaService } from "./aula.service";

@Resolver()
export class AulaResolver {
  constructor(private aulaService: AulaService) {}

  async aulaFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AulaFindAll") dto: IAppRequest<"AulaFindAll">) {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  async aulaFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AulaFindOneById") dto: IAppRequest<"AulaFindOneById">) {
    return this.aulaService.aulaFindByIdStrict(accessContext, dto);
  }

  async aulaCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AulaCreate") dto: IAppRequest<"AulaCreate">) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  async aulaUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AulaUpdate") dto: IAppRequest<"AulaUpdateOneById">) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  async aulaDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("AulaDeleteOneById") dto: IAppRequest<"AulaDeleteOneById">) {
    return this.aulaService.aulaDeleteOneById(accessContext, dto);
  }
}
