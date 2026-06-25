import { HttpException, HttpStatus } from "@nestjs/common";

export class OpenWAConnectionException extends HttpException {
  constructor(message = "Failed to connect to OpenWA service") {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class OpenWATimeoutException extends HttpException {
  constructor(message = "OpenWA service request timed out") {
    super(message, HttpStatus.GATEWAY_TIMEOUT);
  }
}

export class OpenWASendMessageException extends HttpException {
  constructor(message = "Failed to send message via OpenWA") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
