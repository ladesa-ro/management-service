import { SharedFields } from "@/domain/abstractions";
import { EstagioCreateCommandFields } from "@/modules/estagio/estagio/domain/commands/estagio-create.command";
import { EstagioUpdateCommandFields } from "@/modules/estagio/estagio/domain/commands/estagio-update.command";
import { EstagioStatusValues } from "@/modules/estagio/estagio/domain/estagio.fields";
import {
  EstagioCreateSchema,
  EstagioUpdateSchema,
} from "@/modules/estagio/estagio/domain/estagio.schemas";
import { HorarioEstagioFields } from "@/modules/estagio/estagio/domain/horario-estagio.fields";
import { EstagioFindOneQueryResultFields } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.result";
import { EstagioFindOneInputSchema } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.schemas";
import { EstagioListQueryFields } from "@/modules/estagio/estagio/domain/queries/estagio-list.query";
import { EstagioPaginationInputSchema } from "@/modules/estagio/estagio/domain/queries/estagio-list.query.schemas";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";
import { PaginationInputRestDto, UuidParamRestDto } from "@/shared/presentation/rest/dtos";

@ApiSchema({ name: "HorarioEstagioInputDto" })
export class HorarioEstagioInputRestDto {
  @ApiProperty(HorarioEstagioFields.diaSemana.swaggerMetadata)
  diaSemana!: number;

  @ApiProperty(HorarioEstagioFields.horaInicio.swaggerMetadata)
  horaInicio!: string;

  @ApiProperty(HorarioEstagioFields.horaFim.swaggerMetadata)
  horaFim!: string;
}

@ApiSchema({ name: "HorarioEstagioOutputDto" })
export class HorarioEstagioOutputRestDto extends HorarioEstagioInputRestDto {
  @ApiProperty(HorarioEstagioFields.id.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioCreateInputDto" })
export class EstagioCreateInputRestDto {
  static schema = EstagioCreateSchema.presentation;

  @ApiProperty(EstagioCreateCommandFields.empresa.swaggerMetadata)
  empresa!: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.estagiario.swaggerMetadata)
  estagiario?: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.usuarioOrientador.swaggerMetadata)
  usuarioOrientador?: string;

  @ApiProperty(EstagioCreateCommandFields.cargaHoraria.swaggerMetadata)
  cargaHoraria!: number;

  @ApiPropertyOptional(EstagioCreateCommandFields.dataInicio.swaggerMetadata)
  dataInicio?: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.dataFim.swaggerMetadata)
  dataFim?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.status.swaggerMetadata)
  status?: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.nomeSupervisor.swaggerMetadata)
  nomeSupervisor?: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.emailSupervisor.swaggerMetadata)
  emailSupervisor?: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.telefoneSupervisor.swaggerMetadata)
  telefoneSupervisor?: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.aditivo.swaggerMetadata)
  aditivo?: boolean;

  @ApiPropertyOptional(EstagioCreateCommandFields.tipoAditivo.swaggerMetadata)
  tipoAditivo?: string;

  @ApiPropertyOptional({
    ...EstagioCreateCommandFields.horariosEstagio.swaggerMetadata,
    type: () => [HorarioEstagioInputRestDto],
  })
  horariosEstagio?: HorarioEstagioInputRestDto[];
}

@ApiSchema({ name: "EstagioUpdateInputDto" })
export class EstagioUpdateInputRestDto {
  static schema = EstagioUpdateSchema.presentation;

