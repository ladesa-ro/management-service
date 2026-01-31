import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AutenticacaoService } from "@/core/autenticacao";
import { UsuarioService } from "@/core/usuario";
import { UsuarioFindOneOutputDto } from "@/server/nest/modules/usuario/rest";
import { AccessContext, AccessContextHttp } from "@/v2/old/infrastructure/access-context";
import { Public } from "@/v2/old/infrastructure/authentication";
import {
  AuthCredentialsSetInitialPasswordInputDto,
  AuthLoginInputDto,
  AuthRecoverPasswordInputDto,
  AuthRefreshInputDto,
  AuthSessionCredentialsDto,
  AuthWhoAmIOutputDto,
} from "./autenticacao.rest.dto";

@ApiTags("autenticacao")
@Controller("/autenticacao")
export class AutenticacaoRestController {
  constructor(
    private readonly autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
  ) {}

  @Get("/quem-sou-eu/ensino")
  @ApiOperation({ summary: "Retorna informacoes de ensino do usuario logado", operationId: "autenticacaoEnsinoById" })
  @ApiOkResponse({ type: UsuarioFindOneOutputDto })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  async whoAmIEnsino(
    @AccessContextHttp() accessContext: AccessContext,
  ): Promise<UsuarioFindOneOutputDto> {
    const idUsuario = accessContext.requestActor?.id;
    if (!idUsuario) {
      throw new BadRequestException();
    }
    return this.usuarioService.usuarioEnsinoById(accessContext, { id: idUsuario }) as any;
  }

  @Get("/quem-sou-eu")
  @ApiOperation({ summary: "Retorna informacoes do usuario logado", operationId: "autenticacaoWhoAmI" })
  @ApiOkResponse({ type: AuthWhoAmIOutputDto })
  @ApiForbiddenResponse()
  async whoAmI(@AccessContextHttp() accessContext: AccessContext): Promise<AuthWhoAmIOutputDto> {
    return this.autenticacaoService.whoAmI(
      accessContext,
    ) as unknown as Promise<AuthWhoAmIOutputDto>;
  }

  @Post("/login")
  @Public()
  @ApiOperation({ summary: "Realiza login com matricula e senha", operationId: "autenticacaoLogin" })
  @ApiCreatedResponse({ type: AuthSessionCredentialsDto })
  @ApiForbiddenResponse()
  async login(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthLoginInputDto,
  ): Promise<AuthSessionCredentialsDto> {
    return this.autenticacaoService.login(accessContext, dto);
  }

  @Post("/login/refresh")
  @Public()
  @ApiOperation({ summary: "Atualiza token de acesso usando refresh token", operationId: "autenticacaoRefresh" })
  @ApiCreatedResponse({ type: AuthSessionCredentialsDto })
  @ApiForbiddenResponse()
  async refresh(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthRefreshInputDto,
  ): Promise<AuthSessionCredentialsDto> {
    return this.autenticacaoService.refresh(accessContext, dto);
  }

  @Post("/definir-senha")
  @ApiOperation({ summary: "Define senha inicial do usuario", operationId: "autenticacaoSetInitialPassword" })
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse()
  async definirSenha(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthCredentialsSetInitialPasswordInputDto,
  ): Promise<boolean> {
    return this.autenticacaoService.definirSenha(accessContext, dto);
  }

  @Post("/redefinir-senha")
  @ApiOperation({ summary: "Envia email para redefinir senha", operationId: "autenticacaoRequestPasswordReset" })
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse()
  async redefinirSenha(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthRecoverPasswordInputDto,
  ): Promise<boolean> {
    return this.autenticacaoService.recoverPassword(accessContext, dto);
  }
}
