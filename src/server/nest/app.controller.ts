import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { AppService } from "./app.service";
import { Public } from "./auth";

@ApiTags("Sistema")
@Controller()
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Informações do serviço" })
  getServiceInfo() {
    return this.appService.getServiceInfo();
  }

  @Get("health")
  @ApiExcludeEndpoint()
  healthCheck(@Res({ passthrough: true }) res: Response) {
    const result = this.appService.healthCheck();
    if (result.status === "unavailable") {
      res.status(HttpStatus.SERVICE_UNAVAILABLE);
    }
    return result;
  }

  @Get("health/live")
  @ApiExcludeEndpoint()
  liveness() {
    return this.appService.getLiveness();
  }

  @Get("health/ready")
  @ApiExcludeEndpoint()
  readiness(@Res({ passthrough: true }) res: Response) {
    const result = this.appService.getReadiness();
    if (result.status === "unavailable") {
      res.status(HttpStatus.SERVICE_UNAVAILABLE);
    }
    return result;
  }
}
