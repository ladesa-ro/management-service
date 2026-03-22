import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";

export interface ICommandHandler<TCommand, TResult = void> {
  execute(accessContext: AccessContext | null, command: TCommand): Promise<TResult>;
}
