import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DisponibilidadeDiaController {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) {}

  @Get("/")
  async disponibilidadeDiaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaFindAll") dto: IApiDoc.operations["DisponibilidadeDiaFindAll"],
  ): Promise<LadesaTypings.DisponibilidadeDiaListOperationOutput["success"]> {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  async disponibilidadeDiaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaFindById") dto: IApiDoc.operations["DisponibilidadeDiaFindById"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.parameters.path.id });
  }

  //

  @Post("/")
  async disponibilidadeDiaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaCreate") dto: IApiDoc.operations["DisponibilidadeDiaCreate"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async disponibilidadeDiaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaUpdate") dto: IApiDoc.operations["DisponibilidadeDiaUpdate"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async disponibilidadeDiaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeDiaDeleteOneById") dto: IApiDoc.operations["DisponibilidadeDiaDeleteOneById"],
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.parameters.path.id });
  }

  //
}
