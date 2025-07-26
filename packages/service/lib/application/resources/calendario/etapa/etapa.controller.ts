import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { EtapaService } from "./etapa.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("etapas")
@Controller("/etapas")
export class EtapaController {
  constructor(private etapaService: EtapaService) {}

  @Get("/")
  async etapaFindAll(@AccessContextHttp() clientAccess: AccessContext, @HttpOperationInput("EtapaFindAll") dto: IApiDoc.operations["EtapaFindAll"]): Promise<LadesaTypings.EtapaListOperationOutput["success"]> {
    return this.etapaService.etapaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async etapaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EtapaFindById") dto: IApiDoc.operations["EtapaFindById"],
  ) {
    return this.etapaService.etapaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async etapaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EtapaCreate") dto: IApiDoc.operations["EtapaCreate"],
  ) {
    return this.etapaService.etapaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async etapaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EtapaUpdate") dto: IApiDoc.operations["EtapaUpdate"],
  ) {
    return this.etapaService.etapaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async etapaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("EtapaDeleteOneById") dto: IApiDoc.operations["EtapaDeleteOneById"],
  ) {
    return this.etapaService.etapaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
