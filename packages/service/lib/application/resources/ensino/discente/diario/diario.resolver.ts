import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { DiarioService } from "./diario.service";

@Resolver()
export class DiarioResolver {
  constructor(private diarioService: DiarioService) {}

  async diarioFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioList") dto: IAppRequest<"DiarioList">) {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  async diarioFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioFindOneById") dto: IAppRequest<"DiarioFindOneById">) {
    return this.diarioService.diarioFindByIdStrict(accessContext, dto);
  }

  async diarioCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioCreate") dto: IAppRequest<"DiarioCreate">) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  async diarioUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioUpdate") dto: IAppRequest<"DiarioUpdateOneById">) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }

  async diarioDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("DiarioDeleteOneById") dto: IAppRequest<"DiarioDeleteOneById">) {
    return this.diarioService.diarioDeleteOneById(accessContext, dto);
  }
}
