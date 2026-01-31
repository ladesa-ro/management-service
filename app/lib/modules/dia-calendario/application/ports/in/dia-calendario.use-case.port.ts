import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiaCalendarioCreateInput,
  DiaCalendarioFindOneInput,
  DiaCalendarioFindOneOutput,
  DiaCalendarioListInput,
  DiaCalendarioListOutput,
  DiaCalendarioUpdateInput,
} from "../../dtos";

export interface IDiaCalendarioUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: DiaCalendarioListInput | null,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioListOutput>;

  findById(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutput | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiaCalendarioFindOneOutput>;

  create(
    accessContext: AccessContext,
    dto: DiaCalendarioCreateInput,
  ): Promise<DiaCalendarioFindOneOutput>;

  update(
    accessContext: AccessContext,
    dto: DiaCalendarioFindOneInput & DiaCalendarioUpdateInput,
  ): Promise<DiaCalendarioFindOneOutput>;

  deleteOneById(accessContext: AccessContext, dto: DiaCalendarioFindOneInput): Promise<boolean>;
}
