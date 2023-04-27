export class EmailInUseError extends Error {
  constructor() {
    super('the recevied email is a already in use');
    this.name = 'EmailInUseError';
  }
}
