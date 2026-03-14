import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioCreateCommand } from "./estagiario-create.command";
export type IEstagiarioCreateCommand = {
  accessContext: AccessContext;
  dto: EstagiarioCreateCommand;
};

export type IEstagiarioCreateCommandHandler = ICommandHandler<
  IEstagiarioCreateCommand,
  EstagiarioFindOneQueryResult
>;
export const IEstagiarioCreateCommandHandler = Symbol("IEstagiarioCreateCommandHandler");
