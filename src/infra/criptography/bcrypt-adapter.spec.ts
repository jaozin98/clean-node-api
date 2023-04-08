import * as bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest. mock('brypt', () => ({
  async hash (): Promise<string>{
    return new Promise (resolve => {resolve('hash')})
  }
}))

describe ('Bcrypt Adapter', () =>{
  test('Shold call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Shold return a has on sucess', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
