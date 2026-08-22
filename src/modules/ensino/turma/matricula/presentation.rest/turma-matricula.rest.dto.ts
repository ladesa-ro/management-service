import { TurmaMatriculaCreateSchema } from "@/modules/ensino/turma/matricula/domain/turma-matricula.schemas";
import { TurmaMatriculaFindOneInputSchema } from "@/modules/ensino/turma/matricula/domain/queries/turma-matricula-find-one.query.schemas";
import { TurmaMatriculaPaginationInputSchema } from "@/modules/ensino/turma/matricula/domain/queries/turma-matricula-list.query.schemas";
import { ApiProperty, ApiPropertyOptional, ApiSchema, TransformToArray } from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";
import { TurmaMatriculaVincularCommandFields } from "../domain/commands/turma-matricula-vincular.command";
import { TurmaMatriculaFindOneQueryResultFields } from "../domain/queries/turma-matricula-find-one.query.result";
import { TurmaMatriculaListQueryFields } from "../domain/queries/turma-matricula-list.query";

// ============================================================================
// Referencia simples { id } — reusada em input/output
// ============================================================================

@ApiSchema({ name: "TurmaMatriculaObjectRefDto" })
export class TurmaMatriculaObjectRefRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id: string;
}

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "TurmaMatriculaFindOneOutputDto" })
export class TurmaMatriculaFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    ...TurmaMatriculaFindOneQueryResultFields.turma.swaggerMetadata,
    type: () => TurmaMatriculaObjectRefRestDto,
  })
  turma: TurmaMatriculaObjectRefRestDto;

  @ApiProperty({
    ...TurmaMatriculaFindOneQueryResultFields.perfil.swaggerMetadata,
    type: () => TurmaMatriculaObjectRefRestDto,
  })
  perfil: TurmaMatriculaObjectRefRestDto;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "TurmaMatriculaListInputDto" })
export class TurmaMatriculaListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = TurmaMatriculaPaginationInputSchema;

  @ApiPropertyOptional(TurmaMatriculaListQueryFields.filterTurmaId.swaggerMetadata)
  @TransformToArray()
  "filter.turma.id"?: string[];

  @ApiPropertyOptional(TurmaMatriculaListQueryFields.filterPerfilId.swaggerMetadata)
  @TransformToArray()
  "filter.perfil.id"?: string[];
}

@ApiSchema({ name: "TurmaMatriculaListOutputDto" })
export class TurmaMatriculaListOutputRestDto {
  @ApiProperty({
    ...TurmaMatriculaListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...TurmaMatriculaListQueryFields.data.swaggerMetadata,
    type: () => [TurmaMatriculaFindOneOutputRestDto],
  })
  data: TurmaMatriculaFindOneOutputRestDto[];
}

// ============================================================================
// Vincular (Create) Input
// ============================================================================

@ApiSchema({ name: "TurmaMatriculaVincularInputDto" })
export class TurmaMatriculaVincularInputRestDto {
  static schema = TurmaMatriculaCreateSchema.presentation;

  @ApiProperty({
    ...TurmaMatriculaVincularCommandFields.turma.swaggerMetadata,
    type: () => TurmaMatriculaObjectRefRestDto,
  })
  turma: TurmaMatriculaObjectRefRestDto;

  @ApiProperty({
    ...TurmaMatriculaVincularCommandFields.perfil.swaggerMetadata,
    type: () => TurmaMatriculaObjectRefRestDto,
  })
  perfil: TurmaMatriculaObjectRefRestDto;
}

// ============================================================================
// Path params
// ============================================================================

@ApiSchema({ name: "TurmaMatriculaFindOneParamsDto" })
export class TurmaMatriculaFindOneParamsRestDto {
  static schema = TurmaMatriculaFindOneInputSchema;

  @ApiProperty({ type: "string", format: "uuid", description: "ID da matricula" })
  id: string;
}
