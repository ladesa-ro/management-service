import { UsuarioCreateCommandFields } from "@/modules/acesso/usuario/domain/commands/usuario-create.command";
import { VinculoInputFields } from "@/modules/acesso/usuario/domain/usuario-ensino.fields";
import { PerfilFindOneOutputRestDto } from "@/modules/acesso/usuario/perfil/presentation.rest/perfil.rest.dto";
import { CursoFindOneOutputRestDto } from "@/modules/ensino/curso/presentation.rest/curso.rest.dto";
import { TurmaFindOneOutputRestDto } from "@/modules/ensino/turma/presentation.rest/turma.rest.dto";
import { EstagiarioBatchCreateCommandFields } from "@/modules/estagio/estagiario/domain/commands/estagiario-batch-create.command";
import { EstagiarioCreateCommandFields } from "@/modules/estagio/estagiario/domain/commands/estagiario-create.command";
import { EstagiarioUpdateCommandFields } from "@/modules/estagio/estagiario/domain/commands/estagiario-update.command";
import {
  EstagiarioCreateSchema,
  EstagiarioUpdateSchema,
} from "@/modules/estagio/estagiario/domain/estagiario.schemas";
import { EstagiarioFindOneQueryFields } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query";
import { EstagiarioFindOneQueryResultFields } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.result";
import { EstagiarioFindOneInputSchema } from "@/modules/estagio/estagiario/domain/queries/estagiario-find-one.query.schemas";
import { EstagiarioListQueryFields } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query";
import { EstagiarioPaginationInputSchema } from "@/modules/estagio/estagiario/domain/queries/estagiario-list.query.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import {
  EntityBaseRestDto,
  PaginatedFilterByIdRestDto,
  PaginationMetaRestDto,
} from "@/shared/presentation/rest/dtos";

// ============================================================================
// FindOne Output
// ============================================================================

@ApiSchema({ name: "EstagiarioFindOneOutputDto" })
export class EstagiarioFindOneOutputRestDto extends EntityBaseRestDto {
  @ApiProperty({
    ...EstagiarioFindOneQueryResultFields.perfil.swaggerMetadata,
    type: () => PerfilFindOneOutputRestDto,
  })
  perfil: PerfilFindOneOutputRestDto | null;

  @ApiProperty({
    ...EstagiarioFindOneQueryResultFields.curso.swaggerMetadata,
    type: () => CursoFindOneOutputRestDto,
  })
  curso: CursoFindOneOutputRestDto | null;

  @ApiProperty({
    ...EstagiarioFindOneQueryResultFields.turma.swaggerMetadata,
    type: () => TurmaFindOneOutputRestDto,
  })
  turma: TurmaFindOneOutputRestDto | null;

  @ApiProperty(EstagiarioFindOneQueryResultFields.telefone.swaggerMetadata)
  telefone: string;

  @ApiPropertyOptional(EstagiarioFindOneQueryResultFields.emailInstitucional.swaggerMetadata)
  emailInstitucional: string | null = null;

  @ApiProperty(EstagiarioFindOneQueryResultFields.dataNascimento.swaggerMetadata)
  dataNascimento: string;

  @ApiProperty(EstagiarioFindOneQueryResultFields.ativo.swaggerMetadata)
  ativo: boolean;
}

// ============================================================================
// List Input/Output
// ============================================================================

@ApiSchema({ name: "EstagiarioListInputDto" })
export class EstagiarioListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = EstagiarioPaginationInputSchema;

  @ApiPropertyOptional(EstagiarioListQueryFields.filterPerfilId.swaggerMetadata)
  @TransformToArray()
  "filter.perfil.id"?: string[];

  @ApiPropertyOptional(EstagiarioListQueryFields.filterCursoId.swaggerMetadata)
  @TransformToArray()
  "filter.curso.id"?: string[];

  @ApiPropertyOptional(EstagiarioListQueryFields.filterTurmaId.swaggerMetadata)
  @TransformToArray()
  "filter.turma.id"?: string[];
}

@ApiSchema({ name: "EstagiarioListOutputDto" })
export class EstagiarioListOutputRestDto {
  @ApiProperty({
    ...EstagiarioListQueryFields.meta.swaggerMetadata,
    type: () => PaginationMetaRestDto,
  })
  meta: PaginationMetaRestDto;

  @ApiProperty({
    ...EstagiarioListQueryFields.data.swaggerMetadata,
    type: () => [EstagiarioFindOneOutputRestDto],
  })
  data: EstagiarioFindOneOutputRestDto[];
}

// ============================================================================
// Create/Update Input
// ============================================================================

@ApiSchema({ name: "EstagiarioCreateInputDto" })
export class EstagiarioCreateInputRestDto {
  static schema = EstagiarioCreateSchema.presentation;

  @ApiProperty(EstagiarioCreateCommandFields.perfil.swaggerMetadata)
  perfil: { id: string };

  @ApiProperty(EstagiarioCreateCommandFields.curso.swaggerMetadata)
  curso: { id: string };

  @ApiProperty(EstagiarioCreateCommandFields.turma.swaggerMetadata)
  turma: { id: string };

  @ApiProperty(EstagiarioCreateCommandFields.telefone.swaggerMetadata)
  telefone: string;

  @ApiProperty(EstagiarioCreateCommandFields.emailInstitucional.swaggerMetadata)
  emailInstitucional: string;

