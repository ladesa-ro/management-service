import type { AccessContext } from "@/modules/@core/access-context";
import type {
  IntervaloDeTempoFindOneInput,
  IntervaloDeTempoFindOneOutput,
  IntervaloDeTempoInput,
  IntervaloDeTempoListInput,
  IntervaloDeTempoListOutput,
} from "../../dtos";

export interface IIntervaloDeTempoUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: IntervaloDeTempoListInput | null,
  ): Promise<IntervaloDeTempoListOutput>;

  findById(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInput,
  ): Promise<IntervaloDeTempoFindOneOutput | null>;

  findByIdStrict(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInput,
  ): Promise<IntervaloDeTempoFindOneOutput>;

  intervaloCreateOrUpdate(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoInput,
  ): Promise<IntervaloDeTempoFindOneOutput>;
}
