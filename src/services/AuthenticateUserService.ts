import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });
    if (!user) {
      throw new Error("E-mail/Senha Incorreto!");
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("E-mail/Senha Incorreto!");
    }

    const token = sign({
      email: user.email     
    },"957a337e97c562dd888093a6a29b0811", {
      subject: user.id, 
      expiresIn: "1d"
    })

    return token

  }
}

export { AuthenticateUserService };
