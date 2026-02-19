/**
 * Port de configuração do Message Broker
 */
export interface IConfigMessageBrokerPort {
  getMessageBrokerUrl(): string;
  getMessageBrokerQueueTimetableRequest(): string;
  getMessageBrokerQueueTimetableResponse(): string;
}
