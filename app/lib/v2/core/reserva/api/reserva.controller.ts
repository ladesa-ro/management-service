import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AppRequest, requestRepresentationMergeToDomain } from "@/shared";
import { type IAppRequest } from "@/shared/tsp/openapi/document/app-openapi-typings";
import { type IDomain } from "@/shared/tsp/schema/typings";
import { ReservaService } from "../domain/reserva.service";

@ApiTags("reservas")
@Controller("/reservas")
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  @Get("/")
  async reservaFindAll(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaList") dto: IAppRequest<"ReservaList">) {
    const domain: IDomain.ReservaListInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaFindAll(accessContext, domain);
  }

  @Get("/:id")
  async reservaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaFindOneById") dto: IAppRequest<"ReservaFindOneById">) {
    const domain: IDomain.ReservaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaFindByIdStrict(accessContext, domain);
  }

  @Post("/")
  async reservaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaCreate") dto: IAppRequest<"ReservaCreate">) {
    const domain: IDomain.ReservaCreateInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaCreate(accessContext, domain);
  }

  @Patch("/:id")
  async reservaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaUpdateOneById") dto: IAppRequest<"ReservaUpdateOneById">) {
    const domain: IDomain.ReservaFindOneInput & IDomain.ReservaUpdateInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaUpdate(accessContext, domain);
  }

  @Delete("/:id")
  async reservaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaDeleteOneById") dto: IAppRequest<"ReservaDeleteOneById">) {
    const domain: IDomain.ReservaFindOneInput = requestRepresentationMergeToDomain(dto);
    return this.reservaService.reservaDeleteOneById(accessContext, domain);
  }
}
