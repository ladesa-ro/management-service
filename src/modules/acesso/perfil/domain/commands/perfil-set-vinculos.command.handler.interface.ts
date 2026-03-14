import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { PerfilListQueryResult } from "../queries";
import type { PerfilSetVinculosCommand } from "./perfil-set-vinculos.command";
export type IPerfilSetVinculosCommand = {
  accessContext: AccessContext;
  dto: PerfilSetVinculosCommand;
};

export type IPerfilSetVinculosCommandHandler = ICommandHandler<
  IPerfilSetVinculosCommand,
  PerfilListQueryResult
>;
export const IPerfilSetVinculosCommandHandler = Symbol("IPerfilSetVinculosCommandHandler");
