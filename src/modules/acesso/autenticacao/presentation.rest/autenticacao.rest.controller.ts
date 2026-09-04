import { BadRequestException, Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Throttle, ThrottlerGuard } from "@nestjs/throttler";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep } from "@/domain/dependency-injection";
import {
  AutenticacaoDefinirSenhaCommandMetadata,
  IAutenticacaoDefinirSenhaCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-definir-senha.command.handler.interface";
import {
  AutenticacaoLoginCommandMetadata,
  IAutenticacaoLoginCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-login.command.handler.interface";
import {
  AutenticacaoRecoverPasswordCommandMetadata,
  IAutenticacaoRecoverPasswordCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-recover-password.command.handler.interface";
import {
  AutenticacaoRefreshCommandMetadata,
  IAutenticacaoRefreshCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-refresh.command.handler.interface";
import {
  AutenticacaoWhoAmIQueryMetadata,
  IAutenticacaoWhoAmIQueryHandler,
} from "@/modules/acesso/autenticacao/domain/queries/autenticacao-who-am-i.query.handler.interface";
import { AutenticacaoWhoAmIEnsinoQueryMetadata } from "@/modules/acesso/autenticacao/domain/queries/autenticacao-who-am-i-ensino.query.metadata";
import { IUsuarioEnsinoQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-ensino.query.handler.interface";
import * as PerfilRestMapper from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.mapper";
import { UsuarioEnsinoOutputRestDto } from "@/modules/acesso/usuario/presentation.rest";
import * as UsuarioRestMapper from "@/modules/acesso/usuario/presentation.rest/usuario.rest.mapper";
import { AccessContextHttp } from "@/server/nest/access-context";
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
@UseGuards(ThrottlerGuard)
export class AutenticacaoRestController {
  constructor(
    @Dep(IUsuarioEnsinoQueryHandler)
    private readonly usuarioEnsinoHandler: IUsuarioEnsinoQueryHandler,
    @Dep(IAutenticacaoWhoAmIQueryHandler)
    private readonly whoAmIHandler: IAutenticacaoWhoAmIQueryHandler,
    @Dep(IAutenticacaoLoginCommandHandler)
    private readonly loginHandler: IAutenticacaoLoginCommandHandler,
    @Dep(IAutenticacaoRefreshCommandHandler)
    private readonly refreshHandler: IAutenticacaoRefreshCommandHandler,
    @Dep(IAutenticacaoDefinirSenhaCommandHandler)
    private readonly definirSenhaHandler: IAutenticacaoDefinirSenhaCommandHandler,
    @Dep(IAutenticacaoRecoverPasswordCommandHandler)
    private readonly recoverPasswordHandler: IAutenticacaoRecoverPasswordCommandHandler,
  ) {}

  @Get("/quem-sou-eu/ensino")
  @ApiOperation(AutenticacaoWhoAmIEnsinoQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: UsuarioEnsinoOutputRestDto })
  @ApiForbiddenResponse()
  @ApiBadRequestResponse()
  async whoAmIEnsino(
    @AccessContextHttp() accessContext: IAccessContext,
  ): Promise<UsuarioEnsinoOutputRestDto> {
    const usuarioId = accessContext.requestActor?.id;
    if (!usuarioId) {
      throw new BadRequestException("Usuário não identificado.");
    }
    const result = await this.usuarioEnsinoHandler.execute(accessContext, {
      id: usuarioId,
    });
    return UsuarioRestMapper.toEnsinoOutputDto(result);
  }

  @Get("/quem-sou-eu")
  @ApiOperation(AutenticacaoWhoAmIQueryMetadata.swaggerMetadata)
  @ApiOkResponse({ type: AuthWhoAmIOutputRestDto })
  @ApiForbiddenResponse()
  async whoAmI(
    @AccessContextHttp() accessContext: IAccessContext,
  ): Promise<AuthWhoAmIOutputRestDto> {
    const result = await this.whoAmIHandler.execute(accessContext, undefined);

    const dto = new AuthWhoAmIOutputRestDto();
    dto.usuario = result.usuario
      ? UsuarioRestMapper.findOneQueryResultToOutputDto.map(result.usuario)
      : null;
    dto.perfisAtivos = (result.perfisAtivos ?? []).map((p) =>
      PerfilRestMapper.findOneQueryResultToOutputDto.map(p),
    );
    return dto;
  }

  @Post("/login")
  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation(AutenticacaoLoginCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: AuthSessionCredentialsRestDto })
  @ApiForbiddenResponse()
  async login(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: AuthLoginInputRestDto,
  ): Promise<AuthSessionCredentialsRestDto> {
    return this.loginHandler.execute(accessContext, dto);
  }

  @Post("/login/refresh")
  @Public()
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @ApiOperation(AutenticacaoRefreshCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: AuthSessionCredentialsRestDto })
  @ApiForbiddenResponse()
  async refresh(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: AuthRefreshInputRestDto,
  ): Promise<AuthSessionCredentialsRestDto> {
    return this.refreshHandler.execute(accessContext, dto);
  }

  @Post("/definir-senha")
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation(AutenticacaoDefinirSenhaCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse()
  async definirSenha(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: AuthCredentialsSetInitialPasswordInputRestDto,
  ): Promise<boolean> {
    return this.definirSenhaHandler.execute(accessContext, dto);
  }

  @Post("/redefinir-senha")
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @ApiOperation(AutenticacaoRecoverPasswordCommandMetadata.swaggerMetadata)
  @ApiCreatedResponse({ type: Boolean })
  @ApiForbiddenResponse()
  async redefinirSenha(
    @AccessContextHttp() accessContext: IAccessContext,
    @Body() dto: AuthRecoverPasswordInputRestDto,
  ): Promise<boolean> {
    return this.recoverPasswordHandler.execute(accessContext, dto);
  }
}
