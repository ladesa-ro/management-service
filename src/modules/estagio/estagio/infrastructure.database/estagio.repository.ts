import { ensureExists } from "@/application/errors";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import { Empresa } from "@/modules/estagio/empresa/domain/empresa";
import { EmpresaTypeormEntity } from "@/modules/estagio/empresa/infrastructure.database/typeorm/empresa.typeorm.entity";
import { Estagiario } from "@/modules/estagio/estagiario/domain/estagiario";
import { EstagiarioTypeormEntity } from "@/modules/estagio/estagiario/infrastructure.database/typeorm/estagiario.typeorm.entity";
import type {
  EstagioCreateCommand,
  EstagioUpdateCommand,
} from "@/modules/estagio/estagio/domain/commands";
import { Estagio, EstagioStatus } from "@/modules/estagio/estagio/domain/estagio";
import type {
  EstagioFindOneQuery,
  EstagioFindOneQueryResult,
  EstagioListQuery,
  EstagioListQueryResult,
} from "@/modules/estagio/estagio/domain/queries";
import type { IEstagioRepository } from "@/modules/estagio/estagio/domain/repositories";
import type { AccessContext } from "@/server/access-context";
import { EstagioMapper, EstagioTypeormEntity, HorarioEstagioTypeormEntity } from "./typeorm";

