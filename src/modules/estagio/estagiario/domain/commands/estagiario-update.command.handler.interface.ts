import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { EstagiarioFindOneQuery, EstagiarioFindOneQueryResult } from "../queries";
import type { EstagiarioUpdateCommand } from "./estagiario-update.command";

export type IEstagiarioUpdateCommandHandler = ICommandHandler<
  EstagiarioFindOneQuery & EstagiarioUpdateCommand,
  EstagiarioFindOneQueryResult
>;
export const IEstagiarioUpdateCommandHandler = Symbol("IEstagiarioUpdateCommandHandler");
