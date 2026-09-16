import { z } from "zod";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import { PaginatedFilterByIdRestDto, PaginationMetaRestDto } from "@/shared/presentation/rest/dtos";
import {
  coerceFilterArray,
  createPaginationInputSchema,
  findOneUuidInputSchema,
  uuidSchema,
} from "@/shared/validation/schemas";

import type { FolhaPontoCreateCommand } from "../domain/commands/folha-ponto-create.command";
import { FolhaPontoStatus } from "../domain/folha-ponto";
import { FolhaPontoFields } from "../domain/folha-ponto.fields";

// ==========================================
// DTOs de Entrada (Inputs/Args)
// ==========================================

@ApiSchema({ name: "FolhaPontoEstagioRefInputDto" })
export class FolhaPontoEstagioRefInputRestDto {
  @ApiProperty({
    description: "ID do estágio ao qual a folha de ponto pertence (UUID)",
    format: "uuid",
    example: "018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b",
  })
  id!: string;
}

@ApiSchema({ name: "FolhaPontoCreateInputRestDto" })
export class FolhaPontoCreateInputRestDto implements FolhaPontoCreateCommand {
  @ApiProperty({
    type: () => FolhaPontoEstagioRefInputRestDto,
    description: "Referência ao estágio",
  })
  estagio!: FolhaPontoEstagioRefInputRestDto;

  @ApiProperty({
    ...FolhaPontoFields.data.swaggerMetadata,
    description: "Data do registro de ponto (YYYY-MM-DD)",
    example: "2026-03-10",
  })
  data!: string;

  @ApiProperty({
    ...FolhaPontoFields.horaInicio.swaggerMetadata,
    description: "Hora de início do turno no formato HH:MM",
    example: "08:00",
  })
  horaInicio!: string;

  @ApiProperty({
    ...FolhaPontoFields.horaFim.swaggerMetadata,
    description: "Hora de término do turno no formato HH:MM",
    example: "12:00",
  })
  horaFim!: string;

  @ApiPropertyOptional({
    ...FolhaPontoFields.observacoes.swaggerMetadata,
    description: "Observações opcionais do estagiário sobre o turno de trabalho",
    example: "Desenvolvimento do módulo de relatórios e atendimento ao suporte.",
  })
  observacoes?: string | null;
}

@ApiSchema({ name: "FolhaPontoFindOneParamsRestDto" })
export class FolhaPontoFindOneParamsRestDto {
  static schema = findOneUuidInputSchema;

  @ApiProperty({
    description: "ID da Folha de Ponto (UUID)",
    format: "uuid",
    example: "018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b",
  })
  id!: string;
}

export const folhaPontoListInputSchema = createPaginationInputSchema({
  "filter.status": coerceFilterArray(z.string()),
  "filter.data": coerceFilterArray(z.string()),
  "filter.estagio.id": coerceFilterArray(uuidSchema),
  "filter.estagio.empresa.id": coerceFilterArray(uuidSchema),
  "filter.empresa.id": coerceFilterArray(uuidSchema),
  "filter.estagio.estagiario.id": coerceFilterArray(uuidSchema),
  "filter.estagiario.id": coerceFilterArray(uuidSchema),
  "filter.estagio.estagiario.perfil.usuario.matricula": coerceFilterArray(z.string()),
  "filter.matricula": coerceFilterArray(z.string()),
  "filter.estagio.estagiario.perfil.usuario.nome": coerceFilterArray(z.string()),
  "filter.nome": coerceFilterArray(z.string()),
});

@ApiSchema({ name: "FolhaPontoListInputDto" })
export class FolhaPontoListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = folhaPontoListInputSchema;

  @ApiPropertyOptional({
    description: "Filtrar por status da folha de ponto",
    enum: ["PENDING", "APPROVED", "REJECTED", "EXPIRED", "CANCELLED"],
    isArray: true,
    example: ["PENDING", "APPROVED"],
  })
  @TransformToArray()
  "filter.status"?: string[];

  @ApiPropertyOptional({
    description: "Filtrar por data específica da folha de ponto (YYYY-MM-DD)",
    isArray: true,
    example: ["2026-03-10"],
  })
  @TransformToArray()
  "filter.data"?: string[];

  @ApiPropertyOptional({
    description: "Filtrar por ID do estágio (UUID)",
    isArray: true,
    example: ["018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b"],
  })
  @TransformToArray()
  "filter.estagio.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtrar por ID da empresa concedente do estágio (UUID)",
    isArray: true,
    example: ["018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b"],
  })
  @TransformToArray()
  "filter.estagio.empresa.id"?: string[];

  @ApiPropertyOptional({
    description: "Alias para filtrar por ID da empresa (UUID)",
    isArray: true,
    example: ["018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b"],
  })
  @TransformToArray()
  "filter.empresa.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtrar por ID do perfil do estagiário (UUID)",
    isArray: true,
    example: ["018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b"],
  })
  @TransformToArray()
  "filter.estagio.estagiario.id"?: string[];

  @ApiPropertyOptional({
    description: "Alias para filtrar por ID do estagiário (UUID)",
    isArray: true,
    example: ["018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b"],
  })
  @TransformToArray()
  "filter.estagiario.id"?: string[];

  @ApiPropertyOptional({
    description: "Filtrar por matrícula do estagiário",
    isArray: true,
    example: ["2024101001"],
  })
  @TransformToArray()
  "filter.estagio.estagiario.perfil.usuario.matricula"?: string[];

  @ApiPropertyOptional({
    description: "Alias para filtrar por matrícula do estagiário",
    isArray: true,
    example: ["2024101001"],
  })
  @TransformToArray()
  "filter.matricula"?: string[];

  @ApiPropertyOptional({
    description: "Filtrar por nome do estagiário",
    isArray: true,
    example: ["João da Silva"],
  })
  @TransformToArray()
  "filter.estagio.estagiario.perfil.usuario.nome"?: string[];

  @ApiPropertyOptional({
    description: "Alias para filtrar por nome do estagiário",
    isArray: true,
    example: ["João da Silva"],
  })
  @TransformToArray()
  "filter.nome"?: string[];
}

