import { AddAccountRepository } from "../infra/add-account-repository";

export class SignUpUseCase {
  constructor(private addAccountRepository: AddAccountRepository) { }

  async signUp(email: string, password: string, repeatPassword: string) {
    if (password === repeatPassword)
      return this.addAccountRepository.add(email, password)
  }
}
