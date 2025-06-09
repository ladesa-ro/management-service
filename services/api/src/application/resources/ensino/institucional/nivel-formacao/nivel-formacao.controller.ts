import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NivelFormacaoService } from "./nivel-formacao.service";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoController {
  constructor(private nivelformacaoService: NivelFormacaoService) {}

  //

  @Get("/")
  @Operation(Tokens.NivelFormacaoList)
  async nivelformacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoListOperationInput,
  ): Promise<LadesaTypings.NivelFormacaoListOperationOutput["success"]> {
    return this.nivelformacaoService.nivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  @Operation(Tokens.NivelFormacaoFindOneById)
  async nivelformacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoFindOneByIdOperationOutput,
  ) {
    return this.nivelformacaoService.nivelFormacaoFindByIdStrict(accessContext, {
      id: dto.params.id,
    });
  }

  //

  @Post("/")
  @Operation(Tokens.NivelFormacaoCreate)
  async nivelformacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoCreateOperationInput,
  ) {
    return this.nivelformacaoService.nivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  @Operation(Tokens.NivelFormacaoUpdateOneById)
  async nivelformacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoUpdateByIdOperationInput,
  ) {
    return this.nivelformacaoService.nivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  @Operation(Tokens.NivelFormacaoDeleteOneById)
  async nivelformacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.NivelFormacaoDeleteByIdOperationInput,
  ) {
    return this.nivelformacaoService.nivelFormacaoDeleteOneById(accessContext, {
      id: dto.params.id,
    });
  }

  //
}
