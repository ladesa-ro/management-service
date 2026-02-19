import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  IntervaloDeTempoFindOneInputDto,
  IntervaloDeTempoFindOneOutputDto,
  IntervaloDeTempoInputDto,
  IntervaloDeTempoListInputDto,
  IntervaloDeTempoListOutputDto,
} from "../../dtos";

export interface IIntervaloDeTempoUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: IntervaloDeTempoListInputDto | null,
  ): Promise<IntervaloDeTempoListOutputDto>;

  findById(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoFindOneInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto>;

  intervaloCreateOrUpdate(
    accessContext: AccessContext | null,
    dto: IntervaloDeTempoInputDto,
  ): Promise<IntervaloDeTempoFindOneOutputDto>;
}
