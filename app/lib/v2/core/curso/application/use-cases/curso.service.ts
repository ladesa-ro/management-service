import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { has, pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  CursoCreateInputDto,
  CursoFindOneInputDto,
  CursoFindOneOutputDto,
  CursoListInputDto,
  CursoListOutputDto,
  CursoUpdateInputDto,
} from "@/v2/adapters/in/http/curso/dto";
import type { CursoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import { OfertaFormacaoService } from "@/v2/core/oferta-formacao/application/use-cases/oferta-formacao.service";
import type { ICursoRepositoryPort, ICursoUseCasePort } from "../ports";

@Injectable()
export class CursoService implements ICursoUseCasePort {
  constructor(
    @Inject("ICursoRepositoryPort")
    private cursoRepository: ICursoRepositoryPort,
    private campusService: CampusService,
    private ofertaFormacaoService: OfertaFormacaoService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  async cursoFindAll(
    accessContext: AccessContext,
    dto: CursoListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<CursoListOutputDto> {
    return this.cursoRepository.findAll(accessContext, dto, selection);
  }

  async cursoFindById(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto | null> {
    return this.cursoRepository.findById(accessContext, dto, selection);
  }

  async cursoFindByIdStrict(
    accessContext: AccessContext | null,
    dto: CursoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<CursoFindOneOutputDto> {
    const curso = await this.cursoRepository.findById(accessContext, dto, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  async cursoFindByIdSimple(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto | null> {
    return this.cursoRepository.findByIdSimple(accessContext, id, selection);
  }

  async cursoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: CursoFindOneInputDto["id"],
    selection?: string[],
  ): Promise<CursoFindOneOutputDto> {
    const curso = await this.cursoRepository.findByIdSimple(accessContext, id, selection);

    if (!curso) {
      throw new NotFoundException();
    }

    return curso;
  }

  async cursoCreate(
    accessContext: AccessContext,
    dto: CursoCreateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    await accessContext.ensurePermission("curso:create", { dto } as any);

    const dtoCurso = pick(dto, ["nome", "nomeAbreviado"]);

    const curso = this.cursoRepository.create();

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    const campus = await this.campusService.campusFindByIdSimpleStrict(
      accessContext,
      dto.campus.id,
    );

    this.cursoRepository.merge(curso, {
      campus: {
        id: campus.id,
      },
    });

    const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
      accessContext,
      dto.ofertaFormacao.id,
    );

    this.cursoRepository.merge(curso, {
      ofertaFormacao: {
        id: ofertaFormacao.id,
      },
    });

    await this.cursoRepository.save(curso);

    return this.cursoFindByIdStrict(accessContext, { id: curso.id });
  }

  async cursoUpdate(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto & CursoUpdateInputDto,
  ): Promise<CursoFindOneOutputDto> {
    const currentCurso = await this.cursoFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("curso:update", { dto }, dto.id);

    const dtoCurso = pick(dto, ["nome", "nomeAbreviado"]);

    const curso = {
      id: currentCurso.id,
    } as CursoEntity;

    this.cursoRepository.merge(curso, {
      ...dtoCurso,
    });

    if (has(dto, "campus") && dto.campus !== undefined) {
      const campus = await this.campusService.campusFindByIdSimpleStrict(
        accessContext,
        dto.campus.id,
      );

      this.cursoRepository.merge(curso, {
        campus: {
          id: campus.id,
        },
      });
    }

    if (has(dto, "ofertaFormacao") && dto.ofertaFormacao !== undefined) {
      const ofertaFormacao = await this.ofertaFormacaoService.ofertaFormacaoFindByIdSimpleStrict(
        accessContext,
        dto.ofertaFormacao.id,
      );

      this.cursoRepository.merge(curso, {
        ofertaFormacao: {
          id: ofertaFormacao.id,
        },
      });
    }

    await this.cursoRepository.save(curso);

    return this.cursoFindByIdStrict(accessContext, { id: curso.id });
  }

  async cursoGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const curso = await this.cursoFindByIdStrict(accessContext, { id: id });

    if (curso.imagemCapa) {
      const [versao] = curso.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async cursoUpdateImagemCapa(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
    file: Express.Multer.File,
  ) {
    const currentCurso = await this.cursoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission(
      "curso:update",
      {
        dto: {
          id: currentCurso.id,
        },
      },
      currentCurso.id,
    );

    const { imagem } = await this.imagemService.saveCursoCapa(file);

    const curso = this.cursoRepository.create();
    this.cursoRepository.merge(curso, {
      id: currentCurso.id,
    });

    this.cursoRepository.merge(curso, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.cursoRepository.save(curso);

    return true;
  }

  async cursoDeleteOneById(
    accessContext: AccessContext,
    dto: CursoFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("curso:delete", { dto }, dto.id);

    const curso = await this.cursoFindByIdStrict(accessContext, dto);

    if (curso) {
      await this.cursoRepository.softDeleteById(curso.id);
    }

    return true;
  }
}
