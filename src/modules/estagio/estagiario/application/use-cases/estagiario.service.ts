import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import type {
  EstagiarioCreateInputDto,
  EstagiarioFindOneInputDto,
  EstagiarioFindOneOutputDto,
  EstagiarioListInputDto,
  EstagiarioListOutputDto,
  EstagiarioUpdateInputDto,
} from "@/modules/estagio/estagiario/application/dtos";
import {
  type IEstagiarioRepositoryPort,
  type IEstagiarioUseCasePort,
  ESTAGIARIO_REPOSITORY_PORT,
} from "@/modules/estagio/estagiario/application/ports";

@Injectable()
export class EstagiarioService implements IEstagiarioUseCasePort {
  constructor(
    @Inject(ESTAGIARIO_REPOSITORY_PORT)
    private estagiarioRepository: IEstagiarioRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: EstagiarioListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EstagiarioListOutputDto> {
    return this.estagiarioRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: EstagiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EstagiarioFindOneOutputDto | null> {
    return this.estagiarioRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: EstagiarioFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EstagiarioFindOneOutputDto> {
    const estagiario = await this.estagiarioRepository.findById(accessContext, dto, selection);

    if (!estagiario) {
      throw new ResourceNotFoundError("Estagiario", dto.id);
    }

    return estagiario;
  }

  async create(
    accessContext: AccessContext,
    dto: EstagiarioCreateInputDto,
  ): Promise<EstagiarioFindOneOutputDto> {
    try {
      return await this.estagiarioRepository.create(accessContext, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao criar estagiário");
    }
  }

  async update(
    accessContext: AccessContext,
    id: string,
    dto: EstagiarioUpdateInputDto,
  ): Promise<EstagiarioFindOneOutputDto> {
    try {
      return await this.estagiarioRepository.update(accessContext, id, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao atualizar estagiário");
    }
  }

  async delete(accessContext: AccessContext, id: string): Promise<void> {
    try {
      await this.estagiarioRepository.delete(accessContext, id);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao deletar estagiário");
    }
  }
}
