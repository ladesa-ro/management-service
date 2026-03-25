import type { ICommandHandler } from "@/domain/abstractions";
import type { PerfilListQueryResult } from "../queries";
import type { PerfilDefinirPerfisAtivosCommand } from "./perfil-definir-perfis-ativos.command";

export const IPerfilDefinirPerfisAtivosCommandHandler = Symbol(
  "IPerfilDefinirPerfisAtivosCommandHandler",
);

export type IPerfilDefinirPerfisAtivosCommandHandler = ICommandHandler<
  PerfilDefinirPerfisAtivosCommand,
  PerfilListQueryResult
>;
