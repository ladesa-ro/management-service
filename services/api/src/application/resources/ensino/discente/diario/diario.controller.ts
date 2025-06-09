import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiarioService } from "./diario.service";

@ApiTags("diarios")
@Controller("/diarios")
export class DiarioController {
  constructor(private diarioService: DiarioService) {}

  //

  @Get("/")
  @Operation(Tokens.DiarioList)
  async diarioFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioListOperationInput,
  ): Promise<LadesaTypings.DiarioListOperationOutput["success"]> {
    return this.diarioService.diarioFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.DiarioFindOneById)
  async diarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioFindOneByIdOperationOutput,
  ) {
    return this.diarioService.diarioFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.DiarioCreate)
  async diarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioCreateOperationInput,
  ) {
    return this.diarioService.diarioCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.DiarioUpdateOneById)
  async diarioUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioUpdateByIdOperationInput,
  ) {
    return this.diarioService.diarioUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.DiarioDeleteOneById)
  async diarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DiarioDeleteByIdOperationInput,
  ) {
    return this.diarioService.diarioDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
