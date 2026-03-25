import type { z } from "zod";
import type { IdUuid } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import {
  HorarioAulaConfiguracaoCreateSchema,
  HorarioAulaConfiguracaoSchema,
  HorarioAulaConfiguracaoUpdateSchema,
} from "./horario-aula-configuracao.schemas";
import type { IHorarioAulaItem } from "./horario-aula-configuracao.types";

export type IHorarioAulaConfiguracaoDomain = z.infer<typeof HorarioAulaConfiguracaoSchema>;

export class HorarioAulaConfiguracao {
  static readonly entityName = "HorarioAulaConfiguracao";

  id!: IdUuid;
  dataInicio!: string;
  dataFim!: string | null;
  ativo!: boolean;
  campus!: { id: string };
  horarios!: IHorarioAulaItem[];

  private constructor() {}

  static create(dados: unknown): HorarioAulaConfiguracao {
    const parsed = zodValidate(
      HorarioAulaConfiguracao.entityName,
      HorarioAulaConfiguracaoCreateSchema,
      dados,
    );

    const instance = new HorarioAulaConfiguracao();

    instance.id = generateUuidV7();
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim ?? null;
    instance.ativo = parsed.ativo;
    instance.campus = parsed.campus;
    instance.horarios = parsed.horarios ?? [];

    return instance;
  }

  static load(dados: IHorarioAulaConfiguracaoDomain): HorarioAulaConfiguracao {
    const parsed = zodValidate(
      HorarioAulaConfiguracao.entityName,
      HorarioAulaConfiguracaoSchema,
      dados,
    );

    const instance = new HorarioAulaConfiguracao();

    instance.id = parsed.id;
    instance.dataInicio = parsed.dataInicio;
    instance.dataFim = parsed.dataFim;
    instance.ativo = parsed.ativo;
    instance.campus = parsed.campus;
    instance.horarios = parsed.horarios;

    return instance;
  }

  update(dados: unknown): void {
    const parsed = zodValidate(
      HorarioAulaConfiguracao.entityName,
      HorarioAulaConfiguracaoUpdateSchema,
      dados,
    );

    if (parsed.dataInicio !== undefined) this.dataInicio = parsed.dataInicio;
    if (parsed.dataFim !== undefined) this.dataFim = parsed.dataFim;
    if (parsed.ativo !== undefined) this.ativo = parsed.ativo;
    if (parsed.campus !== undefined) this.campus = parsed.campus;
    if (parsed.horarios !== undefined) this.horarios = parsed.horarios;

    zodValidate(HorarioAulaConfiguracao.entityName, HorarioAulaConfiguracaoSchema, this);
  }
}
