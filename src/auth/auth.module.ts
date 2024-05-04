import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./auth.controller"
import { UsersModule } from "src/users/users.module"
import { forwardRef } from '@nestjs/common';
import { DatabaseModule } from "src/database/database.module"
import { AuthService } from "./auth.service"
import { MoviesModule } from "src/movies/movies.module"

@Module({
  imports: [JwtModule.register({
    secret: `W=)K=uH*S!8gY86GhZl-v0R£[]IFhwWO`
  }),
  forwardRef(() => UsersModule),
  forwardRef(() => MoviesModule),
],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {

}
