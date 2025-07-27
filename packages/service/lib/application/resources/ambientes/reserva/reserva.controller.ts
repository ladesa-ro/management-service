import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { requestRepresentationMergeToDomain } from "@/application/contracts/generic-adapters";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ReservaService } from "./reserva.service";

@ApiTags("reservas")
@Controller("/reservas")
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  @Get("/")
  async reservaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaFindAll") dto: IAppRequest<"ReservaFindAll">) {
    const domain: IDomain.ReservaListInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async reservaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaFindById") dto: IAppRequest<"ReservaFindById">) {
    const domain: IDomain.ReservaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async reservaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaCreate") dto: IAppRequest<"ReservaCreate">) {
    const domain: IDomain.ReservaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async reservaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaUpdate") dto: IAppRequest<"ReservaUpdate">) {
    const domain: IDomain.ReservaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async reservaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaDeleteOneById") dto: IAppRequest<"ReservaDeleteOneById">) {
    const domain: IDomain.ReservaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaDeleteOneById(accessContext, domain);
  }
}
