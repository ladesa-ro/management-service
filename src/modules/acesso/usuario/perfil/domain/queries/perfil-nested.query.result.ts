import { EntityQueryResult } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";

export class PerfilNestedQueryResult extends EntityQueryResult {
  ativo!: boolean;
  cargo!: string;
  campus!: CampusFindOneQueryResult;
}
