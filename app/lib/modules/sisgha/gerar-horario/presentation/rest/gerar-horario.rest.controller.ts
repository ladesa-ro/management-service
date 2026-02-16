import {
  GenerateRequest,
  ServiceGenerateResponse,
} from "@ladesa-ro/messages.timetable-generator.v1";
import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { GerarHorarioService } from "@/modules/sisgha/gerar-horario";

@ApiTags("gerar-horario")
@Controller("/gerar-horario")
export class GerarHorarioRestController {
  constructor(private gerarHorarioService: GerarHorarioService) {}

  @Get("/poc")
  @ApiOperation({
    summary:
      "POC: Publica na queue dev.timetable_generate.request e aguarda resposta em dev.timetable_generate.response",
    operationId: "gerarHorarioPoc",
  })
  @ApiOkResponse({ description: "Resposta do gerador de horário" })
  async poc(): Promise<ServiceGenerateResponse> {
    const request: GenerateRequest = {
      request_id: "009c8198-fa90-41ca-b234-011d221d50c7",
      date_start: new Date("2026-02-02"),
      date_end: new Date("2026-06-30"),
      time_slots: [
        { start: "07:00:00", end: "07:50:00" },
        { start: "07:50:00", end: "08:40:00" },
        { start: "09:00:00", end: "09:50:00" },
        { start: "09:50:00", end: "10:40:00" },
        { start: "11:00:00", end: "11:50:00" },
        { start: "11:50:00", end: "12:40:00" },
        { start: "13:30:00", end: "14:20:00" },
        { start: "14:20:00", end: "15:10:00" },
        { start: "15:30:00", end: "16:20:00" },
        { start: "16:20:00", end: "17:10:00" },
      ],
      teachers: [
        {
          id: "teacher-001",
          availability: {
            rules: [],
          },
        },
      ],
      groups: [
        {
          id: "group-1A-INFO",
          availability: {
            rules: [],
          },
        },
        {
          id: "group-1B-INFO",
          availability: {
            rules: [],
          },
        },
      ],
      diaries: [
        {
          id: "diary-001",
          teacher_id: "teacher-001",
          group_id: "group-1A-INFO",
          subject_id: "subject-math",
          remaining: 80,
          week_limit: 4,
        },
        {
          id: "diary-002",
          teacher_id: "teacher-001",
          group_id: "group-1B-INFO",
          subject_id: "subject-math",
          remaining: 80,
          week_limit: 4,
        },
      ],
      previous_timetable_grid: null,
    };

    return this.gerarHorarioService.publishTimetableRequest<
      GenerateRequest,
      ServiceGenerateResponse
    >(request);
  }
}
