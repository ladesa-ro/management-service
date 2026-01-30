import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/v2/old/infrastructure/access-context";
import type {
  TurmaCreateInput,
  TurmaFindOneInput,
  TurmaFindOneOutput,
  TurmaListInput,
  TurmaListOutput,
  TurmaUpdateInput,
} from "../../dtos";

/**
 * Port de entrada para casos de uso de Turma
 * Define o contrato que o service deve implementar
 */
export interface ITurmaUseCasePort {
  turmaFindAll(
    accessContext: AccessContext,
    dto: TurmaListInput | null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutput>;

  turmaFindById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutput | null>;

  turmaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInput,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutput>;

  turmaFindByIdSimple(
    accessContext: AccessContext,
    id: TurmaFindOneInput["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutput | null>;

  turmaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: TurmaFindOneInput["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutput>;

  turmaCreate(
    accessContext: AccessContext,
    dto: TurmaCreateInput,
  ): Promise<TurmaFindOneOutput>;

  turmaUpdate(
    accessContext: AccessContext,
    dto: TurmaFindOneInput & TurmaUpdateInput,
  ): Promise<TurmaFindOneOutput>;

  turmaGetImagemCapa(accessContext: AccessContext | null, id: string): Promise<StreamableFile>;

  turmaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: TurmaFindOneInput,
    file: Express.Multer.File,
  ): Promise<boolean>;

  turmaDeleteOneById(accessContext: AccessContext, dto: TurmaFindOneInput): Promise<boolean>;
}