  @ApiPropertyOptional(EstagioUpdateCommandFields.empresa.swaggerMetadata)
  empresa?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.estagiario.swaggerMetadata)
  estagiario?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.usuarioOrientador.swaggerMetadata)
  usuarioOrientador?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.cargaHoraria.swaggerMetadata)
  cargaHoraria?: number;

  @ApiPropertyOptional(EstagioUpdateCommandFields.dataInicio.swaggerMetadata)
  dataInicio?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.dataFim.swaggerMetadata)
  dataFim?: string | null;

  @ApiPropertyOptional({
    ...EstagioUpdateCommandFields.status.swaggerMetadata,
    enum: EstagioStatusValues,
  })
  status?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.nomeSupervisor.swaggerMetadata)
  nomeSupervisor?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.emailSupervisor.swaggerMetadata)
  emailSupervisor?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.telefoneSupervisor.swaggerMetadata)
  telefoneSupervisor?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.aditivo.swaggerMetadata)
  aditivo?: boolean;

  @ApiPropertyOptional(EstagioUpdateCommandFields.tipoAditivo.swaggerMetadata)
  tipoAditivo?: string;

  @ApiPropertyOptional({
    ...EstagioUpdateCommandFields.horariosEstagio.swaggerMetadata,
    type: () => [HorarioEstagioInputRestDto],
  })
  horariosEstagio?: HorarioEstagioInputRestDto[];
}

@ApiSchema({ name: "EstagioFindOneInputDto" })
export class EstagioFindOneInputRestDto extends UuidParamRestDto {
  static schema = EstagioFindOneInputSchema;
}

@ApiSchema({ name: "EstagioListInputDto" })
export class EstagioListInputRestDto extends PaginationInputRestDto {
  static schema = EstagioPaginationInputSchema;

  @ApiPropertyOptional(EstagioListQueryFields.filterEmpresaId.swaggerMetadata)
  "filter.empresa.id"?: string | string[];

  @ApiPropertyOptional(EstagioListQueryFields.filterEstagiarioId.swaggerMetadata)
  "filter.estagiario.id"?: string | string[];

  @ApiPropertyOptional(EstagioListQueryFields.filterStatus.swaggerMetadata)
  "filter.status"?: string | string[];
}

@ApiSchema({ name: "EstagioFindOneOutputDto" })
export class EstagioFindOneOutputRestDto {
  @ApiProperty(EstagioFindOneQueryResultFields.id.swaggerMetadata)
  id!: string;

  @ApiProperty(EstagioFindOneQueryResultFields.empresa.swaggerMetadata)
  empresa!: { id: string };

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.estagiario.swaggerMetadata)
  estagiario!: { id: string } | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.usuarioOrientador.swaggerMetadata)
  usuarioOrientador!: { id: string } | null;

  @ApiProperty(EstagioFindOneQueryResultFields.cargaHoraria.swaggerMetadata)
  cargaHoraria!: number;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.dataInicio.swaggerMetadata)
  dataInicio!: string | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.dataFim.swaggerMetadata)
  dataFim!: string | null;

  @ApiProperty(EstagioFindOneQueryResultFields.status.swaggerMetadata)
  status!: string;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.nomeSupervisor.swaggerMetadata)
  nomeSupervisor!: string | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.emailSupervisor.swaggerMetadata)
  emailSupervisor!: string | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.telefoneSupervisor.swaggerMetadata)
  telefoneSupervisor!: string | null;

  @ApiProperty(EstagioFindOneQueryResultFields.aditivo.swaggerMetadata)
  aditivo!: boolean;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.tipoAditivo.swaggerMetadata)
  tipoAditivo!: string | null;

  @ApiProperty({
    ...EstagioFindOneQueryResultFields.horariosEstagio.swaggerMetadata,
    type: () => [HorarioEstagioOutputRestDto],
  })
  horariosEstagio!: HorarioEstagioOutputRestDto[];

  @ApiProperty(EstagioFindOneQueryResultFields.ativo.swaggerMetadata)
  ativo!: boolean;

  @ApiProperty(EstagioFindOneQueryResultFields.dateCreated.swaggerMetadata)
  dateCreated!: string;

  @ApiProperty(EstagioFindOneQueryResultFields.dateUpdated.swaggerMetadata)
  dateUpdated!: string;
}

