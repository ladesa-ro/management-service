import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import type * as IDomainContracts from "~domain.contracts";
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
    @CombinedInput() dto: IDomainContracts.PerfilListOperationInput,
  ) {
    return this.vinculoService.perfilFindAll(accessContext, dto);
  }

  @Post("/")
  @Operation(Tokens.PerfilUpdateOneById)
  async vinculoSetVinculos(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: IDomainContracts.PerfilUpdateOperationInput,
  ) {
    return this.vinculoService.perfilSetVinculos(accessContext, dto);
  }
}
