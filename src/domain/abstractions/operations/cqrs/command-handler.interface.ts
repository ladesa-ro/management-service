import type { IAccessContext } from "@/domain/abstractions";

/**
 * Handler CQRS de escrita. Commands representam intenções de mutação e podem
 * disparar side-effects (validação de permissão, eventos). TResult default void
 * — commands que retornam dados (ex: create retornando id) usam o type param.
 */
export interface ICommandHandler<TCommand, TResult = void> {
  execute(accessContext: IAccessContext | null, command: TCommand): Promise<TResult>;
}
