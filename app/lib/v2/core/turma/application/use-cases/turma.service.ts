import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  TurmaCreateInputDto,
  TurmaFindOneInputDto,
  TurmaFindOneOutputDto,
  TurmaListInputDto,
  TurmaListOutputDto,
  TurmaUpdateInputDto,
} from "@/v2/adapters/in/http/turma/dto";
import type { TurmaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { AmbienteService } from "@/v2/core/ambiente/application/use-cases/ambiente.service";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CursoService } from "@/v2/core/curso/application/use-cases/curso.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { ITurmaRepositoryPort, ITurmaUseCasePort } from "../ports";

@Injectable()
export class TurmaService implements ITurmaUseCasePort {
  constructor(
    @Inject("ITurmaRepositoryPort")
    private turmaRepository: ITurmaRepositoryPort,
    private ambienteService: AmbienteService,
    private cursoService: CursoService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  async turmaFindAll(
    accessContext: AccessContext,
    dto: TurmaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<TurmaListOutputDto> {
    return this.turmaRepository.findAll(accessContext, dto, selection);
  }

  async turmaFindById(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto | null> {
    return this.turmaRepository.findById(accessContext, dto, selection);
  }

  async turmaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: TurmaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<TurmaFindOneOutputDto> {
    const turma = await this.turmaRepository.findById(accessContext, dto, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaFindByIdSimple(
    accessContext: AccessContext,
    id: TurmaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto | null> {
    return this.turmaRepository.findByIdSimple(accessContext, id, selection);
  }

  async turmaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: TurmaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<TurmaFindOneOutputDto> {
    const turma = await this.turmaRepository.findByIdSimple(accessContext, id, selection);

    if (!turma) {
      throw new NotFoundException();
    }

    return turma;
  }

  async turmaCreate(
    accessContext: AccessContext,
    dto: TurmaCreateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    await accessContext.ensurePermission("turma:create", { dto } as any);

    const dtoTurma = pick(dto, ["periodo"]);

    const turma = this.turmaRepository.create();

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    if (dto.ambientePadraoAula) {
      const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(accessContext, {
        id: dto.ambientePadraoAula.id,
      });

      this.turmaRepository.merge(turma, {
        ambientePadraoAula: {
          id: ambientePadraoAula.id,
        },
      });
    } else {
      this.turmaRepository.merge(turma, {
        ambientePadraoAula: null,
      });
    }

    const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, dto.curso.id);

    this.turmaRepository.merge(turma, {
      curso: {
        id: curso.id,
      },
    });

    await this.turmaRepository.save(turma);

    return this.turmaFindByIdStrict(accessContext, { id: turma.id });
  }

  async turmaUpdate(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto & TurmaUpdateInputDto,
  ): Promise<TurmaFindOneOutputDto> {
    const currentTurma = await this.turmaFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("turma:update", { dto }, dto.id);

    const dtoTurma = pick(dto, ["periodo"]);

    const turma = {
      id: currentTurma.id,
    } as TurmaEntity;

    this.turmaRepository.merge(turma, {
      ...dtoTurma,
    });

    if (has(dto, "ambientePadraoAula") && dto.ambientePadraoAula !== undefined) {
      if (dto.ambientePadraoAula !== null) {
        const ambientePadraoAula = await this.ambienteService.ambienteFindByIdStrict(
          accessContext,
          {
            id: dto.ambientePadraoAula.id,
          },
        );

        this.turmaRepository.merge(turma, {
          ambientePadraoAula: {
            id: ambientePadraoAula.id,
          },
        });
      } else {
        this.turmaRepository.merge(turma, {
          ambientePadraoAula: null,
        });
      }
    }

    if (has(dto, "curso") && dto.curso !== undefined) {
      const curso = await this.cursoService.cursoFindByIdSimpleStrict(accessContext, dto.curso.id);

      this.turmaRepository.merge(turma, {
        curso: {
          id: curso.id,
        },
      });
    }

    await this.turmaRepository.save(turma);

    return this.turmaFindByIdStrict(accessContext, { id: turma.id });
  }

  async turmaGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const turma = await this.turmaFindByIdStrict(accessContext, { id: id });

    if (turma.imagemCapa) {
      const [versao] = turma.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async turmaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentTurma = await this.turmaFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "turma:update",
      {
        dto: {
          id: currentTurma.id,
        },
      },
      currentTurma.id,
    );

    const { imagem } = await this.imagemService.saveTurmaCapa(file);

    const turma = this.turmaRepository.create();
    this.turmaRepository.merge(turma, {
      id: currentTurma.id,
    });

    this.turmaRepository.merge(turma, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.turmaRepository.save(turma);

    return true;
  }

  async turmaDeleteOneById(
    accessContext: AccessContext,
    dto: TurmaFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("turma:delete", { dto }, dto.id);

    const turma = await this.turmaFindByIdStrict(accessContext, dto);

    if (turma) {
      await this.turmaRepository.softDeleteById(turma.id);
    }

    return true;
  }
}
