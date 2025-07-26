import { Controller, Get } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { HttpOperationInput, IOperationInput } from "@/application/standards-new/HttpOperation";
import { IApiDoc } from "@/application/standards-new/openapi";

@Controller("health")
@ApiExcludeController()
export class HealthController {
  @Get("/")
  getHealth() {
    return { status: "up" };
  }
}
