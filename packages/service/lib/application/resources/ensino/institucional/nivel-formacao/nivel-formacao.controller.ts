import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { NivelFormacaoService } from "./nivel-formacao.service";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
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
    @HttpOperationInput("NivelformacaoFindAll") dto: IOperationInput<"NivelformacaoFindAll">,
  ): Promise<LadesaTypings.NivelFormacaoListOperationOutput["success"]> {
    return this.nivelformacaoService.nivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async nivelformacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("NivelformacaoFindById") dto: IOperationInput<"NivelformacaoFindById">,
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
    @HttpOperationInput("NivelformacaoCreate") dto: IOperationInput<"NivelformacaoCreate">,
  ) {
    return this.nivelformacaoService.nivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async nivelformacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("NivelformacaoUpdate") dto: IOperationInput<"NivelformacaoUpdate">,
  ) {
    return this.nivelformacaoService.nivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async nivelformacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("NivelformacaoDeleteOneById") dto: IOperationInput<"NivelformacaoDeleteOneById">,
  ) {
    return this.nivelformacaoService.nivelFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
