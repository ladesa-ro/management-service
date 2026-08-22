/**
 * Interpreta uma data do domínio como instante UTC, para uso com `rrule`.
 *
 * Os campos de data do agendamento são `date` puro (AAAA-MM-DD), sem fuso — ver
 * a decisão de tempo flutuante em `docs/arquitetura/decisoes-arquiteturais.md`.
 * O `rrule` trabalha com `Date`, então a conversão precisa ancorar em meia-noite
 * UTC, e não na meia-noite local de quem roda o processo: senão a expansão da
 * regra desloca de um dia conforme o fuso do servidor.
 */
export function normalizeDate(dateStr: string): Date {
  return new Date(dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00Z`);
}
