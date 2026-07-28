import { ApiProperty, ApiPropertyOptional, ApiSchema, TransformToArray } from "@/shared/presentation/rest";
import { PaginatedFilterByIdRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import type { FolhaPontoCreateCommand } from "../domain/commands/folha-ponto-create.command";
import { FolhaPontoStatus } from "../domain/folha-ponto";
import { FolhaPontoFields } from "../domain/folha-ponto.fields";
import type { FolhaPontoFindOneQueryResult } from "../domain/queries";
import { FolhaPontoListQuery } from "../domain/queries";

// ==========================================
// DTOs de Entrada (Inputs/Args)
// ==========================================

export class FolhaPontoEstagioRefInputRestDto {
  @ApiProperty({ description: "Referência ao estágio (id)" })
  id!: string;
}

@ApiSchema({ name: "FolhaPontoCreateInputRestDto" })
export class FolhaPontoCreateInputRestDto implements FolhaPontoCreateCommand {
  @ApiProperty({ type: () => FolhaPontoEstagioRefInputRestDto, description: "Referência ao estágio" })
  estagio!: FolhaPontoEstagioRefInputRestDto;

  @ApiProperty(FolhaPontoFields.data.swaggerMetadata)
  data!: string;

  @ApiProperty(FolhaPontoFields.horaInicio.swaggerMetadata)
  horaInicio!: string;

  @ApiProperty(FolhaPontoFields.horaFim.swaggerMetadata)
  horaFim!: string;

  @ApiPropertyOptional(FolhaPontoFields.observacoes.swaggerMetadata)
  observacoes?: string | null;
}

@ApiSchema({ name: "FolhaPontoFindOneParamsRestDto" })
export class FolhaPontoFindOneParamsRestDto {
  @ApiProperty({ description: "ID da Folha de Ponto" })
  id!: string;
}

@ApiSchema({ name: "FolhaPontoListInputRestDto" })
export class FolhaPontoListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({ description: "Filtrar por status", isArray: true })
  @TransformToArray()
  "filter.status"?: string[];

  @ApiPropertyOptional({ description: "Filtrar por estágio", isArray: true })
  @TransformToArray()
  "filter.estagio.id"?: string[];
}

// ==========================================
// DTOs de Saída (Resultados)
// ==========================================

export class FolhaPontoEstagioRefRestDto {
  @ApiProperty({ description: "ID do Estágio" })
  id!: string;
}

@ApiSchema({ name: "FolhaPontoFindOneOutputRestDto" })
export class FolhaPontoFindOneOutputRestDto {
  @ApiProperty({ description: "ID da Folha de Ponto" })
  id!: string;

  @ApiProperty({ type: () => FolhaPontoEstagioRefRestDto, description: "Referência ao estágio" })
  estagio!: FolhaPontoEstagioRefRestDto;

  @ApiProperty(FolhaPontoFields.data.swaggerMetadata)
  data!: string;

  @ApiProperty(FolhaPontoFields.horaInicio.swaggerMetadata)
  horaInicio!: string;

  @ApiProperty(FolhaPontoFields.horaFim.swaggerMetadata)
  horaFim!: string;

  @ApiProperty({ ...FolhaPontoFields.quantidadeHoras.swaggerMetadata, type: "number" })
  quantidadeHoras!: number;

  @ApiPropertyOptional(FolhaPontoFields.observacoes.swaggerMetadata)
  observacoes!: string | null;

  @ApiProperty({ ...FolhaPontoFields.status.swaggerMetadata, type: "string" })
  status!: FolhaPontoStatus;

  @ApiProperty({ ...FolhaPontoFields.dataSolicitacao.swaggerMetadata, type: "string" })
  dataSolicitacao!: string;

  @ApiPropertyOptional({ ...FolhaPontoFields.dataAprovacao.swaggerMetadata, type: "string" })
  dataAprovacao!: string | null;

  @ApiPropertyOptional({ ...FolhaPontoFields.dataRejeicao.swaggerMetadata, type: "string" })
  dataRejeicao!: string | null;
}

@ApiSchema({ name: "FolhaPontoListOutputRestDto" })
export class FolhaPontoListOutputRestDto {
  @ApiProperty({ type: () => [FolhaPontoFindOneOutputRestDto] })
  data!: FolhaPontoFindOneOutputRestDto[];

  @ApiProperty({ type: () => PaginationMetaRestDto })
  meta!: PaginationMetaRestDto;
}
