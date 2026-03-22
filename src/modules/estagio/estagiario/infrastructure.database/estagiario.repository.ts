import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { Perfil } from "@/modules/acesso/perfil/domain/perfil";
import { PerfilEntity } from "@/modules/acesso/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import { Curso } from "@/modules/ensino/curso/domain/curso";
import { CursoEntity } from "@/modules/ensino/curso/infrastructure.database/typeorm/curso.typeorm.entity";
import { Turma } from "@/modules/ensino/turma/domain/turma";
import { TurmaEntity } from "@/modules/ensino/turma/infrastructure.database/typeorm/turma.typeorm.entity";
import type {
  EstagiarioCreateCommand,
  EstagiarioUpdateCommand,
} from "@/modules/estagio/estagiario/domain/commands";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import type {
  EstagiarioFindOneQuery,
  EstagiarioFindOneQueryResult,
  EstagiarioListQuery,
  EstagiarioListQueryResult,
} from "@/modules/estagio/estagiario/domain/queries";
import type { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import type { AccessContext } from "@/server/access-context";
import { EstagiarioMapper, EstagiarioTypeormEntity } from "./typeorm";

@DeclareImplementation()
export class EstagiarioTypeOrmRepositoryAdapter implements IEstagiarioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);
  }

  // cross-module: uses TypeORM directly for existence check (PerfilEntity)
  private get perfilRepository() {
    return this.appTypeormConnection.getRepository(PerfilEntity);
  }

  // cross-module: uses TypeORM directly for existence check (CursoEntity)
  private get cursoRepository() {
    return this.appTypeormConnection.getRepository(CursoEntity);
  }

  // cross-module: uses TypeORM directly for existence check (TurmaEntity)
  private get turmaRepository() {
    return this.appTypeormConnection.getRepository(TurmaEntity);
  }

  async findAll(
    accessContext: AccessContext | null,
    dto: EstagiarioListQuery | null = null,
    selection?: string[] | boolean | null,
  ): Promise<EstagiarioListQueryResult> {
    const page = dto?.page || 1;
    const limit = dto?.limit || 10;
    const skip = (page - 1) * limit;

    const query = this.repository
      .createQueryBuilder("estagiario")
      .where("estagiario.dateDeleted IS NULL");

    if (dto?.search) {
      query.andWhere(
        "(estagiario.telefone ILIKE :search OR estagiario.emailInstitucional ILIKE :search)",
        {
          search: `%${dto.search}%`,
        },
      );
    }

    if (dto?.["filter.idPerfilFk"]) {
      const raw = dto["filter.idPerfilFk"];
      const arr = Array.isArray(raw) ? raw : [raw];
      const validIds = arr.map(String).filter((id) => id && id.trim());
      if (validIds.length > 0) {
        query.andWhere("estagiario.idPerfilFk IN (:...idPerfis)", {
          idPerfis: validIds,
        });
      }
    }

    if (dto?.["filter.idCursoFk"]) {
      const raw = dto["filter.idCursoFk"];
      const arr = Array.isArray(raw) ? raw : [raw];
      const validIds = arr.map(String).filter((id) => id && id.trim());
      if (validIds.length > 0) {
        query.andWhere("estagiario.idCursoFk IN (:...idCursos)", {
          idCursos: validIds,
        });
      }
    }

    if (dto?.["filter.idTurmaFk"]) {
      const raw = dto["filter.idTurmaFk"];
      const arr = Array.isArray(raw) ? raw : [raw];
      const validIds = arr.map(String).filter((id) => id && id.trim());
      if (validIds.length > 0) {
        query.andWhere("estagiario.idTurmaFk IN (:...idTurmas)", {
          idTurmas: validIds,
        });
      }
    }

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      meta: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        itemsPerPage: limit,
        totalItems: total,
        sortBy: [],
        filter: {},
        search: dto?.search ?? "",
      },
      data: data.map((entity) => EstagiarioMapper.toOutputDto(entity)),
    };
  }

  async findById(
    accessContext: AccessContext | null,
    dto: EstagiarioFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<EstagiarioFindOneQueryResult | null> {
    const entity = await this.repository.findOne({
      where: { id: dto.id, dateDeleted: null as any },
    });

    if (!entity) {
      return null;
    }

    return EstagiarioMapper.toOutputDto(entity);
  }

  async create(
    accessContext: AccessContext | null,
    dto: EstagiarioCreateCommand,
  ): Promise<EstagiarioFindOneQueryResult> {
    const perfil = await this.perfilRepository.findOne({
      where: { id: dto.idPerfilFk, dateDeleted: null as any },
    });

    ensureExists(perfil, Perfil.entityName, dto.idPerfilFk);

    const curso = await this.cursoRepository.findOne({
      where: { id: dto.idCursoFk, dateDeleted: null as any },
    });

    ensureExists(curso, Curso.entityName, dto.idCursoFk);

    const turma = await this.turmaRepository.findOne({
      where: { id: dto.idTurmaFk, dateDeleted: null as any },
    });

    ensureExists(turma, Turma.entityName, dto.idTurmaFk);

    const estagiario = Estagiario.create(dto);

    const entity = EstagiarioMapper.toPersistence(estagiario);
    const saved = await this.repository.save(entity);

    return EstagiarioMapper.toOutputDto(saved);
  }

  async update(
    accessContext: AccessContext | null,
    id: string,
    dto: EstagiarioUpdateCommand,
  ): Promise<EstagiarioFindOneQueryResult> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
    });

    ensureExists(entity, Estagiario.entityName, id);

    const estagiario = EstagiarioMapper.toDomain(entity);

    if (dto.idPerfilFk) {
      const perfil = await this.perfilRepository.findOne({
        where: { id: dto.idPerfilFk, dateDeleted: null as any },
      });

      ensureExists(perfil, Perfil.entityName, dto.idPerfilFk);
    }

    if (dto.idCursoFk) {
      const curso = await this.cursoRepository.findOne({
        where: { id: dto.idCursoFk, dateDeleted: null as any },
      });

      ensureExists(curso, Curso.entityName, dto.idCursoFk);
    }

    if (dto.idTurmaFk) {
      const turma = await this.turmaRepository.findOne({
        where: { id: dto.idTurmaFk, dateDeleted: null as any },
      });

      ensureExists(turma, Turma.entityName, dto.idTurmaFk);
    }

    estagiario.update(dto);

    const updated = EstagiarioMapper.toPersistence(estagiario);
    const saved = await this.repository.save(updated);

    return EstagiarioMapper.toOutputDto(saved);
  }

  async delete(accessContext: AccessContext | null, id: string): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
    });

    ensureExists(entity, Estagiario.entityName, id);

    entity.dateDeleted = new Date();
    await this.repository.save(entity);
  }
}
