import type { ICampus } from "@/core/campus";
import type { IUsuario } from "@/core/usuario";

/**
 * Interface que define a estrutura de dados de Perfil
 * Tipagem pura sem implementação de regras
 */
export interface IPerfil {
  id: string;
  ativo: boolean;
  cargo: string;
  campus: ICampus;
  usuario: IUsuario;
  dateCreated: Date;
  dateUpdated: Date;
  dateDeleted: Date | null;
}

/**
 * Dados necessários para criar um perfil
 */
export interface IPerfilCreate {
  cargo: string;
  campus: { id: string };
  usuario: { id: string };
}

/**
 * Dados para atualização de perfil
 */
export interface IPerfilUpdate {
  ativo?: boolean;
  cargo?: string;
  campus?: { id: string };
  usuario?: { id: string };
}
