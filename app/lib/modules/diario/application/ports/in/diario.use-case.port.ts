import type { AccessContext } from "@/modules/@core/access-context";
import type {
  DiarioCreateInputDto,
  DiarioFindOneInputDto,
  DiarioFindOneOutputDto,
  DiarioListInputDto,
  DiarioListOutputDto,
  DiarioUpdateInputDto,
} from "@/modules/diario/application/dtos";

export interface IDiarioUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: DiarioListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DiarioListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto>;

  findByIdSimple(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto | null>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioFindOneOutputDto>;

  create(accessContext: AccessContext, dto: DiarioCreateInputDto): Promise<DiarioFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: DiarioFindOneInputDto & DiarioUpdateInputDto,
  ): Promise<DiarioFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: DiarioFindOneInputDto): Promise<boolean>;
}
