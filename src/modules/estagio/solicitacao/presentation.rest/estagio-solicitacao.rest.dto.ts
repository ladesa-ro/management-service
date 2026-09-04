import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ApiSchema } from "@/shared/presentation/rest";
import { PaginationInputRestDto } from "@/shared/presentation/rest/dtos";
import {
  EstagioSolicitacaoFields,
  EstagioSolicitacaoSituacaoValues,
  EstagioSolicitacaoTipoValues,
} from "../domain/estagio-solicitacao.fields";
import {
  EstagioSolicitacaoDeferirSchema,
  EstagioSolicitacaoExternoCreateSchema,
  EstagioSolicitacaoIndeferirSchema,
  EstagioSolicitacaoInternoCreateSchema,
} from "../domain/estagio-solicitacao.schemas";

@ApiSchema({ name: "EstagioSolicitacaoInternoCreateDto" })
export class EstagioSolicitacaoInternoCreateRestDto {
  static schema = EstagioSolicitacaoInternoCreateSchema.presentation;

  @ApiProperty({ description: "Professor conselheiro / orientador institucional" })
  professorConselheiro!: { id: string };

  @ApiProperty({
    description: "Local ou setor dentro do campus onde o estágio será realizado",
    example: "Laboratório de Redes e Manutenção",
  })
  local!: string;

  @ApiProperty({
    description: "Descrição sucinta do plano de atividades do estágio",
    example: "Apoio no suporte técnico aos laboratórios e manutenção de computadores.",
  })
  descricao!: string;
}

@ApiSchema({ name: "EmpresaSolicitacaoDadosDto" })
export class EmpresaSolicitacaoDadosDto {
  @ApiProperty({ description: "Razão social da empresa", example: "Acme Corp LTDA" })
  razaoSocial!: string;

  @ApiPropertyOptional({ description: "Nome fantasia", example: "Acme Tecnologia" })
  nomeFantasia?: string | null;

  @ApiProperty({ description: "CNPJ da empresa concedente", example: "12345678000195" })
  cnpj!: string;

  @ApiPropertyOptional({ description: "E-mail de contato da empresa", example: "contato@acme.com" })
  email?: string | null;

  @ApiPropertyOptional({ description: "Telefone de contato", example: "69999999999" })
  telefone?: string | null;
}

@ApiSchema({ name: "SupervisorSolicitacaoDadosDto" })
export class SupervisorSolicitacaoDadosDto {
  @ApiProperty({ description: "Nome do supervisor indicado", example: "Carlos Silva" })
  nome!: string;

  @ApiPropertyOptional({ description: "E-mail do supervisor", example: "carlos@acme.com" })
  email?: string | null;

  @ApiPropertyOptional({ description: "Telefone do supervisor", example: "69988888888" })
  telefone?: string | null;
}

@ApiSchema({ name: "EstagioSolicitacaoExternoCreateDto" })
export class EstagioSolicitacaoExternoCreateRestDto {
  static schema = EstagioSolicitacaoExternoCreateSchema.presentation;

  @ApiProperty({ type: () => EmpresaSolicitacaoDadosDto })
  empresa!: EmpresaSolicitacaoDadosDto;

  @ApiProperty({ type: () => SupervisorSolicitacaoDadosDto })
  supervisor!: SupervisorSolicitacaoDadosDto;
}

@ApiSchema({ name: "EstagioSolicitacaoDeferirDto" })
export class EstagioSolicitacaoDeferirRestDto {
  static schema = EstagioSolicitacaoDeferirSchema.presentation;

  @ApiPropertyOptional({
    description: "ID de uma empresa previamente cadastrada (opcional)",
    format: "uuid",
  })
  empresaId?: string;

  @ApiPropertyOptional({
    description: "ID de um endereço para cadastro da empresa (opcional)",
    format: "uuid",
  })
  empresaEnderecoId?: string;

  @ApiPropertyOptional({
    description: "Parecer descritivo da aprovação do CIEC",
    example: "Solicitação aprovada em conformidade com o regulamento de estágio.",
  })
  parecer?: string | null;

  @ApiPropertyOptional({
    description: "Carga horária semanal a ser configurada no estágio gerado",
    example: 30,
    default: 30,
  })
  cargaHoraria?: number;

