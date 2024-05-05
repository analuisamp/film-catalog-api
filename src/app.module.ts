import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    forwardRef(() => MoviesModule),
    forwardRef(() =>DatabaseModule),
    forwardRef(() =>UsersModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
