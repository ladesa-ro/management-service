import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DisponibilidadeService } from "./disponibilidade.service";

@ApiTags("disponibilidades")
@Controller("/disponibilidades")
export class DisponibilidadeController {
  constructor(private disponibilidadeService: DisponibilidadeService) {}

  //

  @Get("/")
  @Operation(Tokens.DisponibilidadeList)
  async disponibilidadeFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeListOperationInput,
  ): Promise<LadesaTypings.DisponibilidadeListOperationOutput["success"]> {
    return this.disponibilidadeService.disponibilidadeFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.DisponibilidadeFindOneById)
  async disponibilidadeFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.DisponibilidadeFindOneByIdOperationOutput,
  ) {
    return this.disponibilidadeService.disponibilidadeFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.DisponibilidadeCreate)
  async disponibilidadeCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeCreateOperationInput,
  ) {
    return this.disponibilidadeService.disponibilidadeCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.DisponibilidadeUpdateOneById)
  async disponibilidadeUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeUpdateByIdOperationInput,
  ) {
    return this.disponibilidadeService.disponibilidadeUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.DisponibilidadeDeleteOneById)
  async disponibilidadeDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.DisponibilidadeDeleteByIdOperationInput,
  ) {
    return this.disponibilidadeService.disponibilidadeDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
