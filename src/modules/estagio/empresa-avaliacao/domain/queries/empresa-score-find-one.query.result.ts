import { EntityQueryResult, SharedFields } from "@/domain/abstractions";
import { EmpresaScoreFields } from "../empresa-score.fields";

export const EmpresaScoreFindOneQueryResultFields = {
  id: SharedFields.idUuid,
  ...EmpresaScoreFields,
};

export class EmpresaScoreFindOneQueryResult extends EntityQueryResult {
  empresaId!: string;
  score!: number;
  averageRating!: number;
  totalReviews!: number;
  distribution!: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  scoreVersion!: number;
  indicators?: Record<string, any> | null;
  calculatedAt!: string;
}
