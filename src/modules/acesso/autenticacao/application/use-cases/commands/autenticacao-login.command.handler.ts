import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from "@nestjs/common";
import * as client from "openid-client";
import { KeycloakService, OpenidConnectService } from "@/modules/@seguranca/provedor-identidade";
import {
  type IAutenticacaoLoginCommand,
  IAutenticacaoLoginCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-login.command.handler.interface";
import { IUsuarioFindByMatriculaQueryHandler } from "@/modules/acesso/usuario/domain/queries/usuario-find-by-matricula.query.handler.interface";
import type { AuthSessionCredentialsDto } from "../../dtos";

@Injectable()
export class AutenticacaoLoginCommandHandlerImpl implements IAutenticacaoLoginCommandHandler {
  constructor(
    @Inject(IUsuarioFindByMatriculaQueryHandler)
    private readonly usuarioFindByMatriculaHandler: IUsuarioFindByMatriculaQueryHandler,
    private readonly keycloakService: KeycloakService,
    private readonly openidConnectService: OpenidConnectService,
  ) {}

  async execute({
    accessContext,
    dto,
  }: IAutenticacaoLoginCommand): Promise<AuthSessionCredentialsDto> {
    if (accessContext.requestActor !== null) {
      throw new BadRequestException("Você não pode usar a rota de login caso já esteja logado.");
    }

    let config: client.Configuration;

    try {
      config = await this.openidConnectService.getClientConfig();
    } catch (_error) {
      throw new ServiceUnavailableException();
    }

    const { usuario, userRepresentation } = await this.findByMatricula(dto.matricula);

    try {
      if (usuario && userRepresentation?.username) {
        const tokenset = await client.genericGrantRequest(config, "password", {
          username: userRepresentation.username,
          password: dto.senha,
          scope: "openid profile",
        });

        const formattedTokenSet = this.formatTokenSet(tokenset);

        return formattedTokenSet;
      }
    } catch (_error) {}

    throw new ForbiddenException("Credenciais inválidas.");
  }

  private formatTokenSet(
    tokenset: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
  ) {
    return <AuthSessionCredentialsDto>{
      access_token: tokenset.access_token ?? null,
      token_type: tokenset.token_type ?? null,
      id_token: tokenset.id_token ?? null,
      refresh_token: tokenset.refresh_token ?? null,
      expires_in: tokenset.expires_in ?? null,
      expires_at: tokenset.expires_in ? new Date(Date.now() + tokenset.expires_in).getTime() : null,
      session_state: tokenset.session_state ?? null,
      scope: tokenset.scope ?? null,
    };
  }

  private async findByMatricula(matricula: string) {
    const usuario = await this.usuarioFindByMatriculaHandler.execute({ matricula });
    const userRepresentation = await this.keycloakService.findUserByMatricula(matricula);

    return {
      usuario,
      userRepresentation,
    };
  }
}
