import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";
import {
  PaginationInputRestDto,
  UuidParamRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

@ApiSchema({ name: "EstagiarioCreateInputDto" })
export class EstagiarioCreateInputRestDto {
  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do perfil vinculado ao estagiário",
  })
  @IsUUID("4")
  idPerfilFk!: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do curso vinculado ao estagiário",
  })
  @IsUUID("4")
  idCursoFk!: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID da turma vinculada ao estagiário",
  })
  @IsUUID("4")
  idTurmaFk!: string;

  @ApiProperty({ type: "string", description: "Telefone do estagiário", minLength: 1, maxLength: 15 })
  @IsString()
  @Length(1, 15)
  telefone!: string;

  @ApiProperty({
    type: "string",
    format: "email",
    description: "Email institucional do estagiário",
  })
  @IsEmail()
  @IsNotEmpty()
  emailInstitucional!: string;

  @ApiProperty({ type: "string", format: "date", description: "Data de nascimento do estagiário" })
  @IsDateString()
  dataNascimento!: string;
}

@ApiSchema({ name: "EstagiarioUpdateInputDto" })
export class EstagiarioUpdateInputRestDto {
  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID do perfil vinculado ao estagiário",
  })
  @IsUUID("4")
  @IsOptional()
  idPerfilFk?: string;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID do curso vinculado ao estagiário",
  })
  @IsUUID("4")
  @IsOptional()
  idCursoFk?: string;

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "ID da turma vinculada ao estagiário",
  })
  @IsUUID("4")
  @IsOptional()
  idTurmaFk?: string;

  @ApiPropertyOptional({ type: "string", description: "Telefone do estagiário", minLength: 1, maxLength: 15 })
  @IsString()
  @Length(1, 15)
  @IsOptional()
  telefone?: string;

  @ApiProperty({
    type: "string",
    format: "email",
    description: "Email institucional do estagiário",
  })
  @IsEmail()
  @IsNotEmpty()
  emailInstitucional!: string;

  @ApiPropertyOptional({ type: "string", format: "date", description: "Data de nascimento do estagiário" })
  @IsDateString()
  @IsOptional()
  dataNascimento?: string;
}

@ApiSchema({ name: "EstagiarioFindOneInputDto" })
export class EstagiarioFindOneInputRestDto extends UuidParamRestDto {}

@ApiSchema({ name: "EstagiarioListInputDto" })
export class EstagiarioListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de perfil (string ou array)",
  })
  @IsOptional()
  "filter.idPerfilFk"?: string | string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de curso (string ou array)",
  })
  @IsOptional()
  "filter.idCursoFk"?: string | string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de turma (string ou array)",
  })
  @IsOptional()
  "filter.idTurmaFk"?: string | string[];
}

@ApiSchema({ name: "EstagiarioFindOneOutputDto" })
export class EstagiarioFindOneOutputRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id!: string;

  @ApiProperty({ type: "string", format: "uuid" })
  idPerfilFk!: string;

  @ApiProperty({ type: "string", format: "uuid" })
  idCursoFk!: string;

  @ApiProperty({ type: "string", format: "uuid" })
  idTurmaFk!: string;

  @ApiProperty({ type: "string" })
  telefone!: string;

  @ApiPropertyOptional({ type: "string", format: "email", nullable: false })
  emailInstitucional!: string | null;

  @ApiProperty({ type: "string", format: "date" })
  dataNascimento!: string;

  @ApiProperty({ type: "boolean" })
  ativo!: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  dateCreated!: string;

  @ApiProperty({ type: "string", format: "date-time" })
  dateUpdated!: string;
}

@ApiSchema({ name: "EstagiarioListOutputDto" })
export class EstagiarioListOutputRestDto {
  @ApiProperty({ type: () => [EstagiarioFindOneOutputRestDto] })
  data!: EstagiarioFindOneOutputRestDto[];

  @ApiProperty({ type: "number" })
  total!: number;

  @ApiProperty({ type: "number" })
  page!: number;

  @ApiProperty({ type: "number" })
  limit!: number;
}
