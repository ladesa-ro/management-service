import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IImagem } from "@/modules/armazenamento/imagem/domain/imagem";
import { zodValidate } from "@/shared/validation/index";
import { usuarioCreateSchema, usuarioSchema, usuarioUpdateSchema } from "./usuario.schemas";

export interface IUsuario {
  id: string;
  nome: string | null;
  matricula: string | null;
  email: string | null;
  isSuperUser: boolean;
  imagemCapa: IImagem | null;
  imagemPerfil: IImagem | null;
  dateCreated: string;
  dateUpdated: string;
  dateDeleted: string | null;
}

export class Usuario {
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

  private constructor() {}

  static create(dados: unknown): Usuario {
    const parsed = zodValidate(Usuario.entityName, usuarioCreateSchema, dados);

    const instance = new Usuario();

    instance.id = generateUuidV7();
    instance.nome = parsed.nome?.trim() || null;
    instance.matricula = parsed.matricula?.trim() || null;
    instance.email = parsed.email?.trim() || null;
    instance.isSuperUser = false;
    instance.imagemCapa = null;
    instance.imagemPerfil = null;
    instance.dateCreated = new Date().toISOString();
    instance.dateUpdated = new Date().toISOString();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): Usuario {
    const parsed = zodValidate(Usuario.entityName, usuarioSchema, dados);

    const instance = new Usuario();

    instance.id = parsed.id;
    instance.nome = parsed.nome;
    instance.matricula = parsed.matricula;
    instance.email = parsed.email;
    instance.isSuperUser = parsed.isSuperUser;
    instance.imagemCapa = parsed.imagemCapa as IImagem | null;
    instance.imagemPerfil = parsed.imagemPerfil as IImagem | null;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(Usuario.entityName, usuarioUpdateSchema, dados);

    if (parsed.nome !== undefined) this.nome = parsed.nome?.trim() || null;
    if (parsed.matricula !== undefined) this.matricula = parsed.matricula?.trim() || null;
    if (parsed.email !== undefined) this.email = parsed.email?.trim() || null;

    this.dateUpdated = new Date().toISOString();

    zodValidate(Usuario.entityName, usuarioSchema, this);
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
