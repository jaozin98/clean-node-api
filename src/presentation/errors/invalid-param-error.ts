export class InvalidParamError extends Error {
  constructor (paramName: string) {
  super(`Invalid parm: ${paramName}`)
  this.name =  'InvalidParamError'
  }
}
