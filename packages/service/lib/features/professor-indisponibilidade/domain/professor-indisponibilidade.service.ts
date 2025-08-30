import { Injectable, NotFoundException } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { QbEfficientLoad, SearchService } from "@/shared";
import type { IDomain } from "@/shared/tsp/schema/typings";
import { IsNull, Repository } from "typeorm";
// ============================================================================

const aliasIndisponibilidade = "indisponibilidade";

// ============================================================================

@Injectable()
export class ProfessorIndisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private searchService: SearchService,
  ) {}

  get indisponibilidadeRepository() {
    return this.databaseContext.professorIndisponibilidadeRepository;
  }

  async indisponibilidadeFindAll( accessContext: AccessContext, domain: IDomain.ProfessorIndisponibilidadeListInput | null  = null, selection? : string[] | boolean): Promise<IDomain.ProfessorIndisponibilidadeListOutput['success']> {

// =========================================================

    const qb = this.indisponibilidadeRepository.createQueryBuilder(aliasIndisponibilidade);

// =========================================================

    // TODO: conferrir o filtro 
    await accessContext.applyFilter('vinculo:find', qb, aliasIndisponibilidade, null);

// =========================================================

    const paginated = await this.searchService.search(
      qb, 
      {...domain },
      {
        ...paginateConfig,
        select:[
          'id',

          'indisponibilidade_inicio',
          'indisponibilidade_termino',
          'motivo',
          'dateCreated',
        ],
        sortableColumns: [
          'indisponibilidade_inicio',
          'indisponibilidade_termino',
          'motivo',
          'dateCreated',
        ],
        // searchableColumns: [
        //   "id",

        //   "nome",
        //   "matriculaSiape",
        //   "email",
        // ],
        // defaultSortBy: [
        //   ["nome", "ASC"],
        //   ["dateCreated", "ASC"],
        //   ["matriculaSiape", "ASC"],
        // ],
        // filterableColumns: {},
      },
    );
    
    // =========================================================

    return paginated as any;

    return this.indisponibilidadeRepository.find();
  }
 }
