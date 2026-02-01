import type { AccessContext } from "@/modules/@core/access-context";
import type {
  DiarioCreateInput,
  DiarioFindOneInput,
  DiarioFindOneOutput,
  DiarioListInput,
  DiarioListOutput,
  DiarioUpdateInput,
} from "@/modules/diario/application/dtos";

export interface IDiarioUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: DiarioListInput | null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutput>;

  findById(
    accessContext: AccessContext,
    dto: DiarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: DiarioFindOneInput,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput>;

  findByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput | null>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioFindOneInput["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutput>;

  create(accessContext: AccessContext, dto: DiarioCreateInput): Promise<DiarioFindOneOutput>;

  update(
    accessContext: AccessContext,
    dto: DiarioFindOneInput & DiarioUpdateInput,
  ): Promise<DiarioFindOneOutput>;

  deleteOneById(accessContext: AccessContext, dto: DiarioFindOneInput): Promise<boolean>;
}
