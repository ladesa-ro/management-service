import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { type IAppRequest } from "@/application/contracts/openapi/document/app-openapi-typings";
import { AppRequest } from "@/application/contracts/openapi/utils/app-request";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { NivelFormacaoService } from "./nivel-formacao.service";

@ApiTags("niveis-formacoes")
@Controller("/niveis-formacoes")
export class NivelFormacaoController {
  constructor(private nivelformacaoService: NivelFormacaoService) {}

  //

  @Get("/")
  async nivelformacaoFindAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("NivelformacaoFindAll") dto: IAppRequest<"NivelformacaoFindAll">,
  ): Promise<LadesaTypings.NivelFormacaoListOperationOutput["success"]> {
    return this.nivelformacaoService.nivelFormacaoFindAll(accessContext, dto);
  }

  //

  @Get("/:id")
  async nivelformacaoFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("NivelformacaoFindById") dto: IAppRequest<"NivelformacaoFindById">,
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
    @AppRequest("NivelformacaoCreate") dto: IAppRequest<"NivelformacaoCreate">,
  ) {
    return this.nivelformacaoService.nivelFormacaoCreate(accessContext, dto);
  }

  //

  @Patch("/:id")
  async nivelformacaoUpdate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("NivelformacaoUpdate") dto: IAppRequest<"NivelformacaoUpdate">,
  ) {
    return this.nivelformacaoService.nivelFormacaoUpdate(accessContext, dto);
  }

  //

  @Delete("/:id")
  async nivelformacaoDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @AppRequest("NivelformacaoDeleteOneById") dto: IAppRequest<"NivelformacaoDeleteOneById">,
  ) {
    return this.nivelformacaoService.nivelFormacaoDeleteOneById(accessContext, {
      id: dto.parameters.path.id,
    });
  }

  //
}
