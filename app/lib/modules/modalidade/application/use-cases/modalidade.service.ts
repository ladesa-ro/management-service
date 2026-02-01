import { Inject, Injectable } from "@nestjs/common";
import { pick } from "lodash";
import type { AccessContext } from "@/modules/@core/access-context";
import { ResourceNotFoundError } from "@/modules/@shared";
import {
  ModalidadeCreateInput,
  ModalidadeFindOneInput,
  ModalidadeFindOneOutput,
  ModalidadeListInput,
  ModalidadeListOutput,
  ModalidadeUpdateInput,
} from "@/modules/modalidade/application/dtos";
import {
  type IModalidadeRepositoryPort,
  type IModalidadeUseCasePort,
  MODALIDADE_REPOSITORY_PORT,
} from "@/modules/modalidade/application/ports";

@Injectable()
export class ModalidadeService implements IModalidadeUseCasePort {
  constructor(
    @Inject(MODALIDADE_REPOSITORY_PORT)
    private readonly modalidadeRepository: IModalidadeRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: ModalidadeListInput | null = null,
  ): Promise<ModalidadeListOutput> {
    return this.modalidadeRepository.findAll(accessContext, dto);
  }

  async findById(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInput,
  ): Promise<ModalidadeFindOneOutput | null> {
    return this.modalidadeRepository.findById(accessContext, dto);
  }

  async findByIdStrict(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInput,
  ): Promise<ModalidadeFindOneOutput> {
    const modalidade = await this.modalidadeRepository.findById(accessContext, dto);

    if (!modalidade) {
      throw new ResourceNotFoundError("Modalidade", dto.id);
    }

    return modalidade;
  }

  async create(
    accessContext: AccessContext,
    dto: ModalidadeCreateInput,
  ): Promise<ModalidadeFindOneOutput> {
    const dtoModalidade = pick(dto, ["nome", "slug"]);

    const modalidade = this.modalidadeRepository.create();
    this.modalidadeRepository.merge(modalidade, { ...dtoModalidade });

    await this.modalidadeRepository.save(modalidade);

    return this.findByIdStrict(accessContext, { id: modalidade.id });
  }

  async update(
    accessContext: AccessContext,
    dto: ModalidadeFindOneInput & ModalidadeUpdateInput,
  ): Promise<ModalidadeFindOneOutput> {
    const modalidade = await this.findByIdStrict(accessContext, { id: dto.id });

    const dtoModalidade = pick(dto, ["nome", "slug"]);
    const entity = this.modalidadeRepository.create();
    this.modalidadeRepository.merge(entity, { id: modalidade.id, ...dtoModalidade });

    await this.modalidadeRepository.save(entity);

    return this.findByIdStrict(accessContext, { id: dto.id });
  }

  async deleteOneById(accessContext: AccessContext, dto: ModalidadeFindOneInput): Promise<boolean> {
    await this.findByIdStrict(accessContext, dto);
    await this.modalidadeRepository.softDeleteById(dto.id);
    return true;
  }

  async findByIdSimpleStrict(
    accessContext: AccessContext,
    id: string,
  ): Promise<ModalidadeFindOneOutput> {
    return this.findByIdStrict(accessContext, { id });
  }
}
