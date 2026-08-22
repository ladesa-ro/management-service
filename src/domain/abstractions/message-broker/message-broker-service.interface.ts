export const IMessageBrokerService = Symbol("IMessageBrokerService");

export interface IMessageBrokerService {
  publishTimetableRequest<TRequest, TResponse>(
    request: TRequest,
    timeoutMs?: number,
  ): Promise<TResponse>;

  publishTimetableRequestFireAndForget<TRequest>(
    request: TRequest,
    jobId?: string,
  ): Promise<string>;

  publishFolhaPontoCreated<TPayload>(payload: TPayload): Promise<string>;
}
