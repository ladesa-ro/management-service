import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsUUID,
  Matches,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import {
  PaginationInputRestDto,
  UuidParamRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";

@ApiSchema({ name: "HorarioEstagioInputDto" })
export class HorarioEstagioInputRestDto {
  @ApiProperty({ type: "number", minimum: 0, maximum: 6 })
  @IsInt()
  @Min(0)
  @Max(6)
  diaSemana!: number;

  @ApiProperty({ type: "string", example: "08:00" })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
  horaInicio!: string;

  @ApiProperty({ type: "string", example: "12:00" })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/)
  horaFim!: string;
}

@ApiSchema({ name: "HorarioEstagioOutputDto" })
export class HorarioEstagioOutputRestDto extends HorarioEstagioInputRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id!: string;
}

@ApiSchema({ name: "EstagioCreateInputDto" })
export class EstagioCreateInputRestDto {
  @ApiProperty({ type: "string", format: "uuid", description: "ID da empresa" })
  @IsUUID("all")
  idEmpresaFk!: string;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID do estagiário (opcional enquanto a vaga estiver aberta)",
  })
  @IsUUID("all")
  @IsOptional()
  idEstagiarioFk?: string;

  @ApiProperty({ type: "number", description: "Carga horária semanal", minimum: 1 })
  @IsInt()
  @Min(1)
  cargaHoraria!: number;

  @ApiPropertyOptional({ type: "string", format: "date" })
  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  @IsDateString()
  @IsOptional()
  dataFim?: string | null;

  @ApiPropertyOptional({ enum: EstagioStatus, enumName: "EstagioStatus" })
  @IsEnum(EstagioStatus)
  @IsOptional()
  status?: EstagioStatus;

  @ApiPropertyOptional({
    type: () => [HorarioEstagioInputRestDto],
    example: [
      { diaSemana: 1, horaInicio: "08:00", horaFim: "12:00" },
      { diaSemana: 3, horaInicio: "13:00", horaFim: "17:00" },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioEstagioInputRestDto)
  @IsOptional()
  horariosEstagio?: HorarioEstagioInputRestDto[];
}

@ApiSchema({ name: "EstagioUpdateInputDto" })
export class EstagioUpdateInputRestDto {
  @ApiPropertyOptional({ type: "string", format: "uuid" })
  @IsUUID("all")
  @IsOptional()
  idEmpresaFk?: string;

  @ApiPropertyOptional({ type: "string", format: "uuid" })
  @IsUUID("all")
  @IsOptional()
  idEstagiarioFk?: string;

  @ApiPropertyOptional({ type: "number", minimum: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  cargaHoraria?: number;

  @ApiPropertyOptional({ type: "string", format: "date" })
  @IsDateString()
  @IsOptional()
  dataInicio?: string;

  @ApiPropertyOptional({ type: "string", format: "date", nullable: true })
  @IsDateString()
  @IsOptional()
  dataFim?: string | null;

  @ApiPropertyOptional({ enum: EstagioStatus, enumName: "EstagioStatus" })
  @IsEnum(EstagioStatus)
  @IsOptional()
  status?: EstagioStatus;

  @ApiPropertyOptional({
    type: () => [HorarioEstagioInputRestDto],
    example: [
      { diaSemana: 1, horaInicio: "08:00", horaFim: "12:00" },
      { diaSemana: 3, horaInicio: "13:00", horaFim: "17:00" },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HorarioEstagioInputRestDto)
  @IsOptional()
  horariosEstagio?: HorarioEstagioInputRestDto[];
}

@ApiSchema({ name: "EstagioFindOneInputDto" })
export class EstagioFindOneInputRestDto extends UuidParamRestDto {}

@ApiSchema({ name: "EstagioListInputDto" })
export class EstagioListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({ type: "string", format: "uuid", description: "Filtro por empresa" })
  @IsOptional()
  "filter.idEmpresaFk"?: string | string[];

  @ApiPropertyOptional({ type: "string", format: "uuid", description: "Filtro por estagiário" })
  @IsOptional()
  "filter.idEstagiarioFk"?: string | string[];

  @ApiPropertyOptional({
    type: "string",
    enum: EstagioStatus,
    description: "Filtro por status (string ou array)",
  })
  @IsOptional()
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
