import type { ICommandHandler } from "@/modules/@shared/domain/abstractions";
import type { UsuarioFindOneQuery } from "../queries";

export const IUsuarioDeleteCommandHandler = Symbol("IUsuarioDeleteCommandHandler");

export type IUsuarioDeleteCommandHandler = ICommandHandler<UsuarioFindOneQuery, boolean>;