@DeclareImplementation()
export class EstagioTypeOrmRepositoryAdapter implements IEstagioRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  private get repository() {
    return this.appTypeormConnection.getRepository(EstagioTypeormEntity);
  }

  private get horarioRepository() {
    return this.appTypeormConnection.getRepository(HorarioEstagioTypeormEntity);
  }

  // cross-module: uses TypeORM directly for existence check (EmpresaTypeormEntity)
  private get empresaRepository() {
    return this.appTypeormConnection.getRepository(EmpresaTypeormEntity);
  }

  // cross-module: uses TypeORM directly for existence check (EstagiarioTypeormEntity)
  private get estagiarioRepository() {
    return this.appTypeormConnection.getRepository(EstagiarioTypeormEntity);
  }

  async findAll(
    accessContext: AccessContext | null,
    dto: EstagioListQuery | null = null,
    selection?: string[] | boolean | null,
  ): Promise<EstagioListQueryResult> {
    const page = dto?.page || 1;
    const limit = dto?.limit || 10;
    const skip = (page - 1) * limit;

    const query = this.repository
      .createQueryBuilder("estagio")
      .leftJoinAndSelect(
        "estagio.horariosEstagio",
        "horarioEstagio",
        "horarioEstagio.dateDeleted IS NULL",
      )
      .where("estagio.dateDeleted IS NULL");

    if (dto?.search) {
      query.andWhere("CAST(estagio.status AS TEXT) ILIKE :search", {
        search: `%${dto.search}%`,
      });
    }

    if (
      dto?.filterIdEmpresaFk &&
      Array.isArray(dto.filterIdEmpresaFk) &&
      dto.filterIdEmpresaFk.length > 0
    ) {
      const validIds = dto.filterIdEmpresaFk.filter((id) => id && id.trim());
      if (validIds.length > 0) {
        query.andWhere("estagio.idEmpresaFk IN (:...idEmpresas)", {
          idEmpresas: validIds,
        });
      }
    }

    if (
      dto?.filterIdEstagiarioFk &&
      Array.isArray(dto.filterIdEstagiarioFk) &&
      dto.filterIdEstagiarioFk.length > 0
    ) {
      const validIds = dto.filterIdEstagiarioFk.filter((id) => id && id.trim());
      if (validIds.length > 0) {
        query.andWhere("estagio.idEstagiarioFk IN (:...idEstagiarios)", {
          idEstagiarios: validIds,
        });
      }
    }

    if (dto?.filterStatus && Array.isArray(dto.filterStatus) && dto.filterStatus.length > 0) {
      const validStatus = dto.filterStatus.filter((status) =>
        Object.values(EstagioStatus).includes(status),
      );
      if (validStatus.length > 0) {
        query.andWhere("estagio.status IN (:...status)", {
          status: validStatus,
        });
      }
    }

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      data: data.map((entity) => EstagioMapper.toOutputDto(entity)),
      total,
      page,
      limit,
    };
  }

  async findById(
    accessContext: AccessContext | null,
    dto: EstagioFindOneQuery,
    selection?: string[] | boolean | null,
  ): Promise<EstagioFindOneQueryResult | null> {
    const entity = await this.repository.findOne({
      where: { id: dto.id, dateDeleted: null as any },
      relations: { horariosEstagio: true },
    });

    if (!entity) {
      return null;
    }

    return EstagioMapper.toOutputDto(entity);
  }

  async create(
    accessContext: AccessContext | null,
    dto: EstagioCreateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    const empresa = await this.empresaRepository.findOne({
      where: { id: dto.idEmpresaFk, dateDeleted: null as any },
    });

    ensureExists(empresa, Empresa.entityName, dto.idEmpresaFk);

    if (dto.idEstagiarioFk) {
      const estagiario = await this.estagiarioRepository.findOne({
        where: { id: dto.idEstagiarioFk, dateDeleted: null as any },
      });

      ensureExists(estagiario, Estagiario.entityName, dto.idEstagiarioFk);
    }

    const estagio = Estagio.create(dto);

    const entity = EstagioMapper.toPersistence(estagio);
    const saved = await this.repository.save(entity);

    if (estagio.horariosEstagio.length > 0) {
      const horarios = estagio.horariosEstagio.map((horario) =>
        EstagioMapper.toHorarioPersistence(saved.id, horario),
      );
      await this.horarioRepository.save(horarios);
    }

    const outputEntity = await this.repository.findOne({
      where: { id: saved.id, dateDeleted: null as any },
      relations: { horariosEstagio: true },
    });

    ensureExists(outputEntity, Estagio.entityName, saved.id);

    return EstagioMapper.toOutputDto(outputEntity);
  }

  async update(
    accessContext: AccessContext | null,
    id: string,
    dto: EstagioUpdateCommand,
  ): Promise<EstagioFindOneQueryResult> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
      relations: { horariosEstagio: true },
    });

    ensureExists(entity, Estagio.entityName, id);

    const estagio = EstagioMapper.toDomain(entity);

    if (dto.idEmpresaFk) {
      const empresa = await this.empresaRepository.findOne({
        where: { id: dto.idEmpresaFk, dateDeleted: null as any },
      });

      ensureExists(empresa, Empresa.entityName, dto.idEmpresaFk);
    }

    if (dto.idEstagiarioFk) {
      const estagiario = await this.estagiarioRepository.findOne({
        where: { id: dto.idEstagiarioFk, dateDeleted: null as any },
      });

      ensureExists(estagiario, Estagiario.entityName, dto.idEstagiarioFk);
    }

    estagio.update(dto);

    const updated = EstagioMapper.toPersistence(estagio);
    await this.repository.save(updated);

    if (dto.horariosEstagio !== undefined) {
      const now = new Date();
      await this.horarioRepository.update(
        { idEstagioFk: id, dateDeleted: null as any },
        { dateDeleted: now, dateUpdated: now },
      );

      if (dto.horariosEstagio.length > 0) {
        const horarios = dto.horariosEstagio.map((horario) =>
          EstagioMapper.toHorarioPersistence(id, horario),
        );
        await this.horarioRepository.save(horarios);
      }
    }

    const outputEntity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
      relations: { horariosEstagio: true },
    });

    ensureExists(outputEntity, Estagio.entityName, id);

    return EstagioMapper.toOutputDto(outputEntity);
  }

  async delete(accessContext: AccessContext | null, id: string): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id, dateDeleted: null as any },
    });

    ensureExists(entity, Estagio.entityName, id);

    const now = new Date();
    entity.dateDeleted = now;
    await this.repository.save(entity);

    await this.horarioRepository.update(
      { idEstagioFk: id, dateDeleted: null as any },
      { dateDeleted: now, dateUpdated: now },
    );
  }
}
