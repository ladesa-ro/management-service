import type { ICommandHandler } from "@/domain/abstractions";
import type { PerfilListQueryResult } from "../queries";
import type { PerfilSetVinculosCommand } from "./perfil-set-vinculos.command";

export const IPerfilSetVinculosCommandHandler = Symbol("IPerfilSetVinculosCommandHandler");

export type IPerfilSetVinculosCommandHandler = ICommandHandler<
  PerfilSetVinculosCommand,
  PerfilListQueryResult
>;
