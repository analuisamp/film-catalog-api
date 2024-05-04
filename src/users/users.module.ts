import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/entities/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => MoviesModule),
  ],
  controllers : [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}


