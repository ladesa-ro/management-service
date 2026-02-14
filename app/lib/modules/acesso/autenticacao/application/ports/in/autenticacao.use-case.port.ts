import type { AccessContext } from "@/modules/@core/access-context";
import type {
  AuthCredentialsSetInitialPasswordInputDto,
  AuthLoginInputDto,
  AuthRecoverPasswordInputDto,
  AuthRefreshInputDto,
  AuthSessionCredentialsDto,
  AuthWhoAmIOutputDto,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Autenticacao
 * Define o contrato que o service deve implementar
 */
export interface IAutenticacaoUseCasePort {
  /**
   * Retorna informações do usuário autenticado
   */
  whoAmI(accessContext: AccessContext): Promise<AuthWhoAmIOutputDto>;

  /**
   * Realiza login com matrícula SIAPE e senha
   */
  login(
    accessContext: AccessContext,
    domain: AuthLoginInputDto,
  ): Promise<AuthSessionCredentialsDto>;

  /**
   * Atualiza tokens usando refresh token
   */
  refresh(
    accessContext: AccessContext,
    domain: AuthRefreshInputDto,
  ): Promise<AuthSessionCredentialsDto>;

  /**
   * Define senha inicial do usuário
   */
  definirSenha(
    accessContext: AccessContext,
    domain: AuthCredentialsSetInitialPasswordInputDto,
  ): Promise<boolean>;

  /**
   * Envia email para recuperação de senha
   */
  recoverPassword(
    accessContext: AccessContext | null,
    domain: AuthRecoverPasswordInputDto,
  ): Promise<boolean>;
}
