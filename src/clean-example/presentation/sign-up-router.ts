import { SignUpUseCase } from "../domain/sign-up-usecase"

type HttpResponse = {
  statusCode: number
  body: any
}
type HttpRequest = {
  body: any
}

export class SignUpRouter {
  constructor(private signUpUsecase: SignUpUseCase) { }

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password, repeatPassword } = httpRequest.body

    const user = await this.signUpUsecase.signUp(email, password, repeatPassword)

    return {
      statusCode: 200,
      body: user
    }
  }
}
