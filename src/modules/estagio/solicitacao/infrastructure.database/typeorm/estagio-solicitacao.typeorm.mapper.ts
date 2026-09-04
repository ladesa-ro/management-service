import { EstagioSolicitacao } from "../../domain/estagio-solicitacao";
import type { EstagioSolicitacaoTypeormEntity } from "./estagio-solicitacao.typeorm.entity";

export class EstagioSolicitacaoTypeormMapper {
  static toDomain(entity: EstagioSolicitacaoTypeormEntity): EstagioSolicitacao {
    return EstagioSolicitacao.load({
      id: entity.id,
      tipo: entity.tipo,
      situacao: entity.situacao,
      estagiario: { id: entity.estagiario?.id },
      campus: { id: entity.campus?.id },
      professorOrientador: entity.professorOrientador
        ? { id: entity.professorOrientador.id }
        : null,
      localInterno: entity.localInterno,
      descricaoAtividades: entity.descricaoAtividades,
      empresa: entity.empresa ? { id: entity.empresa.id } : null,
      empresaRazaoSocial: entity.empresaRazaoSocial,
      empresaNomeFantasia: entity.empresaNomeFantasia,
      empresaCnpj: entity.empresaCnpj,
      empresaTelefone: entity.empresaTelefone,
      empresaEmail: entity.empresaEmail,
      supervisorNome: entity.supervisorNome,
      supervisorEmail: entity.supervisorEmail,
      supervisorTelefone: entity.supervisorTelefone,
      analista: entity.analista ? { id: entity.analista.id } : null,
      parecerAnalise: entity.parecerAnalise,
      dataAnalise: entity.dataAnalise,
      estagioGerado: entity.estagioGerado ? { id: entity.estagioGerado.id } : null,
      dateCreated: entity.dateCreated,
      dateUpdated: entity.dateUpdated,
      dateDeleted: entity.dateDeleted,
    });
  }

  static toDatabase(domain: EstagioSolicitacao): Partial<EstagioSolicitacaoTypeormEntity> {
    return {
      id: domain.id,
      tipo: domain.tipo,
      situacao: domain.situacao,
      estagiario: { id: domain.estagiario.id } as any,
      campus: { id: domain.campus.id } as any,
      professorOrientador: domain.professorOrientador
        ? ({ id: domain.professorOrientador.id } as any)
        : null,
      localInterno: domain.localInterno,
      descricaoAtividades: domain.descricaoAtividades,
      empresa: domain.empresa ? ({ id: domain.empresa.id } as any) : null,
      empresaRazaoSocial: domain.empresaRazaoSocial,
      empresaNomeFantasia: domain.empresaNomeFantasia,
      empresaCnpj: domain.empresaCnpj,
      empresaTelefone: domain.empresaTelefone,
      empresaEmail: domain.empresaEmail,
      supervisorNome: domain.supervisorNome,
      supervisorEmail: domain.supervisorEmail,
      supervisorTelefone: domain.supervisorTelefone,
      analista: domain.analista ? ({ id: domain.analista.id } as any) : null,
      parecerAnalise: domain.parecerAnalise,
      dataAnalise: domain.dataAnalise,
      estagioGerado: domain.estagioGerado ? ({ id: domain.estagioGerado.id } as any) : null,
      dateCreated: domain.dateCreated,
      dateUpdated: domain.dateUpdated,
      dateDeleted: domain.dateDeleted,
    };
  }
}
