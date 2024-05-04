import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { AuthValidationTokenDTO } from "./dto/auth-validation-token.dto";
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auths')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  @ApiResponse({ status: 200, description: 'Login successful' })
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Token validated successfully' })
  @Post('validatingToken')
  async validatingToken(@User() user: any, @Body() body: AuthValidationTokenDTO) {
    return { user };
  }
}
