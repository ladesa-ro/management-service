import type { IdUuid, ScalarDateTimeString } from "@/modules/@shared";
import type { IImagem } from "@/modules/imagem/domain/imagem.types";

/**
 * Interface que define a estrutura de dados de Usuario
 * Tipagem pura sem implementação de regras
 */
export interface IUsuario {
  id: IdUuid;
  nome: string | null;
  matriculaSiape: string | null;
  email: string | null;
  isSuperUser: boolean;
  imagemCapa: IImagem | null;
  imagemPerfil: IImagem | null;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
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
