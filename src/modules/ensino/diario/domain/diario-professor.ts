import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import type { IPerfil } from "@/modules/acesso/perfil";
import type { IDiario } from "@/modules/ensino/diario/domain/diario";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export interface IDiarioProfessor extends IEntityBaseUuid {
  situacao: boolean;
  diario: IDiario;
  perfil: IPerfil;
}

export interface IDiarioProfessorCreate {
  situacao: boolean;
  diario: { id: IdUuid };
  perfil: { id: IdUuid };
}

export interface IDiarioProfessorUpdate {
  situacao?: boolean;
  diario?: { id: IdUuid };
  perfil?: { id: IdUuid };
}

export class DiarioProfessor implements IEntityBaseUuid {
  static readonly entityName = "DiarioProfessor";

  id!: IdUuid;
  situacao!: boolean;
  diario!: IDiario;
  perfil!: IPerfil;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: { situacao: boolean }) {
    this.id = generateUuidV7();
    this.situacao = dados.situacao;
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  validate(): void {
    const { result } = createValidator("DiarioProfessor");
    throwIfInvalid("DiarioProfessor", result);
  }

  static create(dados: IDiarioProfessorCreate, validar: boolean = true): DiarioProfessor {
    const instance = new DiarioProfessor(dados);
    if (validar) instance.validate();
    return instance;
  }

  static load(dados: Record<string, any>): DiarioProfessor {
    const instance = Object.create(DiarioProfessor.prototype) as DiarioProfessor;
    if (dados.id !== undefined) instance.id = dados.id;
    if (dados.situacao !== undefined) instance.situacao = dados.situacao;
    if (dados.diario !== undefined) instance.diario = dados.diario;
    if (dados.perfil !== undefined) instance.perfil = dados.perfil;
    if (dados.dateCreated !== undefined) instance.dateCreated = dados.dateCreated;
    if (dados.dateUpdated !== undefined) instance.dateUpdated = dados.dateUpdated;
    if (dados.dateDeleted !== undefined) instance.dateDeleted = dados.dateDeleted;
    return instance;
  }

  update(dados: IDiarioProfessorUpdate): void {
    if (dados.situacao !== undefined) this.situacao = dados.situacao;
    touchUpdated(this);
    this.validate();
  }
}
