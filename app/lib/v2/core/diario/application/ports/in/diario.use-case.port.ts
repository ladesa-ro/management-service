import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "@/v2/adapters/in/http/diario/dto";

export interface IDiarioUseCasePort {
  diarioFindAll(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto>;

  diarioFindById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null>;

  diarioFindByIdStrict(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto>;

  diarioFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null>;

  diarioFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto>;

  diarioCreate(
    accessContext: AccessContext,
    dto: DiarioCreateInputDto,
  ): Promise<DiarioFindOneOutputDto>;

  diarioUpdate(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto>;

  diarioDeleteOneById(accessContext: AccessContext, dto: DiarioFindOneInputDto): Promise<boolean>;
}
