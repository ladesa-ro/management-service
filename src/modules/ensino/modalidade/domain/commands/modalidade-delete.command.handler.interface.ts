import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { ModalidadeFindOneQuery } from "../queries";

export type IModalidadeDeleteCommandHandler = ICommandHandler<ModalidadeFindOneQuery, boolean>;
export const IModalidadeDeleteCommandHandler = Symbol("IModalidadeDeleteCommandHandler");
