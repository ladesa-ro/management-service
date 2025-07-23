
import { type AccessContext, AccessContextHttp } from "@/access-context";
import { Public } from "@/infrastructure/authentication";

import { AutenticacaoService } from "@ladesa-ro/management-management-service.domain";
import type * as IDomainContracts from "@ladesa-ro/management-management-service.domain.application-domain-contracts/typings";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RotaInputs } from "../helpers/rota-inputs";

@ApiTags("autenticacao")
@Controller("/autenticacao")
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) { }

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
    @RotaInputs() dto: IDomainContracts.AuthLoginInput,
  ) {
    return this.autenticacaoService.login(accessContext, dto);
  }

  @Post("/login/refresh")
  @Public()
  @Operation(Tokens.AuthRefresh)
  refresh(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs() dto: IDomainContracts.AuthRefreshInput,
  ) {
    return this.autenticacaoService.refresh(accessContext, dto);
  }

  @Post("/definir-senha")
  @Operation(Tokens.AuthSetInitialPassword)
  definirSenha(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @RotaInputs()
    dto: IDomainContracts.AuthCredentialsSetInitialPasswordInput,
  ) {
    return this.autenticacaoService.definirSenha(accessContext, dto);
  }

  @Post("/redefinir-senha")
  @Operation(Tokens.AuthRecoverPassword)
  redefinirSenha(@AccessContextHttp() accessContext: AccessContext, @RotaInputs() dto: IDomainContracts.AuthRecoverPasswordInput) {
    return this.autenticacaoService.recoverPassword(accessContext, dto);
  }
}
