import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { BlocoService } from "./bloco.service";

@Resolver()
export class BlocoResolver {
  constructor(private blocoService: BlocoService) {}

  async blocoFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("BlocoList") dto: IAppRequest<"BlocoList">) {
    return this.blocoService.blocoFindAll(accessContext, dto);
  }

  async blocoFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("BlocoFindOneById") dto: IAppRequest<"BlocoFindOneById">) {
    return this.blocoService.blocoFindByIdStrict(accessContext, dto);
  }

  async blocoCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("BlocoCreate") dto: IAppRequest<"BlocoCreate">) {
    return this.blocoService.blocoCreate(accessContext, dto);
  }

  async blocoUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("BlocoUpdate") dto: IAppRequest<"BlocoUpdateOneById">) {
    return this.blocoService.blocoUpdate(accessContext, dto);
  }

  async blocoDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("BlocoDeleteOneById") dto: IAppRequest<"BlocoDeleteOneById">) {
    return this.blocoService.blocoDeleteOneById(accessContext, dto);
  }
}
