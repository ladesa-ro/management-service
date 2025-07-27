import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { ReservaService } from "./reserva.service";

@ApiTags("reservas")
@Controller("/reservas")
export class ReservaController {
  constructor(private reservaService: ReservaService) {}

  @Get("/")
  async reservaFindAll(
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("ReservaFindAll") dto: IAppRequest<"ReservaFindAll">,
  ): Promise<LadesaTypings.ReservaListOperationOutput["success"]> {
    return this.reservaService.reservaFindAll(accessContext, dto);
  }

  @Get("/:id")
  async reservaFindById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaFindById") dto: IAppRequest<"ReservaFindById">) {
    return this.reservaService.reservaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  @Post("/")
  async reservaCreate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaCreate") dto: IAppRequest<"ReservaCreate">) {
    return this.reservaService.reservaCreate(accessContext, dto);
  }

  @Patch("/:id")
  async reservaUpdate(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaUpdate") dto: IAppRequest<"ReservaUpdate">) {
    return this.reservaService.reservaUpdate(accessContext, dto);
  }

  @Delete("/:id")
  async reservaDeleteOneById(@AccessContextHttp() accessContext: AccessContext, @AppRequest("ReservaDeleteOneById") dto: IAppRequest<"ReservaDeleteOneById">) {
    return this.reservaService.reservaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }
}
