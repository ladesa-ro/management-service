import { IsEmail, IsOptional, IsString, Length, MinLength, IsUUID } from "class-validator";

/**
 * DTO para criar empresa
 */
export class EmpresaCreateInputDto {
  @IsString()
  @MinLength(1)
  razaoSocial!: string;

  @IsString()
  @MinLength(1)
  nomeFantasia!: string;

  @IsString()
  @Length(14, 14)
  cnpj!: string;

  @IsString()
  @Length(1, 15)
  telefone!: string;

  @IsEmail()
  email!: string;

  @IsUUID("4")
  idEnderecoFk!: string;
}

/**
 * DTO para atualizar empresa
 */
export class EmpresaUpdateInputDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  razaoSocial?: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  nomeFantasia?: string;

  @IsString()
  @Length(14, 14)
  @IsOptional()
  cnpj?: string;

  @IsString()
  @Length(1, 15)
  @IsOptional()
  telefone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUUID("4")
  @IsOptional()
  idEnderecoFk?: string;
}

/**
 * DTO para buscar empresa por ID
 */
export class EmpresaFindOneInputDto {
  id!: string;
}

/**
 * DTO para listar empresas
 */
export class EmpresaListInputDto {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * DTO para output de empresa
 */
export class EmpresaFindOneOutputDto {
  id!: string;
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  telefone!: string;
  email!: string;
  idEnderecoFk!: string;
  ativo!: boolean;
  dateCreated!: string;
  dateUpdated!: string;
}

/**
 * DTO para listar múltiplas empresas
 */
export class EmpresaListOutputDto {
  data!: EmpresaFindOneOutputDto[];
  total!: number;
  page!: number;
  limit!: number;
}
