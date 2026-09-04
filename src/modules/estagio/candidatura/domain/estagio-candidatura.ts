import type { z } from "zod";
import type { ObjectUuidRef } from "@/domain/abstractions";
import type { IdUuid, ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { zodValidate } from "@/shared/validation/index";
import { getNowISO } from "@/utils/date";
import type { EstagioCandidaturaSituacao } from "./estagio-candidatura.fields";
import {
  EstagioCandidaturaCreateSchema,
  EstagioCandidaturaSchema,
} from "./estagio-candidatura.schemas";

export type IEstagioCandidatura = z.infer<typeof EstagioCandidaturaSchema>;

export class EstagioCandidatura {
  static readonly entityName = "EstagioCandidatura";

  id!: IdUuid;
  estagio!: ObjectUuidRef;
  estagiario!: ObjectUuidRef;
  situacao!: EstagioCandidaturaSituacao;
  dataInscricao!: ScalarDateTimeString;
  dataOferta!: ScalarDateTimeString | null;
  expiraEm!: ScalarDateTimeString | null;
  dataResposta!: ScalarDateTimeString | null;
  dataCancelamento!: ScalarDateTimeString | null;
  autorConvocacao!: ObjectUuidRef | null;
  motivoCancelamento!: string | null;

  dateCreated!: ScalarDateTimeString;
  dateUpdated!: ScalarDateTimeString;
  dateDeleted!: ScalarDateTimeString | null;

  private constructor() {}

  get ativo(): boolean {
    return this.dateDeleted === null;
  }

  static create(dados: unknown): EstagioCandidatura {
    const parsed = zodValidate(
      EstagioCandidatura.entityName,
      EstagioCandidaturaCreateSchema.domain,
      dados,
    );

    const instance = new EstagioCandidatura();
    const now = getNowISO();

    instance.id = generateUuidV7();
    instance.estagio = parsed.estagio;
    instance.estagiario = parsed.estagiario;
    instance.situacao = (parsed.situacao ?? "PENDING") as EstagioCandidaturaSituacao;
    instance.dataInscricao = parsed.dataInscricao ?? now;
    instance.dataOferta = null;
    instance.expiraEm = null;
    instance.dataResposta = null;
    instance.dataCancelamento = null;
    instance.autorConvocacao = null;
    instance.motivoCancelamento = null;

    instance.dateCreated = now;
    instance.dateUpdated = now;
    instance.dateDeleted = null;

    return instance;
  }

  static load(dados: unknown): EstagioCandidatura {
    const parsed = zodValidate(EstagioCandidatura.entityName, EstagioCandidaturaSchema, dados);

    const instance = new EstagioCandidatura();

    instance.id = parsed.id;
    instance.estagio = parsed.estagio;
    instance.estagiario = parsed.estagiario;
    instance.situacao = parsed.situacao as EstagioCandidaturaSituacao;
    instance.dataInscricao = parsed.dataInscricao;
    instance.dataOferta = parsed.dataOferta;
    instance.expiraEm = parsed.expiraEm;
    instance.dataResposta = parsed.dataResposta;
    instance.dataCancelamento = parsed.dataCancelamento;
    instance.autorConvocacao = parsed.autorConvocacao;
    instance.motivoCancelamento = parsed.motivoCancelamento;

    instance.dateCreated = parsed.dateCreated;
    instance.dateUpdated = parsed.dateUpdated;
    instance.dateDeleted = parsed.dateDeleted;

    return instance;
  }

  convocar(autorId: string, expiraEm: string): void {
    this.situacao = "OFFERED";
    this.dataOferta = getNowISO();
    this.expiraEm = expiraEm;
    this.autorConvocacao = { id: autorId };
    this.dateUpdated = getNowISO();
  }

  aceitar(): void {
    this.situacao = "ACCEPTED";
    this.dataResposta = getNowISO();
    this.dateUpdated = getNowISO();
  }

  recusar(): void {
    this.situacao = "REJECTED";
    this.dataResposta = getNowISO();
    this.dateUpdated = getNowISO();
  }

  cancelar(motivo?: string): void {
    this.situacao = "CANCELLED";
    this.dataCancelamento = getNowISO();
    this.motivoCancelamento = motivo ?? null;
    this.dateUpdated = getNowISO();
  }

  expirar(): void {
    this.situacao = "EXPIRED";
    this.dateUpdated = getNowISO();
  }

  isOfertaValida(): boolean {
    if (this.situacao !== "OFFERED") return false;
    if (!this.expiraEm) return true;
    return new Date(this.expiraEm).getTime() >= Date.now();
  }
}
