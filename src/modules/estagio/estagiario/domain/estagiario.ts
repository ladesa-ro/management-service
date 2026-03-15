import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IEstagiario extends IEntityBaseUuid {
  idPerfilFk: string;
  idCursoFk: string;
  idTurmaFk: string;
  telefone: string;
  emailInstitucional?: string | null;
  dataNascimento: string;
  ativo?: boolean;
}

export interface IEstagiarioCreate {
  idPerfilFk: string;
  idCursoFk: string;
  idTurmaFk: string;
  telefone: string;
  emailInstitucional?: string;
  dataNascimento: string;
}

export interface IEstagiarioUpdate {
  idPerfilFk?: string;
  idCursoFk?: string;
  idTurmaFk?: string;
  telefone?: string;
  emailInstitucional?: string;
  dataNascimento?: string;
}

export class Estagiario implements IEntityBaseUuid {
  static readonly entityName = "Estagiario";

  id!: IdUuid;
  idPerfilFk!: string;
  idCursoFk!: string;
  idTurmaFk!: string;
  telefone!: string;
  emailInstitucional!: string | null;
  dataNascimento!: string;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: {
    idPerfilFk: string;
    idCursoFk: string;
    idTurmaFk: string;
    telefone: string;
    emailInstitucional?: string;
    dataNascimento: string;
  }) {
    this.id = generateUuidV7();
    this.idPerfilFk = dados.idPerfilFk;
    this.idCursoFk = dados.idCursoFk;
    this.idTurmaFk = dados.idTurmaFk;
    this.telefone = dados.telefone;
    this.emailInstitucional = dados.emailInstitucional ?? null;
    this.dataNascimento = dados.dataNascimento;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  validate(): void {
    const { result, rules } = createValidator("Estagiario");
    rules.required(this.idPerfilFk, "idPerfilFk", "Perfil do estagiario e obrigatorio");
    rules.required(this.idCursoFk, "idCursoFk", "Curso do estagiario e obrigatorio");
    rules.required(this.idTurmaFk, "idTurmaFk", "Turma do estagiario e obrigatoria");
    rules.required(this.telefone, "telefone", "Telefone do estagiario e obrigatorio");
    rules.maxLength(this.telefone, "telefone", 15, "Telefone deve ter no maximo 15 caracteres");
    rules.required(
      this.dataNascimento,
      "dataNascimento",
      "Data de nascimento do estagiario e obrigatoria",
    );
    rules.custom(
      this.dataNascimento,
      "dataNascimento",
      (v) => !isNaN(new Date(v).getTime()),
      "Data de nascimento invalida",
      "date",
    );
    throwIfInvalid("Estagiario", result);
  }

  static create(dados: IEstagiarioCreate, validar: boolean = true): Estagiario {
    const instance = new Estagiario(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): Estagiario {
    const instance = Object.create(Estagiario.prototype) as Estagiario;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.idPerfilFk !== undefined) instance.idPerfilFk = dados.idPerfilFk;
    if (dados.idCursoFk !== undefined) instance.idCursoFk = dados.idCursoFk;
    if (dados.idTurmaFk !== undefined) instance.idTurmaFk = dados.idTurmaFk;
    if (dados.telefone !== undefined) instance.telefone = dados.telefone;
    if (dados.emailInstitucional !== undefined)
      instance.emailInstitucional = dados.emailInstitucional;
    if (dados.dataNascimento !== undefined) instance.dataNascimento = dados.dataNascimento;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IEstagiarioUpdate): void {
    if (dados.idPerfilFk !== undefined) this.idPerfilFk = dados.idPerfilFk;
    if (dados.idCursoFk !== undefined) this.idCursoFk = dados.idCursoFk;
    if (dados.idTurmaFk !== undefined) this.idTurmaFk = dados.idTurmaFk;
    if (dados.telefone !== undefined) this.telefone = dados.telefone;
    if (dados.emailInstitucional !== undefined)
      this.emailInstitucional = dados.emailInstitucional ?? null;
    if (dados.dataNascimento !== undefined) this.dataNascimento = dados.dataNascimento;
    touchUpdated(this);
    this.validate();
  }
}
