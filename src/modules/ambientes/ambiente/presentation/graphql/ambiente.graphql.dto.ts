import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
} from "@/modules/@shared/presentation/graphql";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from "@/modules/@shared/presentation/shared";
import { BlocoFindOneOutputGraphQlDto } from "@/modules/ambientes/bloco/presentation/graphql/bloco.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/modules/armazenamento/imagem-arquivo/presentation/graphql/imagem-arquivo.graphql.dto";
import { AmbienteFieldsMixin } from "../ambiente.validation-mixin";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("AmbienteFindOneOutputDto")
export class AmbienteFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => String) nome: string;
  @Field(() => String, { nullable: true }) descricao: string | null;
  @Field(() => String) codigo: string;
  @Field(() => Int, { nullable: true }) capacidade: number | null;
  @Field(() => String, { nullable: true }) tipo: string | null;
  @Field(() => BlocoFindOneOutputGraphQlDto) bloco: BlocoFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Ref Input
// ============================================================================

@InputType("AmbienteRefInputDto")
export class AmbienteRefInputGraphQlDto {
  @Field(() => String) @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("AmbienteCreateInputDto")
export class AmbienteCreateInputGraphQlDto extends AmbienteFieldsMixin {
  @Field(() => String) declare nome: string;
  @Field(() => String, { nullable: true }) declare descricao?: string | null;
  @Field(() => String) declare codigo: string;
  @Field(() => Int, { nullable: true }) declare capacidade?: number | null;
  @Field(() => String, { nullable: true }) declare tipo?: string | null;
  @Field(() => AmbienteRefInputGraphQlDto)
  @ValidateNested()
  bloco: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("AmbienteUpdateInputDto")
export class AmbienteUpdateInputGraphQlDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nome?: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  descricao?: string | null;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  codigo?: string;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  capacidade?: number | null;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  tipo?: string | null;
  @Field(() => AmbienteRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  bloco?: AmbienteRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class AmbienteListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  @Field(() => [String], { nullable: true, description: "Filtro por ID do Bloco" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterBlocoId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus do Bloco" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterBlocoCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("AmbienteListResult")
export class AmbienteListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [AmbienteFindOneOutputGraphQlDto])
  data: AmbienteFindOneOutputGraphQlDto[];
}
