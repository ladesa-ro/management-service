import type { Authorization } from "@ladesa-ro/management-management-service.domain.contracts/typings";
import type { IAuthorizationService, IRequestActor } from "../di";


export const ensurePermission = async <Action extends keyof Authorization>(authorizationService: IAuthorizationService, requestActor: IRequestActor, action: Action, input: Authorization[Action]) => {
  const can = await authorizationService.canPerform(requestActor, action, input);

  if (!can) {
    throw new Error()
  }

  return true;
}