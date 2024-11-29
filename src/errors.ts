class AppError extends Error {
  code: string
  constructor (code: string, message: string) {
    super(message);

    this.name = "AppError";
    this.code = code;
  }
}

class AuthError extends AppError {
  constructor (code: string, message: string) {
    super(code, message);

    this.name = "AuthError";
  }
}

export class UserAlreadyExists extends AuthError {
  constructor (message?: string) {
    super('UserAlreadyExists', message || 'UserAlreadyExists');
  }
}
