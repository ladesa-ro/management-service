import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IUsuario extends IEntityBaseUuid {
  nome: string | null;
  matricula: string | null;
  email: string | null;
  isSuperUser: boolean;
  imagemCapa: IImagem | null;
  imagemPerfil: IImagem | null;
}

export interface IUsuarioCreate {
  nome?: string | null;
  matricula?: string | null;
  email?: string | null;
}

export interface IUsuarioUpdate {
  nome?: string | null;
  matricula?: string | null;
  email?: string | null;
}

export class Usuario implements IEntityBaseUuid {
  static readonly entityName = "Usuario";

  id!: IdUuid;
  nome!: string | null;
  matricula!: string | null;
  email!: string | null;
  isSuperUser!: boolean;
  imagemCapa!: IImagem | null;
  imagemPerfil!: IImagem | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { nome?: string | null; matricula?: string | null; email?: string | null }) {
    this.id = generateUuidV7();
    this.nome = dados.nome?.trim() || null;
    this.matricula = dados.matricula?.trim() || null;
    this.email = dados.email?.trim() || null;
    this.isSuperUser = false;
    this.imagemCapa = null;
    this.imagemPerfil = null;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result } = createValidator("Usuario");
    throwIfInvalid("Usuario", result);
  }

  static create(dados: IUsuarioCreate, validar: boolean = true): Usuario {
    const instance = new Usuario(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Usuario {
    const instance = Object.create(Usuario.prototype) as Usuario;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.nome !== undefined) instance.nome = dados.nome;
    if (dados.matricula !== undefined) instance.matricula = dados.matricula;
    if (dados.email !== undefined) instance.email = dados.email;
    if (dados.isSuperUser !== undefined) instance.isSuperUser = dados.isSuperUser;
    if (dados.imagemCapa !== undefined) instance.imagemCapa = dados.imagemCapa;
    if (dados.imagemPerfil !== undefined) instance.imagemPerfil = dados.imagemPerfil;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IUsuarioUpdate): void {
    if (dados.nome !== undefined) this.nome = dados.nome?.trim() || null;
    if (dados.matricula !== undefined) this.matricula = dados.matricula?.trim() || null;
    if (dados.email !== undefined) this.email = dados.email?.trim() || null;
    touchUpdated(this);
    this.validate();
  }

  podeSerDeletado(): boolean {
    return this.dateDeleted === null && !this.isSuperUser;
  }

  temNome(): boolean {
    return this.nome !== null && this.nome.trim().length > 0;
  }

  temEmail(): boolean {
    return this.email !== null && this.email.trim().length > 0;
  }

  temMatricula(): boolean {
    return this.matricula !== null && this.matricula.trim().length > 0;
  }

  temImagemCapa(): boolean {
    return this.imagemCapa !== null;
  }

  temImagemPerfil(): boolean {
    return this.imagemPerfil !== null;
  }
}
