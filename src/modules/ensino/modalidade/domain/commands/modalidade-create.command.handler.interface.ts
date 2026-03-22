import type { ICommandHandler } from "@/domain/abstractions";
import type { ModalidadeFindOneQueryResult } from "../queries";
import type { ModalidadeCreateCommand } from "./modalidade-create.command";

export const IModalidadeCreateCommandHandler = Symbol("IModalidadeCreateCommandHandler");

export type IModalidadeCreateCommandHandler = ICommandHandler<
  ModalidadeCreateCommand,
  ModalidadeFindOneQueryResult
>;
