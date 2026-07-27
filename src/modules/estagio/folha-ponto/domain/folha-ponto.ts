/**
 * FolhaPonto — entidade de domínio.
 *
 * Encapsula as regras de negócio do registro de ponto:
 * - Validação de horários (horaFim > horaInicio)
 * - Cálculo automático de horas (decimal)
 * - Transições de estado (PENDING → APPROVED | REJECTED | EXPIRED | CANCELLED)
 * - Geração de ID (UUIDv7 time-ordered)
 *
 * Não depende de infraestrutura — é puro domínio.
 */
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import { FolhaPontoCreateSchema, FolhaPontoSchema } from "./folha-ponto.schemas";

export enum FolhaPontoStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export class FolhaPonto {
  static readonly entityName = "FolhaPonto";

  id!: IdUuid;
  estagio!: ObjectUuidRef;
  data!: string; // ISO date YYYY-MM-DD
  horaInicio!: string; // HH:MM
  horaFim!: string; // HH:MM
  quantidadeHoras!: number; // decimal (ex: 8.5 = 8h30)
  observacoes!: string | null;
  status!: FolhaPontoStatus;
  dataSolicitacao!: ScalarDateTimeString;
  dataAprovacao!: ScalarDateTimeString | null;
  dataRejeicao!: ScalarDateTimeString | null;
  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  /**
   * Cria uma nova FolhaPonto a partir de dados externos.
   * Aplica validação via schema Zod e inicializa com status PENDING.
   */
  static create(dados: unknown): FolhaPonto {
    const parsed = zodValidate(FolhaPonto.entityName, FolhaPontoCreateSchema, dados);

    const instance = new FolhaPonto();
    instance.id = generateUuidV7();
    instance.estagio = parsed.estagio;
    instance.data = parsed.data;
    instance.horaInicio = parsed.horaInicio;
    instance.horaFim = parsed.horaFim;
    instance.quantidadeHoras = FolhaPonto.calcularHoras(parsed.horaInicio, parsed.horaFim);
    instance.observacoes = parsed.observacoes ?? null;
    instance.status = FolhaPontoStatus.PENDING;
    instance.dataSolicitacao = getNowISO();
    instance.dataAprovacao = null;
    instance.dataRejeicao = null;
    instance.dateCreated = getNowISO();
    instance.dateUpdated = getNowISO();
    instance.dateDeleted = null;

    return instance;
  }

  /**
   * Reconstitui uma FolhaPonto a partir de dados persistidos.
   * Valida a estrutura mas não aplica regras de criação.
   */
  static load(dados: unknown): FolhaPonto {
    const parsed = zodValidate(FolhaPonto.entityName, FolhaPontoSchema, dados);
    const instance = new FolhaPonto();
    Object.assign(instance, parsed);
    return instance;
  }

  canBeApproved(): boolean {
    return this.status === FolhaPontoStatus.PENDING;
  }

  canBeRejected(): boolean {
    return this.status === FolhaPontoStatus.PENDING;
  }

  canBeCancelled(): boolean {
    return this.status === FolhaPontoStatus.PENDING;
  }

  approve(): void {
    if (!this.canBeApproved()) {
      throw new Error(
        `FolhaPonto (id=${this.id}) não pode ser aprovada no estado "${this.status}". Estado esperado: PENDING.`,
      );
    }
    this.status = FolhaPontoStatus.APPROVED;
    this.dataAprovacao = getNowISO();
    this.dateUpdated = getNowISO();
  }

  reject(): void {
    if (!this.canBeRejected()) {
      throw new Error(
        `FolhaPonto (id=${this.id}) não pode ser rejeitada no estado "${this.status}". Estado esperado: PENDING.`,
      );
    }
    this.status = FolhaPontoStatus.REJECTED;
    this.dataRejeicao = getNowISO();
    this.dateUpdated = getNowISO();
  }

  expire(): void {
    // Idempotente: se já expirou, não lança erro
    if (this.status !== FolhaPontoStatus.PENDING) return;
    this.status = FolhaPontoStatus.EXPIRED;
    this.dateUpdated = getNowISO();
  }

  cancel(): void {
    if (!this.canBeCancelled()) {
      throw new Error(
        `FolhaPonto (id=${this.id}) não pode ser cancelada no estado "${this.status}". Estado esperado: PENDING.`,
      );
    }
    this.status = FolhaPontoStatus.CANCELLED;
    this.dateUpdated = getNowISO();
  }

  /**
   * Calcula a quantidade de horas decimais entre dois horários HH:MM.
   * Ex: "08:00" e "17:30" → 9.5
   */
  static calcularHoras(inicio: string, fim: string): number {
    const [hi, mi] = inicio.split(":").map(Number);
    const [hf, mf] = fim.split(":").map(Number);
    const diffMinutos = hf * 60 + mf - (hi * 60 + mi);
    // Arredonda para 2 casas decimais
    return Math.round((diffMinutos / 60) * 100) / 100;
  }
}
