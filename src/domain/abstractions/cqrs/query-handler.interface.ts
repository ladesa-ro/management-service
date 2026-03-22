import type { AccessContext } from "@/server/access-context";

export interface IQueryHandler<TQuery, TResult> {
  execute(accessContext: AccessContext | null, query: TQuery): Promise<TResult>;
}
