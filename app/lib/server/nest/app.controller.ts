import { Controller, Get } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";

@ApiTags("Sistema")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Informações do serviço" })
  getServiceInfo() {
    return this.appService.getServiceInfo();
  }

  @Get("health")
  @ApiExcludeEndpoint()
  healthCheck() {
    return this.appService.healthCheck();
  }
}
