import type { AccessContext } from "@/modules/@core/access-context";
import type {
  HorarioGeradoCreateInputDto,
  HorarioGeradoFindOneInputDto,
  HorarioGeradoFindOneOutputDto,
  HorarioGeradoListInputDto,
  HorarioGeradoListOutputDto,
  HorarioGeradoUpdateInputDto,
} from "../../dtos";

export interface IHorarioGeradoUseCasePort {
  horarioGeradoFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutputDto>;

  horarioGeradoFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto | null>;

  horarioGeradoFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutputDto>;

  horarioGeradoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto | null>;

  horarioGeradoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutputDto>;

  horarioGeradoCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto>;

  horarioGeradoUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto & HorarioGeradoUpdateInputDto,
  ): Promise<HorarioGeradoFindOneOutputDto>;

  horarioGeradoDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInputDto,
  ): Promise<boolean>;
}
