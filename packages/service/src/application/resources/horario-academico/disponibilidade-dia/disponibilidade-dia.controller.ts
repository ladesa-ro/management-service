import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisponibilidadeDiaService } from "./disponibilidade-dia.service";

@ApiTags("diarios-preferencia-agrupamento")
@Controller("/diarios-preferencia-agrupamento")
export class DisponibilidadeDiaController {
  constructor(private disponibilidadeDiaService: DisponibilidadeDiaService) {}

  @Get("/")
  @Operation(Tokens.DisponibilidadeDiaList)
  async disponibilidadeDiaFindAll(
    @AccessContextHttp() clientAccess: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaListOperationInput,
  ): Promise<LadesaTypings.DisponibilidadeDiaListOperationOutput["success"]> {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindAll(clientAccess, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.DisponibilidadeDiaFindOneById)
  async disponibilidadeDiaFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaFindOneByIdOperationOutput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post("/")
  @Operation(Tokens.DisponibilidadeDiaCreate)
  async disponibilidadeDiaCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaCreateOperationInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.DisponibilidadeDiaUpdateOneById)
  async disponibilidadeDiaUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaUpdateByIdOperationInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.DisponibilidadeDiaDeleteOneById)
  async disponibilidadeDiaDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeDiaDeleteByIdOperationInput,
  ) {
    return this.disponibilidadeDiaService.disponibilidadeDiaDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
