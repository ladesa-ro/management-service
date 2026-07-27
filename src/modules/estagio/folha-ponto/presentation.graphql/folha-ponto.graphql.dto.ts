import { ArgsType, Field, Float, ID, InputType, ObjectType } from "@nestjs/graphql";
import type { IPaginationResult } from "@/application/pagination";
import { EntityBaseGraphQlDto, PaginationMetaGraphQlDto } from "@/infrastructure.graphql/dtos";
import { PaginationInputGraphQlDto } from "@/infrastructure.graphql/dtos/pagination-graphql.dto";
import { FolhaPontoCreateCommand } from "../domain/commands/folha-ponto-create.command";
import { FolhaPontoStatus } from "../domain/folha-ponto";
import { FolhaPontoFields } from "../domain/folha-ponto.fields";
import { FolhaPontoFindOneQueryResult, FolhaPontoListQuery } from "../domain/queries";

// ==========================================
// DTOs de Saída (Resultados)
// ==========================================

@ObjectType("FolhaPontoEstagioRefDto")
export class FolhaPontoEstagioRefGraphQlDto {
  @Field(() => String)
  id!: string;
}

@InputType("FolhaPontoEstagioRefInputDto")
export class FolhaPontoEstagioRefInputGraphQlDto {
  @Field(() => String)
  id!: string;
}

@ObjectType("FolhaPonto")
export class FolhaPontoFindOneOutputGraphQlDto
  extends EntityBaseGraphQlDto
  implements
    Omit<FolhaPontoFindOneQueryResult, "dateCreated" | "dateUpdated" | "dateDeleted" | "status">
{
  @Field(() => FolhaPontoEstagioRefGraphQlDto, { description: "Referência ao estágio (ID)" })
  estagio!: FolhaPontoEstagioRefGraphQlDto;

  @Field(FolhaPontoFields.data.gqlMetadata)
  data!: string;

  @Field(FolhaPontoFields.horaInicio.gqlMetadata)
  horaInicio!: string;

  @Field(FolhaPontoFields.horaFim.gqlMetadata)
  horaFim!: string;

  @Field(() => Float, FolhaPontoFields.quantidadeHoras.gqlMetadata)
  quantidadeHoras!: number;

  @Field(FolhaPontoFields.observacoes.gqlMetadata)
  observacoes!: string | null;

  @Field(() => String, FolhaPontoFields.status.gqlMetadata)
  status!: FolhaPontoStatus;

  @Field(FolhaPontoFields.dataSolicitacao.gqlMetadata)
  dataSolicitacao!: string;

  @Field(FolhaPontoFields.dataAprovacao.gqlMetadata)
  dataAprovacao!: string | null;

  @Field(FolhaPontoFields.dataRejeicao.gqlMetadata)
  dataRejeicao!: string | null;
}

@ObjectType("FolhaPontoPaginated")
export class FolhaPontoListOutputGraphQlDto
  implements IPaginationResult<FolhaPontoFindOneOutputGraphQlDto>
{
  @Field(() => [FolhaPontoFindOneOutputGraphQlDto])
  data!: FolhaPontoFindOneOutputGraphQlDto[];

  @Field(() => PaginationMetaGraphQlDto)
  meta!: IPaginationResult<FolhaPontoFindOneOutputGraphQlDto>["meta"];
}

// ==========================================
// DTOs de Entrada (Inputs/Args)
// ==========================================

@InputType("FolhaPontoCreateInput")
export class FolhaPontoCreateInputGraphQlDto implements FolhaPontoCreateCommand {
  @Field(() => FolhaPontoEstagioRefInputGraphQlDto, { description: "Referência ao estágio (id)" })
  estagio!: FolhaPontoEstagioRefInputGraphQlDto;

  @Field(FolhaPontoFields.data.gqlMetadata)
  data!: string;

  @Field(FolhaPontoFields.horaInicio.gqlMetadata)
  horaInicio!: string;

  @Field(FolhaPontoFields.horaFim.gqlMetadata)
  horaFim!: string;

  @Field(FolhaPontoFields.observacoes.gqlMetadata)
  observacoes?: string | null;
}

@InputType("FolhaPontoListFilterInput")
export class FolhaPontoListFilterInputGraphQlDto {
  @Field(() => [String], { nullable: true })
  status?: FolhaPontoStatus[];

  @Field(() => [ID], { nullable: true })
  estagio?: string[];

  [key: string]: any;
}

@ArgsType()
export class FolhaPontoListInputGraphQlDto
  extends PaginationInputGraphQlDto
  implements FolhaPontoListQuery
{
  @Field(() => FolhaPontoListFilterInputGraphQlDto, { nullable: true })
  filter?: FolhaPontoListFilterInputGraphQlDto;
}
