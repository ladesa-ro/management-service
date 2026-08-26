import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { EstagiarioTypeormEntity } from "@/modules/estagio/estagiario/infrastructure.database/typeorm/estagiario.typeorm.entity";
import { EstagioTypeormEntity } from "@/modules/estagio/estagio/infrastructure.database/typeorm/estagio.typeorm.entity";
import { EmpresaAvaliacao } from "../domain/empresa-avaliacao";
import type { EmpresaAvaliacaoCurtida } from "../domain/empresa-avaliacao-curtida";
import type { EmpresaAvaliacaoHistorico } from "../domain/empresa-avaliacao-historico";
import type {
  EmpresaAvaliacaoFindOneQueryResult,
  EmpresaAvaliacaoHistoricoQueryResult,
  EmpresaAvaliacaoListQuery,
  EmpresaAvaliacaoListQueryResult,
} from "../domain/queries";
import type { IEmpresaAvaliacaoRepository } from "../domain/repositories/empresa-avaliacao.repository.interface";
import {
  EmpresaAvaliacaoCurtidaTypeormEntity,
  EmpresaAvaliacaoHistoricoTypeormEntity,
  EmpresaAvaliacaoTypeormEntity,
  EmpresaAvaliacaoTypeormMapper,
} from "./typeorm";

const avaliacaoRelations = {
  empresa: true,
  estagiario: {
    perfil: {
      usuario: true,
    },
  },
} as const;

