import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => MoviesModule),
    forwardRef(() =>DatabaseModule),
    forwardRef(() =>UsersModule),
    forwardRef(() => AuthModule)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
