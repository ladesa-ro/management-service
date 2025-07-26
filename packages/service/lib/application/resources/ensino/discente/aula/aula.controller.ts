import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { AulaService } from "./aula.service";

@ApiTags("aulas")
@Controller("/aulas")
export class AulaController {
  constructor(private aulaService: AulaService) {}

  //

  @Get("/")
  async aulaFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaFindAll") dto: IApiDoc.operations["AulaFindAll"],
  ): Promise<LadesaTypings.AulaListOperationOutput["success"]> {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async aulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaFindById") dto: IApiDoc.operations["AulaFindById"],
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  async aulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaCreate") dto: IApiDoc.operations["AulaCreate"],
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async aulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaUpdate") dto: IApiDoc.operations["AulaUpdate"],
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async aulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaDeleteOneById") dto: IApiDoc.operations["AulaDeleteOneById"],
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
