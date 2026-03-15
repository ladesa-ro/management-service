import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IUsuario } from "@/modules/acesso/usuario";
import type { ICampus } from "@/modules/ambientes/campus";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IPerfil extends IEntityBaseUuid {
  ativo: boolean;
  cargo: string;
  campus: ICampus;
  usuario: IUsuario;
}

export interface IPerfilCreate {
  cargo: string;
  campus: { id: IdUuid };
  usuario: { id: IdUuid };
}

export interface IPerfilUpdate {
  ativo?: boolean;
  cargo?: string;
  campus?: { id: IdUuid };
  usuario?: { id: IdUuid };
}

export class Perfil implements IEntityBaseUuid {
  static readonly entityName = "Perfil";

  id!: IdUuid;
  ativo!: boolean;
  cargo!: string;
  campus!: ICampus;
  usuario!: IUsuario;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { cargo: string }) {
    this.id = generateUuidV7();
    this.cargo = dados.cargo;
    this.ativo = true;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result, rules } = createValidator("Perfil");
    rules.required(this.cargo, "cargo");
    rules.minLength(this.cargo, "cargo", 1);
    throwIfInvalid("Perfil", result);
  }

  static create(dados: IPerfilCreate, validar: boolean = true): Perfil {
    const instance = new Perfil({ cargo: dados.cargo });
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Perfil {
    const instance = Object.create(Perfil.prototype) as Perfil;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.ativo !== undefined) instance.ativo = dados.ativo;
    if (dados.cargo !== undefined) instance.cargo = dados.cargo;
    if (dados.campus !== undefined) instance.campus = dados.campus;
    if (dados.usuario !== undefined) instance.usuario = dados.usuario;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IPerfilUpdate): void {
    if (dados.cargo !== undefined) this.cargo = dados.cargo;
    touchUpdated(this);
    this.validate();
  }

  isAtivo(): boolean {
    return this.ativo && this.dateDeleted === null;
  }

  podeSerEditado(): boolean {
    return this.dateDeleted === null;
  }

  podeSerDeletado(): boolean {
    return this.dateDeleted === null;
  }

  temCargo(): boolean {
    return this.cargo !== null && this.cargo.trim().length > 0;
  }

  ativar(): void {
    this.ativo = true;
    touchUpdated(this);
  }

  desativar(): void {
    this.ativo = false;
    touchUpdated(this);
  }
}
