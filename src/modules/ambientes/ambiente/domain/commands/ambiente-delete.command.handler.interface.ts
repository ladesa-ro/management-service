import type { ICommandHandler } from "@/domain/abstractions";
import type { AmbienteFindOneQuery } from "../queries";

export const IAmbienteDeleteCommandHandler = Symbol("IAmbienteDeleteCommandHandler");

export type IAmbienteDeleteCommandHandler = ICommandHandler<AmbienteFindOneQuery, boolean>;
