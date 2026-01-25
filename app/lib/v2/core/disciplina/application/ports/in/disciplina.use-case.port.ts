import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "@/v2/server/modules/disciplina/http/dto";

/**
 * Port de entrada para casos de uso de Disciplina
 * Define o contrato que o service deve implementar
 */
export interface IDisciplinaUseCasePort {
  disciplinaFindAll(
    accessContext: AccessContext,
    dto: DisciplinaListInputDto | null,
    selection?: string[] | boolean,
  ): Promise<DisciplinaListOutputDto>;

  disciplinaFindById(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;

  disciplinaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto>;

  disciplinaFindByIdSimple(
    accessContext: AccessContext,
    id: DisciplinaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null>;

  disciplinaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DisciplinaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<DisciplinaFindOneOutputDto>;

  disciplinaCreate(
    accessContext: AccessContext,
    dto: DisciplinaCreateInputDto,
  ): Promise<DisciplinaFindOneOutputDto>;

  disciplinaUpdate(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto,
  ): Promise<DisciplinaFindOneOutputDto>;

  disciplinaGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  disciplinaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean>;

  disciplinaDeleteOneById(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
  ): Promise<boolean>;
}
