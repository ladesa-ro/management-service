import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisponibilidadeService } from "./disponibilidade.service";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController {
  constructor(private disponibilidadeService: DisponibilidadeService) {}

  //

  @Get("/")
  async disponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DisponibilidadeFindAll") dto: IAppRequest<"DisponibilidadeFindAll">,
  ): Promise<LadesaTypings.DisponibilidadeListOperationOutput["success"]> {
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async disponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,

    @AppRequest("DisponibilidadeFindById") dto: IAppRequest<"DisponibilidadeFindById">,
  ) {
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async disponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DisponibilidadeCreate") dto: IAppRequest<"DisponibilidadeCreate">,
  ) {
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async disponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DisponibilidadeUpdate") dto: IAppRequest<"DisponibilidadeUpdate">,
  ) {
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async disponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("DisponibilidadeDeleteOneById") dto: IAppRequest<"DisponibilidadeDeleteOneById">,
  ) {
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
