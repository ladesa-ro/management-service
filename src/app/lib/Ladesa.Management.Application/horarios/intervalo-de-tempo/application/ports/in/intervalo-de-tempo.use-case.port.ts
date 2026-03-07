import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type IntervaloDeTempoFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoFindOneInputDto";
import { type IntervaloDeTempoFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoFindOneOutputDto";
import { type IntervaloDeTempoInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoInputDto";
import { type IntervaloDeTempoListInputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoListInputDto";
import { type IntervaloDeTempoListOutputDto } from "@/Ladesa.Management.Domain/Dtos/IntervaloDeTempoListOutputDto";

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
