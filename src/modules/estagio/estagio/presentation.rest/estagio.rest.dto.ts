import { SharedFields } from "@/domain/abstractions";
import { EstagioCreateCommandFields } from "@/modules/estagio/estagio/domain/commands/estagio-create.command";
import { EstagioUpdateCommandFields } from "@/modules/estagio/estagio/domain/commands/estagio-update.command";
import { EstagioStatusValues } from "@/modules/estagio/estagio/domain/estagio.fields";
import {
  EstagioCreateSchema,
  EstagioUpdateSchema,
} from "@/modules/estagio/estagio/domain/estagio.schemas";
import { HorarioEstagioFields } from "@/modules/estagio/estagio/domain/horario-estagio.fields";
import { EstagioFindOneQueryResultFields } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.result";
import { EstagioFindOneInputSchema } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.schemas";
import { EstagioListQueryFields } from "@/modules/estagio/estagio/domain/queries/estagio-list.query";
import { EstagioPaginationInputSchema } from "@/modules/estagio/estagio/domain/queries/estagio-list.query.schemas";
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiSchema,
  TransformToArray,
} from "@/shared/presentation/rest";
import { PaginatedFilterByIdRestDto, UuidParamRestDto } from "@/shared/presentation/rest/dtos";

@ApiSchema({ name: "EstagioEmpresaRefInputDto" })
export class EstagioEmpresaRefInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.empresa.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioCampusRefInputDto" })
export class EstagioCampusRefInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.campus.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioCursoRefInputDto" })
export class EstagioCursoRefInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.CursoReferencia.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioEstagiarioRefInputDto" })
export class EstagioEstagiarioRefInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.estagiario.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioUsuarioOrientadorRefInputDto" })
export class EstagioUsuarioOrientadorRefInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.usuarioOrientador.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "HorarioEstagioInputDto" })
export class HorarioEstagioInputRestDto {
  @ApiProperty(HorarioEstagioFields.diaSemana.swaggerMetadata)
  diaSemana!: number;

  @ApiPropertyOptional(HorarioEstagioFields.horaInicio.swaggerMetadata)
  horaInicio?: string | null;

  @ApiPropertyOptional(HorarioEstagioFields.horaFim.swaggerMetadata)
  horaFim?: string | null;
}

@ApiSchema({ name: "HorarioEstagioOutputDto" })
export class HorarioEstagioOutputRestDto extends HorarioEstagioInputRestDto {
  @ApiProperty(HorarioEstagioFields.id.swaggerMetadata)
  id!: string;
}

@ApiSchema({ name: "EstagioCreateInputDto" })
export class EstagioCreateInputRestDto {
  static schema = EstagioCreateSchema.presentation;

  @ApiPropertyOptional(EstagioCreateCommandFields.campus.swaggerMetadata)
  campus?: EstagioCampusRefInputRestDto;

  @ApiProperty(EstagioCreateCommandFields.empresa.swaggerMetadata)
  empresa!: EstagioEmpresaRefInputRestDto;

  @ApiPropertyOptional({
    ...EstagioCreateCommandFields.estagiario.swaggerMetadata,
    type: () => EstagioEstagiarioRefInputRestDto,
  })
  estagiario?: EstagioEstagiarioRefInputRestDto | null;

  @ApiPropertyOptional({
    ...EstagioCreateCommandFields.usuarioOrientador.swaggerMetadata,
    type: () => EstagioUsuarioOrientadorRefInputRestDto,
  })
  usuarioOrientador?: EstagioUsuarioOrientadorRefInputRestDto | null;

  @ApiProperty(EstagioCreateCommandFields.cargaHoraria.swaggerMetadata)
  cargaHoraria!: number;

