import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import type { IPerfil } from "@/modules/acesso/usuario/perfil";
import type { IDiario } from "@/modules/ensino/diario/domain/diario";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  DiarioProfessorCreateSchema,
  DiarioProfessorSchema,
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
    instance.diario = parsed.diario as unknown as IDiario;
    instance.perfil = parsed.perfil as unknown as IPerfil;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): DiarioProfessor {
    const parsed = zodValidate(DiarioProfessor.entityName, DiarioProfessorSchema, dados);

    const instance = new DiarioProfessor();

    instance.id = parsed.id;
    instance.situacao = parsed.situacao;
    instance.diario = parsed.diario as unknown as IDiario;
    instance.perfil = parsed.perfil as unknown as IPerfil;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;
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
