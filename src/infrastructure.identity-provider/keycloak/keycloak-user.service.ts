import type UserRepresentation from "@keycloak/keycloak-admin-client/lib/defs/userRepresentation";
import { ServiceUnavailableError } from "@/application/errors";
import type { IIdpUserService } from "@/domain/abstractions/identity-provider";
import { Dep, Impl } from "@/domain/dependency-injection";
import type { IAuthOptions } from "../options/auth-options.interface";
import { IAuthOptions as IAuthOptionsToken } from "../options/auth-options.interface";
import { KeycloakService } from "./keycloak.service";

@Impl()
export class KeycloakUserService implements IIdpUserService {
  constructor(
    private readonly keycloakService: KeycloakService,
    @Dep(IAuthOptionsToken)
    private readonly authOptions: IAuthOptions | null,
  ) {}

  #ensureAuthOptions(): IAuthOptions {
    if (!this.authOptions) {
      throw new ServiceUnavailableError(undefined, "keycloak");
    }

    return this.authOptions;
  }

  async resolveUsernameByMatricula(matricula: string): Promise<string | undefined> {
    const user = await this.keycloakService.findUserByMatricula(matricula);
    return user?.username;
  }

  async existsByMatricula(matricula: string): Promise<boolean> {
    const user = await this.keycloakService.findUserByMatricula(matricula);
    return !!user;
  }

  async provisionUser(data: { matricula?: string | null; email?: string | null }): Promise<void> {
    const kcAdminClient = await this.keycloakService.getAdminClient();

    await kcAdminClient.users.create({
      enabled: true,
      username: data.matricula ?? undefined,
      email: data.email ?? undefined,
      requiredActions: ["UPDATE_PASSWORD"],
      attributes: {
        "usuario.matricula": data.matricula,
      } as Record<string, string>,
    });
  }

  async syncUser(
    currentMatricula: string,
    data: { matricula?: string | null; email?: string | null },
  ): Promise<void> {
    console.log(currentMatricula);
    const user = await this.keycloakService.findUserByMatricula(currentMatricula);

    if (!user?.id) {
      return;
    }

    const kcAdminClient = await this.keycloakService.getAdminClient();

    try {
      const payload: UserRepresentation = {};

      if (typeof data.email === "string") {
        payload.email = data.email;
      }

      if (typeof data.matricula === "string") {
        payload.attributes ??= {};
        payload.attributes["usuario.matricula"] = data.matricula;
      }

      await kcAdminClient.users.update({ id: user.id }, payload);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));

      throw err;
    }
  }

  async canSetInitialPassword(matricula: string): Promise<boolean> {
    const user = await this.keycloakService.findUserByMatricula(matricula);

    if (!user?.id) {
      return false;
    }

    const hasUpdatePasswordAction = user.requiredActions?.includes("UPDATE_PASSWORD") ?? false;

    if (!hasUpdatePasswordAction) {
      return false;
    }

    const kcAdminClient = await this.keycloakService.getAdminClient();
    const credentials = await kcAdminClient.users.getCredentials({ id: user.id });

    return credentials.length === 0;
  }

  async setInitialPassword(matricula: string, password: string): Promise<void> {
    const user = await this.keycloakService.findUserByMatricula(matricula);

    if (!user?.id) {
      return;
    }

    const kcAdminClient = await this.keycloakService.getAdminClient();

    await kcAdminClient.users.resetPassword({
      id: user.id,
      credential: {
        type: "password",
        temporary: false,
        value: password,
      },
    });

    await kcAdminClient.users.update({ id: user.id }, { enabled: true });
  }

  async sendPasswordResetEmail(email: string): Promise<boolean> {
    const kcAdminClient = await this.keycloakService.getAdminClient();

    const [user] = await kcAdminClient.users.find({ email }, { catchNotFound: true });

    if (!user?.id) {
      return false;
    }

    try {
      const authOptions = this.#ensureAuthOptions();

      await kcAdminClient.users.executeActionsEmail({
        id: user.id,
        redirectUri: authOptions.keycloakPasswordResetRedirectUri,
        clientId: authOptions.keycloakClientId,
        actions: ["UPDATE_PASSWORD"],
      });
      return true;
    } catch (_error) {
      return false;
    }
  }
}
