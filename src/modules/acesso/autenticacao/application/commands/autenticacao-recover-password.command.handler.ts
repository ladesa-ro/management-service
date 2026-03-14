import { RequiredActionAlias } from "@keycloak/keycloak-admin-client/lib/defs/requiredActionProviderRepresentation";
import { DeclareImplementation } from "@/domain/dependency-injection";
import { KeycloakService } from "@/modules/@seguranca/provedor-identidade";
import {
  type IAutenticacaoRecoverPasswordCommand,
  IAutenticacaoRecoverPasswordCommandHandler,
} from "@/modules/acesso/autenticacao/domain/commands/autenticacao-recover-password.command.handler.interface";

@DeclareImplementation()
export class AutenticacaoRecoverPasswordCommandHandlerImpl
  implements IAutenticacaoRecoverPasswordCommandHandler
{
  constructor(private readonly keycloakService: KeycloakService) {}

  async execute({ dto }: IAutenticacaoRecoverPasswordCommand): Promise<boolean> {
    const kcAdminClient = await this.keycloakService.getAdminClient();

    const [user] = await kcAdminClient.users.find({ email: dto.email }, { catchNotFound: true });

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
}
