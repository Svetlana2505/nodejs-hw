export class Nodejs04Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class ValidationError extends Nodejs04Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class ParametersError extends Nodejs04Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class NotAuthorizedError extends Nodejs04Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