  @ApiProperty(EstagiarioCreateCommandFields.dataNascimento.swaggerMetadata)
  dataNascimento: string;
}

@ApiSchema({ name: "EstagiarioBatchCreateUsuarioVinculoInputDto" })
export class EstagiarioBatchCreateUsuarioVinculoInputRestDto {
  @ApiProperty(VinculoInputFields.campus.swaggerMetadata)
  campus: { id: string };

  @ApiProperty(VinculoInputFields.cargo.swaggerMetadata)
  cargo: string;
}

@ApiSchema({ name: "EstagiarioBatchCreateUsuarioInputDto" })
export class EstagiarioBatchCreateUsuarioInputRestDto {
  @ApiPropertyOptional(UsuarioCreateCommandFields.nome.swaggerMetadata)
  nome?: string | null;

  @ApiPropertyOptional(UsuarioCreateCommandFields.matricula.swaggerMetadata)
  matricula?: string | null;

  @ApiPropertyOptional(UsuarioCreateCommandFields.email.swaggerMetadata)
  email?: string | null;

  @ApiProperty({
    ...UsuarioCreateCommandFields.vinculos.swaggerMetadata,
    type: () => [EstagiarioBatchCreateUsuarioVinculoInputRestDto],
  })
  vinculos: EstagiarioBatchCreateUsuarioVinculoInputRestDto[];
}

@ApiSchema({ name: "EstagiarioBatchCreateItemInputDto" })
export class EstagiarioBatchCreateItemInputRestDto {
  @ApiProperty({
    ...EstagiarioBatchCreateCommandFields.usuario.swaggerMetadata,
    type: () => EstagiarioBatchCreateUsuarioInputRestDto,
  })
  usuario: EstagiarioBatchCreateUsuarioInputRestDto;

  @ApiProperty(EstagiarioBatchCreateCommandFields.curso.swaggerMetadata)
  curso: { id: string };

  @ApiProperty(EstagiarioBatchCreateCommandFields.turma.swaggerMetadata)
  turma: { id: string };

  @ApiProperty(EstagiarioBatchCreateCommandFields.telefone.swaggerMetadata)
  telefone: string;

  @ApiProperty(EstagiarioBatchCreateCommandFields.emailInstitucional.swaggerMetadata)
  emailInstitucional: string;

  @ApiProperty(EstagiarioBatchCreateCommandFields.dataNascimento.swaggerMetadata)
  dataNascimento: string;
}

@ApiSchema({ name: "EstagiarioBatchCreateInputDto" })
export class EstagiarioBatchCreateInputRestDto {
  @ApiProperty({
    ...EstagiarioBatchCreateCommandFields.estagiarios.swaggerMetadata,
    type: () => [EstagiarioBatchCreateItemInputRestDto],
  })
  estagiarios: EstagiarioBatchCreateItemInputRestDto[];
}

@ApiSchema({ name: "EstagiarioBatchJobOutputDto" })
export class EstagiarioBatchJobOutputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do job",
    format: "uuid",
  })
  id: string;

  @ApiProperty({
    type: "string",
    enum: ["PENDENTE", "PROCESSANDO", "CONCLUIDO", "FALHOU"],
  })
  status: "PENDENTE" | "PROCESSANDO" | "CONCLUIDO" | "FALHOU";

  @ApiProperty({
    type: "number",
    description: "Quantidade total de itens lidos do arquivo",
  })
  totalItems: number;

  @ApiProperty({
    type: "number",
    description: "Quantidade de itens processados com sucesso",
  })
  successCount: number;

  @ApiProperty({
    type: "number",
    description: "Quantidade de itens com falha",
  })
  failCount: number;

  @ApiPropertyOptional({
    type: "string",
    nullable: true,
    description: "Mensagem de erro quando o job falha",
  })
  errorMessage: string | null;

  @ApiProperty({ type: "string", format: "date-time" })
  dateCreated: string;

  @ApiProperty({ type: "string", format: "date-time" })
  dateUpdated: string;
}

@ApiSchema({ name: "EstagiarioBatchJobFindOneInputDto" })
export class EstagiarioBatchJobFindOneInputRestDto {
  @ApiProperty({
    type: "string",
    description: "Identificador do job",
    format: "uuid",
  })
  jobId: string;
}

@ApiSchema({ name: "EstagiarioUpdateInputDto" })
export class EstagiarioUpdateInputRestDto {
  static schema = EstagiarioUpdateSchema.presentation;

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.perfil.swaggerMetadata)
  perfil?: { id: string };

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.curso.swaggerMetadata)
  curso?: { id: string };

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.turma.swaggerMetadata)
  turma?: { id: string };

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.telefone.swaggerMetadata)
  telefone?: string;

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.emailInstitucional.swaggerMetadata)
  emailInstitucional?: string;

  @ApiPropertyOptional(EstagiarioUpdateCommandFields.dataNascimento.swaggerMetadata)
  dataNascimento?: string;
}

// ============================================================================
// FindOne Input (for path params)
// ============================================================================

@ApiSchema({ name: "EstagiarioFindOneInputDto" })
export class EstagiarioFindOneInputRestDto {
  static schema = EstagiarioFindOneInputSchema;

  @ApiProperty(EstagiarioFindOneQueryFields.id.swaggerMetadata)
  id: string;
}
