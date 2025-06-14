import type { IRequestActor } from "./auth";

export interface IAbstractResourceService<Input, Output> {
  execute(requestActor: IRequestActor, input: Input): Promise<Output>;
}