import { IsNull } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { EstagioSolicitacao } from "../domain/estagio-solicitacao";
import {
  type EstagioSolicitacaoListFilter,
  IEstagioSolicitacaoRepository,
} from "../domain/repositories/estagio-solicitacao.repository.interface";
import { EstagioSolicitacaoTypeormEntity } from "./typeorm/estagio-solicitacao.typeorm.entity";
import { EstagioSolicitacaoTypeormMapper } from "./typeorm/estagio-solicitacao.typeorm.mapper";

@Impl()
export class EstagioSolicitacaoTypeOrmRepositoryAdapter implements IEstagioSolicitacaoRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repo() {
    return this.appTypeormConnection.getRepository(EstagioSolicitacaoTypeormEntity);
  }

  async findById(id: string): Promise<EstagioSolicitacao | null> {
    const entity = await this.repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: {
        estagiario: true,
        campus: true,
        professorOrientador: true,
        empresa: true,
        analista: true,
        estagioGerado: true,
      },
    });

    if (!entity) return null;
    return EstagioSolicitacaoTypeormMapper.toDomain(entity);
  }

  async save(solicitacao: EstagioSolicitacao): Promise<EstagioSolicitacao> {
    const entityData = EstagioSolicitacaoTypeormMapper.toDatabase(solicitacao);
    const saved = await this.repo.save(
      this.repo.create(entityData as EstagioSolicitacaoTypeormEntity),
    );
    return EstagioSolicitacaoTypeormMapper.toDomain(saved);
  }

  async listAll(filter?: EstagioSolicitacaoListFilter): Promise<EstagioSolicitacao[]> {
    const qb = this.repo
      .createQueryBuilder("s")
      .leftJoinAndSelect("s.estagiario", "estagiario")
      .leftJoinAndSelect("s.campus", "campus")
      .leftJoinAndSelect("s.professorOrientador", "professorOrientador")
      .leftJoinAndSelect("s.empresa", "empresa")
      .leftJoinAndSelect("s.analista", "analista")
      .leftJoinAndSelect("s.estagioGerado", "estagioGerado")
      .where("s.dateDeleted IS NULL")
      .orderBy("s.dateCreated", "DESC");

    if (filter?.campusId) {
      qb.andWhere("s.id_campus_fk = :campusId", { campusId: filter.campusId });
    }

    if (filter?.situacao) {
      qb.andWhere("s.situacao = :situacao", { situacao: filter.situacao });
    }

    if (filter?.tipo) {
      qb.andWhere("s.tipo = :tipo", { tipo: filter.tipo });
    }

    if (filter?.estagiarioId) {
      qb.andWhere("s.id_estagiario_fk = :estagiarioId", {
        estagiarioId: filter.estagiarioId,
      });
    }

    const entities = await qb.getMany();
    return entities.map((e) => EstagioSolicitacaoTypeormMapper.toDomain(e));
  }

  async findByEstagiarioId(estagiarioId: string): Promise<EstagioSolicitacao[]> {
    return this.listAll({ estagiarioId });
  }

  async countActiveByEstagiarioId(estagiarioId: string): Promise<number> {
    return await this.repo
      .createQueryBuilder("s")
      .where("s.id_estagiario_fk = :estagiarioId", { estagiarioId })
      .andWhere("s.situacao IN (:...situacoes)", {
        situacoes: ["PENDENTE", "EM_ANALISE"],
      })
      .andWhere("s.dateDeleted IS NULL")
      .getCount();
  }
}
