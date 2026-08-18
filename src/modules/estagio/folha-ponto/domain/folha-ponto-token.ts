/**
 * FolhaPontoToken — entidade de token de uso único.
 *
 * Representa um link de aprovação/rejeição/cancelamento enviado ao supervisor.
 * Garante uso único via campo `usedAt` — uma vez consumido, é imutável.
 * O ID usa UUID v4 para máxima opacidade (122 bits de entropia).
 *
 * Não depende de infraestrutura — é puro domínio.
 */
import { v4 as uuidv4 } from "uuid";
import type { ScalarDateTimeString } from "@/domain/abstractions/scalars";
import { getNowISO } from "@/utils/date";
import { FolhaPontoTokenTipoValues } from "./folha-ponto.fields";

export enum FolhaPontoTokenTipo {
  APROVACAO = "APROVACAO",
  REJEICAO = "REJEICAO",
  CANCELAMENTO = "CANCELAMENTO",
}

// Verificação em tempo de compilação que os valores do enum correspondem ao array
const _tipoCheck: (typeof FolhaPontoTokenTipoValues)[number] = "" as FolhaPontoTokenTipo;
void _tipoCheck;

export class FolhaPontoToken {
  static readonly entityName = "FolhaPontoToken";

  /** UUID v4 opaco — usado diretamente como token na URL */
  id!: string;
  folhaPonto!: { id: string };
  tipo!: FolhaPontoTokenTipo;
  expiresAt!: ScalarDateTimeString;
  usedAt!: ScalarDateTimeString | null;
  ipAddress!: string | null;
  userAgent!: string | null;
  dateCreated!: ScalarDateTimeString;

  private constructor() {}

  /**
   * Cria um novo token de uso único para uma FolhaPonto.
   * @param folhaPontoId - ID da FolhaPonto associada
   * @param tipo - Tipo da ação (APROVACAO, REJEICAO, CANCELAMENTO)
   * @param ttlHours - Tempo de vida em horas (padrão: 72)
   */
  static create(
    folhaPontoId: string,
    tipo: FolhaPontoTokenTipo,
    ttlHours: number = 72,
  ): FolhaPontoToken {
    const instance = new FolhaPontoToken();
    instance.id = uuidv4();
    instance.folhaPonto = { id: folhaPontoId };
    instance.tipo = tipo;

    const expires = new Date();
    expires.setHours(expires.getHours() + ttlHours);
    instance.expiresAt = expires.toISOString();

    instance.usedAt = null;
    instance.ipAddress = null;
    instance.userAgent = null;
    instance.dateCreated = getNowISO();

    return instance;
  }

  /**
   * Reconstitui um FolhaPontoToken a partir de dados persistidos.
   */
  static load(dados: Partial<FolhaPontoToken>): FolhaPontoToken {
    const instance = new FolhaPontoToken();
    Object.assign(instance, dados);
    return instance;
  }

  /** Verifica se o token está válido (não usado e não expirado). */
  isValid(): boolean {
    return !this.isUsed() && !this.isExpired();
  }

  /** Verifica se o token já foi utilizado. */
  isUsed(): boolean {
    return this.usedAt !== null;
  }

  /** Verifica se o token expirou. */
  isExpired(): boolean {
    return new Date(this.expiresAt) < new Date();
  }

  /**
   * Marca o token como utilizado (one-time use).
   * Registra IP e User-Agent para auditoria.
   * @throws Error se o token já foi usado ou expirou
   */
  use(ip: string | null, userAgent: string | null): void {
    if (this.isUsed()) {
      throw new Error(`Token (id=${this.id}) já foi utilizado em ${this.usedAt}.`);
    }
    if (this.isExpired()) {
      throw new Error(`Token (id=${this.id}) expirou em ${this.expiresAt}.`);
    }
    this.usedAt = getNowISO();
    this.ipAddress = ip;
    this.userAgent = userAgent;
  }
}
