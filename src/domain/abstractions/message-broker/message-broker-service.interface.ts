export const IMessageBrokerService = Symbol("IMessageBrokerService");

export interface IMessageBrokerService {
  publishTimetableRequest<TRequest, TResponse>(
    request: TRequest,
    timeoutMs?: number,
  ): Promise<TResponse>;
}
