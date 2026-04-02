import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";

import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import {
  TurmaDisponibilidadeConfiguracaoCreateSchema,
  TurmaDisponibilidadeConfiguracaoSchema,
} from "./turma-disponibilidade.schemas";
import type { ITurmaDisponibilidadeItem } from "./turma-disponibilidade.types";

export type ITurmaDisponibilidadeConfiguracaoDomain = z.infer<
  typeof TurmaDisponibilidadeConfiguracaoSchema
>;

export class TurmaDisponibilidadeConfiguracao {
  static readonly entityName = "TurmaDisponibilidadeConfiguracao";

  id!: IdUuid;
  identificadorExterno!: IdUuid;
  turma!: { id: IdUuid };
  dataInicio!: string;
  dataFim!: string | null;
  ativo!: boolean;
  horarios!: ITurmaDisponibilidadeItem[];
  identificadorExternoGradeHoraria!: string | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): TurmaDisponibilidadeConfiguracao {
    const parsed = zodValidate(
      TurmaDisponibilidadeConfiguracao.entityName,
      TurmaDisponibilidadeConfiguracaoCreateSchema,
      dados,
    );

    const instance = new TurmaDisponibilidadeConfiguracao();

    instance.id = generateUuidV7();
    instance.identificadorExterno = generateUuidV7();
    instance.turma = parsed.turma;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim ?? null;
    instance.ativo = true;
    instance.horarios = parsed.horarios;
    instance.identificadorExternoGradeHoraria = parsed.identificadorExternoGradeHoraria ?? null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: ITurmaDisponibilidadeConfiguracaoDomain): TurmaDisponibilidadeConfiguracao {
    const parsed = zodValidate(
      TurmaDisponibilidadeConfiguracao.entityName,
      TurmaDisponibilidadeConfiguracaoSchema,
      dados,
    );

    const instance = new TurmaDisponibilidadeConfiguracao();

    instance.id = parsed.id;
    instance.identificadorExterno = parsed.identificadorExterno;
    instance.turma = parsed.turma;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim;
    instance.ativo = parsed.ativo;
    instance.horarios = parsed.horarios;
    instance.identificadorExternoGradeHoraria = parsed.identificadorExternoGradeHoraria ?? null;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  deactivate(): void {
    this.ativo = false;
    this.dateUpdated = getNowISO();
  }

  /**
   * Clona para criar um fragmento temporal independente.
   * Cada fragmento recebe novo id e novo identificadorExterno.
   */
  static clone(
    source: TurmaDisponibilidadeConfiguracao,
    overrides: { dataInicio: string; dataFim: string | null },
  ): TurmaDisponibilidadeConfiguracao {
    return TurmaDisponibilidadeConfiguracao.create({
      turma: source.turma,
      dataInicio: overrides.dataInicio,
      dataFim: overrides.dataFim,
      horarios: source.horarios,
      identificadorExternoGradeHoraria: source.identificadorExternoGradeHoraria,
    });
  }
}
