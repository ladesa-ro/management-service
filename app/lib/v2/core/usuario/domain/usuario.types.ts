import type { IImagem } from "@/v2/core/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de dados de Usuario
 * Tipagem pura sem implementação de regras
 */
export interface IUsuario {
  id: string;
  nome: string | null;
  matriculaSiape: string | null;
  email: string | null;
  isSuperUser: boolean;
  imagemCapa: IImagem | null;
  imagemPerfil: IImagem | null;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Dados necessários para criar um usuário
 */
export interface IUsuarioCreate {
  nome?: string | null;
  matriculaSiape?: string | null;
  email?: string | null;
}

/**
 * Dados para atualização de usuário
 */
export interface IUsuarioUpdate {
  nome?: string | null;
  matriculaSiape?: string | null;
  email?: string | null;
}
