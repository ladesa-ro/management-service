import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  BlocoCreateInputDto,
  BlocoFindOneInputDto,
  BlocoFindOneOutputDto,
  BlocoListInputDto,
  BlocoListOutputDto,
  BlocoUpdateInputDto,
} from "@/v2/adapters/in/http/bloco/dto";
import type { BlocoEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import { ArquivoService } from "@/v2/core/arquivo/application/use-cases/arquivo.service";
import { CampusService } from "@/v2/core/campus/application/use-cases/campus.service";
import { ImagemService } from "@/v2/core/imagem/application/use-cases/imagem.service";
import type { IBlocoRepositoryPort } from "../ports";

@Injectable()
export class BlocoService {
  constructor(
    @Inject("IBlocoRepositoryPort")
    private blocoRepository: IBlocoRepositoryPort,
    private campusService: CampusService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  async blocoFindAll(
    accessContext: AccessContext,
    dto: BlocoListInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoListOutputDto> {
    return this.blocoRepository.findAll(accessContext, dto, selection);
  }

  async blocoFindById(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto | null> {
    return this.blocoRepository.findById(accessContext, dto, selection);
  }

  async blocoFindByIdStrict(
    accessContext: AccessContext | null,
    dto: BlocoFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<BlocoFindOneOutputDto> {
    const bloco = await this.blocoRepository.findById(accessContext, dto, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  async blocoFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto | null> {
    return this.blocoRepository.findByIdSimple(accessContext, id, selection);
  }

  async blocoFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<BlocoFindOneOutputDto> {
    const bloco = await this.blocoRepository.findByIdSimple(accessContext, id, selection);

    if (!bloco) {
      throw new NotFoundException();
    }

    return bloco;
  }

  async blocoGetImagemCapa(accessContext: AccessContext | null, id: string) {
    const bloco = await this.blocoFindByIdStrict(accessContext, { id: id });

    if (bloco.imagemCapa) {
      const [versao] = bloco.imagemCapa.versoes;

      if (versao) {
        const { arquivo } = versao;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async blocoUpdateImagemCapa(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
    file: Express.Multer.File,
  ): Promise<boolean> {
    const currentBloco = await this.blocoFindByIdStrict(accessContext, {
      id: dto.id,
    });

    await accessContext.ensurePermission(
      "bloco:update",
      { dto: { id: currentBloco.id } },
      currentBloco.id,
    );

    const { imagem } = await this.imagemService.saveBlocoCapa(file);

    const bloco = {
      id: currentBloco.id,
    } as BlocoEntity;

    this.blocoRepository.merge(bloco, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.blocoRepository.save(bloco);

    return true;
  }

  async blocoCreate(
    accessContext: AccessContext,
    dto: BlocoCreateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    await accessContext.ensurePermission("bloco:create", { dto } as any);

    const dtoBloco = pick(dto, ["nome", "codigo"]);

    const bloco = this.blocoRepository.create();

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    const campus = await this.campusService.campusFindByIdSimpleStrict(
      accessContext,
      dto.campus.id,
    );

    this.blocoRepository.merge(bloco, {
      campus: {
        id: campus.id,
      },
    });

    await this.blocoRepository.save(bloco);

    return this.blocoFindByIdStrict(accessContext, { id: bloco.id });
  }

  async blocoUpdate(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto & BlocoUpdateInputDto,
  ): Promise<BlocoFindOneOutputDto> {
    const currentBloco = await this.blocoFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("bloco:update", { dto }, dto.id);

    const dtoBloco = pick(dto, ["nome", "codigo"]);

    const bloco = {
      id: currentBloco.id,
    } as BlocoEntity;

    this.blocoRepository.merge(bloco, {
      ...dtoBloco,
    });

    await this.blocoRepository.save(bloco);

    return this.blocoFindByIdStrict(accessContext, { id: bloco.id });
  }

  async blocoDeleteOneById(
    accessContext: AccessContext,
    dto: BlocoFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("bloco:delete", { dto }, dto.id);

    const bloco = await this.blocoFindByIdStrict(accessContext, dto);

    if (bloco) {
      await this.blocoRepository.softDeleteById(bloco.id);
    }

    return true;
  }
}
