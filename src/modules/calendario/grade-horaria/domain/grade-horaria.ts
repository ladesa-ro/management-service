import type { z } from "zod";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { GradeHorariaCreateSchema, GradeHorariaSchema } from "./grade-horaria.schemas";
import type { IGradeHorariaIntervalo } from "./grade-horaria.types";

export type IGradeHorariaDomain = z.infer<typeof GradeHorariaSchema>;

export class GradeHoraria {
  static readonly entityName = "GradeHoraria";

  id!: IdUuid;
  identificadorExterno!: string;
  nome!: string;
  dataInicio!: string;
  dataFim!: string | null;
  ativo!: boolean;
  campus!: { id: string };
  intervalos!: IGradeHorariaIntervalo[];
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  static create(dados: unknown): GradeHoraria {
    const parsed = zodValidate(GradeHoraria.entityName, GradeHorariaCreateSchema, dados);

    const instance = new GradeHoraria();

    instance.id = generateUuidV7();
    instance.identificadorExterno = parsed.identificadorExterno;
    instance.nome = parsed.nome;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim ?? null;
    instance.ativo = parsed.ativo;
    instance.campus = parsed.campus;
    instance.intervalos = parsed.intervalos;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: IGradeHorariaDomain): GradeHoraria {
    const parsed = zodValidate(GradeHoraria.entityName, GradeHorariaSchema, dados);

    const instance = new GradeHoraria();

    instance.id = parsed.id;
    instance.identificadorExterno = parsed.identificadorExterno;
    instance.nome = parsed.nome;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim;
    instance.ativo = parsed.ativo;
    instance.campus = parsed.campus;
    instance.intervalos = parsed.intervalos;
    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  deactivate(): void {
    this.ativo = false;
    this.dataFim = getNowISO().split("T")[0];
    this.dateUpdated = getNowISO();
    this.dateDeleted = getNowISO();
  }
}
