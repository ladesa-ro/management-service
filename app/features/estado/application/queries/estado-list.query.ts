import { BaseApplicationQuery, FilterRuleOperator, type ListSettingsEntity, SortByMode } from "../../../../shared";
import type { EstadoListInputDto, EstadoListOutputDto } from "../dtos";
import type { IEstadoAuthorizationPort, IEstadoRepositoryPort } from "../ports";

export const EstadoListSettings = {
  resource: {
    labels: {
      singular: "Estado",
      plural: "Estados",
    },
  },
  sortBy: {
    allowedColumns: ["id", "nome"],
    defaultSortBy: [{ property: "nome", order: SortByMode.ASC }],
  },
  filters: {
    allowedFilters: [["nome", [FilterRuleOperator.EQ]]],
  },
  searchableColumns: ["nome"],
} satisfies ListSettingsEntity;

export class EstadoListQuery extends BaseApplicationQuery {
  constructor(private readonly estadoRepository: IEstadoRepositoryPort) {
    super();
  }

  async execute(estadoAuthorization: IEstadoAuthorizationPort, input: EstadoListInputDto): Promise<EstadoListOutputDto> {
    const readFilters = await estadoAuthorization.getReadFilters();

    const selection = undefined;

    const output = await this.estadoRepository.list(readFilters, input, selection);

    return output;
  }
}
