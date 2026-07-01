import { Injectable, Logger } from "@nestjs/common";
import { OpenWAClient } from "../client/openwa.client";
import { OpenWaSessionStatus } from "../interfaces/openwa-session-status.interface";

@Injectable()
export class OpenWAService {
  private readonly logger = new Logger(OpenWAService.name);

  constructor(private readonly openWAClient: OpenWAClient) {}

  async sendMessage(to: string, text: string): Promise<boolean> {
    this.logger.log(`Attempting to send message to ${to}`);

    // Formatting the number to match OpenWA expectations, adding @c.us if missing
    const formattedTo = to.includes("@c.us") ? to : `${to}@c.us`;

    try {
      const result = await this.openWAClient.sendText({
        args: {
          to: formattedTo,
          text,
        },
      });

      if (result) {
        this.logger.log(`Message successfully sent to ${to}`);
        return true;
      }
      return false;
    } catch (error) {
      this.logger.error(`Failed to send message to ${to}: ${error}`);
      throw error;
    }
  }

  async getSessionStatus(): Promise<OpenWaSessionStatus> {
    return this.openWAClient.getSessionStatus();
  }
}
