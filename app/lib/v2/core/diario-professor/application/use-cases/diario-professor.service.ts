import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import { DiarioService } from "@/v2/core/diario/application/use-cases/diario.service";
import { PerfilService } from "@/v2/core/perfil/application/use-cases/perfil.service";
import type { AccessContext } from "@/infrastructure/access-context";
import type { DiarioProfessorEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type {
  DiarioProfessorCreateInputDto,
  DiarioProfessorFindOneInputDto,
  DiarioProfessorFindOneOutputDto,
  DiarioProfessorListInputDto,
  DiarioProfessorListOutputDto,
  DiarioProfessorUpdateInputDto,
} from "@/v2/adapters/in/http/diario-professor/dto";
import type { IDiarioProfessorRepositoryPort } from "../ports";

@Injectable()
export class DiarioProfessorService {
  constructor(
    @Inject("IDiarioProfessorRepositoryPort")
    private diarioProfessorRepository: IDiarioProfessorRepositoryPort,
    private diarioService: DiarioService,
    private perfilService: PerfilService,
  ) {}

  async diarioProfessorFindAll(
    accessContext: AccessContext,
    dto: DiarioProfessorListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorListOutputDto> {
    return this.diarioProfessorRepository.findAll(accessContext, dto, selection);
  }

  async diarioProfessorFindById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    return this.diarioProfessorRepository.findById(accessContext, dto, selection);
  }

  async diarioProfessorFindByIdStrict(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const diarioProfessor = await this.diarioProfessorRepository.findById(accessContext, dto, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorFindByIdSimple(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto | null> {
    return this.diarioProfessorRepository.findByIdSimple(accessContext, id, selection);
  }

  async diarioProfessorFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DiarioProfessorFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const diarioProfessor = await this.diarioProfessorRepository.findByIdSimple(accessContext, id, selection);

    if (!diarioProfessor) {
      throw new NotFoundException();
    }

    return diarioProfessor;
  }

  async diarioProfessorCreate(
    accessContext: AccessContext,
    dto: DiarioProfessorCreateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    await accessContext.ensurePermission("diario_professor:create", { dto } as any);

    const dtoDiarioProfessor = pick(dto, ["situacao"]);

    const diarioProfessor = this.diarioProfessorRepository.create();

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    if (has(dto, "diario") && dto.diario !== undefined) {
      if (dto.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    if (has(dto, "perfil") && dto.perfil !== undefined) {
      if (dto.perfil !== null) {
        const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, {
          id: dto.perfil.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          perfil: {
            id: perfil.id,
          },
        });
      }
    }

    await this.diarioProfessorRepository.save(diarioProfessor);

    return this.diarioProfessorFindByIdStrict(accessContext, {
      id: diarioProfessor.id,
    });
  }

  async diarioProfessorUpdate(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto & DiarioProfessorUpdateInputDto,
  ): Promise<DiarioProfessorFindOneOutputDto> {
    const currentDiarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("diario_professor:update", { dto }, dto.id);

    const dtoDiarioProfessor = pick(dto, ["situacao"]);

    const diarioProfessor = {
      id: currentDiarioProfessor.id,
    } as DiarioProfessorEntity;

    this.diarioProfessorRepository.merge(diarioProfessor, {
      ...dtoDiarioProfessor,
    });

    if (has(dto, "diario") && dto.diario !== undefined) {
      if (dto.diario !== null) {
        const diario = await this.diarioService.diarioFindByIdStrict(accessContext, {
          id: dto.diario.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          diario: {
            id: diario.id,
          },
        });
      }
    }

    if (has(dto, "perfil") && dto.perfil !== undefined) {
      if (dto.perfil !== null) {
        const perfil = await this.perfilService.perfilFindByIdStrict(accessContext, {
          id: dto.perfil.id,
        });

        this.diarioProfessorRepository.merge(diarioProfessor, {
          perfil: {
            id: perfil.id,
          },
        });
      }
    }

    await this.diarioProfessorRepository.save(diarioProfessor);

    return this.diarioProfessorFindByIdStrict(accessContext, {
      id: diarioProfessor.id,
    });
  }

  async diarioProfessorDeleteOneById(
    accessContext: AccessContext,
    dto: DiarioProfessorFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("diario_professor:delete", { dto }, dto.id);

    const diarioProfessor = await this.diarioProfessorFindByIdStrict(accessContext, dto);

    if (diarioProfessor) {
      await this.diarioProfessorRepository.softDeleteById(diarioProfessor.id);
    }

    return true;
  }
}