  @ApiPropertyOptional(EstagioCreateCommandFields.CursoReferencia.swaggerMetadata)
  CursoReferencia?: EstagioCursoRefInputRestDto | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.dataInicio.swaggerMetadata)
  dataInicio?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.dataFim.swaggerMetadata)
  dataFim?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.status.swaggerMetadata)
  status?: string;

  @ApiPropertyOptional(EstagioCreateCommandFields.nomeSupervisor.swaggerMetadata)
  nomeSupervisor?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.emailSupervisor.swaggerMetadata)
  emailSupervisor?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.telefoneSupervisor.swaggerMetadata)
  telefoneSupervisor?: string | null;

  @ApiPropertyOptional(EstagioCreateCommandFields.aditivo.swaggerMetadata)
  aditivo?: boolean;

  @ApiPropertyOptional(EstagioCreateCommandFields.tipoAditivo.swaggerMetadata)
  tipoAditivo?: string | null;

  @ApiPropertyOptional({
    ...EstagioCreateCommandFields.horariosEstagio.swaggerMetadata,
    type: () => [HorarioEstagioInputRestDto],
  })
  horariosEstagio?: HorarioEstagioInputRestDto[] | null;
}

@ApiSchema({ name: "EstagioUpdateInputDto" })
export class EstagioUpdateInputRestDto {
  static schema = EstagioUpdateSchema.presentation;

  @ApiPropertyOptional(EstagioUpdateCommandFields.campus.swaggerMetadata)
  campus?: EstagioCampusRefInputRestDto;

  @ApiPropertyOptional(EstagioUpdateCommandFields.empresa.swaggerMetadata)
  empresa?: EstagioEmpresaRefInputRestDto;

  @ApiPropertyOptional({
    ...EstagioUpdateCommandFields.estagiario.swaggerMetadata,
    type: () => EstagioEstagiarioRefInputRestDto,
  })
  estagiario?: EstagioEstagiarioRefInputRestDto | null;

  @ApiPropertyOptional({
    ...EstagioUpdateCommandFields.usuarioOrientador.swaggerMetadata,
    type: () => EstagioUsuarioOrientadorRefInputRestDto,
  })
  usuarioOrientador?: EstagioUsuarioOrientadorRefInputRestDto | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.cargaHoraria.swaggerMetadata)
  cargaHoraria?: number;

  @ApiPropertyOptional(EstagioUpdateCommandFields.CursoReferencia.swaggerMetadata)
  CursoReferencia?: EstagioCursoRefInputRestDto | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.dataInicio.swaggerMetadata)
  dataInicio?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.dataFim.swaggerMetadata)
  dataFim?: string | null;

  @ApiPropertyOptional({
    ...EstagioUpdateCommandFields.status.swaggerMetadata,
    enum: EstagioStatusValues,
  })
  status?: string;

  @ApiPropertyOptional(EstagioUpdateCommandFields.nomeSupervisor.swaggerMetadata)
  nomeSupervisor?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.emailSupervisor.swaggerMetadata)
  emailSupervisor?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.telefoneSupervisor.swaggerMetadata)
  telefoneSupervisor?: string | null;

  @ApiPropertyOptional(EstagioUpdateCommandFields.aditivo.swaggerMetadata)
  aditivo?: boolean;

  @ApiPropertyOptional(EstagioUpdateCommandFields.tipoAditivo.swaggerMetadata)
  tipoAditivo?: string | null;

  @ApiPropertyOptional({
    ...EstagioUpdateCommandFields.horariosEstagio.swaggerMetadata,
    type: () => [HorarioEstagioInputRestDto],
  })
  horariosEstagio?: HorarioEstagioInputRestDto[] | null;
}

@ApiSchema({ name: "EstagioFindOneInputDto" })
export class EstagioFindOneInputRestDto extends UuidParamRestDto {
  static schema = EstagioFindOneInputSchema;
}

