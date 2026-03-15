import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { DeclareDependency } from "@/domain/dependency-injection";
import { AccessContext, AccessContextHttp } from "@/modules/@seguranca/contexto-acesso";
import { IAutenticacaoDefinirSenhaCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-definir-senha.command.handler.interface";
import { IAutenticacaoLoginCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-login.command.handler.interface";
import { IAutenticacaoRecoverPasswordCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-recover-password.command.handler.interface";
import { IAutenticacaoRefreshCommandHandler } from "@/modules/acesso/autenticacao/domain/commands/autenticacao-refresh.command.handler.interface";
import { IAutenticacaoWhoAmIQueryHandler } from "@/modules/acesso/autenticacao/domain/queries/autenticacao-who-am-i.query.handler.interface";
import { IUsuarioEnsinoQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import { UsuarioEnsinoOutputRestDto } from "@/modules/acesso/usuario/presentation.rest";
import { Public } from "@/server/nest/auth";
import {
  AuthCredentialsSetInitialPasswordInputRestDto,
  AuthLoginInputRestDto,
  AuthRecoverPasswordInputRestDto,
  AuthRefreshInputRestDto,
  AuthSessionCredentialsRestDto,
  AuthWhoAmIOutputRestDto,
} from "./autenticacao.rest.dto";

@ApiTags("autenticacao")
@Controller("/autenticacao")
export class AutenticacaoRestController {
  constructor(
    @DeclareDependency(IUsuarioEnsinoQueryHandler)
    private readonly usuarioEnsinoHandler: IUsuarioEnsinoQueryHandler,
    @DeclareDependency(IAutenticacaoWhoAmIQueryHandler)
    private readonly whoAmIHandler: IAutenticacaoWhoAmIQueryHandler,
    @DeclareDependency(IAutenticacaoLoginCommandHandler)
    private readonly loginHandler: IAutenticacaoLoginCommandHandler,
    @DeclareDependency(IAutenticacaoRefreshCommandHandler)
    private readonly refreshHandler: IAutenticacaoRefreshCommandHandler,
    @DeclareDependency(IAutenticacaoDefinirSenhaCommandHandler)
    private readonly definirSenhaHandler: IAutenticacaoDefinirSenhaCommandHandler,
    @DeclareDependency(IAutenticacaoRecoverPasswordCommandHandler)
    private readonly recoverPasswordHandler: IAutenticacaoRecoverPasswordCommandHandler,
  ) {}

  @Get("/quem-sou-eu/ensino")
  @ApiOperation({
    summary: "Retorna informacoes de ensino do usuario logado",
    operationId: "autenticacaoWhoAmIEnsino",
  })
  @ApiOkResponse({ type: UsuarioEnsinoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  async whoAmIEnsino(
    @AccessContextHttp() accessContext: AccessContext,
  ): Promise<UsuarioEnsinoOutputRestDto> {
    const idUsuario = accessContext.requestActor?.id;
    if (!idUsuario) {
      throw new BadRequestException();
    }
    return this.usuarioEnsinoHandler.execute(accessContext, { id: idUsuario }) as any;
  }

  @Get("/quem-sou-eu")
  @ApiOperation({
    summary: "Retorna informacoes do usuario logado",
    operationId: "autenticacaoWhoAmI",
  })
  @ApiOkResponse({ type: AuthWhoAmIOutputRestDto })
  @ApiForbiddenResponse()
  async whoAmI(
    @AccessContextHttp() accessContext: AccessContext,
  ): Promise<AuthWhoAmIOutputRestDto> {
    return this.whoAmIHandler.execute(
      accessContext,
      undefined,
    ) as unknown as Promise<AuthWhoAmIOutputRestDto>;
  }

  @Post("/login")
  @Public()
  @ApiOperation({
    summary: "Realiza login com matricula e senha",
    operationId: "autenticacaoLogin",
  })
  @ApiCreatedResponse({ type: AuthSessionCredentialsRestDto })
  @ApiForbiddenResponse()
  async login(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthLoginInputRestDto,
  ): Promise<AuthSessionCredentialsRestDto> {
    return this.loginHandler.execute(accessContext, dto);
  }

  @Post("/login/refresh")
  @Public()
  @ApiOperation({
    summary: "Atualiza token de acesso usando refresh token",
    operationId: "autenticacaoRefresh",
  })
  @ApiCreatedResponse({ type: AuthSessionCredentialsRestDto })
  @ApiForbiddenResponse()
  async refresh(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthRefreshInputRestDto,
  ): Promise<AuthSessionCredentialsRestDto> {
    return this.refreshHandler.execute(accessContext, dto);
  }

  @Post("/definir-senha")
  @ApiOperation({
    summary: "Define senha inicial do usuario",
    operationId: "autenticacaoSetInitialPassword",
  })
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse()
  async definirSenha(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthCredentialsSetInitialPasswordInputRestDto,
  ): Promise<boolean> {
    return this.definirSenhaHandler.execute(accessContext, dto);
  }

  @Post("/redefinir-senha")
  @ApiOperation({
    summary: "Envia email para redefinir senha",
    operationId: "autenticacaoRequestPasswordReset",
  })
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse()
  async redefinirSenha(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthRecoverPasswordInputRestDto,
  ): Promise<boolean> {
    return this.recoverPasswordHandler.execute(accessContext, dto);
  }
}
