export interface IIdpUserService {
  // Busca
  resolveUsernameByMatricula(matricula: string): Promise<string | undefined>;
  existsByMatricula(matricula: string): Promise<boolean>;

  // Lifecycle
  provisionUser(data: { matricula?: string | null; email?: string | null }): Promise<void>;
  syncUser(
    currentMatricula: string,
    data: { matricula?: string | null; email?: string | null },
  ): Promise<void>;

  // Senha
  canSetInitialPassword(matricula: string): Promise<boolean>;
  setInitialPassword(matricula: string, password: string): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<boolean>;
}

export const IIdpUserService = Symbol("IIdpUserService");
