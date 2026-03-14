import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioUpdateCommand } from "./estagiario-update.command";
export type IEstagiarioUpdateCommand = {
  accessContext: AccessContext;
  id: string;
  dto: EstagiarioUpdateCommand;
};

export type IEstagiarioUpdateCommandHandler = ICommandHandler<
  IEstagiarioUpdateCommand,
  EstagiarioFindOneQueryResult
>;
export const IEstagiarioUpdateCommandHandler = Symbol("IEstagiarioUpdateCommandHandler");
