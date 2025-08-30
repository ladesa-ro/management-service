import { Injectable, NotFoundException } from "@nestjs/common";
import { map } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import { QbEfficientLoad, SearchService } from "@/shared";
import type { IDomain } from "@/shared/tsp/schema/typings";
import { IsNull, Repository } from "typeorm";
import { UsuarioService } from "@/features/usuario/domain/usuario.service";
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
// =========================================================

//TODO: Pensar como puxar o perfil do professor
  // const usuarioService = await this.UsuarioService;
  // const usuario = await this.


// =========================================================

  async indisponibilidadeFindAll( accessContext: AccessContext, domain: IDomain.ProfessorIndisponibilidadeListInput | null  = null, selection? : string[] | boolean): Promise<IDomain.ProfessorIndisponibilidadeListOutput['success']> {

// =========================================================

const qb = this.indisponibilidadeRepository
  .createQueryBuilder(aliasIndisponibilidade)
  .leftJoinAndSelect(`${aliasIndisponibilidade}.perfil`, 'perfil');

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

          'indisponibilidadeInicio',
          'indisponibilidadeTermino',
          'motivo',
          'dateCreated',
        ],
        sortableColumns: [
          'indisponibilidadeInicio',
          'indisponibilidadeTermino',
          'motivo',
          'dateCreated',
        ],
        searchableColumns: [
          "id",

          'indisponibilidadeInicio',
          'indisponibilidadeTermino',
          'motivo',

          'dateCreated',
        ],
        defaultSortBy: [
          ["dateCreated", "ASC"],
          ["indisponibilidadeInicio", "ASC"],
          ["indisponibilidadeTermino", "ASC"],
        ],
        filterableColumns: {},
      },
    );
    
    // =========================================================

    qb.select([]);
    await QbEfficientLoad('ProfessorIndisponibilidadeFindOneOutput', qb, aliasIndisponibilidade, selection);

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data,'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return paginated;

  }
 }
