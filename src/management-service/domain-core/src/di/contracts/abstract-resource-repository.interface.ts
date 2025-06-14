
export interface IAbstractResourceRepository<FindOneInput, FindOneOutput, CreateInput, UpdateInput, ListInput extends Record<`filter.${string}`, any>, ListOutput> {
  create(input: CreateInput): Promise<FindOneInput>

  list(input: ListInput, contextFilters: Pick<ListInput, `filter.${string}`>): Promise<ListOutput>

  findOne(input: FindOneInput): Promise<FindOneOutput>

  update(input: UpdateInput): Promise<FindOneOutput>

  deleteOne(input: FindOneInput): Promise<true>
}