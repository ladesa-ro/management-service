export interface IQueryHandler<TQuery, TResult> {
  execute(query: TQuery): Promise<TResult>;
}
