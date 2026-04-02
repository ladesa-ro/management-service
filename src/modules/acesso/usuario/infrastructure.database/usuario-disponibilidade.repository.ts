import type { FindOptionsWhere } from "typeorm";
import { Dep, Impl } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type {
  IUsuarioDisponibilidadeItem,
  IUsuarioDisponibilidadeRepository,
  IUsuarioDisponibilidadeSetInput,
} from "@/modules/acesso/usuario/domain/repositories/usuario-disponibilidade.repository.interface";
import { PerfilEntity } from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/calendario/agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "@/modules/calendario/agendamento/infrastructure.database/typeorm/calendario-agendamento-professor.typeorm.entity";

@Impl()
export class UsuarioDisponibilidadeTypeOrmRepositoryAdapter
  implements IUsuarioDisponibilidadeRepository
{
  constructor(
    @Dep(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findPerfilIdsByUsuario(usuarioId: string, campusId?: string): Promise<string[]> {
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);

    const where: Record<string, unknown> = { usuario: { id: usuarioId } };
    if (campusId) {
      where.campus = { id: campusId };
    }

    const perfis = await perfilRepo.find({ where: where as FindOptionsWhere<PerfilEntity> });
    return perfis.map((p) => p.id);
  }

  async findPerfilIdByUsuario(usuarioId: string, campusId?: string): Promise<string | null> {
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);

    const where: Record<string, unknown> = { usuario: { id: usuarioId } };
    if (campusId) {
      where.campus = { id: campusId };
    }

    const perfil = await perfilRepo.findOne({ where: where as FindOptionsWhere<PerfilEntity> });
    return perfil?.id ?? null;
  }

  async findIndisponibilidadesByPerfilIds(
    perfilIds: string[],
  ): Promise<IUsuarioDisponibilidadeItem[]> {
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );

    const junctions = await junctionRepo
      .createQueryBuilder("cap")
      .leftJoinAndSelect("cap.calendarioAgendamento", "ca")
      .where("cap.id_perfil_fk IN (:...perfilIds)", { perfilIds })
      .andWhere("ca.tipo = :tipo", { tipo: CalendarioAgendamentoTipo.INDISPONIBILIDADE })
      .andWhere("(ca.status IS NULL OR ca.status != :inativo)", {
        inativo: CalendarioAgendamentoStatus.INATIVO,
      })
      .getMany();

    return junctions.map((j) => {
      const ca = j.calendarioAgendamento;
      return {
        id: ca.id,
        dataInicio: String(ca.dataInicio),
        dataFim: ca.dataFim ? String(ca.dataFim) : null,
        diaInteiro: ca.diaInteiro,
        horarioInicio: ca.horarioInicio,
        horarioFim: ca.horarioFim,
        repeticao: ca.repeticao,
      };
    });
  }

  async replaceIndisponibilidades(
    perfilId: string,
    items: IUsuarioDisponibilidadeSetInput[],
  ): Promise<void> {
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );
    const agendamentoRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);

    // Find existing indisponibilidade junctions for this perfil
    const existingJunctions = await junctionRepo
      .createQueryBuilder("cap")
      .leftJoinAndSelect("cap.calendarioAgendamento", "ca")
      .where("cap.id_perfil_fk = :perfilId", { perfilId })
      .andWhere("ca.tipo = :tipo", { tipo: CalendarioAgendamentoTipo.INDISPONIBILIDADE })
      .getMany();

    // Inactivate old agendamentos
    for (const j of existingJunctions) {
      j.calendarioAgendamento.status = CalendarioAgendamentoStatus.INATIVO;
      await agendamentoRepo.save(j.calendarioAgendamento);
    }

    // Delete old junctions
    for (const j of existingJunctions) {
      await junctionRepo.remove(j);
    }

    // Create new indisponibilidades
    for (const item of items) {
      const agendamento = new CalendarioAgendamentoEntity();
      agendamento.id = generateUuidV7();
      agendamento.tipo = CalendarioAgendamentoTipo.INDISPONIBILIDADE;
      agendamento.nome = null;
      agendamento.dataInicio = item.dataInicio;
      agendamento.dataFim = item.dataFim ?? null;
      agendamento.diaInteiro = item.diaInteiro;
      agendamento.horarioInicio = item.horarioInicio ?? "00:00:00";
      agendamento.horarioFim = item.horarioFim ?? "23:59:59";
      agendamento.repeticao = item.repeticao ?? null;
      agendamento.cor = null;
      agendamento.status = CalendarioAgendamentoStatus.ATIVO;
      await agendamentoRepo.save(agendamento);

      const junction = new CalendarioAgendamentoProfessorEntity();
      junction.id = generateUuidV7();
      Object.assign(junction, {
        perfil: { id: perfilId },
        calendarioAgendamento: { id: agendamento.id },
      });
      await junctionRepo.save(junction);
    }
  }
}
