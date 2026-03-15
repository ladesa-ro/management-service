import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneQueryResult } from "../queries";
import type { ModalidadeCreateCommand } from "./modalidade-create.command";

export type IModalidadeCreateCommandHandler = ICommandHandler<
  ModalidadeCreateCommand,
  ModalidadeFindOneQueryResult
>;
export const IModalidadeCreateCommandHandler = Symbol("IModalidadeCreateCommandHandler");
