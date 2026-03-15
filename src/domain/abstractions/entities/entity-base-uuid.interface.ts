import type { IEntityDatedUuid } from "./entity-dated-uuid.interface";
import type { IEntityIdUuid } from "./entity-id-uuid.interface";

export interface IEntityBaseUuid extends IEntityIdUuid, IEntityDatedUuid {}
