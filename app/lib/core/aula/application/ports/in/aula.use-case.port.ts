import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  AulaCreateInput,
  AulaFindOneInput,
  AulaFindOneOutput,
  AulaListInput,
  AulaListOutput,
  AulaUpdateInput,
} from "../../dtos";

export interface IAulaUseCasePort {
  aulaFindAll(
    accessContext: AccessContext,
    dto: AulaListInput | null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutput>;

  aulaFindById(
    accessContext: AccessContext,
    dto: AulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null>;

  aulaFindByIdStrict(
    accessContext: AccessContext,
    dto: AulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput>;

  aulaFindByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null>;

  aulaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: AulaFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput>;

  aulaCreate(accessContext: AccessContext, dto: AulaCreateInput): Promise<AulaFindOneOutput>;

  aulaUpdate(
    accessContext: AccessContext,
    dto: AulaFindOneInput & AulaUpdateInput,
  ): Promise<AulaFindOneOutput>;

  aulaDeleteOneById(accessContext: AccessContext, dto: AulaFindOneInput): Promise<boolean>;
}
