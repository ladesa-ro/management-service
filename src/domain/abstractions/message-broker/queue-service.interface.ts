export const IQueueService = Symbol("IQueueService");

export interface IEnqueueOptions {
  jobId?: string;
  attempts?: number;
  delayMs?: number;
}

export interface IJobOutcome<TResult> {
  jobId: string;
  result: TResult;
}

export interface IProcessOptions {
  concurrency?: number;
}

export interface IJobFailure {
  jobId: string;
  reason: string;
}

export interface IQueueService {
  isAvailable(): boolean;

  enqueue<TPayload>(queue: string, payload: TPayload, options?: IEnqueueOptions): Promise<string>;

  request<TPayload, TResult>(
    queue: string,
    payload: TPayload,
    timeoutMs?: number,
  ): Promise<TResult>;

  onCompleted<TResult>(
    queue: string,
    handler: (outcome: IJobOutcome<TResult>) => Promise<void>,
  ): Promise<void>;

  onFailed(queue: string, handler: (failure: IJobFailure) => Promise<void>): Promise<void>;

  process<TPayload, TResult>(
    queue: string,
    handler: (payload: TPayload) => Promise<TResult>,
    options?: IProcessOptions,
  ): Promise<void>;
}
