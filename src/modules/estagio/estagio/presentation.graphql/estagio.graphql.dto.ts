import {
  EntityBaseGraphQlDto,
  PaginatedFilterByIdGraphQlDto,
  PaginationMetaGraphQlDto,
} from "@/infrastructure.graphql/dtos";
import { EstagioCreateCommandFields } from "@/modules/estagio/estagio/domain/commands/estagio-create.command";
import { EstagioUpdateCommandFields } from "@/modules/estagio/estagio/domain/commands/estagio-update.command";
import { EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import {
  EstagioCreateSchema,
  EstagioUpdateSchema,
} from "@/modules/estagio/estagio/domain/estagio.schemas";
import { EstagioFindOneQueryResultFields } from "@/modules/estagio/estagio/domain/queries/estagio-find-one.query.result";
import { EstagioListQueryFields } from "@/modules/estagio/estagio/domain/queries/estagio-list.query";
import { EstagioPaginationInputSchema } from "@/modules/estagio/estagio/domain/queries/estagio-list.query.schemas";
import { ArgsType, Field, InputType, Int, ObjectType } from "@/shared/presentation/graphql";

@ObjectType("HorarioEstagioOutputDto")
export class HorarioEstagioOutputGraphQlDto {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  diaSemana: number;

  @Field(() => String, { nullable: true })
  horaInicio: string | null;

  @Field(() => String, { nullable: true })
  horaFim: string | null;
}

@InputType("HorarioEstagioInputDto")
export class HorarioEstagioInputGraphQlDto {
  @Field(() => Int)
  diaSemana: number;

  @Field(() => String, { nullable: true })
  horaInicio?: string | null;

  @Field(() => String, { nullable: true })
  horaFim?: string | null;
}

@ObjectType("EstagioCampusRefDto")
export class EstagioCampusRefGraphQlDto {
  @Field(() => String)
  id: string;
}

@InputType("EstagioCampusRefInputDto")
export class EstagioCampusRefInputGraphQlDto {
  @Field(() => String)
  id: string;
}

@ObjectType("EstagioEmpresaRefDto")
export class EstagioEmpresaRefGraphQlDto {
  @Field(() => String)
  id: string;
}

@InputType("EstagioEmpresaRefInputDto")
export class EstagioEmpresaRefInputGraphQlDto {
  @Field(() => String)
  id: string;
}

@ObjectType("EstagioEstagiarioRefDto")
export class EstagioEstagiarioRefGraphQlDto {
  @Field(() => String)
  id: string;
}

@InputType("EstagioEstagiarioRefInputDto")
export class EstagioEstagiarioRefInputGraphQlDto {
  @Field(() => String)
  id: string;
}

@ObjectType("EstagioUsuarioOrientadorRefDto")
export class EstagioUsuarioOrientadorRefGraphQlDto {
  @Field(() => String)
  id: string;
}

@InputType("EstagioUsuarioOrientadorRefInputDto")
export class EstagioUsuarioOrientadorRefInputGraphQlDto {
  @Field(() => String)
  id: string;
}

@ObjectType("EstagioCursoRefDto")
export class EstagioCursoRefGraphQlDto {
  @Field(() => String)
  id: string;
}

@InputType("EstagioCursoRefInputDto")
export class EstagioCursoRefInputGraphQlDto {
  @Field(() => String)
  id: string;
}

@ObjectType("EstagioFindOneOutputDto")
export class EstagioFindOneOutputGraphQlDto extends EntityBaseGraphQlDto {
  @Field(() => EstagioCampusRefGraphQlDto, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.campus.gqlMetadata,
  })
  campus: EstagioCampusRefGraphQlDto | null;

  @Field(() => EstagioEmpresaRefGraphQlDto, EstagioFindOneQueryResultFields.empresa.gqlMetadata)
  empresa: EstagioEmpresaRefGraphQlDto;

  @Field(() => EstagioEstagiarioRefGraphQlDto, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.estagiario.gqlMetadata,
  })
  estagiario: EstagioEstagiarioRefGraphQlDto | null;

  @Field(() => EstagioUsuarioOrientadorRefGraphQlDto, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.usuarioOrientador.gqlMetadata,
  })
  usuarioOrientador: EstagioUsuarioOrientadorRefGraphQlDto | null;

  @Field(() => EstagioCursoRefGraphQlDto, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.CursoReferencia.gqlMetadata,
  })
  CursoReferencia: EstagioCursoRefGraphQlDto | null;

  @Field(() => Int, EstagioFindOneQueryResultFields.cargaHoraria.gqlMetadata)
  cargaHoraria: number;

  @Field(() => String, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.dataInicio.gqlMetadata,
  })
  dataInicio: string | null;

  @Field(() => String, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.dataFim.gqlMetadata,
  })
  dataFim: string | null;

  @Field(() => String, EstagioFindOneQueryResultFields.status.gqlMetadata)
  status: string;

  @Field(() => String, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.nomeSupervisor.gqlMetadata,
  })
  nomeSupervisor: string | null;

  @Field(() => String, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.emailSupervisor.gqlMetadata,
  })
  emailSupervisor: string | null;

  @Field(() => String, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.telefoneSupervisor.gqlMetadata,
  })
  telefoneSupervisor: string | null;

  @Field(() => Boolean, EstagioFindOneQueryResultFields.aditivo.gqlMetadata)
  aditivo: boolean;

  @Field(() => String, {
    nullable: true,
    ...EstagioFindOneQueryResultFields.tipoAditivo.gqlMetadata,
  })
  tipoAditivo: string | null;

  @Field(
    () => [HorarioEstagioOutputGraphQlDto],
    EstagioFindOneQueryResultFields.horariosEstagio.gqlMetadata,
  )
  horariosEstagio: HorarioEstagioOutputGraphQlDto[];

  @Field(() => Boolean, EstagioFindOneQueryResultFields.ativo.gqlMetadata)
  ativo: boolean;
}

