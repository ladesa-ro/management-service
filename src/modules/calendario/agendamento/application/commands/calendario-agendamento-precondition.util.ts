import { ensureActiveEntity, PreconditionFailedError } from "@/application/errors";
import { CalendarioAgendamento } from "../../domain/calendario-agendamento";

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
