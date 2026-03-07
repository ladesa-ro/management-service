import type { StreamableFile } from "@nestjs/common";
import type { AccessContext } from "@/Ladesa.Management.Application/@seguranca/contexto-acesso";
import { type TurmaCreateInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaCreateInputDto";
import { type TurmaFindOneInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneInputDto";
import { type TurmaFindOneOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaFindOneOutputDto";
import { type TurmaListInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaListInputDto";
import { type TurmaListOutputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaListOutputDto";
import { type TurmaUpdateInputDto } from "@/Ladesa.Management.Domain/Dtos/TurmaUpdateInputDto";

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
