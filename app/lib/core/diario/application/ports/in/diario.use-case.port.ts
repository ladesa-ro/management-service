import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  DiarioCreateInput,
  DiarioFindOneInput,
  DiarioFindOneOutput,
  DiarioListInput,
  DiarioListOutput,
  DiarioUpdateInput,
} from "@/core/diario/application/dtos";

export interface IDiarioUseCasePort {
  diarioFindAll(
    accessContext: AccessContext,
    dto: DiarioListInput | null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutput>;

  diarioFindById(
    accessContext: AccessContext,
    dto: DiarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput | null>;

  diarioFindByIdStrict(
    accessContext: AccessContext,
    dto: DiarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput>;

  diarioFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput | null>;

  diarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput>;

  diarioCreate(
    accessContext: AccessContext,
    dto: DiarioCreateInput,
  ): Promise<DiarioFindOneOutput>;

  diarioUpdate(
    accessContext: AccessContext,
    dto: DiarioFindOneInput & DiarioUpdateInput,
  ): Promise<DiarioFindOneOutput>;

  diarioDeleteOneById(accessContext: AccessContext, dto: DiarioFindOneInput): Promise<boolean>;
}
