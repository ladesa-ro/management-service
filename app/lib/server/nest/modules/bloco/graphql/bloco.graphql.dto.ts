import { ArgsType, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import {
  EntityBaseGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/modules/@shared/infrastructure/graphql/dtos";
import { CampusFindOneOutputGraphQlDto } from "@/server/nest/modules/campus/graphql/campus.graphql.dto";
import { ImagemFindOneOutputGraphQlDto } from "@/server/nest/modules/imagem-arquivo/graphql/imagem-arquivo.graphql.dto";

// ============================================================================
// FindOne Output
// ============================================================================

@ObjectType("BlocoFindOneOutputDto")
export class BlocoFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field() nome: string;
  @Field() codigo: string;
  @Field(() => CampusFindOneOutputGraphQlDto) campus: CampusFindOneOutputGraphQlDto;
  @Field(() => ImagemFindOneOutputGraphQlDto, { nullable: true })
  imagemCapa: ImagemFindOneOutputGraphQlDto | null;
}

// ============================================================================
// Object UUID Ref Input
// ============================================================================

@InputType("ObjectUuidRefInputDto")
export class ObjectUuidRefInputGraphQlDto {
  @Field() @IsString() id: string;
}

// ============================================================================
// Create Input
// ============================================================================

@InputType("BlocoCreateInputDto")
export class BlocoCreateInputGraphQlDto {
  @Field() @IsString() @MinLength(1) nome: string;
  @Field() @IsString() @MinLength(1) codigo: string;
  @Field(() => ObjectUuidRefInputGraphQlDto)
  @ValidateNested()
  campus: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// Update Input
// ============================================================================

@InputType("BlocoUpdateInputDto")
export class BlocoUpdateInputGraphQlDto {
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) nome?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(1) codigo?: string;
  @Field(() => ObjectUuidRefInputGraphQlDto, { nullable: true })
  @IsOptional()
  @ValidateNested()
  campus?: ObjectUuidRefInputGraphQlDto;
}

// ============================================================================
// List Input (GraphQL-compatible - no dots in field names)
// ============================================================================

@ArgsType()
export class BlocoListInputGraphQlDto {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sortBy?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterId?: string[];

  @Field(() => [String], { nullable: true, description: "Filtro por ID do Campus" })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  filterCampusId?: string[];
}

// ============================================================================
// List Output
// ============================================================================

@ObjectType("BlocoListResult")
export class BlocoListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [BlocoFindOneOutputGraphQlDto])
  data: BlocoFindOneOutputGraphQlDto[];
}
