import { ensureActiveEntity, PreconditionFailedError } from "@/application/errors";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";

/**
 * Escrita condicional no padrão HTTP If-Match: quando o cliente informa a
 * versão que acredita ser a vigente, a escrita só prossegue se essa versão
 * ainda for a atual — senão rejeita com PreconditionFailedError (412), sinal
 * de que alguém já escreveu por cima entre a leitura e esta requisição.
 *
 * `version` sozinho não detecta a corrida: é imutável por linha (cada versão
 * grava seu próprio `version` uma única vez, na criação), então uma leitura
 * antiga sempre bate com o `version` da linha que a originou, mesmo depois
 * dela ter sido substituída. O sinal real de obsolescência é `validTo`
 * (via `isActive()`) — por isso o If-Match verifica os dois: `version` bate
 * o número que o cliente leu, `isActive()` garante que essa leitura ainda é
 * a vigente.
 *
 * Sem If-Match, mantém o comportamento anterior (apenas `ensureActiveEntity`,
 * que resulta em 410 Gone) — aditivo, não quebra clientes existentes.
 */
export function ensureIfMatch(
  entity: CalendarioAgendamento,
  ifMatch: string | undefined,
  id: string,
): void {
  if (ifMatch === undefined) {
    ensureActiveEntity(entity, CalendarioAgendamento.entityName, id);
    return;
  }

  const expectedVersion = Number(ifMatch);
  const versionMismatch =
    !Number.isInteger(expectedVersion) || expectedVersion !== entity.version;

  if (versionMismatch || !entity.isActive()) {
    const motivo = entity.isActive()
      ? `esperado ${expectedVersion}, atual ${entity.version}`
      : `versão ${entity.version} já foi substituída por uma mais recente`;

    throw new PreconditionFailedError(
      `If-Match não corresponde ao estado atual do agendamento (${motivo}).`,
      CalendarioAgendamento.entityName,
      id,
    );
  }
}
