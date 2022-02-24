type HttpResponse = {
  statusCode: number
  body: any
}
type HttpRequest = {
  body: any
}

// Presentation
// signUp-router
export class SignUpRouter {
  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password, repeatPassword } = httpRequest.body

    const user = await new SignUpUseCase().signUp(email, password, repeatPassword)

    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain
// signUp-useCase
export class SignUpUseCase {
  async signUp(email: string, password: string, repeatPassword: string) {
    if (password === repeatPassword)
      return new AddAccountRepository().add(email, password)
  }
}

// Infra
// add-account-repository
import mongoose from 'mongoose'
const AccountModel = mongoose.model('Account')

export class AddAccountRepository {
  async add(email: string, password: string) {
    const user = await AccountModel.create({ email, password })

    return user
  }
}

// class AccountModel {
//    static async create(params: any) {
//        return params
//    }
//}

// adapter para Express
import express, { Request, Response } from 'express'

export class ExpressRouterAdapter {
  static adapt(router: SignUpRouter) {
    return async (req: Request, res: Response) => {
      const httpRequest = {
        body: req.body
      }

      const httpResponse = await router.route(httpRequest)

      return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}

// main
const router = express.Router()
const routerInstance = new SignUpRouter()
router.post('/sign-up', ExpressRouterAdapter.adapt(routerInstance))