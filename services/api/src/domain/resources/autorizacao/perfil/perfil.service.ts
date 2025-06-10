import { QbEfficientLoad } from "@/application/standards/ladesa-spec/QbEfficientLoad";
import { LadesaSearch } from "@/application/standards/ladesa-spec/search/search-strategies";
import type { AccessContext } from "@/infrastructure/access-context";
import { paginateConfig } from "@/infrastructure/fixtures";
import { DatabaseContextService } from "@/infrastructure/integrations/database";
import type { UsuarioEntity } from "@/infrastructure/integrations/database/typeorm/entities";
import * as LadesaTypings from "@ladesa-ro/especificacao";
import { Injectable, NotFoundException } from "@nestjs/common";
import { FilterOperator } from "nestjs-paginate";
import { v4 as uuid } from "uuid";
import { CampusService } from "../../ambientes/campus/campus.service";
import { UsuarioService } from "../../autenticacao/usuario/usuario.service";

// ============================================================================

const aliasVinculo = "vinculo";

// ============================================================================

@Injectable()
export class PerfilService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private usuarioService: UsuarioService,
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  get vinculoRepository() {
    return this.databaseContext.perfilRepository;
  }

  //

  async perfilGetAllActive(accessContext: AccessContext | null, usuarioId: UsuarioEntity["id"]) {
    const qb = this.vinculoRepository.createQueryBuilder("vinculo");

    qb.innerJoin("vinculo.usuario", "usuario");
    qb.where("usuario.id = :usuarioId", { usuarioId });
    qb.andWhere("vinculo.ativo = :ativo", { ativo: true });

    if (accessContext) {
      await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);
    }

    QbEfficientLoad(LadesaTypings.Tokens.PerfilFindOneResultView, qb, "vinculo");

    const vinculos = await qb.getMany();

    return vinculos;
  }

  async perfilFindAll(accessContext: AccessContext, dto: LadesaTypings.PerfilListOperationInput | null = null, selection?: string[] | boolean) {
    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    QbEfficientLoad(LadesaTypings.Tokens.PerfilFindOneResultView, qb, aliasVinculo, selection);

    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);

    const paginated = LadesaSearch("#/", dto, qb, {
      ...paginateConfig,

      relations: {
        campus: true,
        usuario: true,
      },

      select: [
        "id",
        "ativo",
        "cargo",
        "campus.id",
        "campus.nomeFantasia",
        "campus.razaoSocial",
        "campus.apelido",
        "campus.cnpj",
        "usuario.id",
        "usuario.matriculaSiape",
        "usuario.email",
        "dateCreated",
      ],

      searchableColumns: ["cargo"],

      filterableColumns: {
        ativo: [FilterOperator.EQ],
        cargo: [FilterOperator.EQ],
        "campus.id": [FilterOperator.EQ],
        "usuario.id": [FilterOperator.EQ],
      },
    });

    return paginated;
  }

  async perfilFindById(accessContext: AccessContext, dto: LadesaTypings.PerfilFindOneInputView, selection?: string[] | boolean): Promise<LadesaTypings.PerfilFindOneResultView | null> {
    // =========================================================

    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    // =========================================================

    await accessContext.applyFilter("vinculo:find", qb, aliasVinculo, null);

    // =========================================================

    qb.andWhere(`${aliasVinculo}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    QbEfficientLoad(LadesaTypings.Tokens.PerfilFindOneResultView, qb, aliasVinculo, selection);

    // =========================================================

    const vinculo = await qb.getOne();

    // =========================================================

    return vinculo;
  }

  async perfilFindByIdStrict(accessContext: AccessContext, dto: LadesaTypings.PerfilFindOneInputView, selection?: string[] | boolean) {
    const vinculo = await this.perfilFindById(accessContext, dto, selection);

    if (!vinculo) {
      throw new NotFoundException();
    }

    return vinculo;
  }

  async perfilSetVinculos(accessContext: AccessContext, dto: LadesaTypings.PerfilUpdateOperationInput) {
    const campus = await this.campusService.campusFindByIdSimpleStrict(accessContext, dto.body.campus.id);
    const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(accessContext, dto.body.usuario.id);

    const vinculosParaManter = new Set();

    //

    const vinculosExistentesUsuarioCampus = await this.vinculoRepository
      .createQueryBuilder("vinculo")
      .innerJoin("vinculo.campus", "campus")
      .innerJoin("vinculo.usuario", "usuario")
      .andWhere("campus.id = :campusId", { campusId: campus.id })
      .andWhere("usuario.id = :usuarioId", { usuarioId: usuario.id })
      .select(["vinculo", "campus", "usuario"])
      .getMany();

    for (const cargo of dto.body.cargos) {
      const vinculoExistente = vinculosExistentesUsuarioCampus.find((vinculo) => vinculo.cargo === cargo);

      if (vinculoExistente) {
        vinculosParaManter.add(vinculoExistente.id);
      }

      if (vinculoExistente && vinculoExistente.ativo === true && vinculoExistente.dateDeleted === null) {
        continue;
      }

      const vinculo = this.vinculoRepository.create();

      this.vinculoRepository.merge(vinculo, {
        id: uuid(),

        ...vinculoExistente,

        ativo: true,

        cargo,

        dateDeleted: null,

        usuario: {
          id: usuario.id,
        },
        campus: {
          id: campus.id,
        },
      });

      await this.vinculoRepository.save(vinculo);
    }

    const vinculosParaDesativar = vinculosExistentesUsuarioCampus.filter((vinculo) => vinculo.ativo).filter((vinculo) => !vinculosParaManter.has(vinculo.id));

    // DESATIVAR OUTROS VÍNCULOS
    await this.vinculoRepository
      .createQueryBuilder("usuario_vinculo_campus")
      .update()
      .set({
        ativo: false,
      })
      .where("ativo = :isActive", { isActive: true })
      .andWhereInIds(vinculosParaDesativar.map((vinculo) => vinculo.id))
      .execute();

    return this.perfilFindAll(accessContext, <any>{
      queries: {
        "filter.ativo": ["true"],
        "filter.usuario.id": [`${usuario.id}`],
        "filter.campus.id": [`${campus.id}`],
      },
    });
  }
}
