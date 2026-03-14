import { DataSource } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ensureExists } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { Perfil } from "@/modules/acesso/perfil/domain/perfil.domain";
import { createPerfilRepository } from "@/modules/acesso/perfil/infrastructure/persistence/typeorm/perfil.repository";
import { Curso } from "@/modules/ensino/curso/domain/curso.domain";
import { createCursoRepository } from "@/modules/ensino/curso/infrastructure/persistence/typeorm/curso.repository";
import { Turma } from "@/modules/ensino/turma/domain/turma.domain";
import { createTurmaRepository } from "@/modules/ensino/turma/infrastructure/persistence/typeorm/turma.repository";
import type {
  EstagiarioCreateInputDto,
  EstagiarioFindOneInputDto,
  EstagiarioFindOneOutputDto,
  EstagiarioListInputDto,
  EstagiarioListOutputDto,
  EstagiarioUpdateInputDto,
} from "@/modules/estagio/estagiario/application/dtos";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario.domain";
import type { IEstagiarioRepository } from "@/modules/estagio/estagiario/domain/repositories";
import { createEstagiarioRepository, EstagiarioMapper } from "./persistence";

@DeclareImplementation()
export class EstagiarioTypeOrmRepositoryAdapter implements IEstagiarioRepository {
  constructor(@DeclareDependency(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource) {}

  private get repository() {
    return createEstagiarioRepository(this.dataSource);
  }

  private get perfilRepository() {
    return createPerfilRepository(this.dataSource);
  }

  private get cursoRepository() {
    return createCursoRepository(this.dataSource);
  }

  private get turmaRepository() {
    return createTurmaRepository(this.dataSource);
  }

  async findAll(
    accessContext: AccessContext,
    dto: EstagiarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EstagiarioListOutputDto> {
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

    if (
      dto?.filterIdPerfilFk &&
      Array.isArray(dto.filterIdPerfilFk) &&
      dto.filterIdPerfilFk.length > 0
    ) {
      const validIds = dto.filterIdPerfilFk.filter((id) => id && id.trim());
      if (validIds.length > 0) {
        query.andWhere("estagiario.idPerfilFk IN (:...idPerfis)", {
          idPerfis: validIds,
        });
      }
    }

    if (
      dto?.filterIdCursoFk &&
      Array.isArray(dto.filterIdCursoFk) &&
      dto.filterIdCursoFk.length > 0
    ) {
      const validIds = dto.filterIdCursoFk.filter((id) => id && id.trim());
      if (validIds.length > 0) {
        query.andWhere("estagiario.idCursoFk IN (:...idCursos)", {
          idCursos: validIds,
        });
      }
    }

    if (
      dto?.filterIdTurmaFk &&
      Array.isArray(dto.filterIdTurmaFk) &&
      dto.filterIdTurmaFk.length > 0
    ) {
      const validIds = dto.filterIdTurmaFk.filter((id) => id && id.trim());
      if (validIds.length > 0) {
        query.andWhere("estagiario.idTurmaFk IN (:...idTurmas)", {
          idTurmas: validIds,
        });
      }
    }

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      data: data.map((entity) => EstagiarioMapper.toOutputDto(entity)),
      total,
      page,
      limit,
    };
  }

  async findById(
    accessContext: AccessContext | null,
    dto: EstagiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EstagiarioFindOneOutputDto | null> {
    const entity = await this.repository.findOne({
      where: { id: dto.id, dateDeleted: null as any },
    });

    if (!entity) {
      return null;
    }

    return EstagiarioMapper.toOutputDto(entity);
  }

  async create(
    accessContext: AccessContext,
    dto: EstagiarioCreateInputDto,
  ): Promise<EstagiarioFindOneOutputDto> {
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

    const estagiario = Estagiario.criar(dto);

    const entity = EstagiarioMapper.toPersistence(estagiario);
    const saved = await this.repository.save(entity);

    return EstagiarioMapper.toOutputDto(saved);
  }

  async update(
    accessContext: AccessContext,
    id: string,
    dto: EstagiarioUpdateInputDto,
  ): Promise<EstagiarioFindOneOutputDto> {
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

    estagiario.atualizar(dto);

    const updated = EstagiarioMapper.toPersistence(estagiario);
    const saved = await this.repository.save(updated);

    return EstagiarioMapper.toOutputDto(saved);
  }

  async delete(accessContext: AccessContext, id: string): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
    });

    ensureExists(entity, Estagiario.entityName, id);

    entity.dateDeleted = new Date();
    await this.repository.save(entity);
  }
}
