export type IBaseRepositoryFindOneByIdPort<Id, Output> = {
  findById(id: Id, selection?: string[]): Promise<Output | null>;
};
