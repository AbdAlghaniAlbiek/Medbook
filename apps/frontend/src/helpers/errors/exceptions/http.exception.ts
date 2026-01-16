export class HttpError<T> extends Error {
  public fullMessage: T;
  constructor(message?: any) {
    super(message); // 'Error' breaks prototype chain here
    this.name = HttpError.name;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.fullMessage = message;
  }
}
