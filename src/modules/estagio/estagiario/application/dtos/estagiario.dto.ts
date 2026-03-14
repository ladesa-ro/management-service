import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from "class-validator";

/**
 * DTO para criar estagiário
 */
export class EstagiarioCreateInputDto {
  @IsUUID("4")
  idPerfilFk!: string;

  @IsUUID("4")
  idCursoFk!: string;

  @IsUUID("4")
  idTurmaFk!: string;

  @IsString()
  @Length(1, 15)
  telefone!: string;

  @IsEmail()
  @IsNotEmpty()
  emailInstitucional!: string;

  @IsDateString()
  dataNascimento!: string;
}

/**
 * DTO para atualizar estagiário
 */
export class EstagiarioUpdateInputDto {
  @IsUUID("4")
  @IsOptional()
  idPerfilFk?: string;

  @IsUUID("4")
  @IsOptional()
  idCursoFk?: string;

  @IsUUID("4")
  @IsOptional()
  idTurmaFk?: string;

  @IsString()
  @Length(1, 15)
  @IsOptional()
  telefone?: string;

  @IsEmail()
  @IsNotEmpty()
  emailInstitucional!: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: string;
}

/**
 * DTO para buscar estagiário por ID
 */
export class EstagiarioFindOneInputDto {
  id!: string;
}

/**
 * DTO para listar estagiários
 */
export class EstagiarioListInputDto {
  page?: number;
  limit?: number;
  search?: string;
  filterIdPerfilFk?: string[];
  filterIdCursoFk?: string[];
  filterIdTurmaFk?: string[];
}

/**
 * DTO para output de estagiário
 */
export class EstagiarioFindOneOutputDto {
  id!: string;
  idPerfilFk!: string;
  idCursoFk!: string;
  idTurmaFk!: string;
  telefone!: string;
  emailInstitucional!: string | null;
  dataNascimento!: string;
  ativo!: boolean;
  dateCreated!: string;
  dateUpdated!: string;
}

/**
 * DTO para listar múltiplos estagiários
 */
export class EstagiarioListOutputDto {
  data!: EstagiarioFindOneOutputDto[];
  total!: number;
  page!: number;
  limit!: number;
}