@InputType("EstagioCreateInputDto")
export class EstagioCreateInputGraphQlDto {
  static schema = EstagioCreateSchema.domain;

  @Field(() => EstagioCampusRefInputGraphQlDto, {
    nullable: true,
    ...EstagioCreateCommandFields.campus.gqlMetadata,
  })
  campus?: EstagioCampusRefInputGraphQlDto;

  @Field(() => EstagioEmpresaRefInputGraphQlDto, EstagioCreateCommandFields.empresa.gqlMetadata)
  empresa: EstagioEmpresaRefInputGraphQlDto;

  @Field(() => EstagioEstagiarioRefInputGraphQlDto, {
    nullable: true,
    ...EstagioCreateCommandFields.estagiario.gqlMetadata,
  })
  estagiario?: EstagioEstagiarioRefInputGraphQlDto;

  @Field(() => EstagioUsuarioOrientadorRefInputGraphQlDto, {
    nullable: true,
    ...EstagioCreateCommandFields.usuarioOrientador.gqlMetadata,
  })
  usuarioOrientador?: EstagioUsuarioOrientadorRefInputGraphQlDto;

  @Field(() => EstagioCursoRefInputGraphQlDto, {
    nullable: true,
    ...EstagioCreateCommandFields.CursoReferencia.gqlMetadata,
  })
  CursoReferencia?: EstagioCursoRefInputGraphQlDto | null;

  @Field(() => Int, EstagioCreateCommandFields.cargaHoraria.gqlMetadata)
  cargaHoraria: number;

  @Field(() => String, { nullable: true, ...EstagioCreateCommandFields.dataInicio.gqlMetadata })
  dataInicio?: string;

  @Field(() => String, { nullable: true, ...EstagioCreateCommandFields.dataFim.gqlMetadata })
  dataFim?: string | null;

  @Field(() => String, { nullable: true, ...EstagioCreateCommandFields.status.gqlMetadata })
  status?: EstagioStatus;

  @Field(() => String, { nullable: true, ...EstagioCreateCommandFields.nomeSupervisor.gqlMetadata })
  nomeSupervisor?: string;

  @Field(() => String, {
    nullable: true,
    ...EstagioCreateCommandFields.emailSupervisor.gqlMetadata,
  })
  emailSupervisor?: string;

  @Field(() => String, {
    nullable: true,
    ...EstagioCreateCommandFields.telefoneSupervisor.gqlMetadata,
  })
  telefoneSupervisor?: string;

  @Field(() => Boolean, { nullable: true, ...EstagioCreateCommandFields.aditivo.gqlMetadata })
  aditivo?: boolean;

  @Field(() => String, { nullable: true, ...EstagioCreateCommandFields.tipoAditivo.gqlMetadata })
  tipoAditivo?: string;

