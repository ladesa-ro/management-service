import type { IConfig } from "@/infrastructure/config";
import { DocumentBuilder } from "@nestjs/swagger";

export function SetupSwaggerDocument(configService: IConfig | null = null) {
  const config = new DocumentBuilder();

  config.setTitle("Ladesa - API");
  config.setDescription("API para a consulta e manipulação de dados e procedimentos relacionados ao Sistema de Gestão Acadêmico.");
  config.setVersion("0.0");

  config.addBearerAuth();

  config.addTag("base", "Base");

  config.addTag("arquivos", "Base / Armazenamento / Arquivos");
  config.addTag("estados", "Base / Lugares / Estados");
  config.addTag("cidades", "Base / Lugares / Estados / Cidades");

  config.addTag("autenticacao");
  config.addTag("usuarios", "Autenticação / Usuários");

  config.addTag("campi", "Ambientes / Campi");
  config.addTag("blocos", "Ambientes / Campi / Blocos");
  config.addTag("ambientes", "Ambientes / Campi / Blocos / Ambiente");
  config.addTag("reservas", "Ambientes / Campi / Blocos / Ambiente / Reservas");

  config.addTag("perfis", "Autorização / Usuários / Perfis");

  config.addTag("niveis-formacoes", "Ensino Institucional / Níveis de Formações");
  config.addTag("modalidades", "Ensino Institucional / Modalidades");
  config.addTag("ofertas-formacoes", "Ensino Institucional / Ofertas de Formações");
  config.addTag("ofertas-formacoes-niveis-formacoes", "Ensino Institucional / Ofertas de Formações / Níveis de Formação");
  config.addTag("cursos", "Ensino Institucional / Cursos");
  config.addTag("disciplinas", "Ensino Institucional / Disciplinas");

  config.addTag("grades-horarios-ofertas-formacoes", "Calendário / Grades de Horário para Ofertas de Formações");
  config.addTag("grades-horarios-ofertas-formacoes-intervalos-de-tempo", "Calendário / Grades de Horário para Ofertas de Formações / Intervalos de Tempo");

  config.addTag("calendarios-letivos", "Calendário / Calendarios Letivos");
  config.addTag("dias-calendarios", "Calendário / Calendarios Letivos / Dias");
  config.addTag("etapas", "Calendário / Calendarios Letivos / Etapas");
  config.addTag("eventos", "Calendário / Calendarios Letivos / Eventos");

  config.addTag("turmas", "Ensino Discente / Turmas");
  config.addTag("diarios", "Ensino Discente / Diarios");
  config.addTag("diarios-professores", "Ensino Discente / Professores em Diários");
  config.addTag("aulas", "Ensino Discente / Aulas");

  if (configService) {
    const prefix = configService.getRuntimePrefix();

    if (prefix) {
      config.setBasePath(prefix);
    }

    const servers = configService.getSwaggerServers();

    if (servers) {
      for (const server of servers) {
        config.addServer(server);
      }
    }
  }

  return config;
}
