import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../entities/movies/movies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/entities/movies/genres.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import RedisCache from 'src/shared/cache/RedisCache';

@Injectable()
export class MoviesService {

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>

  async findAll() {

    const movies = this.movieRepository.find({
      relations: ['genres'],
    });

    const redisCache = new RedisCache();

    let movies_redis = await redisCache.recover<Movie[]>(
      'api-film-catalog-MOVIE_LIST',
    );

    if(!movies_redis) {
      movies_redis = await movies

      await redisCache.save('api-film-catalog-MOVIE_LIST', movies_redis);
    }

    return movies_redis;

  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres'],
    })
    if(!movie){
      throw new HttpException(`Movie ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
  }

  async create(createMovieDTO: CreateMovieDTO) {
    const genres = await Promise.all(
      createMovieDTO.genres.map(name => this.preloadGenreByName(name)),
    );

    const movie = this.movieRepository.create({
      ...createMovieDTO,
      genres,
    });

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-film-catalog-MOVIE_LIST');

    await this.movieRepository.save(movie)

    return movie
  }

  async update(id: string, updateMovieDTO: UpdateMovieDTO) {
    const genres =
    updateMovieDTO.genres &&
     (await Promise.all(
      updateMovieDTO.genres.map(name => this.preloadGenreByName(name)),
    ));

    const movie = await this.movieRepository.preload({
      ...updateMovieDTO,
      id,
      genres,
    });
    if (!movie){
      throw new NotFoundException(`Movie ID ${id} not found`)
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-film-catalog-MOVIE_LIST');

    await this.movieRepository.save(movie)

    return movie
  }

  async remove(id: string) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    })
    if(!movie) {
      throw new NotFoundException(`Movie ID ${id} not found`)
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-film-catalog-MOVIE_LIST');

    await this.movieRepository.remove(movie)

    return movie
  }

  private async preloadGenreByName(name: string): Promise<Genre>{
    const genre = await this.genreRepository.findOne({ where: { name } })
    if(genre){
      return genre
    }
    return this.genreRepository.create( { name } )
  }
}
