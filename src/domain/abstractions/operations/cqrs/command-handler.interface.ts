import type { AccessContext } from "@/server/access-context";

/**
 * Handler CQRS de escrita. Commands representam intenções de mutação e podem
 * disparar side-effects (validação de permissão, eventos). TResult default void
 * — commands que retornam dados (ex: create retornando id) usam o type param.
 */
export interface ICommandHandler<TCommand, TResult = void> {
  execute(accessContext: AccessContext | null, command: TCommand): Promise<TResult>;
}
