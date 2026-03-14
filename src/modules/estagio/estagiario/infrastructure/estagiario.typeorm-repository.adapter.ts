import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import { APP_DATA_SOURCE_TOKEN } from "@/modules/@shared/infrastructure/persistence/typeorm";
import { createPerfilRepository } from "@/modules/acesso/perfil/infrastructure/persistence/typeorm/perfil.repository";
import { createCursoRepository } from "@/modules/ensino/curso/infrastructure/persistence/typeorm/curso.repository";
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
import type { IEstagiarioRepositoryPort } from "@/modules/estagio/estagiario/domain/repositories";
import { createEstagiarioRepository, EstagiarioMapper } from "./persistence";

@Injectable()
export class EstagiarioTypeOrmRepositoryAdapter implements IEstagiarioRepositoryPort {
  constructor(@Inject(APP_DATA_SOURCE_TOKEN) private readonly dataSource: DataSource) {}

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

    if (!perfil) {
      throw new ResourceNotFoundError("Perfil", dto.idPerfilFk);
    }

    const curso = await this.cursoRepository.findOne({
      where: { id: dto.idCursoFk, dateDeleted: null as any },
    });

    if (!curso) {
      throw new ResourceNotFoundError("Curso", dto.idCursoFk);
    }

    const turma = await this.turmaRepository.findOne({
      where: { id: dto.idTurmaFk, dateDeleted: null as any },
    });

    if (!turma) {
      throw new ResourceNotFoundError("Turma", dto.idTurmaFk);
    }

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

    if (!entity) {
      throw new ResourceNotFoundError("Estagiario", id);
    }

    const estagiario = EstagiarioMapper.toDomain(entity);

    if (dto.idPerfilFk) {
      const perfil = await this.perfilRepository.findOne({
        where: { id: dto.idPerfilFk, dateDeleted: null as any },
      });

      if (!perfil) {
        throw new ResourceNotFoundError("Perfil", dto.idPerfilFk);
      }
    }

    if (dto.idCursoFk) {
      const curso = await this.cursoRepository.findOne({
        where: { id: dto.idCursoFk, dateDeleted: null as any },
      });

      if (!curso) {
        throw new ResourceNotFoundError("Curso", dto.idCursoFk);
      }
    }

    if (dto.idTurmaFk) {
      const turma = await this.turmaRepository.findOne({
        where: { id: dto.idTurmaFk, dateDeleted: null as any },
      });

      if (!turma) {
        throw new ResourceNotFoundError("Turma", dto.idTurmaFk);
      }
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

    if (!entity) {
      throw new ResourceNotFoundError("Estagiario", id);
    }

    entity.dateDeleted = new Date();
    await this.repository.save(entity);
  }
}
