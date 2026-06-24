import { EstagiarioFindOneOutputRestDto } from "@/modules/estagio/estagiario/presentation.rest/estagiario.rest.dto";
import { EstagioFindOneOutputRestDto } from "@/modules/estagio/estagio/presentation.rest/estagio.rest.dto";
import { ApiProperty, ApiSchema } from "@/shared/presentation/rest";

// ============================================================================
// Item — par (estagiario, estagios[])
// ============================================================================

@ApiSchema({ name: "TurmaEstagiarioItemOutputDto" })
export class TurmaEstagiarioItemOutputRestDto {
  @ApiProperty({
    description: "Dados completos do estagiário",
    type: () => EstagiarioFindOneOutputRestDto,
  })
  estagiario: EstagiarioFindOneOutputRestDto;

  @ApiProperty({
    description:
      "Estágios associados ao estagiário. Array vazio quando não há estágio cadastrado. " +
      "Múltiplos itens representam o histórico completo (estágios encerrados, rescindidos, em andamento, etc.)",
    type: () => [EstagioFindOneOutputRestDto],
  })
  estagios: EstagioFindOneOutputRestDto[];
}

// ============================================================================
// Output da rota GET /turmas/:id/estagiarios
// ============================================================================

@ApiSchema({ name: "TurmaListEstagiariosOutputDto" })
export class TurmaListEstagiariosOutputRestDto {
  @ApiProperty({
    description: "Lista de estagiários da turma com seus respectivos estágios",
    type: () => [TurmaEstagiarioItemOutputRestDto],
  })
  items: TurmaEstagiarioItemOutputRestDto[];
}
