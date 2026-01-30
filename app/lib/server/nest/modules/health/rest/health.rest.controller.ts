import { Controller, Get } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";

interface HealthStatus {
  status: string;
}

@Controller("health")
@ApiExcludeController()
export class HealthRestController {
  @Get("/")
  getHealth(): HealthStatus {
    return { status: "up" };
  }
}
