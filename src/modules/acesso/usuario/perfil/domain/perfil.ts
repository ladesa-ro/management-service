import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IUsuario } from "@/modules/acesso/usuario";
import type { ICampus } from "@/modules/ambientes/campus";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { PerfilCreateSchema, PerfilSchema, PerfilUpdateSchema } from "./perfil.schemas";

export interface IPerfil {
  id: string;
  ativo: boolean;
  cargo: string;
  campus: ICampus;
  usuario: IUsuario;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}

export class Perfil {
  static readonly entityName = "Perfil";

  id!: IdUuid;
  ativo!: boolean;
  cargo!: string;
  campus!: ICampus;
  usuario!: IUsuario;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): Perfil {
    const parsed = zodValidate(Perfil.entityName, PerfilCreateSchema.domain, dados);

    const instance = new Perfil();

    instance.id = generateUuidV7();
    instance.cargo = parsed.cargo;
    instance.ativo = true;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Perfil {
    const parsed = zodValidate(Perfil.entityName, PerfilSchema, dados);

    const instance = new Perfil();

    instance.id = parsed.id;
    instance.ativo = parsed.ativo;
    instance.cargo = parsed.cargo;
    instance.campus = parsed.campus as ICampus;
    instance.usuario = parsed.usuario as IUsuario;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Perfil.entityName, PerfilUpdateSchema.domain, dados);

    if (parsed.ativo !== undefined) this.ativo = parsed.ativo;
    if (parsed.cargo !== undefined) this.cargo = parsed.cargo;

    this.dateUpdated = getNowISO();

    zodValidate(Perfil.entityName, PerfilSchema, this);
  }

  isAtivo(): boolean {
    return this.isActive();
  }

  isActive(): boolean {
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
    this.dateUpdated = getNowISO();
  }

  desativar(): void {
    this.ativo = false;
    this.dateUpdated = getNowISO();
  }
}
