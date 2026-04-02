import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { PerfilCreateSchema, PerfilSchema, PerfilUpdateSchema } from "./perfil.schemas";

export type IPerfil = z.infer<typeof PerfilSchema>;

export class Perfil {
  static readonly entityName = "Perfil";

  id!: IdUuid;
  ativo!: boolean;
  cargo!: string;
  campus!: { id: string };
  usuario!: { id: string };
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
    instance.campus = parsed.campus;
    instance.usuario = parsed.usuario;
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
