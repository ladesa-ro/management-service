import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/infrastructure/access-context";
import type {
  ModalidadeCreateInputDto,
  ModalidadeFindOneInputDto,
  ModalidadeFindOneOutputDto,
  ModalidadeListInputDto,
  ModalidadeListOutputDto,
  ModalidadeUpdateInputDto,
} from "@/v2/adapters/in/http/modalidade/dto";
import type { ModalidadeEntity } from "@/v2/adapters/out/persistence/typeorm/typeorm/entities";
import type { IModalidadeRepositoryPort } from "../ports";

@Injectable()
export class ModalidadeService {
  constructor(
    @Inject("IModalidadeRepositoryPort")
    private modalidadeRepository: IModalidadeRepositoryPort,
  ) {}

  async modalidadeFindAll(
    accessContext: AccessContext,
    dto: ModalidadeListInputDto | null = null,
    selection?: string[],
  ): Promise<ModalidadeListOutputDto> {
    return this.modalidadeRepository.findAll(accessContext, dto, selection);
  }

  async modalidadeFindById(
    accessContext: AccessContext | null,
    dto: ModalidadeFindOneInputDto,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null> {
    return this.modalidadeRepository.findById(accessContext, dto, selection);
  }

  async modalidadeFindByIdStrict(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto> {
    const modalidade = await this.modalidadeRepository.findById(accessContext, dto, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeFindByIdSimple(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto | null> {
    return this.modalidadeRepository.findByIdSimple(accessContext, id, selection);
  }

  async modalidadeFindByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
    selection?: string[],
  ): Promise<ModalidadeFindOneOutputDto> {
    const modalidade = await this.modalidadeRepository.findByIdSimple(accessContext, id, selection);

    if (!modalidade) {
      throw new NotFoundException();
    }

    return modalidade;
  }

  async modalidadeCreate(
    accessContext: AccessContext,
    dto: ModalidadeCreateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    await accessContext.ensurePermission("modalidade:create", { dto } as any);

    const dtoModalidade = pick(dto, ["nome", "slug"]);

    const modalidade = this.modalidadeRepository.create();

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    await this.modalidadeRepository.save(modalidade);

    return this.modalidadeFindByIdStrict(accessContext, { id: modalidade.id });
  }

  async modalidadeUpdate(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto & ModalidadeUpdateInputDto,
  ): Promise<ModalidadeFindOneOutputDto> {
    const currentModalidade = await this.modalidadeFindByIdStrict(accessContext, { id: dto.id });

    await accessContext.ensurePermission("modalidade:update", { dto }, dto.id);

    const dtoModalidade = pick(dto, ["nome", "slug"]);

    const modalidade = <ModalidadeEntity>{
      id: currentModalidade.id,
    };

    this.modalidadeRepository.merge(modalidade, {
      ...dtoModalidade,
    });

    await this.modalidadeRepository.save(modalidade);

    return this.modalidadeFindByIdStrict(accessContext, { id: modalidade.id });
  }

  async modalidadeDeleteOneById(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInputDto,
  ): Promise<boolean> {
    await accessContext.ensurePermission("modalidade:delete", { dto }, dto.id);

    const modalidade = await this.modalidadeFindByIdStrict(accessContext, dto);

    if (modalidade) {
      await this.modalidadeRepository.softDeleteById(modalidade.id);
    }

    return true;
  }
}
