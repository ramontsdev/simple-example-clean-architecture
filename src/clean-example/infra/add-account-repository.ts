export class AddAccountRepository {
  async add(email: string, password: string) {
    const user = await AccountModel.create({ email, password })

    return user
  }
}

class AccountModel {
  static async create(params: any) {
    return params
  }
}
