import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaUpdateInputDto,
} from "@/v2/adapters/in/http/turma/dto";

/**
 * Port de entrada para casos de uso de Turma
 * Define o contrato que o service deve implementar
 */
export interface ITurmaUseCasePort {
  turmaFindAll(
    accessContext: AccessContext,
    dto: TurmaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutputDto>;

  turmaFindById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto | null>;

  turmaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto>;

  turmaFindByIdSimple(
    accessContext: AccessContext,
    id: TurmaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto | null>;

  turmaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: TurmaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto>;

  turmaCreate(
    accessContext: AccessContext,
    dto: TurmaCreateInputDto,
  ): Promise<TurmaFindOneOutputDto>;

  turmaUpdate(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto & TurmaUpdateInputDto,
  ): Promise<TurmaFindOneOutputDto>;

  turmaGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  turmaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  turmaDeleteOneById(accessContext: AccessContext, dto: TurmaFindOneInputDto): Promise<boolean>;
}
