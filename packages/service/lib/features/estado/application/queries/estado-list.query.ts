import {
  EstadoListInputDto,
  EstadoListInputSchema,
  EstadoListOutputDto,
  EstadoListOutputSchema
} from "@/features/estado/application/dtos";
import type { IEstadoAuthorizationPort, IEstadoRepositoryPort } from "@/features/estado/application/ports";
import { BaseQuery, getAllowedSelectionFromSchema } from "@/shared-novo";

export class EstadoListQuery extends BaseQuery {
  static meta = {
    operationId: "EstadoList",
    summary: "Listagem de estados",
    description: `Lista os estados cadastrados no sistema, permitindo filtrar por nome e data de criação, ordenar por nome ou data de criação, e pesquisar pelo nome do estado. Os resultados são paginados e tem campos específicos selecionados para retorno.`,
    responseSchemaFactory: () => EstadoListOutputSchema,
  };

  constructor(private readonly estadoRepository: IEstadoRepositoryPort) {
    super();
  }

  public async execute(authorization: IEstadoAuthorizationPort, inputDto: EstadoListInputDto): Promise<EstadoListOutputDto> {
    const selection = getAllowedSelectionFromSchema(EstadoListInputSchema, inputDto.selection);
    const readFilters = await authorization.getReadFilters();
    return this.estadoRepository.list(readFilters, inputDto, selection);
  }
}
