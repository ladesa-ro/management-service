import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DisponibilidadeService } from "./disponibilidade.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController {
  constructor(private disponibilidadeService: DisponibilidadeService) {}

  //

  @Get("/")
  async disponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisponibilidadeFindAll") dto: IApiDoc.operations["DisponibilidadeFindAll"],
  ): Promise<LadesaTypings.DisponibilidadeListOperationOutput["success"]> {
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async disponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    
    @HttpOperationInput("DisponibilidadeFindById") dto: IApiDoc.operations["DisponibilidadeFindById"],
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
    @HttpOperationInput("DisponibilidadeCreate") dto: IApiDoc.operations["DisponibilidadeCreate"],
  ) {
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async disponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisponibilidadeUpdate") dto: IApiDoc.operations["DisponibilidadeUpdate"],
  ) {
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async disponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DisponibilidadeDeleteOneById") dto: IApiDoc.operations["DisponibilidadeDeleteOneById"],
  ) {
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