  @Field(() => [HorarioEstagioInputGraphQlDto], {
    nullable: true,
    ...EstagioCreateCommandFields.horariosEstagio.gqlMetadata,
  })
  horariosEstagio?: HorarioEstagioInputGraphQlDto[] | null;
}

@InputType("EstagioUpdateInputDto")
export class EstagioUpdateInputGraphQlDto {
  static schema = EstagioUpdateSchema.domain;

  @Field(() => EstagioCampusRefInputGraphQlDto, {
    nullable: true,
    ...EstagioUpdateCommandFields.campus.gqlMetadata,
  })
  campus?: EstagioCampusRefInputGraphQlDto;

  @Field(() => EstagioEmpresaRefInputGraphQlDto, {
    nullable: true,
    ...EstagioUpdateCommandFields.empresa.gqlMetadata,
  })
  empresa?: EstagioEmpresaRefInputGraphQlDto;

  @Field(() => EstagioEstagiarioRefInputGraphQlDto, {
    nullable: true,
    ...EstagioUpdateCommandFields.estagiario.gqlMetadata,
  })
  estagiario?: EstagioEstagiarioRefInputGraphQlDto;

  @Field(() => EstagioUsuarioOrientadorRefInputGraphQlDto, {
    nullable: true,
    ...EstagioUpdateCommandFields.usuarioOrientador.gqlMetadata,
  })
  usuarioOrientador?: EstagioUsuarioOrientadorRefInputGraphQlDto;

  @Field(() => EstagioCursoRefInputGraphQlDto, {
    nullable: true,
    ...EstagioUpdateCommandFields.CursoReferencia.gqlMetadata,
  })
  CursoReferencia?: EstagioCursoRefInputGraphQlDto | null;

  @Field(() => Int, { nullable: true, ...EstagioUpdateCommandFields.cargaHoraria.gqlMetadata })
  cargaHoraria?: number;

  @Field(() => String, { nullable: true, ...EstagioUpdateCommandFields.dataInicio.gqlMetadata })
  dataInicio?: string;

  @Field(() => String, { nullable: true, ...EstagioUpdateCommandFields.dataFim.gqlMetadata })
  dataFim?: string | null;

  @Field(() => String, { nullable: true, ...EstagioUpdateCommandFields.status.gqlMetadata })
  status?: EstagioStatus;

  @Field(() => String, { nullable: true, ...EstagioUpdateCommandFields.nomeSupervisor.gqlMetadata })
  nomeSupervisor?: string;

  @Field(() => String, {
    nullable: true,
    ...EstagioUpdateCommandFields.emailSupervisor.gqlMetadata,
  })
  emailSupervisor?: string;

  @Field(() => String, {
    nullable: true,
    ...EstagioUpdateCommandFields.telefoneSupervisor.gqlMetadata,
  })
  telefoneSupervisor?: string;

  @Field(() => Boolean, { nullable: true, ...EstagioUpdateCommandFields.aditivo.gqlMetadata })
  aditivo?: boolean;

  @Field(() => String, { nullable: true, ...EstagioUpdateCommandFields.tipoAditivo.gqlMetadata })
  tipoAditivo?: string;

  @Field(() => [HorarioEstagioInputGraphQlDto], {
    nullable: true,
    ...EstagioUpdateCommandFields.horariosEstagio.gqlMetadata,
  })
  horariosEstagio?: HorarioEstagioInputGraphQlDto[] | null;
}

@ArgsType()
export class EstagioListInputGraphQlDto extends PaginatedFilterByIdGraphQlDto {
  static schema = EstagioPaginationInputSchema;

  @Field(() => [String], EstagioListQueryFields.filterEmpresaId.gqlMetadata)
  filterEmpresaId?: string[];

  @Field(() => [String], EstagioListQueryFields.filterEstagiarioId.gqlMetadata)
  filterEstagiarioId?: string[];

  @Field(() => [String], EstagioListQueryFields.filterStatus.gqlMetadata)
  filterStatus?: string[];
}

@ObjectType("EstagioListResult")
export class EstagioListOutputGraphQlDto {
  @Field(() => PaginationMetaGraphQlDto, EstagioListQueryFields.meta.gqlMetadata)
  meta: PaginationMetaGraphQlDto;

  @Field(() => [EstagioFindOneOutputGraphQlDto], EstagioListQueryFields.data.gqlMetadata)
  data: EstagioFindOneOutputGraphQlDto[];
}
