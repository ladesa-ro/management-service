import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type AuthCredentialsSetInitialPasswordInputDto } from "@/Ladesa.Management.Domain/Dtos/AuthCredentialsSetInitialPasswordInputDto";
import { type AuthLoginInputDto } from "@/Ladesa.Management.Domain/Dtos/AuthLoginInputDto";
import { type AuthRecoverPasswordInputDto } from "@/Ladesa.Management.Domain/Dtos/AuthRecoverPasswordInputDto";
import { type AuthRefreshInputDto } from "@/Ladesa.Management.Domain/Dtos/AuthRefreshInputDto";
import { type AuthSessionCredentialsDto } from "@/Ladesa.Management.Domain/Dtos/AuthSessionCredentialsDto";
import { type AuthWhoAmIOutputDto } from "@/Ladesa.Management.Domain/Dtos/AuthWhoAmIOutputDto";

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
