import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { PerfilService } from "./perfil.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Controller("/vinculos")
@ApiTags("perfis")
export class PerfilController {
  constructor(private vinculoService: PerfilService) {}

  @Get("/")
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("FindAll") dto: IApiDoc.operations["FindAll"],
  ) {
    return this.vinculoService.perfilFindAll(accessContext, dto);
  }

  @Post("/")
  async vinculoSetVinculos(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @HttpOperationInput("VinculoSetVinculos") dto: IApiDoc.operations["VinculoSetVinculos"],
  ) {
    return this.vinculoService.perfilSetVinculos(accessContext, dto);
  }
}
