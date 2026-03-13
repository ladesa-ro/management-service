export const IMessageBrokerOptions = Symbol();

export interface IMessageBrokerOptions {
  url: string;
  queueTimetableRequest: string;
  queueTimetableResponse: string;
}
