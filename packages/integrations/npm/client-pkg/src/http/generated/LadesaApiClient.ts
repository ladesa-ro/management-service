import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import { FetchHttpRequest } from "./core/FetchHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { Interceptors } from "./core/OpenAPI";
import {
  AmbientesService,
  ArquivosService,
  AulasService,
  AutenticacaoService,
  BaseService,
  BlocosService,
  CalendariosLetivosService,
  CampiService,
  CidadesService,
  CursosService,
  DiariosPreferenciaAgrupamentoService,
  DiariosProfessoresService,
  DiariosService,
  DiasCalendariosService,
  DisciplinasService,
  DisponibilidadesService,
  EstadosService,
  EtapasService,
  EventosService,
  GradesHorariosOfertasFormacoesIntervalosDeTempoService,
  GradesHorariosOfertasFormacoesService,
  HorariosGeradosAulaService,
  HorariosGeradosService,
  ModalidadesService,
  NiveisFormacoesService,
  OfertasFormacoesNiveisFormacoesService,
  OfertasFormacoesService,
  PerfisService,
  ProfessoresDisponibilidadesService,
  ReservasService,
  TurmasDisponibilidadesService,
  TurmasService,
  UsuariosService,
} from "./services.gen";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class LadesaApiClient {
  public readonly ambientes: AmbientesService;
  public readonly arquivos: ArquivosService;
  public readonly aulas: AulasService;
  public readonly autenticacao: AutenticacaoService;
  public readonly base: BaseService;
  public readonly blocos: BlocosService;
  public readonly calendariosLetivos: CalendariosLetivosService;
  public readonly campi: CampiService;
  public readonly cidades: CidadesService;
  public readonly cursos: CursosService;
  public readonly diarios: DiariosService;
  public readonly diariosPreferenciaAgrupamento: DiariosPreferenciaAgrupamentoService;
  public readonly diariosProfessores: DiariosProfessoresService;
  public readonly diasCalendarios: DiasCalendariosService;
  public readonly disciplinas: DisciplinasService;
  public readonly disponibilidades: DisponibilidadesService;
  public readonly estados: EstadosService;
  public readonly etapas: EtapasService;
  public readonly eventos: EventosService;
  public readonly gradesHorariosOfertasFormacoes: GradesHorariosOfertasFormacoesService;
  public readonly gradesHorariosOfertasFormacoesIntervalosDeTempo: GradesHorariosOfertasFormacoesIntervalosDeTempoService;
  public readonly horariosGerados: HorariosGeradosService;
  public readonly horariosGeradosAula: HorariosGeradosAulaService;
  public readonly modalidades: ModalidadesService;
  public readonly niveisFormacoes: NiveisFormacoesService;
  public readonly ofertasFormacoes: OfertasFormacoesService;
  public readonly ofertasFormacoesNiveisFormacoes: OfertasFormacoesNiveisFormacoesService;
  public readonly perfis: PerfisService;
  public readonly professoresDisponibilidades: ProfessoresDisponibilidadesService;
  public readonly reservas: ReservasService;
  public readonly turmas: TurmasService;
  public readonly turmasDisponibilidades: TurmasDisponibilidadesService;
  public readonly usuarios: UsuariosService;

  public readonly request: BaseHttpRequest;

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "",
      VERSION: config?.VERSION ?? "0.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
      interceptors: {
        request: config?.interceptors?.request ?? new Interceptors(),
        response: config?.interceptors?.response ?? new Interceptors(),
      },
    });

    this.ambientes = new AmbientesService(this.request);
    this.arquivos = new ArquivosService(this.request);
    this.aulas = new AulasService(this.request);
    this.autenticacao = new AutenticacaoService(this.request);
    this.base = new BaseService(this.request);
    this.blocos = new BlocosService(this.request);
    this.calendariosLetivos = new CalendariosLetivosService(this.request);
    this.campi = new CampiService(this.request);
    this.cidades = new CidadesService(this.request);
    this.cursos = new CursosService(this.request);
    this.diarios = new DiariosService(this.request);
    this.diariosPreferenciaAgrupamento = new DiariosPreferenciaAgrupamentoService(this.request);
    this.diariosProfessores = new DiariosProfessoresService(this.request);
    this.diasCalendarios = new DiasCalendariosService(this.request);
    this.disciplinas = new DisciplinasService(this.request);
    this.disponibilidades = new DisponibilidadesService(this.request);
    this.estados = new EstadosService(this.request);
    this.etapas = new EtapasService(this.request);
    this.eventos = new EventosService(this.request);
    this.gradesHorariosOfertasFormacoes = new GradesHorariosOfertasFormacoesService(this.request);
    this.gradesHorariosOfertasFormacoesIntervalosDeTempo = new GradesHorariosOfertasFormacoesIntervalosDeTempoService(this.request);
    this.horariosGerados = new HorariosGeradosService(this.request);
    this.horariosGeradosAula = new HorariosGeradosAulaService(this.request);
    this.modalidades = new ModalidadesService(this.request);
    this.niveisFormacoes = new NiveisFormacoesService(this.request);
    this.ofertasFormacoes = new OfertasFormacoesService(this.request);
    this.ofertasFormacoesNiveisFormacoes = new OfertasFormacoesNiveisFormacoesService(this.request);
    this.perfis = new PerfisService(this.request);
    this.professoresDisponibilidades = new ProfessoresDisponibilidadesService(this.request);
    this.reservas = new ReservasService(this.request);
    this.turmas = new TurmasService(this.request);
    this.turmasDisponibilidades = new TurmasDisponibilidadesService(this.request);
    this.usuarios = new UsuariosService(this.request);
  }
}
