/**
 * Tipos do domínio de Autorização
 * Define conceitos relacionados à autorização e permissões
 */

/**
 * Representa uma permissão no sistema
 */
export interface IPermissao {
  recurso: string;
  acao: string;
}

/**
 * Contexto de autorização do usuário
 */
export interface IAutorizacaoContexto {
  usuarioId: string;
  permissoes: IPermissao[];
}