  @ApiPropertyOptional({
    description: "Data de início do estágio (AAAA-MM-DD)",
    example: "2026-03-10",
  })
  dataInicio?: string;

  @ApiPropertyOptional({
    description: "Data prevista de término do estágio (AAAA-MM-DD)",
    example: "2026-09-10",
  })
  dataPrevistaFim?: string;
}

@ApiSchema({ name: "EstagioSolicitacaoIndeferirDto" })
export class EstagioSolicitacaoIndeferirRestDto {
  static schema = EstagioSolicitacaoIndeferirSchema.presentation;

  @ApiProperty({
    description: "Parecer descritivo obrigatório contendo a justificativa do indeferimento",
    example: "Documentação da empresa concedente inconsistente e plano incompatível com o curso.",
  })
  parecer!: string;
}

@ApiSchema({ name: "EstagioSolicitacaoListInputDto" })
export class EstagioSolicitacaoListInputRestDto extends PaginationInputRestDto {
  @ApiPropertyOptional({
    description: "Filtro por situação da solicitação",
    enum: EstagioSolicitacaoSituacaoValues,
  })
  "filter.situacao"?: string;

  @ApiPropertyOptional({
    description: "Filtro por tipo de estágio",
    enum: EstagioSolicitacaoTipoValues,
  })
  "filter.tipo"?: string;

  @ApiPropertyOptional({
    description: "Filtro por campus (UUID)",
  })
  "filter.campusId"?: string;
}

@ApiSchema({ name: "EstagioSolicitacaoOutputDto" })
export class EstagioSolicitacaoOutputRestDto {
  @ApiProperty(EstagioSolicitacaoFields.id.swaggerMetadata)
  id!: string;

  @ApiProperty(EstagioSolicitacaoFields.tipo.swaggerMetadata)
  tipo!: string;

  @ApiProperty(EstagioSolicitacaoFields.situacao.swaggerMetadata)
  situacao!: string;

  @ApiProperty({ description: "Referência do estagiário solicitante" })
  estagiario!: { id: string };

  @ApiProperty({ description: "Campus da solicitação" })
  campus!: { id: string };

  @ApiPropertyOptional({ description: "Professor orientador indicado (estágio interno)" })
  professorOrientador?: { id: string } | null;

  @ApiPropertyOptional({ description: "Local interno onde as atividades ocorrerão" })
  localInterno?: string | null;

  @ApiPropertyOptional({ description: "Descrição das atividades" })
  descricaoAtividades?: string | null;

  @ApiPropertyOptional({ description: "Empresa vinculada ou gerada" })
  empresa?: { id: string } | null;

  @ApiPropertyOptional({ description: "Razão social da concedente externa" })
  empresaRazaoSocial?: string | null;

  @ApiPropertyOptional({ description: "Nome fantasia da concedente externa" })
  empresaNomeFantasia?: string | null;

  @ApiPropertyOptional({ description: "CNPJ da concedente externa" })
  empresaCnpj?: string | null;

  @ApiPropertyOptional({ description: "Telefone da empresa" })
  empresaTelefone?: string | null;

  @ApiPropertyOptional({ description: "E-mail da empresa" })
  empresaEmail?: string | null;

  @ApiPropertyOptional({ description: "Nome do supervisor indicado" })
  supervisorNome?: string | null;

  @ApiPropertyOptional({ description: "E-mail do supervisor indicado" })
  supervisorEmail?: string | null;

  @ApiPropertyOptional({ description: "Telefone do supervisor indicado" })
  supervisorTelefone?: string | null;

  @ApiPropertyOptional({ description: "Servidor analista do CIEC" })
  analista?: { id: string } | null;

  @ApiPropertyOptional({ description: "Parecer da análise do CIEC" })
  parecerAnalise?: string | null;

  @ApiPropertyOptional({ description: "Data de conclusão da análise" })
  dataAnalise?: string | null;

  @ApiPropertyOptional({ description: "Estágio criado oficialmente após aprovação" })
  estagioGerado?: { id: string } | null;

  @ApiProperty({ description: "Data de envio da solicitação" })
  dateCreated!: string;
}
