import type { Authorization } from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { IRequestActor } from "./request-actor.interface";

export interface IAuthorizationService {
  canPerform<Action extends keyof Authorization>(requestActor: IRequestActor, action: Action, input: Authorization[Action]): Promise<boolean>;

  getContextFilters<Action extends keyof Authorization>(requestActor: IRequestActor, action: Action): Promise<Record<`filter.${string}`, any>>
}