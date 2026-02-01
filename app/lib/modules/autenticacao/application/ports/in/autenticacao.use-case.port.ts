import type { AccessContext } from "@/modules/@core/access-context";
import type {
  AuthCredentialsSetInitialPasswordInput,
  AuthLoginInput,
  AuthRecoverPasswordInput,
  AuthRefreshInput,
  AuthSessionCredentials,
  AuthWhoAmIOutput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Autenticacao
 * Define o contrato que o service deve implementar
 */
export interface IAutenticacaoUseCasePort {
  /**
   * Retorna informações do usuário autenticado
   */
  whoAmI(accessContext: AccessContext): Promise<AuthWhoAmIOutput>;

  /**
   * Realiza login com matrícula SIAPE e senha
   */
  login(accessContext: AccessContext, domain: AuthLoginInput): Promise<AuthSessionCredentials>;

  /**
   * Atualiza tokens usando refresh token
   */
  refresh(accessContext: AccessContext, domain: AuthRefreshInput): Promise<AuthSessionCredentials>;

  /**
   * Define senha inicial do usuário
   */
  definirSenha(
    accessContext: AccessContext,
    domain: AuthCredentialsSetInitialPasswordInput,
  ): Promise<boolean>;

  /**
   * Envia email para recuperação de senha
   */
  recoverPassword(
    accessContext: AccessContext | null,
    domain: AuthRecoverPasswordInput,
  ): Promise<boolean>;
}
