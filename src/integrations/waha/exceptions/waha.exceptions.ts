import { HttpException, HttpStatus } from "@nestjs/common";

export class WahaConnectionException extends HttpException {
  constructor(message = "Failed to connect to WAHA service") {
    super(message, HttpStatus.SERVICE_UNAVAILABLE);
  }
}

export class WahaTimeoutException extends HttpException {
  constructor(message = "WAHA service request timed out") {
    super(message, HttpStatus.GATEWAY_TIMEOUT);
  }
}

export class WahaSendMessageException extends HttpException {
  constructor(message = "Failed to send message via WAHA") {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