// ==========================================
// DTOs de Saída (Resultados)
// ==========================================

@ApiSchema({ name: "FolhaPontoEstagioRefOutputDto" })
export class FolhaPontoEstagioRefRestDto {
  @ApiProperty({
    description: "ID do Estágio (UUID)",
    format: "uuid",
    example: "018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b",
  })
  id!: string;
}

@ApiSchema({ name: "FolhaPontoFindOneOutputRestDto" })
export class FolhaPontoFindOneOutputRestDto {
  @ApiProperty({
    description: "ID da Folha de Ponto (UUID)",
    format: "uuid",
    example: "018f3a2b-c4d5-7e8f-9a0b-1c2d3e4f5a6b",
  })
  id!: string;

  @ApiProperty({ type: () => FolhaPontoEstagioRefRestDto, description: "Referência ao estágio" })
  estagio!: FolhaPontoEstagioRefRestDto;

  @ApiProperty({
    ...FolhaPontoFields.data.swaggerMetadata,
    description: "Data do registro de ponto (YYYY-MM-DD)",
    example: "2026-03-10",
  })
  data!: string;

  @ApiProperty({
    ...FolhaPontoFields.horaInicio.swaggerMetadata,
    description: "Hora de início do turno (HH:MM)",
    example: "08:00",
  })
  horaInicio!: string;

  @ApiProperty({
    ...FolhaPontoFields.horaFim.swaggerMetadata,
    description: "Hora de fim do turno (HH:MM)",
    example: "12:00",
  })
  horaFim!: string;

  @ApiProperty({
    ...FolhaPontoFields.quantidadeHoras.swaggerMetadata,
    description: "Total de horas calculadas no dia (decimal, ex: 4.0)",
    type: "number",
    example: 4.0,
  })
  quantidadeHoras!: number;

  @ApiPropertyOptional({
    ...FolhaPontoFields.observacoes.swaggerMetadata,
    description: "Observações opcionais do estagiário",
    example: "Atendimento técnico e configuração de equipamentos.",
  })
  observacoes!: string | null;

  @ApiProperty({
    ...FolhaPontoFields.status.swaggerMetadata,
    description: "Status atual da folha de ponto",
    enum: FolhaPontoStatus,
    example: "PENDING",
  })
  status!: FolhaPontoStatus;

  @ApiProperty({
    ...FolhaPontoFields.dataSolicitacao.swaggerMetadata,
    description: "Data e hora em que a folha de ponto foi registrada (ISO 8601)",
    example: "2026-03-10T12:05:00.000Z",
  })
  dataSolicitacao!: string;

  @ApiPropertyOptional({
    ...FolhaPontoFields.dataAprovacao.swaggerMetadata,
    description: "Data e hora em que o supervisor aprovou a folha de ponto (ISO 8601)",
    example: "2026-03-10T14:30:00.000Z",
  })
  dataAprovacao!: string | null;

  @ApiPropertyOptional({
    ...FolhaPontoFields.dataRejeicao.swaggerMetadata,
    description: "Data e hora em que o supervisor rejeitou a folha de ponto (ISO 8601)",
    example: null,
  })
  dataRejeicao!: string | null;
}

@ApiSchema({ name: "FolhaPontoListOutputRestDto" })
export class FolhaPontoListOutputRestDto {
  @ApiProperty({ type: () => [FolhaPontoFindOneOutputRestDto] })
  data!: FolhaPontoFindOneOutputRestDto[];

  @ApiProperty({ type: () => PaginationMetaRestDto })
  meta!: PaginationMetaRestDto;
}
