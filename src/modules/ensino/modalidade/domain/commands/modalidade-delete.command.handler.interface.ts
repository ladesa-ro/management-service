import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneQuery } from "../queries";

export const IModalidadeDeleteCommandHandler = Symbol("IModalidadeDeleteCommandHandler");

export type IModalidadeDeleteCommandHandler = ICommandHandler<ModalidadeFindOneQuery, boolean>;
