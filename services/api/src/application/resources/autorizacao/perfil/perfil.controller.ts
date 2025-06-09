import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PerfilService } from "./perfil.service";

@Controller("/vinculos")
@ApiTags("perfis")
export class PerfilController {
  constructor(private vinculoService: PerfilService) {}

  @Get("/")
  @Operation(Tokens.PerfilList)
  async findAll(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.PerfilListOperationInput,
  ) {
    return this.vinculoService.perfilFindAll(accessContext, dto);
  }

  @Post("/")
  @Operation(Tokens.PerfilUpdateOneById)
  async vinculoSetVinculos(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.PerfilUpdateOperationInput,
  ) {
    return this.vinculoService.perfilSetVinculos(accessContext, dto);
  }
}
