import type { IEntityDated } from "./IEntityDated";
import type { IEntityId } from "./IEntityId";

export interface IEntityBase extends IEntityId, IEntityDated {}
