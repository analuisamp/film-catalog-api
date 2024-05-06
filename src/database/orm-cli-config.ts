import { DataSource, DataSourceOptions } from 'typeorm'
import { CreateMoviesTable1714775530370 } from 'src/migrations/1714775530370-CreateMoviesTable'
import { CreateGenresTable1714778875259 } from 'src/migrations/1714778875259-CreateGenresTable'
import { CreateMoviesGenresTable1714779625411 } from 'src/migrations/1714779625411-CreateMoviesGenresTable'
import { AddMoviesIdToGenresTable1714780057974 } from 'src/migrations/1714780057974-AddMoviesIdToGenresTable'
import { AddGenresIdToMoviesTable1714780838509 } from 'src/migrations/1714780838509-AddGenresIdToMoviesTable'
import { CreateUsersTable1714788233290 } from 'src/migrations/1714788233290-CreateUsersTable'
import { Movie } from 'src/entities/movies/movies.entity'
import { Genre } from 'src/entities/movies/genres.entity'
import { User } from 'src/entities/users/user.entity'
import 'dotenv/config'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  url: process.env.DATABASE_URL,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Movie, Genre, User],
  synchronize: false,
  ssl: {
    rejectUnauthorized: false,
  },
}

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateMoviesTable1714775530370,
    CreateGenresTable1714778875259,
    CreateMoviesGenresTable1714779625411,
    AddMoviesIdToGenresTable1714780057974,
    AddGenresIdToMoviesTable1714780838509,
    CreateUsersTable1714788233290,
  ],
})
