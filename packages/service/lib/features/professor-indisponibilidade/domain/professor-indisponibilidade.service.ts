import { PerfilService } from "@/features/perfil/domain/perfil.service";
import { DatabaseContextService } from "@/infrastructure";
import { IDomain } from "@/shared";
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";



@Injectable()
export class ProfessorIndisponibilidadeService {
  constructor(
    private databaseContext: DatabaseContextService,
    private perfilService: PerfilService,
  ) {}

  get professorIndisponibilidadeRepository() {
    return this.databaseContext.indisponibilidadeProfessorRepository;
  }

  get perfilRepository() {
    return this.databaseContext.perfilRepository;
  }

  async findById(
    id: string,
    selection?: string[]
  ): Promise<IDomain.ProfessorIndisponibilidadeView | null> {
    if (!id) throw new BadRequestException("ID é obrigatório");

    const findOptions: any = {
      where: { id },
      relations: ["perfil"]
    };

    if (Array.isArray(selection)) {
      findOptions.select = selection;
    }

    return await this.professorIndisponibilidadeRepository.findOne(findOptions);
  }

  async listByProfessor(idPerfil: string) {
    if (!idPerfil) throw new BadRequestException("id_perfil é obrigatório");

    const perfil = await this.perfilRepository.findOne({
      where: { id: idPerfil }
    });

    if (!perfil) throw new NotFoundException("Perfil não encontrado");

    const items = await this.professorIndisponibilidadeRepository.find({
      where: { perfil: { id: idPerfil } },
      relations: ["perfil"],
    });

    return { items, total: items.length };
  }

  async create(
    idPerfil: string,
    input: IDomain.ProfessorIndisponibilidadeCreateInput
  ) {
    if (!idPerfil) throw new BadRequestException("id_perfil é obrigatório");

    const perfil = await this.perfilRepository.findOne({
      where: { id: idPerfil }
    });

    if (!perfil) throw new NotFoundException("Perfil não encontrado");

    // Criar a entidade a partir do input
    const entity = this.professorIndisponibilidadeRepository.create({
      ...input,
      perfil,
    });

    const created = await this.professorIndisponibilidadeRepository.save(entity);

    const item = await this.professorIndisponibilidadeRepository.findOne({
      where: { id: created.id },
      relations: ["perfil"]
    });

    return { item };
  }

  async update(
    id: string,
    input: IDomain.ProfessorIndisponibilidadeUpdateInput
  ) {
    if (!id) throw new BadRequestException("ID é obrigatório");

    const existing = await this.professorIndisponibilidadeRepository.findOne({
      where: { id },
      relations: ["perfil"]
    });

    if (!existing) throw new NotFoundException("Registro não encontrado");

    const updated = await this.professorIndisponibilidadeRepository.save({
      ...existing,
      ...input,
    });

    return { item: updated };
  }

  async delete(id: string): Promise<boolean> {
    if (!id) throw new BadRequestException("ID é obrigatório");

    const existing = await this.professorIndisponibilidadeRepository.findOne({
      where: { id }
    });

    if (!existing) throw new NotFoundException("Registro não encontrado");

    if (typeof this.professorIndisponibilidadeRepository.softDelete === "function") {
      await this.professorIndisponibilidadeRepository.softDelete(id);
    } else {
      await this.professorIndisponibilidadeRepository.delete(id);
    }

    return true;
  }
}
