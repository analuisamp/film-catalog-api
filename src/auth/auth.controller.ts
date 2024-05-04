import { Body, Controller, Req, HttpException, HttpStatus, Post, Headers, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { Movie } from "src/decorators/movies.decorator"

@Controller('auth')
export class AuthController {

  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() {email, password}: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Post('validatingToken')
  async validatingToken(@User('email') user) {
    return {user};
  }
}
