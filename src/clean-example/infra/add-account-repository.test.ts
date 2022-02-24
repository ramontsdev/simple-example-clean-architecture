import { AddAccountRepository } from './add-account-repository'

describe('AddAccountRepository', () => {
  test('Should return a user with e-mail and password', async () => {
    const repository = new AddAccountRepository()

    const userReceived = await repository.add('any@mail.com', 'any_password')

    const userExpected = {
      email: 'any@mail.com',
      password: 'any_password'
    }

    expect(userReceived).toEqual(userExpected)
  })
})
