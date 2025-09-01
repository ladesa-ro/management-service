import { IBaseRepositoryFindOneByIdPort, IBaseRepositoryListPort } from "@/shared";

export type IBaseRepositoryQueriesPort<Entity extends { id: string | number }, FindOneOutput, ListItem> = IBaseRepositoryFindOneByIdPort<Entity["id"], FindOneOutput> &
  IBaseRepositoryListPort<ListItem>;
