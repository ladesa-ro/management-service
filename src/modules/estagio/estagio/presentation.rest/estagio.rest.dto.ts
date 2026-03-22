import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import {
  estagioCreateSchema,
  estagioFindOneInputSchema,
  estagioPaginationInputSchema,
  estagioUpdateSchema,
} from "@/modules/estagio/estagio/domain/estagio.schemas";
import { PaginationInputRestDto, UuidParamRestDto } from "@/shared/presentation/rest/dtos";

@ApiSchema({ name: "HorarioEstagioInputDto" })
export class HorarioEstagioInputRestDto {
  @ApiProperty({ type: "number", minimum: 0, maximum: 6 })
  diaSemana!: number;

  @ApiProperty({ type: "string", example: "08:00" })
  horaInicio!: string;

  @ApiProperty({ type: "string", example: "12:00" })
  horaFim!: string;
}

@ApiSchema({ name: "HorarioEstagioOutputDto" })
export class HorarioEstagioOutputRestDto extends HorarioEstagioInputRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id!: string;
}

@ApiSchema({ name: "EstagioCreateInputDto" })
export class EstagioCreateInputRestDto {
  static schema = estagioCreateSchema;

  @ApiProperty({ type: "string", format: "uuid", description: "ID da empresa" })
  idEmpresaFk!: string;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID do estagiário (opcional enquanto a vaga estiver aberta)",
  })
  idEstagiarioFk?: string;

  @ApiProperty({ type: "number", description: "Carga horária semanal", minimum: 1 })
  cargaHoraria!: number;

  @ApiPropertyOptional({ type: "string", format: "date" })
  dataInicio?: string;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataFim?: string | null;

  @ApiPropertyOptional({ enum: EstagioStatus, enumName: "EstagioStatus" })
  status?: EstagioStatus;

  @ApiPropertyOptional({
    type: () => [HorarioEstagioInputRestDto],
    example: [
      { diaSemana: 1, horaInicio: "08:00", horaFim: "12:00" },
      { diaSemana: 3, horaInicio: "13:00", horaFim: "17:00" },
    ],
  })
  horariosEstagio?: HorarioEstagioInputRestDto[];
}

@ApiSchema({ name: "EstagioUpdateInputDto" })
export class EstagioUpdateInputRestDto {
  static schema = estagioUpdateSchema;

  @ApiPropertyOptional({ type: "string", format: "uuid" })
  idEmpresaFk?: string;

  @ApiPropertyOptional({ type: "string", format: "uuid" })
  idEstagiarioFk?: string;

  @ApiPropertyOptional({ type: "number", minimum: 1 })
  cargaHoraria?: number;

  @ApiPropertyOptional({ type: "string", format: "date" })
  dataInicio?: string;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataFim?: string | null;

  @ApiPropertyOptional({ enum: EstagioStatus, enumName: "EstagioStatus" })
  status?: EstagioStatus;

  @ApiPropertyOptional({
    type: () => [HorarioEstagioInputRestDto],
    example: [
      { diaSemana: 1, horaInicio: "08:00", horaFim: "12:00" },
      { diaSemana: 3, horaInicio: "13:00", horaFim: "17:00" },
    ],
  })
  horariosEstagio?: HorarioEstagioInputRestDto[];
}

@ApiSchema({ name: "EstagioFindOneInputDto" })
export class EstagioFindOneInputRestDto extends UuidParamRestDto {
  static schema = estagioFindOneInputSchema;
}

@ApiSchema({ name: "EstagioListInputDto" })
export class EstagioListInputRestDto extends PaginationInputRestDto {
  static schema = estagioPaginationInputSchema;

  @ApiPropertyOptional({ type: "string", format: "uuid", description: "Filtro por empresa" })
  "filter.idEmpresaFk"?: string | string[];

  @ApiPropertyOptional({ type: "string", format: "uuid", description: "Filtro por estagiário" })
  "filter.idEstagiarioFk"?: string | string[];

  @ApiPropertyOptional({
    type: "string",
    enum: EstagioStatus,
    description: "Filtro por status (string ou array)",
  })
  "filter.status"?: EstagioStatus | EstagioStatus[];
}

@ApiSchema({ name: "EstagioFindOneOutputDto" })
export class EstagioFindOneOutputRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id!: string;

  @ApiProperty({ type: "string", format: "uuid" })
  idEmpresaFk!: string;

  @ApiPropertyOptional({ type: "string", format: "uuid", nullable: true })
  idEstagiarioFk!: string | null;

  @ApiProperty({ type: "number" })
  cargaHoraria!: number;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataInicio!: string | null;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  dataFim!: string | null;

  @ApiProperty({ enum: EstagioStatus, enumName: "EstagioStatus" })
  status!: EstagioStatus;

  @ApiProperty({ type: () => [HorarioEstagioOutputRestDto] })
  horariosEstagio!: HorarioEstagioOutputRestDto[];

  @ApiProperty({ type: "boolean" })
  ativo!: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  dateCreated!: string;

  @ApiProperty({ type: "string", format: "date-time" })
  dateUpdated!: string;
}

@ApiSchema({ name: "EstagioListOutputDto" })
export class EstagioListOutputRestDto {
  @ApiProperty({ type: () => [EstagioFindOneOutputRestDto] })
  data!: EstagioFindOneOutputRestDto[];

  @ApiProperty({ type: "number" })
  total!: number;

  @ApiProperty({ type: "number" })
  page!: number;

  @ApiProperty({ type: "number" })
  limit!: number;
}