@ApiSchema({ name: "EstagioListOutputDto" })
export class EstagioListOutputRestDto {
  @ApiProperty({
    ...SharedFields.data.swaggerMetadata,
    type: () => [EstagioFindOneOutputRestDto],
  })
  data!: EstagioFindOneOutputRestDto[];

  @ApiProperty({ type: "number", description: "Total de itens" })
  total!: number;

  @ApiProperty(SharedFields.page.swaggerMetadata)
  page!: number;

  @ApiProperty(SharedFields.limit.swaggerMetadata)
  limit!: number;
}

// ============================================================================
// Bulk Import
// ============================================================================

@ApiSchema({ name: "EstagioImportBulkItemInputDto" })
export class EstagioImportBulkItemInputRestDto {
  @ApiProperty({ type: "string", description: "Matrícula do estagiário" })
  matriculaEstagiario!: string;

  @ApiProperty({ type: "string", description: "Nome do estagiário" })
  nomeEstagiario!: string;

  @ApiProperty({ type: "string", description: "Email pessoal do estagiário" })
  emailPessoal!: string;

  @ApiPropertyOptional({ type: "string", description: "Email acadêmico do estagiário" })
  emailAcademico?: string;

  @ApiProperty({ type: "string", description: "Nome do curso" })
  curso!: string;

  @ApiProperty({ type: "string", description: "Nome do campus" })
  campus!: string;

  @ApiProperty({ type: "string", format: "uuid", description: "ID da empresa concedente" })
  empresaId!: string;

  @ApiProperty({ type: "string", description: "Nome do supervisor" })
  nomeSupervisor!: string;

  @ApiProperty({ type: "string", description: "Email do supervisor" })
  emailSupervisor!: string;

  @ApiProperty({ type: "string", description: "Telefone do supervisor" })
  telefoneSupervisor!: string;

  @ApiProperty({ type: "number", description: "Carga horária semanal" })
  cargaHoraria!: number;

  @ApiProperty({ type: "string", format: "date", description: "Data de início (YYYY-MM-DD)" })
  dataInicio!: string;

  @ApiProperty({ type: "string", format: "date", description: "Data de término (YYYY-MM-DD)" })
  dataFim!: string;
}

@ApiSchema({ name: "EstagioImportBulkInputDto" })
export class EstagioImportBulkInputRestDto {
  @ApiProperty({
    type: () => [EstagioImportBulkItemInputRestDto],
    description: "Lista de estágios a importar",
  })
  items!: EstagioImportBulkItemInputRestDto[];
}

@ApiSchema({ name: "EstagioImportBulkResultItemDto" })
export class EstagioImportBulkResultItemRestDto {
  @ApiProperty({ type: "number", description: "Número da linha no batch" })
  line!: number;

  @ApiProperty({ type: "string", description: "Matrícula do estagiário" })
  matriculaEstagiario!: string;

  @ApiProperty({ type: "string", description: "Nome do estagiário" })
  nomeEstagiario!: string;

  @ApiProperty({
    enum: ["created", "skipped", "failed"],
    description: "Status do processamento",
  })
  status!: "created" | "skipped" | "failed";

  @ApiPropertyOptional({ type: "string", description: "ID do estágio criado" })
  estágioId?: string;

  @ApiPropertyOptional({ type: "string", description: "Motivo da falha ou skip" })
  reason?: string;
}

@ApiSchema({ name: "EstagioImportBulkOutputDto" })
export class EstagioImportBulkOutputRestDto {
  @ApiProperty({ type: "number", description: "Total de registros processados" })
  total!: number;

  @ApiProperty({ type: "number", description: "Quantidade de estágios criados" })
  created!: number;

  @ApiProperty({ type: "number", description: "Quantidade de registros pulados" })
  skipped!: number;

  @ApiProperty({ type: "number", description: "Quantidade de registros com falha" })
  failed!: number;

  @ApiProperty({
    type: () => [EstagioImportBulkResultItemRestDto],
    description: "Detalhes de cada item processado",
  })
  items!: EstagioImportBulkResultItemRestDto[];
}
