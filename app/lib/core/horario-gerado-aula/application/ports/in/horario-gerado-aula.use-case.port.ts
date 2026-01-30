import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  HorarioGeradoAulaCreateInput,
  HorarioGeradoAulaFindOneInput,
  HorarioGeradoAulaFindOneOutput,
  HorarioGeradoAulaListInput,
  HorarioGeradoAulaListOutput,
  HorarioGeradoAulaUpdateInput,
} from "../../dtos";

export interface IHorarioGeradoAulaUseCasePort {
  horarioGeradoAulaFindAll(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaListInput | null,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaListOutput>;

  horarioGeradoAulaFindById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutput | null>;

  horarioGeradoAulaFindByIdStrict(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<HorarioGeradoAulaFindOneOutput>;

  horarioGeradoAulaFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutput | null>;

  horarioGeradoAulaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<HorarioGeradoAulaFindOneOutput>;

  horarioGeradoAulaCreate(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaCreateInput,
  ): Promise<HorarioGeradoAulaFindOneOutput>;

  HorarioGeradoAulaUpdate(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput & HorarioGeradoAulaUpdateInput,
  ): Promise<HorarioGeradoAulaFindOneOutput>;

  horarioGeradoAulaDeleteOneById(
    accessContext: AccessContext,
    dto: HorarioGeradoAulaFindOneInput,
  ): Promise<boolean>;
}
