export class ResponseError extends Error {
  constructor(message: string, public readonly status: number, public readonly data: unknown) {
    super(message);
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
