import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";

export interface IQueryHandler<TQuery, TResult> {
  execute(accessContext: AccessContext | null, query: TQuery): Promise<TResult>;
}
