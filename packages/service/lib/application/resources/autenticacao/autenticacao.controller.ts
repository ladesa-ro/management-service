import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Tokens } from "@ladesa-ro/especificacao";
import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Operation } from "@/application/standards/especificacao/business-logic";
import { type AccessContext, AccessContextHttp } from "@/infrastructure/access-context";
import { Public } from "@/infrastructure/authentication";
import { AutenticacaoService } from "./autenticacao.service";
import { HttpOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@ApiTags("autenticacao")
@Controller("/autenticacao")
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Get("/quem-sou-eu")
  whoAmI(
    //
    @AccessContextHttp() accessContext: AccessContext,
  ) {
    return this.autenticacaoService.whoAmI(accessContext);
  }

  @Post("/login")
  @Public()
  login(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AuthLoginOperationInput,
  ) {
    return this.autenticacaoService.login(accessContext, dto);
  }

  @Post("/login/refresh")
  @Public()
  refresh(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.AuthRefreshOperationInput,
  ) {
    return this.autenticacaoService.refresh(accessContext, dto);
  }

  @Post("/definir-senha")
  definirSenha(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput()
    dto: LadesaTypings.AuthCredentialsSetInitialPasswordOperationInput,
  ) {
    return this.autenticacaoService.definirSenha(accessContext, dto);
  }

  @Post("/redefinir-senha")
  redefinirSenha(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: LadesaTypings.AuthRecoverPasswordOperationInput) {
    return this.autenticacaoService.recoverPassword(accessContext, dto);
  }
}
