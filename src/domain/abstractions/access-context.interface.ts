import type { IRequestActor } from "./request-actor";

/**
 * Interface do AccessContext — contrato de domínio.
 *
 * Domain e application dependem desta interface.
 * A implementação concreta (com appTypeormConnection) fica em server/.
 */

export interface IAccessContext {
  readonly requestActor: IRequestActor | null;
}
