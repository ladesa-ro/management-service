import type { IEntityBaseUuid } from "@/domain/abstractions/entities";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7.js";
import { createValidator, throwIfInvalid, touchUpdated } from "@/utils/validation-utils.js";

export enum EstagioStatus {
  ABERTA = "ABERTA",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDA = "CONCLUIDA",
}

export interface IHorarioEstagio {
  id?: string;
  diaSemana: number;
  horaInicio: string;
  horaFim: string;
}

export interface IEstagio extends IEntityBaseUuid {
  idEmpresaFk: string;
  idEstagiarioFk?: string | null;
  cargaHoraria: number;
  dataInicio?: string | null;
  dataFim?: string | null;
  status: EstagioStatus;
  horariosEstagio: IHorarioEstagio[];
}

export interface IEstagioCreate {
  idEmpresaFk: string;
  idEstagiarioFk?: string;
  cargaHoraria: number;
  dataInicio?: string;
  dataFim?: string | null;
  status?: EstagioStatus;
  horariosEstagio?: IHorarioEstagio[];
}

export interface IEstagioUpdate {
  idEmpresaFk?: string;
  idEstagiarioFk?: string | null;
  cargaHoraria?: number;
  dataInicio?: string | null;
  dataFim?: string | null;
  status?: EstagioStatus;
  horariosEstagio?: IHorarioEstagio[];
}

export class Estagio implements IEntityBaseUuid {
  static readonly entityName = "Estagio";

