import type { ICommandHandler } from "@/domain/abstractions";
import type { ModalidadeFindOneQuery, ModalidadeFindOneQueryResult } from "../queries";
import type { ModalidadeUpdateCommand } from "./modalidade-update.command";

export const IModalidadeUpdateCommandHandler = Symbol("IModalidadeUpdateCommandHandler");

export type IModalidadeUpdateCommandHandler = ICommandHandler<
  ModalidadeFindOneQuery & ModalidadeUpdateCommand,
  ModalidadeFindOneQueryResult
>;
