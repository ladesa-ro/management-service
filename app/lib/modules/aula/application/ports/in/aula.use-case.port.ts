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
  findAll(
    accessContext: AccessContext,
    dto: AulaListInput | null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutput>;

  findById(
    accessContext: AccessContext,
    dto: AulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: AulaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput>;

  findByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput | null>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: AulaFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutput>;

  create(accessContext: AccessContext, dto: AulaCreateInput): Promise<AulaFindOneOutput>;

  update(
    accessContext: AccessContext,
    dto: AulaFindOneInput & AulaUpdateInput,
  ): Promise<AulaFindOneOutput>;

  deleteOneById(accessContext: AccessContext, dto: AulaFindOneInput): Promise<boolean>;
}
