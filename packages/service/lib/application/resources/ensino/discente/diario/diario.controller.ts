import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { DiarioService } from "./diario.service";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  //

  @Get("/")
  async diarioFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioFindAll") dto: IApiDoc.operations["DiarioFindAll"],
  ): Promise<LadesaTypings.DiarioListOperationOutput["success"]> {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async diarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioFindById") dto: IApiDoc.operations["DiarioFindById"],
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async diarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioCreate") dto: IApiDoc.operations["DiarioCreate"],
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async diarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioUpdate") dto: IApiDoc.operations["DiarioUpdate"],
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async diarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("DiarioDeleteOneById") dto: IApiDoc.operations["DiarioDeleteOneById"],
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
