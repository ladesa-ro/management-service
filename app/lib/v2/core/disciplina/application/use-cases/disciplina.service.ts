import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  DisciplinaCreateInputDto,
  DisciplinaFindOneInputDto,
  DisciplinaFindOneOutputDto,
  DisciplinaListInputDto,
  DisciplinaListOutputDto,
  DisciplinaUpdateInputDto,
} from "@/v2/adapters/in/http/disciplina/dto";
import type { DisciplinaEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { IDisciplinaRepositoryPort } from "../ports";

@Injectable()
export class DisciplinaService {
  constructor(
    @Inject("IDisciplinaRepositoryPort")
    private disciplinaRepository: IDisciplinaRepositoryPort,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  async disciplinaFindAll(
    accessContext: AccessContext,
    dto: DisciplinaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<DisciplinaListOutputDto> {
    return this.disciplinaRepository.findAll(accessContext, dto, selection);
  }

  async disciplinaFindById(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null> {
    return this.disciplinaRepository.findById(accessContext, dto, selection);
  }

  async disciplinaFindByIdStrict(
    accessContext: AccessContext | null,
    dto: DisciplinaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto> {
    const disciplina = await this.disciplinaRepository.findById(accessContext, dto, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaFindByIdSimple(
    accessContext: AccessContext,
    id: DisciplinaFindOneInputDto["id"],
    selection?: string[] | boolean,
  ): Promise<DisciplinaFindOneOutputDto | null> {
    return this.disciplinaRepository.findByIdSimple(accessContext, id, selection);
  }

  async disciplinaFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: DisciplinaFindOneInputDto["id"],
    selection?: string[],
  ): Promise<DisciplinaFindOneOutputDto> {
    const disciplina = await this.disciplinaRepository.findByIdSimple(accessContext, id, selection);

    if (!disciplina) {
      throw new NotFoundException();
    }

    return disciplina;
  }

  async disciplinaCreate(
    accessContext: AccessContext,
    dto: DisciplinaCreateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    await accessContext.ensurePermission("disciplina:create", { dto } as any);

    const dtoDisciplina = pick(dto, ["nome", "nomeAbreviado", "cargaHoraria"]);

    const disciplina = this.disciplinaRepository.create();

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    await this.disciplinaRepository.save(disciplina);

    return this.disciplinaFindByIdStrict(accessContext, { id: disciplina.id });
  }

  async disciplinaUpdate(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto & DisciplinaUpdateInputDto,
  ): Promise<DisciplinaFindOneOutputDto> {
    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("disciplina:update", { dto }, dto.id);

    const dtoDisciplina = pick(dto, ["nome", "nomeAbreviado", "cargaHoraria"]);

    const disciplina = {
      id: currentDisciplina.id,
    } as DisciplinaEntity;

    this.disciplinaRepository.merge(disciplina, {
      ...dtoDisciplina,
    });

    await this.disciplinaRepository.save(disciplina);

    return this.disciplinaFindByIdStrict(accessContext, { id: disciplina.id });
  }

  async disciplinaGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const disciplina = await this.disciplinaFindByIdStrict(accessContext, { id: id });

    if (disciplina.imagemCapa) {
      const [versao] = disciplina.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async disciplinaUpdateImagemCapa(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
    file: Express.Multer.File,
  ) {
    const currentDisciplina = await this.disciplinaFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission(
      "disciplina:update",
      {
        dto: {
          id: currentDisciplina.id,
        },
      },
      currentDisciplina.id,
    );

    const { imagem } = await this.imagemService.saveDisciplinaCapa(file);

    const disciplina = this.disciplinaRepository.create();
    this.disciplinaRepository.merge(disciplina, {
      id: currentDisciplina.id,
    });

    this.disciplinaRepository.merge(disciplina, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.disciplinaRepository.save(disciplina);

    return true;
  }

  async disciplinaDeleteOneById(
    accessContext: AccessContext,
    dto: DisciplinaFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("disciplina:delete", { dto }, dto.id);

    const disciplina = await this.disciplinaFindByIdStrict(accessContext, dto);

    if (disciplina) {
      await this.disciplinaRepository.softDeleteById(disciplina.id);
    }

    return true;
  }
}
