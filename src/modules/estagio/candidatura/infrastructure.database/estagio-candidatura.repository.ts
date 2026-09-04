import { IsNull } from "typeorm";
import type { IAccessContext } from "@/domain/abstractions";
import { Dep, Impl } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { EstagioCandidatura } from "../domain/estagio-candidatura";
import {
  IEstagioCandidaturaRepository,
  type IMinhasCandidaturasItem,
} from "../domain/repositories/estagio-candidatura.repository.interface";
import { EstagioCandidaturaTypeormEntity } from "./typeorm/estagio-candidatura.typeorm.entity";
import { EstagioCandidaturaTypeormMapper } from "./typeorm/estagio-candidatura.typeorm.mapper";

@Impl()
export class EstagioCandidaturaTypeOrmRepositoryAdapter implements IEstagioCandidaturaRepository {
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repo() {
    return this.appTypeormConnection.getRepository(EstagioCandidaturaTypeormEntity);
  }

  async loadById(
    _accessContext: IAccessContext | null,
    id: string,
  ): Promise<EstagioCandidatura | null> {
    const entity = await this.repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: {
        estagio: true,
        estagiario: true,
        autorConvocacao: true,
      },
    });

    if (!entity) return null;
    return EstagioCandidatura.load(EstagioCandidaturaTypeormMapper.entityToDomain.map(entity));
  }

  async save(aggregate: EstagioCandidatura): Promise<void> {
    const entityData = EstagioCandidaturaTypeormMapper.domainToPersistence.map(aggregate);
    await this.repo.save(this.repo.create(entityData as EstagioCandidaturaTypeormEntity));
  }

  async findActiveByEstagioAndEstagiario(
    estagioId: string,
    estagiarioId: string,
  ): Promise<EstagioCandidatura | null> {
    const qb = this.repo.createQueryBuilder("c");
    const entity = await qb
      .where("c.id_estagio_fk = :estagioId", { estagioId })
      .andWhere("c.id_estagiario_fk = :estagiarioId", { estagiarioId })
      .andWhere("c.situacao IN (:...situacoes)", { situacoes: ["PENDING", "OFFERED"] })
      .andWhere("c.dateDeleted IS NULL")
      .leftJoinAndSelect("c.estagio", "estagio")
      .leftJoinAndSelect("c.estagiario", "estagiario")
      .leftJoinAndSelect("c.autorConvocacao", "autorConvocacao")
      .getOne();

    if (!entity) return null;
    return EstagioCandidatura.load(EstagioCandidaturaTypeormMapper.entityToDomain.map(entity));
  }

  async findActiveOfferByEstagio(estagioId: string): Promise<EstagioCandidatura | null> {
    const qb = this.repo.createQueryBuilder("c");
    const entity = await qb
      .where("c.id_estagio_fk = :estagioId", { estagioId })
      .andWhere("c.situacao = :situacao", { situacao: "OFFERED" })
      .andWhere("c.dateDeleted IS NULL")
      .andWhere("(c.expira_em IS NULL OR c.expira_em >= NOW())")
      .leftJoinAndSelect("c.estagio", "estagio")
      .leftJoinAndSelect("c.estagiario", "estagiario")
      .leftJoinAndSelect("c.autorConvocacao", "autorConvocacao")
      .getOne();

    if (!entity) return null;
    return EstagioCandidatura.load(EstagioCandidaturaTypeormMapper.entityToDomain.map(entity));
  }

  async calcularPosicaoFila(
    estagioId: string,
    dataInscricao: string,
    candidaturaId: string,
  ): Promise<number> {
    const count = await this.repo
      .createQueryBuilder("c")
      .where("c.id_estagio_fk = :estagioId", { estagioId })
      .andWhere("c.situacao = :situacao", { situacao: "PENDING" })
      .andWhere("c.dateDeleted IS NULL")
      .andWhere(
        "(c.data_inscricao < :dataInscricao OR (c.data_inscricao = :dataInscricao AND c.id < :candidaturaId))",
        { dataInscricao, candidaturaId },
      )
      .getCount();

    return count + 1;
  }

  async findMinhasCandidaturas(
    _accessContext: IAccessContext | null,
    estagiarioId: string,
    options: {
      page?: number;
      limit?: number;
      situacao?: string;
    },
  ): Promise<{ items: IMinhasCandidaturasItem[]; total: number }> {
    const page = options.page && options.page > 0 ? options.page : 1;
    const limit = options.limit && options.limit > 0 ? options.limit : 10;
    const skip = (page - 1) * limit;

    const qb = this.repo
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.estagio", "estagio")
      .leftJoinAndSelect("estagio.empresa", "empresa")
      .leftJoinAndSelect("estagio.campus", "campus")
      .leftJoinAndSelect("estagio.CursoReferencia", "CursoReferencia")
      .where("c.id_estagiario_fk = :estagiarioId", { estagiarioId })
      .andWhere("c.dateDeleted IS NULL")
      .orderBy("c.data_inscricao", "DESC")
      .skip(skip)
      .take(limit);

    if (options.situacao) {
      qb.andWhere("c.situacao = :situacao", { situacao: options.situacao });
    }

    const [entities, total] = await qb.getManyAndCount();

    const items: IMinhasCandidaturasItem[] = await Promise.all(
      entities.map(async (entity) => {
        let posicaoFila: number | null = null;
        if (entity.situacao === "PENDING") {
          posicaoFila = await this.calcularPosicaoFila(
            entity.estagio.id,
            entity.dataInscricao,
            entity.id,
          );
        }

        const isOfferedValid =
          entity.situacao === "OFFERED" &&
          (!entity.expiraEm || new Date(entity.expiraEm).getTime() >= Date.now());

        return {
          id: entity.id,
          situacao: entity.situacao,
          posicaoFila,
          dataInscricao: entity.dataInscricao,
          dataOferta: entity.dataOferta,
          expiraEm: entity.expiraEm,
          dataResposta: entity.dataResposta,
          acaoDisponivel: isOfferedValid,
          estagio: {
            id: entity.estagio.id,
            status: entity.estagio.status,
            cargaHoraria: entity.estagio.cargaHoraria,
            empresa: entity.estagio.empresa
              ? {
                  id: entity.estagio.empresa.id,
                  razaoSocial: entity.estagio.empresa.razaoSocial,
                  nomeFantasia: entity.estagio.empresa.nomeFantasia,
                }
              : null,
            campus: entity.estagio.campus
              ? {
                  id: entity.estagio.campus.id,
                  nome: entity.estagio.campus.nomeFantasia,
                }
              : null,
            CursoReferencia: entity.estagio.CursoReferencia
              ? {
                  id: entity.estagio.CursoReferencia.id,
                  nome: entity.estagio.CursoReferencia.nome,
                }
              : null,
          },
        };
      }),
    );

    return { items, total };
  }

  async getFindOneQueryResult(
    accessContext: IAccessContext | null,
    id: string,
  ): Promise<IMinhasCandidaturasItem | null> {
    const entity = await this.repo.findOne({
      where: { id, dateDeleted: IsNull() },
      relations: {
        estagio: {
          empresa: true,
          campus: true,
          CursoReferencia: true,
        },
      },
    });

    if (!entity) return null;

    let posicaoFila: number | null = null;
    if (entity.situacao === "PENDING") {
      posicaoFila = await this.calcularPosicaoFila(
        entity.estagio.id,
        entity.dataInscricao,
        entity.id,
      );
    }

    const isOfferedValid =
      entity.situacao === "OFFERED" &&
      (!entity.expiraEm || new Date(entity.expiraEm).getTime() >= Date.now());

    return {
      id: entity.id,
      situacao: entity.situacao,
      posicaoFila,
      dataInscricao: entity.dataInscricao,
      dataOferta: entity.dataOferta,
      expiraEm: entity.expiraEm,
      dataResposta: entity.dataResposta,
      acaoDisponivel: isOfferedValid,
      estagio: {
        id: entity.estagio.id,
        status: entity.estagio.status,
        cargaHoraria: entity.estagio.cargaHoraria,
        empresa: entity.estagio.empresa
          ? {
              id: entity.estagio.empresa.id,
              razaoSocial: entity.estagio.empresa.razaoSocial,
              nomeFantasia: entity.estagio.empresa.nomeFantasia,
            }
          : null,
        campus: entity.estagio.campus
          ? {
              id: entity.estagio.campus.id,
              nome: entity.estagio.campus.nomeFantasia,
            }
          : null,
        CursoReferencia: entity.estagio.CursoReferencia
          ? {
              id: entity.estagio.CursoReferencia.id,
              nome: entity.estagio.CursoReferencia.nome,
            }
          : null,
      },
    };
  }
}
