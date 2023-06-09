import { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation  {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }


  validate (input: any ): Error {
    // eslint-disable-next-line no-restricted-syntax
    for (const validation of this.validations){
     const error = validation.validate(input)
      if (error) {
        return error
      }
    } return(null)
  }
}
