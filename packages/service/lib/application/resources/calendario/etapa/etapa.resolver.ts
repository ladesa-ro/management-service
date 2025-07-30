import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { EtapaService } from "./etapa.service";

@Resolver()
export class EtapaResolver {
  constructor(private etapaService: EtapaService) {}

  async etapaFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EtapaList") dto: IAppRequest<"EtapaList">) {
    return this.etapaService.etapaFindAll(accessContext, dto);
  }

  async etapaFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EtapaFindOneById") dto: IAppRequest<"EtapaFindOneById">) {
    return this.etapaService.etapaFindByIdStrict(accessContext, dto);
  }

  async etapaCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EtapaCreate") dto: IAppRequest<"EtapaCreate">) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  async etapaUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EtapaUpdate") dto: IAppRequest<"EtapaUpdateOneById">) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  async etapaDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("EtapaDeleteOneById") dto: IAppRequest<"EtapaDeleteOneById">) {
    return this.etapaService.etapaDeleteOneById(accessContext, dto);
  }
}
