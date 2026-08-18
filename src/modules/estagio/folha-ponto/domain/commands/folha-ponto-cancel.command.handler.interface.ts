import type { IAccessContext } from "@/domain/abstractions";

export const IFolhaPontoCancelCommandHandler = Symbol("IFolhaPontoCancelCommandHandler");

export interface IFolhaPontoCancelCommandHandler {
  execute(accessContext: IAccessContext | null, id: string): Promise<boolean>;
}
