import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from 'src/entities/movies/genres.entity';
import { Movie } from 'src/entities/movies/movies.entity';
import { User } from 'src/entities/users/user.entity';
@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) => {
      return {
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [Movie, Genre, User],
        synchronize: false,
      }
    },
    inject: [ConfigService]
  }),
],

})


export class DatabaseModule {}

