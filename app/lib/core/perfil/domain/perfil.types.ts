import type { IdUuid, ScalarDateTimeString } from "@/core/@shared";
import type { ICampus } from "@/core/campus";
import type { IUsuario } from "@/core/usuario";

/**
 * Interface que define a estrutura de dados de Perfil
 * Tipagem pura sem implementação de regras
 */
export interface IPerfil {
  id: IdUuid;
  ativo: boolean;
  cargo: string;
  campus: ICampus;
  usuario: IUsuario;
  dateCreated: ScalarDateTimeString;
  dateUpdated: ScalarDateTimeString;
  dateDeleted: ScalarDateTimeString | null;
}

/**
 * Dados necessários para criar um perfil
 */
export interface IPerfilCreate {
  cargo: string;
  campus: { id: IdUuid };
  usuario: { id: IdUuid };
}

/**
 * Dados para atualização de perfil
 */
export interface IPerfilUpdate {
  ativo?: boolean;
  cargo?: string;
  campus?: { id: IdUuid };
  usuario?: { id: IdUuid };
}
