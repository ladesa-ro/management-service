import { Controller, Get } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller("health")
@ApiExcludeController()
export class HealthController {
  @Get("/")
  getHealth() {
    return { status: "up" };
  }
}
