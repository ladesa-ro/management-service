import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { NivelFormacaoService } from "./nivel-formacao.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoController {
  constructor(private nivelformacaoService: NivelFormacaoService) {}

  //

  @Get("/")
  async nivelformacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("NivelformacaoFindAll") dto: IApiDoc.operations["NivelformacaoFindAll"],
  ): Promise<LadesaTypings.NivelFormacaoListOperationOutput["success"]> {
    return this.nivelformacaoService.nivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async nivelformacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("NivelformacaoFindById") dto: IApiDoc.operations["NivelformacaoFindById"],
  ) {
    return this.nivelformacaoService.nivelFormacaoFindByIdStrict(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //

  @Post("/")
  async nivelformacaoCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("NivelformacaoCreate") dto: IApiDoc.operations["NivelformacaoCreate"],
  ) {
    return this.nivelformacaoService.nivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async nivelformacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("NivelformacaoUpdate") dto: IApiDoc.operations["NivelformacaoUpdate"],
  ) {
    return this.nivelformacaoService.nivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async nivelformacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("NivelformacaoDeleteOneById") dto: IApiDoc.operations["NivelformacaoDeleteOneById"],
  ) {
    return this.nivelformacaoService.nivelFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
