import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  HorarioGeradoCreateInput,
  HorarioGeradoFindOneInput,
  HorarioGeradoFindOneOutput,
  HorarioGeradoListInput,
  HorarioGeradoListOutput,
  HorarioGeradoUpdateInput,
} from "../../dtos";

export interface IHorarioGeradoUseCasePort {
  horarioGeradoFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoListInput | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoListOutput>;

  horarioGeradoFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutput | null>;

  horarioGeradoFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoFindOneOutput>;

  horarioGeradoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutput | null>;

  horarioGeradoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoFindOneOutput>;

  horarioGeradoCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoCreateInput,
  ): Promise<HorarioGeradoFindOneOutput>;

  horarioGeradoUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput & HorarioGeradoUpdateInput,
  ): Promise<HorarioGeradoFindOneOutput>;

  horarioGeradoDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoFindOneInput,
  ): Promise<boolean>;
}
