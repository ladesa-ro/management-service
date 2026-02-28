import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import type { AccessContext } from "@/modules/@seguranca/contexto-acesso";
import { ResourceNotFoundError } from "@/modules/@shared";
import type {
  EmpresaCreateInputDto,
  EmpresaFindOneInputDto,
  EmpresaFindOneOutputDto,
  EmpresaListInputDto,
  EmpresaListOutputDto,
  EmpresaUpdateInputDto,
} from "@/modules/estagio/empresa/application/dtos";
import {
  type IEmpresaRepositoryPort,
  type IEmpresaUseCasePort,
  EMPRESA_REPOSITORY_PORT,
} from "@/modules/estagio/empresa/application/ports";

@Injectable()
export class EmpresaService implements IEmpresaUseCasePort {
  constructor(
    @Inject(EMPRESA_REPOSITORY_PORT)
    private empresaRepository: IEmpresaRepositoryPort,
  ) {}

  async findAll(
    accessContext: AccessContext,
    dto: EmpresaListInputDto | null = null,
    selection?: string[] | boolean,
  ): Promise<EmpresaListOutputDto> {
    return this.empresaRepository.findAll(accessContext, dto, selection);
  }

  async findById(
    accessContext: AccessContext | null,
    dto: EmpresaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EmpresaFindOneOutputDto | null> {
    return this.empresaRepository.findById(accessContext, dto, selection);
  }

  async findByIdStrict(
    accessContext: AccessContext | null,
    dto: EmpresaFindOneInputDto,
    selection?: string[] | boolean,
  ): Promise<EmpresaFindOneOutputDto> {
    const empresa = await this.empresaRepository.findById(accessContext, dto, selection);

    if (!empresa) {
      throw new ResourceNotFoundError("Empresa", dto.id);
    }

    return empresa;
  }

  async create(
    accessContext: AccessContext,
    dto: EmpresaCreateInputDto,
  ): Promise<EmpresaFindOneOutputDto> {
    try {
      return await this.empresaRepository.create(accessContext, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao criar empresa");
    }
  }

  async update(
    accessContext: AccessContext,
    id: string,
    dto: EmpresaUpdateInputDto,
  ): Promise<EmpresaFindOneOutputDto> {
    try {
      return await this.empresaRepository.update(accessContext, id, dto);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao atualizar empresa");
    }
  }

  async delete(accessContext: AccessContext, id: string): Promise<void> {
    try {
      await this.empresaRepository.delete(accessContext, id);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw error;
      }
      throw new InternalServerErrorException("Erro ao deletar empresa");
    }
  }
}
