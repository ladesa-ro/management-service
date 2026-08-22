/**
 * Rooms WebSocket dinâmicas do calendário — uma por `calendario_colecao`.
 *
 * Diferente das rooms fixas de Estágio (`ESTAGIO_WS_ROOMS`), aqui a room é
 * derivada do id da coleção, então não dá pra listar um `Set` fixo de valores
 * válidos: o gateway usa `isCalendarioWsRoom` para validar o formato
 * (`calendario:{uuid}`) em vez de checar contra uma lista.
 */

const CALENDARIO_WS_ROOM_PREFIX = "calendario:";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function calendarioWsRoom(colecaoId: string): string {
  return `${CALENDARIO_WS_ROOM_PREFIX}${colecaoId}`;
}

export function isCalendarioWsRoom(room: string): boolean {
  if (!room.startsWith(CALENDARIO_WS_ROOM_PREFIX)) return false;
  return UUID_PATTERN.test(room.slice(CALENDARIO_WS_ROOM_PREFIX.length));
}
