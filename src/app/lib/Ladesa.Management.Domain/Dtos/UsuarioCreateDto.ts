/**
 * Dados necessários para criar um usuário
 */
export interface UsuarioCreateDto {
  nome?: string | null;
  matriculaSiape?: string | null;
  email?: string | null;
}
