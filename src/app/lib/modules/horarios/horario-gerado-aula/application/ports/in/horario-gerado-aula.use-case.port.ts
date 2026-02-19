import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import type {
  HorarioGeradoAulaCreateInputDto,
  HorarioGeradoAulaFindOneInputDto,
  HorarioGeradoAulaFindOneOutputDto,
  HorarioGeradoAulaListInputDto,
  HorarioGeradoAulaListOutputDto,
  HorarioGeradoAulaUpdateInputDto,
} from "../../dtos";

export interface IHorarioGeradoAulaUseCasePort {
  horarioGeradoAulaFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutputDto>;

  horarioGeradoAulaFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null>;

  horarioGeradoAulaFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;

  horarioGeradoAulaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutputDto | null>;

  horarioGeradoAulaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;

  horarioGeradoAulaCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaCreateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;

  HorarioGeradoAulaUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto & HorarioGeradoAulaUpdateInputDto,
  ): Promise<HorarioGeradoAulaFindOneOutputDto>;

  horarioGeradoAulaDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInputDto,
  ): Promise<boolean>;
}
