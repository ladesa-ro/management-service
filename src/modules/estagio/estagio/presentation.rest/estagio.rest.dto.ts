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

@ApiSchema({ name: "EstagioEmpresaRefInputDto" })
export class EstagioEmpresaRefInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.empresa.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioCampusRefInputDto" })
export class EstagioCampusRefInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.campus.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioCursoRefInputDto" })
export class EstagioCursoRefInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.CursoReferencia.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "HorarioEstagioInputDto" })
export class HorarioEstagioInputRestDto {
  @ApiProperty(HorarioEstagioFields.diaSemana.swaggerMetadata)
  diaSemana!: number;

  @ApiPropertyOptional(HorarioEstagioFields.horaInicio.swaggerMetadata)
  horaInicio?: string | null;

  @ApiPropertyOptional(HorarioEstagioFields.horaFim.swaggerMetadata)
  horaFim?: string | null;
}

@ApiSchema({ name: "HorarioEstagioOutputDto" })
export class HorarioEstagioOutputRestDto extends HorarioEstagioInputRestDto {
  @ApiProperty(HorarioEstagioFields.id.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioCreateInputDto" })
export class EstagioCreateInputRestDto {
  static schema = EstagioCreateSchema.presentation;

  @ApiPropertyOptional(EstagioCreateCommandFields.campus.swaggerMetadata)
  campus?: EstagioCampusRefInputRestDto;

  @ApiProperty(EstagioCreateCommandFields.empresa.swaggerMetadata)
  empresa!: EstagioEmpresaRefInputRestDto;

  @ApiPropertyOptional(EstagioCreateCommandFields.estagiario.swaggerMetadata)
  estagiario?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.usuarioOrientador.swaggerMetadata)
  usuarioOrientador?: string;

  @ApiProperty(EstagioCreateCommandFields.cargaHoraria.swaggerMetadata)
  cargaHoraria!: number;

  @ApiPropertyOptional(EstagioCreateCommandFields.CursoReferencia.swaggerMetadata)
  CursoReferencia?: EstagioCursoRefInputRestDto | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.dataInicio.swaggerMetadata)
  dataInicio?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.dataFim.swaggerMetadata)
  dataFim?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.status.swaggerMetadata)
  status?: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.nomeSupervisor.swaggerMetadata)
  nomeSupervisor?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.emailSupervisor.swaggerMetadata)
  emailSupervisor?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.telefoneSupervisor.swaggerMetadata)
  telefoneSupervisor?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.aditivo.swaggerMetadata)
  aditivo?: boolean;

  @ApiPropertyOptional(EstagioCreateCommandFields.tipoAditivo.swaggerMetadata)
  tipoAditivo?: string | null;

  @ApiPropertyOptional({
    ...EstagioCreateCommandFields.horariosEstagio.swaggerMetadata,
    type: () => [HorarioEstagioInputRestDto],
  })
  horariosEstagio?: HorarioEstagioInputRestDto[] | null;
}

@ApiSchema({ name: "EstagioUpdateInputDto" })
export class EstagioUpdateInputRestDto {
  static schema = EstagioUpdateSchema.presentation;

  @ApiPropertyOptional(EstagioUpdateCommandFields.campus.swaggerMetadata)
  campus?: EstagioCampusRefInputRestDto;

  @ApiPropertyOptional(EstagioUpdateCommandFields.empresa.swaggerMetadata)
  empresa?: EstagioEmpresaRefInputRestDto;

  @ApiPropertyOptional(EstagioUpdateCommandFields.estagiario.swaggerMetadata)
  estagiario?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.usuarioOrientador.swaggerMetadata)
  usuarioOrientador?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.cargaHoraria.swaggerMetadata)
  cargaHoraria?: number;

  @ApiPropertyOptional(EstagioUpdateCommandFields.CursoReferencia.swaggerMetadata)
  CursoReferencia?: EstagioCursoRefInputRestDto | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.dataInicio.swaggerMetadata)
  dataInicio?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.dataFim.swaggerMetadata)
  dataFim?: string | null;

  @ApiPropertyOptional({
    ...EstagioUpdateCommandFields.status.swaggerMetadata,
    enum: EstagioStatusValues,
  })
  status?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.nomeSupervisor.swaggerMetadata)
  nomeSupervisor?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.emailSupervisor.swaggerMetadata)
  emailSupervisor?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.telefoneSupervisor.swaggerMetadata)
  telefoneSupervisor?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.aditivo.swaggerMetadata)
  aditivo?: boolean;

  @ApiPropertyOptional(EstagioUpdateCommandFields.tipoAditivo.swaggerMetadata)
  tipoAditivo?: string | null;

  @ApiPropertyOptional({
    ...EstagioUpdateCommandFields.horariosEstagio.swaggerMetadata,
    type: () => [HorarioEstagioInputRestDto],
  })
  horariosEstagio?: HorarioEstagioInputRestDto[] | null;
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

  @ApiPropertyOptional(EstagioListQueryFields.filterCursoReferenciaId.swaggerMetadata)
  "filter.CursoReferencia.id"?: string | string[];

  @ApiPropertyOptional(EstagioListQueryFields.filterSituacao.swaggerMetadata)
  "filter.situacao"?: string | string[];
}

@ApiSchema({ name: "EstagioFindOneOutputDto" })
export class EstagioFindOneOutputRestDto {
  @ApiProperty(EstagioFindOneQueryResultFields.id.swaggerMetadata)
  id!: string;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.campus.swaggerMetadata)
  campus!: { id: string } | null;

  @ApiProperty(EstagioFindOneQueryResultFields.empresa.swaggerMetadata)
  empresa!: { id: string };

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.estagiario.swaggerMetadata)
  estagiario!: { id: string } | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.CursoReferencia.swaggerMetadata)
  CursoReferencia!: { id: string } | null;

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

@ApiSchema({ name: "EstagioImportJobOutputDto" })
export class EstagioImportJobOutputRestDto {
  @ApiProperty()
  message!: string;
}
