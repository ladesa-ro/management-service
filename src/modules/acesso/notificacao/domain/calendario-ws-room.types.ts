
const CALENDARIO_WS_ROOM_PREFIX = "calendario:";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function calendarioWsRoom(colecaoId: string): string {
  return `${CALENDARIO_WS_ROOM_PREFIX}${colecaoId}`;
}

export function isCalendarioWsRoom(room: string): boolean {
  if (!room.startsWith(CALENDARIO_WS_ROOM_PREFIX)) return false;
  return UUID_PATTERN.test(room.slice(CALENDARIO_WS_ROOM_PREFIX.length));
}
