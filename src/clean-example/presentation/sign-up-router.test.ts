import { SignUpRouter } from './sign-up-router'
import { SignUpUseCase } from '../domain/sign-up-usecase'
import { AddAccountRepository } from '../infra/add-account-repository'

const makeSut = () => {

  const addAccountRepository = new AddAccountRepository()
  const signup = new SignUpUseCase(addAccountRepository)
  const sut = new SignUpRouter(signup)

  return {
    sut
  }
}

describe('SignUpRouter', () => {
  test('Should return httpResponse', async () => {

    const httpRequest = {
      body: {
        email: 'any@mail',
        password: 'any_password',
        repeatPassword: 'any_password'
      }
    }

    const { sut } = makeSut()

    const responseReceived = await sut.route(httpRequest)

    const responseExpected = {
      body: {
        email: 'any@mail',
        password: 'any_password'
      },
      statusCode: 200
    }
    expect(responseReceived).toEqual(responseExpected)
  })
})