@ApiSchema({ name: "EstagioListInputDto" })
export class EstagioListInputRestDto extends PaginatedFilterByIdRestDto {
  static schema = EstagioPaginationInputSchema;

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterCampusId.swaggerMetadata)
  "filter.campus.id"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEmpresaId.swaggerMetadata)
  "filter.empresa.id"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEmpresaCnpj.swaggerMetadata)
  "filter.empresa.cnpj"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEmpresaRazaoSocial.swaggerMetadata)
  "filter.empresa.razaoSocial"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEmpresaNomeFantasia.swaggerMetadata)
  "filter.empresa.nomeFantasia"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEstagiarioId.swaggerMetadata)
  "filter.estagiario.id"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEstagiarioMatricula.swaggerMetadata)
  "filter.estagiario.matricula"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEstagiarioMatricula.swaggerMetadata)
  "filter.estagiario.perfil.usuario.matricula"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEstagiarioNome.swaggerMetadata)
  "filter.estagiario.nome"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEstagiarioNome.swaggerMetadata)
  "filter.estagiario.perfil.usuario.nome"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEstagiarioCursoId.swaggerMetadata)
  "filter.estagiario.curso.id"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterStatus.swaggerMetadata)
  "filter.status"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterNomeSupervisor.swaggerMetadata)
  "filter.nomeSupervisor"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterEmailSupervisor.swaggerMetadata)
  "filter.emailSupervisor"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterCursoReferenciaId.swaggerMetadata)
  "filter.CursoReferencia.id"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterUsuarioOrientadorId.swaggerMetadata)
  "filter.usuarioOrientador.id"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterUsuarioOrientadorMatricula.swaggerMetadata)
  "filter.usuarioOrientador.matricula"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterUsuarioOrientadorNome.swaggerMetadata)
  "filter.usuarioOrientador.nome"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterDataInicio.swaggerMetadata)
  "filter.dataInicio"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterDataFim.swaggerMetadata)
  "filter.dataFim"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterAditivo.swaggerMetadata)
  "filter.aditivo"?: string[];

  @TransformToArray()
  @ApiPropertyOptional(EstagioListQueryFields.filterStatus.swaggerMetadata)
  status?: string[];

  @ApiPropertyOptional({
    description: "Filtro para listar apenas vagas disponíveis (sem estagiário vinculado)",
    type: Boolean,
  })
  disponivel?: boolean | string;

  @TransformToArray()
  @ApiPropertyOptional({
    description: "Filtro por ID do curso de referência",
    type: [String],
  })
  "filter.curso.id"?: string[];

  @TransformToArray()
  @ApiPropertyOptional({
    description: "Filtro por ID do curso de referência",
    type: [String],
  })
  cursoId?: string[];
}

@ApiSchema({ name: "EstagioFindOneOutputDto" })
export class EstagioFindOneOutputRestDto {
  @ApiProperty(EstagioFindOneQueryResultFields.id.swaggerMetadata)
  id!: string;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.campus.swaggerMetadata)
  campus!: { id: string } | null;

  @ApiProperty(EstagioFindOneQueryResultFields.empresa.swaggerMetadata)
  empresa!: { id: string };

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.estagiario.swaggerMetadata)
  estagiario!: { id: string } | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.CursoReferencia.swaggerMetadata)
  CursoReferencia!: { id: string } | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.usuarioOrientador.swaggerMetadata)
  usuarioOrientador!: { id: string } | null;

  @ApiProperty(EstagioFindOneQueryResultFields.cargaHoraria.swaggerMetadata)
  cargaHoraria!: number;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.dataInicio.swaggerMetadata)
  dataInicio!: string | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.dataFim.swaggerMetadata)
  dataFim!: string | null;

  @ApiProperty(EstagioFindOneQueryResultFields.status.swaggerMetadata)
  status!: string;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.nomeSupervisor.swaggerMetadata)
  nomeSupervisor!: string | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.emailSupervisor.swaggerMetadata)
  emailSupervisor!: string | null;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.telefoneSupervisor.swaggerMetadata)
  telefoneSupervisor!: string | null;

  @ApiProperty(EstagioFindOneQueryResultFields.aditivo.swaggerMetadata)
  aditivo!: boolean;

  @ApiPropertyOptional(EstagioFindOneQueryResultFields.tipoAditivo.swaggerMetadata)
  tipoAditivo!: string | null;

  @ApiProperty({
    ...EstagioFindOneQueryResultFields.horariosEstagio.swaggerMetadata,
    type: () => [HorarioEstagioOutputRestDto],
  })
  horariosEstagio!: HorarioEstagioOutputRestDto[];

  @ApiProperty(EstagioFindOneQueryResultFields.ativo.swaggerMetadata)
  ativo!: boolean;

  @ApiProperty(EstagioFindOneQueryResultFields.dateCreated.swaggerMetadata)
  dateCreated!: string;

  @ApiProperty(EstagioFindOneQueryResultFields.dateUpdated.swaggerMetadata)
  dateUpdated!: string;
}