@Impl()
export class EmpresaAvaliacaoTypeOrmRepositoryAdapter implements IEmpresaAvaliacaoRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  // ==========================================
  // Write side
  // ==========================================

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<EmpresaAvaliacao | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoTypeormEntity);
    const entity = await repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: avaliacaoRelations,
    });

    if (!entity) return null;
    return EmpresaAvaliacao.load(EmpresaAvaliacaoTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: EmpresaAvaliacao): Promise<void> {
    const entityData = EmpresaAvaliacaoTypeormMapper.domainToPersistence.map(aggregate);
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoTypeormEntity);
    await repo.save(
      repo.create({ id: aggregate.id, ...entityData } as EmpresaAvaliacaoTypeormEntity),
    );
  }

  async softDeleteById(id: string): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoTypeormEntity);
    await repo.update(id, { dateDeleted: new Date().toISOString() });
  }

  // ==========================================
  // Domain Eligibility & Rules
  // ==========================================

  async findActiveByEmpresaAndEstagiario(
    empresaId: string,
    estagiarioId: string,
  ): Promise<EmpresaAvaliacao | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoTypeormEntity);
    const entity = await repo.findOne({
      where: {
        empresa: { id: empresaId },
        estagiario: { id: estagiarioId },
        dateDeleted: IsNull(),
      },
      relations: avaliacaoRelations,
    });

    if (!entity) return null;
    return EmpresaAvaliacao.load(EmpresaAvaliacaoTypeormMapper.entityToDomain.map(entity));
  }

  async findAllActiveByEmpresa(
    empresaId: string,
  ): Promise<Array<{ rating: number; dateCreated: string }>> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoTypeormEntity);
    const entities = await repo.find({
      where: {
        empresa: { id: empresaId },
        dateDeleted: IsNull(),
      },
      select: {
        rating: true,
        dateCreated: true,
      },
    });

    return entities.map((e) => ({
      rating: Number(e.rating),
      dateCreated: e.dateCreated,
    }));
  }

  async checkInternshipEligibility(
    userId: string,
    empresaId: string,
  ): Promise<{ eligible: boolean; estagiarioId?: string; reason?: string }> {
    const estagioRepo = this.appTypeormConnection.getRepository(EstagioTypeormEntity);

    // Busca estágio vinculado a algum perfil do usuário e à empresa
    const estagio = await estagioRepo
      .createQueryBuilder("estagio")
      .innerJoin("estagio.estagiario", "estagiario")
      .innerJoin("estagiario.perfil", "perfil")
      .innerJoin("perfil.usuario", "usuario")
      .where("estagio.id_empresa_fk = :empresaId", { empresaId })
      .andWhere("usuario.id = :userId", { userId })
      .andWhere("estagio.dateDeleted IS NULL")
      .select(["estagio.id", "estagiario.id"])
      .getOne();

    if (estagio && estagio.estagiario?.id) {
      return { eligible: true, estagiarioId: estagio.estagiario.id };
    }

    // Se não encontrou estágio direto, verifica se o usuário é estagiário
    const estagiarioRepo = this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);
    const estagiario = await estagiarioRepo
      .createQueryBuilder("estagiario")
      .innerJoin("estagiario.perfil", "perfil")
      .where("perfil.id_usuario_fk = :userId", { userId })
      .andWhere("estagiario.dateDeleted IS NULL")
      .select(["estagiario.id"])
      .getOne();

    if (!estagiario) {
      return {
        eligible: false,
        reason: "Usuário autenticado não possui perfil de estagiário cadastrado.",
      };
    }

    return {
      eligible: false,
      estagiarioId: estagiario.id,
      reason: "Estagiário não possui histórico de estágio na empresa informada.",
    };
  }

  // ==========================================
  // Likes & Auditing
  // ==========================================

  async findActiveLike(
    avaliacaoId: string,
    usuarioId: string,
  ): Promise<EmpresaAvaliacaoCurtida | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoCurtidaTypeormEntity);
    const entity = await repo.findOne({
      where: {
        avaliacao: { id: avaliacaoId },
        usuario: { id: usuarioId },
        dateDeleted: IsNull(),
      },
    });

    if (!entity) return null;
    return EmpresaAvaliacaoTypeormMapper.curtidaEntityToDomain.map(entity);
  }

  async findAnyLike(
    avaliacaoId: string,
    usuarioId: string,
  ): Promise<EmpresaAvaliacaoCurtida | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoCurtidaTypeormEntity);
    const entity = await repo.findOne({
      where: {
        avaliacao: { id: avaliacaoId },
        usuario: { id: usuarioId },
      },
    });

    if (!entity) return null;
    return EmpresaAvaliacaoTypeormMapper.curtidaEntityToDomain.map(entity);
  }

  async saveLike(like: EmpresaAvaliacaoCurtida): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoCurtidaTypeormEntity);
    await repo.save({
      id: like.id,
      avaliacao: { id: like.avaliacao.id } as any,
      usuario: { id: like.usuario.id } as any,
      dateCreated: like.dateCreated,
      dateDeleted: like.dateDeleted,
    });
  }

  async countActiveLikes(avaliacaoId: string): Promise<number> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoCurtidaTypeormEntity);
    return repo.count({
      where: {
        avaliacao: { id: avaliacaoId },
        dateDeleted: IsNull(),
      },
    });
  }

  async isLikedByUser(avaliacaoId: string, usuarioId: string): Promise<boolean> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoCurtidaTypeormEntity);
    const count = await repo.count({
      where: {
        avaliacao: { id: avaliacaoId },
        usuario: { id: usuarioId },
        dateDeleted: IsNull(),
      },
    });
    return count > 0;
  }

  async saveHistorico(historico: EmpresaAvaliacaoHistorico): Promise<void> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoHistoricoTypeormEntity);
    await repo.save({
      id: historico.id,
      avaliacao: { id: historico.avaliacao.id } as any,
      usuario: { id: historico.usuario.id } as any,
      ratingAnterior: historico.ratingAnterior,
      ratingNovo: historico.ratingNovo,
      comentarioAnterior: historico.comentarioAnterior,
      comentarioNovo: historico.comentarioNovo,
      acao: historico.acao,
      dateCreated: historico.dateCreated,
    });
  }

  async findHistoricoByAvaliacaoId(
    avaliacaoId: string,
  ): Promise<EmpresaAvaliacaoHistoricoQueryResult[]> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoHistoricoTypeormEntity);
    const list = await repo.find({
      where: { avaliacao: { id: avaliacaoId } },
      relations: { usuario: true },
      order: { dateCreated: "DESC" },
    });

    return list.map((item) => EmpresaAvaliacaoTypeormMapper.historicoEntityToQueryResult.map(item));
  }

  // ==========================================
  // Read side
  // ==========================================

  async getFindOneQueryResult(
    accessContext: IAccessContext | null,
    dto: { id: string },
  ): Promise<EmpresaAvaliacaoFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoTypeormEntity);
    const entity = await repo.findOne({
      where: { id: dto.id, dateDeleted: IsNull() },
      relations: avaliacaoRelations,
    });

    if (!entity) return null;
    const result = EmpresaAvaliacaoTypeormMapper.entityToFindOneQueryResult.map(entity);

    const currentUserId = accessContext?.requestActor?.id;
    if (currentUserId) {
      result.isLikedByCurrentUser = await this.isLikedByUser(entity.id, currentUserId);
    } else {
      result.isLikedByCurrentUser = false;
    }

    return result;
  }

  async getFindMyQueryResult(
    accessContext: IAccessContext | null,
    empresaId: string,
    userId: string,
  ): Promise<EmpresaAvaliacaoFindOneQueryResult | null> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoTypeormEntity);
    const entity = await repo
      .createQueryBuilder("avaliacao")
      .innerJoinAndSelect("avaliacao.empresa", "empresa")
      .innerJoinAndSelect("avaliacao.estagiario", "estagiario")
      .innerJoinAndSelect("estagiario.perfil", "perfil")
      .innerJoinAndSelect("perfil.usuario", "usuario")
      .where("empresa.id = :empresaId", { empresaId })
      .andWhere("usuario.id = :userId", { userId })
      .andWhere("avaliacao.dateDeleted IS NULL")
      .getOne();

    if (!entity) return null;
    const result = EmpresaAvaliacaoTypeormMapper.entityToFindOneQueryResult.map(entity);
    result.isLikedByCurrentUser = await this.isLikedByUser(entity.id, userId);
    return result;
  }

  async getFindAllQueryResult(
    accessContext: IAccessContext | null,
    dto: EmpresaAvaliacaoListQuery,
  ): Promise<EmpresaAvaliacaoListQueryResult> {
    const repo = this.appTypeormConnection.getRepository(EmpresaAvaliacaoTypeormEntity);
    const page = Math.max(1, dto.page ?? 1);
    const limit = Math.min(100, Math.max(1, dto.limit ?? 20));
    const skip = (page - 1) * limit;

    const qb = repo
      .createQueryBuilder("avaliacao")
      .innerJoinAndSelect("avaliacao.empresa", "empresa")
      .innerJoinAndSelect("avaliacao.estagiario", "estagiario")
      .innerJoinAndSelect("estagiario.perfil", "perfil")
      .innerJoinAndSelect("perfil.usuario", "usuario")
      .where("empresa.id = :empresaId", { empresaId: dto.empresaId })
      .andWhere("avaliacao.dateDeleted IS NULL");

    if (dto.rating !== undefined) {
      qb.andWhere("avaliacao.rating = :rating", { rating: dto.rating });
    }

    const order = dto.order ?? "relevancia";
    switch (order) {
      case "mais_recentes":
        qb.orderBy("avaliacao.dateCreated", "DESC");
        break;
      case "mais_curtidos":
        qb.orderBy("avaliacao.likesCount", "DESC").addOrderBy("avaliacao.dateCreated", "DESC");
        break;
      case "melhor_avaliacao":
        qb.orderBy("avaliacao.rating", "DESC")
          .addOrderBy("avaliacao.relevanceScore", "DESC")
          .addOrderBy("avaliacao.dateCreated", "DESC");
        break;
      case "pior_avaliacao":
        qb.orderBy("avaliacao.rating", "ASC")
          .addOrderBy("avaliacao.relevanceScore", "DESC")
          .addOrderBy("avaliacao.dateCreated", "DESC");
        break;
      case "relevancia":
      default:
        qb.orderBy("avaliacao.relevanceScore", "DESC")
          .addOrderBy("avaliacao.likesCount", "DESC")
          .addOrderBy("avaliacao.dateCreated", "DESC");
        break;
    }

    const [entities, totalItems] = await qb.skip(skip).take(limit).getManyAndCount();

    const currentUserId = accessContext?.requestActor?.id;
    const likedMap = new Set<string>();

    if (currentUserId && entities.length > 0) {
      const curtidaRepo = this.appTypeormConnection.getRepository(
        EmpresaAvaliacaoCurtidaTypeormEntity,
      );
      const userLikes = await curtidaRepo
        .createQueryBuilder("curtida")
        .where("curtida.id_usuario_fk = :userId", { userId: currentUserId })
        .andWhere("curtida.id_empresa_avaliacao_fk IN (:...ids)", {
          ids: entities.map((e) => e.id),
        })
        .andWhere("curtida.dateDeleted IS NULL")
        .select(["curtida.id_empresa_avaliacao_fk"])
        .getRawMany();

      for (const row of userLikes) {
        likedMap.add(row.id_empresa_avaliacao_fk);
      }
    }

    const data: EmpresaAvaliacaoFindOneQueryResult[] = entities.map((entity) => {
      const mapped = EmpresaAvaliacaoTypeormMapper.entityToFindOneQueryResult.map(entity);
      mapped.isLikedByCurrentUser = likedMap.has(entity.id);
      return mapped;
    });

    const pageCount = Math.ceil(totalItems / limit);

    return {
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage: page,
        totalPages: pageCount,
        sortBy: [["relevanceScore", "DESC"]],
      },
      data,
    } as EmpresaAvaliacaoListQueryResult;
  }
}
