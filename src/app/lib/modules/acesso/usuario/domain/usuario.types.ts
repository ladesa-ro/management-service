import type { IEntityBase } from "@/modules/@shared";
import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de dados de Usuario
 * Tipagem pura sem implementação de regras
 */
export interface IUsuario extends IEntityBase {
  nome: string | null;
  matriculaSiape: string | null;
  email: string | null;
  isSuperUser: boolean;
  imagemCapa: IImagem | null;
  imagemPerfil: IImagem | null;
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
