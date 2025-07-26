import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("AulaFindAll") dto: IOperationInput<"AulaFindAll">,
  ): Promise<LadesaTypings.AulaListOperationOutput["success"]> {
    return this.aulaService.aulaFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async aulaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaFindById") dto: IOperationInput<"AulaFindById">,
  ) {
    return this.aulaService.aulaFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async aulaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaCreate") dto: IOperationInput<"AulaCreate">,
  ) {
    return this.aulaService.aulaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async aulaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaUpdate") dto: IOperationInput<"AulaUpdate">,
  ) {
    return this.aulaService.aulaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async aulaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("AulaDeleteOneById") dto: IOperationInput<"AulaDeleteOneById">,
  ) {
    return this.aulaService.aulaDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
