import { EntityQueryResult } from "@/domain/abstractions";
import { CampusFindOneQueryResult } from "@/modules/ambientes/campus";
import { CargoNestedQueryResult } from "./cargo-nested.query.result";

export class PerfilNestedQueryResult extends EntityQueryResult {
  ativo!: boolean;
  cargo!: CargoNestedQueryResult | null;
  campus!: CampusFindOneQueryResult;
}
