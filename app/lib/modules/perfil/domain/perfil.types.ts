import type { IdUuid, IEntityBase } from "@/modules/@shared";
import type { ICampus } from "@/modules/campus";
import type { IUsuario } from "@/modules/usuario";

/**
 * Interface que define a estrutura de dados de Perfil
 * Tipagem pura sem implementação de regras
 */
export interface IPerfil extends IEntityBase {
  ativo: boolean;
  cargo: string;
  campus: ICampus;
  usuario: IUsuario;
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
