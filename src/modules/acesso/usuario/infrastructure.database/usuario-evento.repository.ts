import type { FindOptionsWhere } from "typeorm";
import { DeclareDependency, DeclareImplementation } from "@/domain/dependency-injection";
import { generateUuidV7 } from "@/domain/entities/utils/generate-uuid-v7";
import { IAppTypeormConnection } from "@/infrastructure.database/typeorm/connection/app-typeorm-connection.interface";
import type {
  IUsuarioEventoCreateInput,
  IUsuarioEventoItem,
  IUsuarioEventoRepository,
  IUsuarioEventoUpdateInput,
} from "@/modules/acesso/usuario/domain/repositories/usuario-evento.repository.interface";
import { PerfilEntity } from "@/modules/acesso/usuario/perfil/infrastructure.database/typeorm/perfil.typeorm.entity";
import {
  CalendarioAgendamentoEntity,
  CalendarioAgendamentoStatus,
  CalendarioAgendamentoTipo,
} from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento.typeorm.entity";
import { CalendarioAgendamentoProfessorEntity } from "@/modules/horarios/calendario-agendamento/infrastructure.database/typeorm/calendario-agendamento-professor.typeorm.entity";

@DeclareImplementation()
export class UsuarioEventoTypeOrmRepositoryAdapter implements IUsuarioEventoRepository {
  constructor(
    @DeclareDependency(IAppTypeormConnection)
    private readonly appTypeormConnection: IAppTypeormConnection,
  ) {}

  async findPerfilIdsByUsuario(usuarioId: string): Promise<string[]> {
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);
    const perfis = await perfilRepo.find({
      where: { usuario: { id: usuarioId } } as FindOptionsWhere<PerfilEntity>,
    });
    return perfis.map((p) => p.id);
  }

  async findPerfilIdByUsuario(usuarioId: string): Promise<string | null> {
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);
    const perfil = await perfilRepo.findOneBy({
      usuario: { id: usuarioId },
    } as FindOptionsWhere<PerfilEntity>);

    return perfil?.id ?? null;
  }

  async findEventosByPerfilIds(perfilIds: string[]): Promise<IUsuarioEventoItem[]> {
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );

    const junctions = await junctionRepo
      .createQueryBuilder("cap")
      .leftJoinAndSelect("cap.calendarioAgendamento", "ca")
      .where("cap.id_perfil_fk IN (:...perfilIds)", { perfilIds })
      .getMany();

    return junctions
      .filter((j) => j.calendarioAgendamento?.status !== CalendarioAgendamentoStatus.INATIVO)
      .map((j) => this.toEventoItem(j.calendarioAgendamento));
  }

  async createEvento(
    perfilId: string | null,
    input: IUsuarioEventoCreateInput,
  ): Promise<IUsuarioEventoItem> {
    const agendamentoRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );

    const tipo =
      input.tipo === "INDISPONIBILIDADE"
        ? CalendarioAgendamentoTipo.INDISPONIBILIDADE
        : CalendarioAgendamentoTipo.EVENTO;

    const evento = new CalendarioAgendamentoEntity();
    evento.id = generateUuidV7();
    evento.tipo = tipo;
    evento.nome = input.nome;
    evento.dataInicio = input.dataInicio;
    evento.dataFim = input.dataFim ?? null;
    evento.diaInteiro = input.diaInteiro;
    evento.horarioInicio = input.horarioInicio ?? "00:00:00";
    evento.horarioFim = input.horarioFim ?? "23:59:59";
    evento.cor = input.cor ?? null;
    evento.repeticao = input.repeticao ?? null;
    evento.status = CalendarioAgendamentoStatus.ATIVO;
    await agendamentoRepo.save(evento);

    if (perfilId) {
      const junction = new CalendarioAgendamentoProfessorEntity();
      junction.id = generateUuidV7();
      Object.assign(junction, {
        perfil: { id: perfilId },
        calendarioAgendamento: { id: evento.id },
      });
      await junctionRepo.save(junction);
    }

    return this.toEventoItem(evento);
  }

  async updateEvento(
    eventoId: string,
    input: IUsuarioEventoUpdateInput,
  ): Promise<IUsuarioEventoItem | null> {
    const agendamentoRepo = this.appTypeormConnection.getRepository(CalendarioAgendamentoEntity);
    const entity = await agendamentoRepo.findOneBy({ id: eventoId });

    if (!entity) {
      return null;
    }

    if (input.nome !== undefined) entity.nome = input.nome;
    if (input.dataInicio !== undefined) entity.dataInicio = input.dataInicio;
    if (input.dataFim !== undefined) entity.dataFim = input.dataFim ?? null;
    if (input.diaInteiro !== undefined) entity.diaInteiro = input.diaInteiro;
    if (input.horarioInicio !== undefined) entity.horarioInicio = input.horarioInicio;
    if (input.horarioFim !== undefined) entity.horarioFim = input.horarioFim;
    if (input.cor !== undefined) entity.cor = input.cor ?? null;
    if (input.repeticao !== undefined) entity.repeticao = input.repeticao ?? null;

    await agendamentoRepo.save(entity);
    return this.toEventoItem(entity);
  }

  async deleteEventoForUsuario(usuarioId: string, eventoId: string): Promise<void> {
    const perfilRepo = this.appTypeormConnection.getRepository(PerfilEntity);
    const junctionRepo = this.appTypeormConnection.getRepository(
      CalendarioAgendamentoProfessorEntity,
    );

    const perfis = await perfilRepo.find({
      where: { usuario: { id: usuarioId } } as FindOptionsWhere<PerfilEntity>,
    });

    for (const perfil of perfis) {
      await junctionRepo.delete({
        perfil: { id: perfil.id },
        calendarioAgendamento: { id: eventoId },
      } as FindOptionsWhere<CalendarioAgendamentoProfessorEntity>);
    }
  }

  private toEventoItem(entity: CalendarioAgendamentoEntity): IUsuarioEventoItem {
    return {
      id: entity.id,
      nome: entity.nome,
      tipo: entity.tipo,
      dataInicio: String(entity.dataInicio),
      dataFim: entity.dataFim ? String(entity.dataFim) : null,
      diaInteiro: entity.diaInteiro,
      horarioInicio: entity.horarioInicio,
      horarioFim: entity.horarioFim,
      cor: entity.cor,
      repeticao: entity.repeticao,
      status: entity.status,
    };
  }
}
