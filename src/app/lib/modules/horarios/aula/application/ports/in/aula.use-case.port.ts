import type { AccessContext } from "@/modules/@core/contexto-acesso";
import type {
  AulaCreateInputDto,
  AulaFindOneInputDto,
  AulaFindOneOutputDto,
  AulaListInputDto,
  AulaListOutputDto,
  AulaUpdateInputDto,
} from "../../dtos";

export interface IAulaUseCasePort {
  findAll(
    accessContext: AccessContext,
    dto: AulaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<AulaListOutputDto>;

  findById(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;

  findByIdStrict(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto>;

  findByIdSimple(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto | null>;

  findByIdSimpleStrict(
    accessContext: AccessContext,
    id: AulaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<AulaFindOneOutputDto>;

  create(accessContext: AccessContext, dto: AulaCreateInputDto): Promise<AulaFindOneOutputDto>;

  update(
    accessContext: AccessContext,
    dto: AulaFindOneInputDto & AulaUpdateInputDto,
  ): Promise<AulaFindOneOutputDto>;

  deleteOneById(accessContext: AccessContext, dto: AulaFindOneInputDto): Promise<boolean>;
}
