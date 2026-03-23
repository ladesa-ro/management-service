import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IPerfil } from "@/modules/acesso/perfil";
import type { IDiario } from "@/modules/ensino/diario/domain/diario";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  DiarioProfessorCreateSchema,
  DiarioProfessorUpdateSchema,
} from "./diario-professor.schemas";

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

  private constructor() {}

  static create(dados: IDiarioProfessorCreate): DiarioProfessor {
    const parsed = zodValidate(
      DiarioProfessor.entityName,
      DiarioProfessorCreateSchema.domain,
      dados,
    );

    const instance = new DiarioProfessor();

    instance.id = generateUuidV7();
    instance.situacao = parsed.situacao;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

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

  update(dados: unknown): void {
    const parsed = zodValidate(
      DiarioProfessor.entityName,
      DiarioProfessorUpdateSchema.domain,
      dados,
    );

    if (parsed.situacao !== undefined) this.situacao = parsed.situacao;

    this.dateUpdated = getNowISO();
  }
}
