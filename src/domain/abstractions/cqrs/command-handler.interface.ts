import type { AccessContext } from "@/server/access-context";

export interface ICommandHandler<TCommand, TResult = void> {
  execute(accessContext: AccessContext | null, command: TCommand): Promise<TResult>;
}
