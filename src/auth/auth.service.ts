import { BadRequestException, Body, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { User } from '../entities/users/user.entity';
import { UpdateUserDTO } from '../users/dto/update-user.dto'
import { AuthRegisterDTO } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {

  constructor(private readonly JWTService: JwtService, private readonly userService: UsersService) {}

  createToken(user: User){
    return {
      accessToken: this.JWTService.sign({
        id: user.id,
        name: user.name,
        email: user.email
      }, {
        expiresIn: "3m",
        subject: String(user.id),
        issuer: "login",
        audience: "users",
      })
    }
  }

  checkToken(token: string) {
    try{
      const data = this.JWTService.verify(token, {
        audience: "users",
        issuer:  "login",
      })
      return data
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    }catch(e) {
      return false
    }
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmailAndPassword(email, password);

    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    return this.createToken(user);
  }
  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }

}
