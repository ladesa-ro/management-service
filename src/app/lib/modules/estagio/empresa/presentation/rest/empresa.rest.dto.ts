import { ApiProperty, ApiPropertyOptional, ApiSchema, PartialType } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsUUID, Length, MinLength } from "class-validator";
import {
  PaginationInputRestDto,
  UuidParamRestDto,
} from "@/modules/@shared/infrastructure/presentation/rest/dtos";

@ApiSchema({ name: "EmpresaCreateInputDto" })
export class EmpresaCreateInputRestDto {
  @ApiProperty({ type: "string", description: "Razão social da empresa", minLength: 1 })
  @IsString()
  @MinLength(1)
  razaoSocial!: string;

  @ApiProperty({ type: "string", description: "Nome fantasia da empresa", minLength: 1 })
  @IsString()
  @MinLength(1)
  nomeFantasia!: string;

  @ApiProperty({ type: "string", description: "CNPJ sem pontuação", minLength: 14, maxLength: 14 })
  @IsString()
  @Length(14, 14)
  cnpj!: string;

  @ApiProperty({ type: "string", description: "Telefone da empresa", minLength: 1, maxLength: 15 })
  @IsString()
  @Length(1, 15)
  telefone!: string;

  @ApiProperty({ type: "string", description: "E-mail da empresa" })
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: "string",
    format: "uuid",
    description: "ID do endereço vinculado à empresa",
  })
  @IsUUID("4")
  idEnderecoFk!: string;
}

@ApiSchema({ name: "EmpresaUpdateInputDto" })
export class EmpresaUpdateInputRestDto extends PartialType(EmpresaCreateInputRestDto) {}

@ApiSchema({ name: "EmpresaFindOneInputDto" })
export class EmpresaFindOneInputRestDto extends UuidParamRestDto {}

@ApiSchema({ name: "EmpresaListInputDto" })
export class EmpresaListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    type: "string",
    description: "Filtro por CNPJ (array)",
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  "filter.cnpj"?: string[];

  @ApiPropertyOptional({
    type: "string",
    format: "uuid",
    description: "Filtro por ID de endereço (array)",
    isArray: true,
  })
  @IsOptional()
  @IsUUID(undefined, { each: true })
  "filter.idEnderecoFk"?: string[];
}

@ApiSchema({ name: "EmpresaFindOneOutputDto" })
export class EmpresaFindOneOutputRestDto {
  @ApiProperty({ type: "string", format: "uuid" })
  id!: string;

  @ApiProperty({ type: "string" })
  razaoSocial!: string;

  @ApiProperty({ type: "string" })
  nomeFantasia!: string;

  @ApiProperty({ type: "string", minLength: 14, maxLength: 14 })
  cnpj!: string;

  @ApiProperty({ type: "string" })
  telefone!: string;

  @ApiProperty({ type: "string" })
  email!: string;

  @ApiProperty({ type: "string", format: "uuid" })
  idEnderecoFk!: string;

  @ApiProperty({ type: "boolean" })
  ativo!: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  dateCreated!: string;

  @ApiProperty({ type: "string", format: "date-time" })
  dateUpdated!: string;
}

@ApiSchema({ name: "EmpresaListOutputDto" })
export class EmpresaListOutputRestDto {
  @ApiProperty({ type: () => [EmpresaFindOneOutputRestDto] })
  data!: EmpresaFindOneOutputRestDto[];

  @ApiProperty({ type: "number" })
  total!: number;

  @ApiProperty({ type: "number" })
  page!: number;

  @ApiProperty({ type: "number" })
  limit!: number;
}
