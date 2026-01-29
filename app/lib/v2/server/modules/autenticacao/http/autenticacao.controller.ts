import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AccessContext, AccessContextHttp } from "@/old/infrastructure/access-context";
import { Public } from "@/old/infrastructure/authentication";
import { UsuarioFindOneOutputDto } from "@/v2/server/modules/usuario/http/dto";
import { AutenticacaoService } from "@/v2/core/autenticacao/application/use-cases/autenticacao.service";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";
import {
  AuthCredentialsSetInitialPasswordInputDto,
  AuthLoginInputDto,
  AuthRecoverPasswordInputDto,
  AuthRefreshInputDto,
  AuthSessionCredentialsDto,
  AuthWhoAmIOutputDto,
} from "./dto";

@ApiTags("autenticacao")
@Controller("/autenticacao")
export class AutenticacaoController {
  constructor(
    private readonly autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
  ) {}

  @Get("/quem-sou-eu/ensino")
  @ApiOperation({ summary: "Retorna informacoes de ensino do usuario logado" })
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
    return this.usuarioService.usuarioEnsinoById(accessContext, { id: idUsuario });
  }

  @Get("/quem-sou-eu")
  @ApiOperation({ summary: "Retorna informacoes do usuario logado" })
  @ApiOkResponse({ type: AuthWhoAmIOutputDto })
  @ApiForbiddenResponse()
  async whoAmI(@AccessContextHttp() accessContext: AccessContext): Promise<AuthWhoAmIOutputDto> {
    return this.autenticacaoService.whoAmI(
      accessContext,
    ) as unknown as Promise<AuthWhoAmIOutputDto>;
  }

  @Post("/login")
  @Public()
  @ApiOperation({ summary: "Realiza login com matricula e senha" })
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
  @ApiOperation({ summary: "Atualiza token de acesso usando refresh token" })
  @ApiCreatedResponse({ type: AuthSessionCredentialsDto })
  @ApiForbiddenResponse()
  async refresh(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthRefreshInputDto,
  ): Promise<AuthSessionCredentialsDto> {
    return this.autenticacaoService.refresh(accessContext, dto);
  }

  @Post("/definir-senha")
  @ApiOperation({ summary: "Define senha inicial do usuario" })
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse()
  async definirSenha(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthCredentialsSetInitialPasswordInputDto,
  ): Promise<boolean> {
    return this.autenticacaoService.definirSenha(accessContext, dto);
  }

  @Post("/redefinir-senha")
  @ApiOperation({ summary: "Envia email para redefinir senha" })
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse()
  async redefinirSenha(
    @AccessContextHttp() accessContext: AccessContext,
    @Body() dto: AuthRecoverPasswordInputDto,
  ): Promise<boolean> {
    return this.autenticacaoService.recoverPassword(accessContext, dto);
  }
}