  id!: IdUuid;
  idEmpresaFk!: string;
  idEstagiarioFk!: string | null;
  cargaHoraria!: number;
  dataInicio!: string | null;
  dataFim!: string | null;
  status!: EstagioStatus;
  horariosEstagio!: IHorarioEstagio[];
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  constructor(dados: IEstagioCreate) {
    this.id = generateUuidV7();
    this.idEmpresaFk = dados.idEmpresaFk;
    this.idEstagiarioFk = dados.idEstagiarioFk ?? null;
    this.cargaHoraria = dados.cargaHoraria;
    this.dataInicio = dados.dataInicio ?? null;
    this.dataFim = dados.dataFim ?? null;
    this.status = dados.status ?? EstagioStatus.ABERTA;
    this.horariosEstagio = dados.horariosEstagio ?? [];
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateDeleted = null;
  }

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  validate(): void {
    const { result, rules } = createValidator("Estagio");
    rules.required(this.idEmpresaFk, "idEmpresaFk", "Empresa do estágio é obrigatória");
    rules.requiredNumber(
      this.cargaHoraria,
      "cargaHoraria",
      "Carga horária do estágio é obrigatória",
    );
    rules.min(this.cargaHoraria, "cargaHoraria", 1, "Carga horária deve ser maior que zero");
    rules.oneOf(
      this.status,
      "status",
      [EstagioStatus.ABERTA, EstagioStatus.EM_ANDAMENTO, EstagioStatus.CONCLUIDA],
      "Status inválido para estágio",
    );

    if (this.dataInicio) {
      rules.dateFormat(this.dataInicio, "dataInicio", "Data de início inválida");
    }

    if (this.dataFim) {
      rules.dateFormat(this.dataFim, "dataFim", "Data de fim inválida");
    }

    if (this.dataInicio && this.dataFim) {
      rules.custom(
        this.dataFim,
        "dataFim",
        () => new Date(this.dataFim as string) >= new Date(this.dataInicio as string),
        "Data de fim deve ser maior ou igual à data de início",
      );
    }

    if (this.status === EstagioStatus.EM_ANDAMENTO || this.status === EstagioStatus.CONCLUIDA) {
      rules.required(
        this.idEstagiarioFk,
        "idEstagiarioFk",
        "Estagiário é obrigatório quando o estágio não está aberto",
      );
      rules.required(this.dataInicio, "dataInicio", "Data de início é obrigatória neste status");
    }

    if (this.status === EstagioStatus.CONCLUIDA) {
      rules.required(this.dataFim, "dataFim", "Data de fim é obrigatória para estágio concluído");
    }

    this.horariosEstagio.forEach((horario, index) => {
      const prefix = `horariosEstagio[${index}]`;
      rules.requiredNumber(horario.diaSemana, `${prefix}.diaSemana`, "Dia da semana é obrigatório");
      rules.range(horario.diaSemana, `${prefix}.diaSemana`, 0, 6, "Dia da semana deve ser entre 0 e 6");
      rules.timeFormat(horario.horaInicio, `${prefix}.horaInicio`, "Hora de início inválida");
      rules.timeFormat(horario.horaFim, `${prefix}.horaFim`, "Hora de fim inválida");
      rules.custom(
        horario,
        `${prefix}.horaFim`,
        (h) => this.timeToMinutes(h.horaFim) > this.timeToMinutes(h.horaInicio),
        "Hora de fim deve ser maior que hora de início",
      );
    });

    const horariosPorDia = new Map<
      number,
      Array<{ index: number; inicio: number; fim: number; horaInicio: string; horaFim: string }>
    >();

    this.horariosEstagio.forEach((horario, index) => {
      if (typeof horario?.diaSemana !== "number") return;
      if (!horario?.horaInicio || !horario?.horaFim) return;

      const inicio = this.timeToMinutes(horario.horaInicio);
      const fim = this.timeToMinutes(horario.horaFim);

      if (!Number.isFinite(inicio) || !Number.isFinite(fim)) return;

      const intervalos = horariosPorDia.get(horario.diaSemana) ?? [];
      intervalos.push({
        index,
        inicio,
        fim,
        horaInicio: horario.horaInicio,
        horaFim: horario.horaFim,
      });
      horariosPorDia.set(horario.diaSemana, intervalos);
    });

    horariosPorDia.forEach((intervalos, diaSemana) => {
      const ordenados = intervalos.sort((a, b) => a.inicio - b.inicio);

      for (let i = 1; i < ordenados.length; i++) {
        const anterior = ordenados[i - 1];
        const atual = ordenados[i];

        if (atual.inicio < anterior.fim) {
          const prefixAtual = `horariosEstagio[${atual.index}]`;
          const prefixAnterior = `horariosEstagio[${anterior.index}]`;

          rules.custom(
            this.horariosEstagio[atual.index],
            `${prefixAtual}.horaInicio`,
            () => false,
            `Conflito de horário no dia ${diaSemana}: ${atual.horaInicio} - ${atual.horaFim}`,
          );

          rules.custom(
            this.horariosEstagio[anterior.index],
            `${prefixAnterior}.horaFim`,
            () => false,
            `Conflito de horário no dia ${diaSemana}: ${anterior.horaInicio} - ${anterior.horaFim}`,
          );
        }
      }
    });

    throwIfInvalid("Estagio", result);
  }

  static create(dados: IEstagioCreate, validar: boolean = true): Estagio {
    const instance = new Estagio(dados);
    if (validar) instance.validate();
    return instance;
  }

static load(dados: Record<string, any>): Estagio {
  const instance = Object.create(Estagio.prototype) as Estagio;

  const fields = [
    "id",
    "idEmpresaFk",
    "idEstagiarioFk",
    "cargaHoraria",
    "dataInicio",
    "dataFim",
    "status",
    "horariosEstagio",
    "dateCreated",
    "dateUpdated",
    "dateDeleted"
  ];

  for (const field of fields) {
    if (dados[field] !== undefined) {
      (instance as any)[field] = dados[field];
    }
  }

  return instance;
}
update(dados: IEstagioUpdate): void {
  const fields: (keyof IEstagioUpdate)[] = [
    "idEmpresaFk",
    "idEstagiarioFk",
    "cargaHoraria",
    "dataInicio",
    "dataFim",
    "status",
    "horariosEstagio"
  ];

  for (const field of fields) {
    if (dados[field] !== undefined) {
      (this as any)[field] = dados[field];
    }
  }

  touchUpdated(this);
  this.validate();
}

  private timeToMinutes(time: string): number {
    const [hour, minute, second] = time.split(":").map(Number);
    return hour * 60 + minute + (second ? second / 60 : 0);
  }
}
