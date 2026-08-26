import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import { PaginatedFilterByIdRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";

// ==========================================
// DTOs de Entrada (Inputs/Args)
// ==========================================

export class RelatorioEstagioRefInputRestDto {
  @ApiProperty({ description: "Referência ao estágio (id)" })
  id!: string;
}

export class RelatorioArquivoRefInputRestDto {
  @ApiProperty({ description: "Referência ao arquivo (id)" })
  id!: string;
}

@ApiSchema({ name: "RelatorioCreateInputRestDto" })
export class RelatorioCreateInputRestDto {
  @ApiProperty({
    type: () => RelatorioEstagioRefInputRestDto,
    description: "Referência ao estágio",
  })
  estagio!: RelatorioEstagioRefInputRestDto;

  @ApiPropertyOptional({
    type: () => RelatorioArquivoRefInputRestDto,
    description: "Referência ao arquivo PDF",
  })
  arquivo?: RelatorioArquivoRefInputRestDto | null;

  @ApiPropertyOptional({
    description: "Conteúdo do formulário em JSON",
    type: Object,
  })
  conteudoJson?: Record<string, any> | null;
}

@ApiSchema({ name: "RelatorioUpdateInputRestDto" })
export class RelatorioUpdateInputRestDto {
  @ApiPropertyOptional({
    type: () => RelatorioArquivoRefInputRestDto,
    description: "Referência ao arquivo PDF",
  })
  arquivo?: RelatorioArquivoRefInputRestDto | null;

  @ApiPropertyOptional({
    description: "Conteúdo do formulário em JSON",
    type: Object,
  })
  conteudoJson?: Record<string, any> | null;
}

@ApiSchema({ name: "RelatorioFindOneParamsRestDto" })
export class RelatorioFindOneParamsRestDto {
  @ApiProperty({ description: "ID do Relatório de Estágio" })
  id!: string;
}

@ApiSchema({ name: "EstagioRelatorioParamsRestDto" })
export class EstagioRelatorioParamsRestDto {
  @ApiProperty({ description: "ID do Estágio" })
  id!: string;
}

@ApiSchema({ name: "RelatorioListInputRestDto" })
export class RelatorioListInputRestDto extends PaginatedFilterByIdRestDto {
  @ApiPropertyOptional({ description: "Filtrar por estágio", isArray: true })
  @TransformToArray()
  "filter.estagio.id"?: string[];
}

// ==========================================
// DTOs de Saída (Resultados)
// ==========================================

export class RelatorioEstagioRefRestDto {
  @ApiProperty({ description: "ID do Estágio" })
  id!: string;
}

export class RelatorioArquivoRefRestDto {
  @ApiProperty({ description: "ID do Arquivo" })
  id!: string;

  @ApiPropertyOptional({ description: "Nome do arquivo" })
  name?: string | null;

  @ApiPropertyOptional({ description: "MIME type do arquivo" })
  mimeType?: string | null;

  @ApiPropertyOptional({ description: "Tamanho em bytes" })
  sizeBytes?: number | null;
}

@ApiSchema({ name: "RelatorioFindOneOutputRestDto" })
export class RelatorioFindOneOutputRestDto {
  @ApiProperty({ description: "ID do Relatório de Estágio" })
  id!: string;

  @ApiProperty({ type: () => RelatorioEstagioRefRestDto, description: "Referência ao estágio" })
  estagio!: RelatorioEstagioRefRestDto;

  @ApiPropertyOptional({
    type: () => RelatorioArquivoRefRestDto,
    description: "Referência ao arquivo PDF do relatório",
  })
  arquivo?: RelatorioArquivoRefRestDto | null;

  @ApiPropertyOptional({
    description: "Conteúdo do relatório em formato JSON",
    type: Object,
  })
  conteudoJson!: Record<string, any> | null;

  @ApiProperty({ description: "Data de criação" })
  dateCreated!: string;

  @ApiProperty({ description: "Data de atualização" })
  dateUpdated!: string;

  @ApiPropertyOptional({ description: "Data de exclusão" })
  dateDeleted!: string | null;
}

@ApiSchema({ name: "RelatorioListOutputRestDto" })
export class RelatorioListOutputRestDto {
  @ApiProperty({ type: () => [RelatorioFindOneOutputRestDto] })
  data!: RelatorioFindOneOutputRestDto[];

  @ApiProperty({ type: () => PaginationMetaRestDto })
  meta!: PaginationMetaRestDto;
}
