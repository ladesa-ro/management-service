import { CombinedInput } from "@/application/standards";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Public } from "@/infrastructure/authentication";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AutenticacaoService } from "./autenticacao.service";

@ApiTags("autenticacao")
@Controller("/autenticacao")
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get("/quem-sou-eu")
  @Operation(Tokens.AuthWhoAmI)
  whoAmI(
    //
    @AccessContextHttp() accessContext: AccessContext,
  ) {
    return this.autenticacaoService.whoAmI(accessContext);
  }

  @Post("/login")
  @Public()
  @Operation(Tokens.AuthLogin)
  login(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AuthLoginOperationInput,
  ) {
    return this.autenticacaoService.login(accessContext, dto);
  }

  @Post("/login/refresh")
  @Public()
  @Operation(Tokens.AuthRefresh)
  refresh(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AuthRefreshOperationInput,
  ) {
    return this.autenticacaoService.refresh(accessContext, dto);
  }

  @Post("/definir-senha")
  @Operation(Tokens.AuthSetInitialPassword)
  definirSenha(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.AuthCredentialsSetInitialPasswordOperationInput,
  ) {
    return this.autenticacaoService.definirSenha(accessContext, dto);
  }

  @Post("/redefinir-senha")
  @Operation(Tokens.AuthRecoverPassword)
  redefinirSenha(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: LadesaTypings.AuthRecoverPasswordOperationInput) {
    return this.autenticacaoService.recoverPassword(accessContext, dto);
  }
}
