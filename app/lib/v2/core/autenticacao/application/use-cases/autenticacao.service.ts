import { RequiredActionAlias } from "@keycloak/keycloak-admin-client/lib/defs/requiredActionProviderRepresentation";
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  ServiceUnavailableException
} from "@nestjs/common";
import * as client from "openid-client";
import { PerfilService } from "@/v2/core/perfil/application/use-cases/perfil.service";
import { UsuarioService } from "@/v2/core/usuario/application/use-cases/usuario.service";
import type { AccessContext } from "@/infrastructure/access-context";
import { DatabaseContextService } from "@/v2/adapters/out/persistence/typeorm";
import { KeycloakService, OpenidConnectService } from "@/infrastructure/integrations/identity-provider";
import { type IDomain } from "@/shared/tsp/schema/typings";

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private perfilService: PerfilService,
    private keycloakService: KeycloakService,
    private databaseContext: DatabaseContextService,
    private openidConnectService: OpenidConnectService,
  ) {}

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  async whoAmI(accessContext: AccessContext): Promise<IDomain.AuthWhoAmIOutput> {
    const usuario = accessContext.requestActor
      ? await this.usuarioService.usuarioFindById(accessContext, {
          id: accessContext.requestActor.id,
        })
      : null;

    if (usuario) {
      const perfisAtivos = await this.perfilService.perfilGetAllActive(null, usuario.id);

      return {
        usuario,
        perfisAtivos: perfisAtivos,
      };
    }

    return {
      usuario: null,
      perfisAtivos: [],
    };
  }

  async login(accessContext: AccessContext, domain: IDomain.AuthLoginInput): Promise<IDomain.AuthSessionCredentialsView> {
    if (accessContext.requestActor !== null) {
      throw new BadRequestException("Você não pode usar a rota de login caso já esteja logado.");
    }

    let config: client.Configuration;

    try {
      config = await this.openidConnectService.getClientConfig();
    } catch (_error) {
      throw new ServiceUnavailableException();
    }

    const { usuario, userRepresentation } = await this.findByMatriculaSiape(domain.matriculaSiape);

    try {
      if (usuario && userRepresentation?.username) {
        const tokenset = await client.genericGrantRequest(config, "password", {
          username: userRepresentation.username,
          password: domain.senha,
          scope: "openid profile",
        });

        const formattedTokenSet = this.formatTokenSet(tokenset);

        return formattedTokenSet;
      }
    } catch (_error) {}

    throw new ForbiddenException("Credenciais inválidas.");
  }

  async refresh(_: AccessContext, domain: IDomain.AuthRefreshInput): Promise<IDomain.AuthSessionCredentialsView> {
    let config: client.Configuration;

    try {
      config = await this.openidConnectService.getClientConfig();
    } catch (_error) {
      throw new ServiceUnavailableException();
    }

    try {
      const refreshToken = domain.refreshToken;

      if (refreshToken) {
        const tokenset = await client.refreshTokenGrant(config, refreshToken);
        const formattedTokenSet = this.formatTokenSet(tokenset);
        return formattedTokenSet;
      }
    } catch (_error) {}

    throw new ForbiddenException("Credenciais inválidas ou expiradas.");
  }

  async definirSenha(_accessContext: AccessContext, domain: IDomain.AuthCredentialsSetInitialPasswordInput) {
    try {
      const kcAdminClient = await this.keycloakService.getAdminClient();

      const { usuario, userRepresentation } = await this.findByMatriculaSiape(domain.matriculaSiape);

      if (!usuario || !userRepresentation) {
        throw new ForbiddenException("Usuário indisponível.");
      }

      const userCredentials = await kcAdminClient.users.getCredentials({
        id: userRepresentation.id!,
      });

      if (userRepresentation.requiredActions?.includes("UPDATE_PASSWORD") && userCredentials.length === 0) {
        await kcAdminClient.users.resetPassword({
          id: userRepresentation.id!,
          credential: {
            type: "password",
            temporary: false,
            value: domain.senha,
          },
        });
        await kcAdminClient.users.update(
          {
            id: userRepresentation.id!,
          },
          {
            enabled: true,
          },
        );

        return true;
      } else {
        throw new ForbiddenException("A senha do usuário já foi definida.");
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.debug("AutenticacaoService#definirSenha::err", error);

      throw new ServiceUnavailableException();
    }
  }

  async recoverPassword(_accessContext: AccessContext | null, domain: IDomain.AuthRecoverPasswordInput) {
    const kcAdminClient = await this.keycloakService.getAdminClient();

    const [user] = await kcAdminClient.users.find({ email: domain.email }, { catchNotFound: true });

    if (user && user.id) {
      return kcAdminClient.users
        .executeActionsEmail({
          id: user.id,
          redirectUri: "https://dev.ladesa.com.br",
          clientId: this.keycloakService.keycloakConfigCredentials.clientId,
          actions: [RequiredActionAlias.UPDATE_PASSWORD],
        })
        .then(() => true)
        .catch(() => false);
    }

    return false;
  }

  private formatTokenSet(tokenset: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers) {
    return <IDomain.AuthSessionCredentialsView>{
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

  private async findByMatriculaSiape(matriculaSiape: string) {
    const qb = this.usuarioRepository.createQueryBuilder("usuario");

    qb.where("usuario.matriculaSiape = :matriculaSiape", {
      matriculaSiape: matriculaSiape,
    });
    qb.andWhere("usuario.dateDeleted IS NULL");
    qb.select(["usuario"]);

    const usuario = await qb.getOne();

    const userRepresentation = await this.keycloakService.findUserByMatriculaSiape(matriculaSiape);

    return {
      usuario,
      userRepresentation,
    };
  }
}
