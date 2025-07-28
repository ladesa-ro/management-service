import { Resolver } from "@nestjs/graphql";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextGraphQl } from "@/infrastructure/access-context";
import { ReservaService } from "./reserva.service";

@Resolver()
export class ReservaResolver {
  constructor(private reservaService: ReservaService) {}

  async reservaFindAll(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ReservaFindAll") dto: IAppRequest<"ReservaFindAll">) {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  async reservaFindOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ReservaFindOneById") dto: IAppRequest<"ReservaFindOneById">) {
    return this.reservaService.reservaFindByIdStrict(accessContext, dto);
  }

  async reservaCreate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ReservaCreate") dto: IAppRequest<"ReservaCreate">) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  async reservaUpdate(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ReservaUpdate") dto: IAppRequest<"ReservaUpdateOneById">) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  async reservaDeleteOneById(@AccessContextGraphQl() accessContext: AccessContext, @AppRequest("ReservaDeleteOneById") dto: IAppRequest<"ReservaDeleteOneById">) {
    return this.reservaService.reservaDeleteOneById(accessContext, dto);
  }
}
