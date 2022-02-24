import { AddAccountRepository } from '../infra/add-account-repository'
import { SignUpUseCase } from './sign-up-usecase'

const makeSut = () => {
  const addAccountRepository = new AddAccountRepository()
  const sut = new SignUpUseCase(addAccountRepository)

  return { sut }
}

describe('SignUpUseCase', () => {
  test('Should return a user with e-mail and password', async () => {

    const { sut } = makeSut()

    const userReceived = await sut.signUp('any@mail', 'any_password', 'any_password')

    const userExpected = {
      email: 'any@mail',
      password: 'any_password'
    }

    expect(userReceived).toEqual(userExpected)
  })
})
