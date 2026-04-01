import { SharedFields } from "@/domain/abstractions";
import { UsuarioEventoFields } from "@/modules/acesso/usuario/domain/usuario-evento.fields";
import { ApiProperty, ApiPropertyOptional, ApiSchema } from "@/shared/presentation/rest";

@ApiSchema({ name: "UsuarioEventoParentParamsDto" })
export class UsuarioEventoParentParamsRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;
}

@ApiSchema({ name: "UsuarioEventoItemParamsDto" })
export class UsuarioEventoItemParamsRestDto {
  @ApiProperty(SharedFields.idUuid.swaggerMetadata)
  id: string;

  @ApiProperty({ ...SharedFields.idUuid.swaggerMetadata, description: "ID do evento" })
  eventoId: string;
}

@ApiSchema({ name: "UsuarioEventoCreateInputDto" })
export class UsuarioEventoCreateInputRestDto {
  @ApiProperty(UsuarioEventoFields.nome.swaggerMetadata)
  nome: string;

  @ApiProperty(UsuarioEventoFields.dataInicio.swaggerMetadata)
  dataInicio: string;

  @ApiPropertyOptional(UsuarioEventoFields.dataFim.swaggerMetadata)
  dataFim?: string;

  @ApiProperty(UsuarioEventoFields.diaInteiro.swaggerMetadata)
  diaInteiro: boolean;

  @ApiPropertyOptional(UsuarioEventoFields.horarioInicio.swaggerMetadata)
  horarioInicio?: string;

  @ApiPropertyOptional(UsuarioEventoFields.horarioFim.swaggerMetadata)
  horarioFim?: string;

  @ApiPropertyOptional(UsuarioEventoFields.cor.swaggerMetadata)
  cor?: string;

  @ApiPropertyOptional(UsuarioEventoFields.repeticao.swaggerMetadata)
  repeticao?: string;

  @ApiPropertyOptional(UsuarioEventoFields.tipo.swaggerMetadata)
  tipo?: string;
}

@ApiSchema({ name: "UsuarioEventoUpdateInputDto" })
export class UsuarioEventoUpdateInputRestDto {
  @ApiPropertyOptional(UsuarioEventoFields.nome.swaggerMetadata) nome?: string;
  @ApiPropertyOptional(UsuarioEventoFields.dataInicio.swaggerMetadata) dataInicio?: string;
  @ApiPropertyOptional(UsuarioEventoFields.dataFim.swaggerMetadata) dataFim?: string;
  @ApiPropertyOptional(UsuarioEventoFields.diaInteiro.swaggerMetadata) diaInteiro?: boolean;
  @ApiPropertyOptional(UsuarioEventoFields.horarioInicio.swaggerMetadata) horarioInicio?: string;
  @ApiPropertyOptional(UsuarioEventoFields.horarioFim.swaggerMetadata) horarioFim?: string;
  @ApiPropertyOptional(UsuarioEventoFields.cor.swaggerMetadata) cor?: string;
  @ApiPropertyOptional(UsuarioEventoFields.repeticao.swaggerMetadata) repeticao?: string;
}

@ApiSchema({ name: "UsuarioEventoFindOneOutputDto" })
export class UsuarioEventoFindOneOutputRestDto {
  @ApiProperty(UsuarioEventoFields.id.swaggerMetadata) id: string;
  @ApiPropertyOptional(UsuarioEventoFields.nome.swaggerMetadata) nome: string | null;
  @ApiProperty(UsuarioEventoFields.tipo.swaggerMetadata) tipo: string;
  @ApiProperty(UsuarioEventoFields.dataInicio.swaggerMetadata) dataInicio: string;
  @ApiPropertyOptional(UsuarioEventoFields.dataFim.swaggerMetadata) dataFim: string | null;
  @ApiProperty(UsuarioEventoFields.diaInteiro.swaggerMetadata) diaInteiro: boolean;
  @ApiProperty(UsuarioEventoFields.horarioInicio.swaggerMetadata) horarioInicio: string;
  @ApiProperty(UsuarioEventoFields.horarioFim.swaggerMetadata) horarioFim: string;
  @ApiPropertyOptional(UsuarioEventoFields.cor.swaggerMetadata) cor: string | null;
  @ApiPropertyOptional(UsuarioEventoFields.repeticao.swaggerMetadata) repeticao: string | null;
  @ApiPropertyOptional(UsuarioEventoFields.status.swaggerMetadata) status: string | null;
}

@ApiSchema({ name: "UsuarioEventoListOutputDto" })
export class UsuarioEventoListOutputRestDto {
  @ApiProperty({
    type: () => [UsuarioEventoFindOneOutputRestDto],
    ...SharedFields.data.swaggerMetadata,
  })
  data: UsuarioEventoFindOneOutputRestDto[];
}
