import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AutenticacaoService } from "@/modules/@acesso/autenticacao";
import { UsuarioService } from "@/modules/@acesso/usuario";
import { UsuarioEnsinoOutputRestDto } from "@/modules/@acesso/usuario/presentation/rest";
import { AccessContext, AccessContextHttp } from "@/modules/@core/access-context";
import { Public } from "@/modules/@core/authentication";
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
    private readonly autenticacaoService: AutenticacaoService,
    private usuarioService: UsuarioService,
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
    return this.usuarioService.usuarioEnsinoById(accessContext, { id: idUsuario }) as any;
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
    return this.autenticacaoService.whoAmI(
      accessContext,
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
    return this.autenticacaoService.login(accessContext, dto);
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
    return this.autenticacaoService.refresh(accessContext, dto);
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
    return this.autenticacaoService.definirSenha(accessContext, dto);
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
    return this.autenticacaoService.recoverPassword(accessContext, dto);
  }
}
