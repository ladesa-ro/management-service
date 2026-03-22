import type { ICommandHandler } from "@/domain/abstractions";
import type { EstagioFindOneQuery } from "../queries";

export const IEstagioDeleteCommandHandler = Symbol("IEstagioDeleteCommandHandler");

export type IEstagioDeleteCommandHandler = ICommandHandler<EstagioFindOneQuery, void>;