@ApiSchema({ name: "EstagioListOutputDto" })
export class EstagioListOutputRestDto {
  @ApiProperty({
    ...SharedFields.data.swaggerMetadata,
    type: () => [EstagioFindOneOutputRestDto],
  })
  data!: EstagioFindOneOutputRestDto[];

  @ApiProperty({ type: "number", description: "Total de itens" })
  total!: number;

  @ApiProperty(SharedFields.page.swaggerMetadata)
  page!: number;

  @ApiProperty(SharedFields.limit.swaggerMetadata)
  limit!: number;
}

@ApiSchema({ name: "EstagioImportJobOutputDto" })
export class EstagioImportJobOutputRestDto {
  @ApiProperty()
  message!: string;
}

@ApiSchema({ name: "EstagioSolicitarInputDto" })
export class EstagioSolicitarInputRestDto {
  @ApiProperty(EstagioCreateCommandFields.empresa.swaggerMetadata)
  razaoSocial!: string;

  @ApiProperty(EstagioCreateCommandFields.empresa.swaggerMetadata)
  nomeFantasia!: string;

  @ApiProperty({ type: "string", description: "CNPJ da empresa (com ou sem pontuação)" })
  cnpj!: string;

  @ApiProperty({ type: "string", description: "Telefone da empresa" })
  telefone!: string;

  @ApiProperty({ type: "string", description: "Email da empresa" })
  email!: string;

  @ApiProperty({
    type: "object",
    properties: { id: { type: "string", format: "uuid" } },
    description: "Referência ao endereço da empresa",
  })
  endereco!: { id: string };
}

@ApiSchema({ name: "EstagioCargaHorariaOutputDto" })
export class EstagioCargaHorariaOutputRestDto {
  @ApiProperty({ description: "ID do estágio", format: "uuid" })
  id!: string;

  @ApiProperty({
    description: "Carga horária total exigida/prevista em contrato (horas)",
    example: 300,
  })
  cargaHorariaPrevista!: number;

  @ApiProperty({
    description: "Total de horas registradas/submetidas em folhas de ponto não canceladas",
    example: 120.5,
  })
  cargaHorariaRegistrada!: number;

  @ApiProperty({
    description: "Total de horas comprovadas em folhas de ponto aprovadas (status APPROVED)",
    example: 100.5,
  })
  cargaHorariaComprovada!: number;

  @ApiProperty({
    description: "Total de horas pendentes de aprovação pelo supervisor/orientador",
    example: 20,
  })
  cargaHorariaPendente!: number;

  @ApiProperty({ description: "Total de horas rejeitadas", example: 0 })
  cargaHorariaRejeitada!: number;

  @ApiProperty({
    description: "Saldo de horas restantes para conclusão do estágio",
    example: 199.5,
  })
  cargaHorariaRestante!: number;

  @ApiProperty({
    description: "Percentual concluído da carga horária (0 a 100%)",
    example: 33.5,
  })
  percentualConcluido!: number;

  @ApiProperty({
    description: "Situação do progresso de carga horária do estágio",
    example: "EM_ANDAMENTO",
  })
  situacao!: string;

  @ApiProperty({ description: "Quantidade total de folhas de ponto submetidas", example: 25 })
  totalRegistros!: number;

  @ApiProperty({ description: "Quantidade de folhas de ponto aprovadas", example: 20 })
  totalAprovados!: number;

  @ApiProperty({ description: "Quantidade de folhas de ponto pendentes", example: 5 })
  totalPendentes!: number;

  @ApiProperty({ description: "Quantidade de folhas de ponto rejeitadas", example: 0 })
  totalRejeitados!: number;
}
