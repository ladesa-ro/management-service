import { PerfilService } from "@/features/perfil/domain/perfil.service";
import { DatabaseContextService } from "@/infrastructure";
import { IDomain } from "@/shared";
import { Injectable } from "@nestjs/common";

//todo: implementar as funções de CRUD
@Injectable()
export class ProfessorIndisponibilidadeService {

  constructor(
  private databaseContext: DatabaseContextService,
  private perfilservice: PerfilService,
  ) {}

  get ProfessorIndisponibilidadeRepository() {
    return this.databaseContext.indisponibilidadeProfessorRepository;
  }
  
  get perfilRepository() {
    return this.databaseContext.perfilRepository;
  }

  async professorIndisponibilidadeById(accessContext: any, domain: IDomain.ProfessorDisponibilidadeView, selection?: string[] | boolean): Promise<IDomain

}
