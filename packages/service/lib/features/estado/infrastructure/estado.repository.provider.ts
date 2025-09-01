import { Provider } from "@nestjs/common";
import { DataSource, SelectQueryBuilder } from "typeorm";
import { EstadoFindOneByIdOutputDto, EstadoListInputDto, EstadoListOutputDto, EstadoListSettings } from "@/features/estado/application";
import { ESTADO_REPOSITORY, IEstadoRepositoryPort } from "@/features/estado/application/ports";
import { EstadoDatabaseEntity } from "@/features/estado/infrastructure/typeorm/estado.database-entity";
import { APP_DATA_SOURCE_TOKEN } from "@/infrastructure-antigo/integrations/database/typeorm/providers/app-data-source.provider";
import { IFilterRuleGroup, ListSettings } from "@/shared";

const projectPathToQuery = (query: SelectQueryBuilder<any>, path: string) => `${query.alias}.${path}`;

export const EstadoRepositoryProvider: Provider = {
  provide: ESTADO_REPOSITORY,

  inject: [APP_DATA_SOURCE_TOKEN],
  useFactory: (dataSource: DataSource): IEstadoRepositoryPort => {
    const estadoRepository = dataSource.getRepository(EstadoDatabaseEntity);

    return {
      findById(id: number, selection?: string[]): Promise<EstadoFindOneByIdOutputDto | null> {
        const query = estadoRepository.createQueryBuilder("estado");
        query.andWhere("estado.id = :id", { id });

        const consideredSelection = selection && selection.length > 0 ? selection : ["id"];
        query.select(consideredSelection.map((path) => projectPathToQuery(query, path)));

        return query.getOne();
      },

      list: async (allowedFilters: boolean | IFilterRuleGroup, inputDto: EstadoListInputDto, selection?: string[]): Promise<EstadoListOutputDto> => {
        const listSettings: ListSettings = EstadoListSettings;

        const query = estadoRepository.createQueryBuilder("estado");

        if (typeof allowedFilters === "boolean") {
          query.andWhere(allowedFilters ? "TRUE" : "FALSE");
        } else {
          // TODO
        }

        const consideredSelection = selection && selection.length > 0 ? selection : ["id"];
        query.select(consideredSelection.map((path) => projectPathToQuery(query, path)));

        const consideredSortBy = inputDto.sortBy && inputDto.sortBy.length > 0 ? inputDto.sortBy : listSettings.sortBy.defaultSortBy;
        const allowedSortBy = consideredSortBy.filter((sortByRule) => listSettings.sortBy.allowedColumns.includes(sortByRule.property));

        if (allowedSortBy && allowedSortBy.length > 0) {
          for (const sortByRule of allowedSortBy) {
            query.orderBy(projectPathToQuery(query, sortByRule.property), sortByRule.order);
          }
        }

        const totalItems = await query.getCount();
        const totalPages = Math.ceil(totalItems / inputDto.limit);

        const paginatedQuery = query.clone();
        paginatedQuery.offset((inputDto.page - 1) * inputDto.limit);
        paginatedQuery.limit(inputDto.limit);
        const items = await paginatedQuery.getMany();

        return {
          data: [...items],
          meta: {
            currentPage: inputDto.page,
            search: inputDto.search,
            itemsPerPage: inputDto.limit,
            totalItems,
            totalPages,
          },
        };
      },
    };
  },
};
