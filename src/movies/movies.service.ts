import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../entities/movies/movies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/entities/movies/genres.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {

    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>

  async findAll() {
    return this.movieRepository.find({
      relations: ['genres'],
    });
  }

  async findOne(id: string) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres'],
    })
    if(!movie){
      throw new HttpException(`Movie ID ${id} not found`, HttpStatus.NOT_FOUND)
    }
    return movie
  }

  async create(createMovieDTO: CreateMovieDTO) {
    const genres = await Promise.all(
      createMovieDTO.genres.map(name => this.preloadGenreByName(name)),
    );
    const movie = this.movieRepository.create({
      ...createMovieDTO,
      genres,
    });
    return this.movieRepository.save(movie)
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
    return this.movieRepository.save(movie)
  }

  async remove(id: string) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    })
    if(!movie) {
      throw new NotFoundException(`Movie ID ${id} not found`)
    }
    return this.movieRepository.remove(movie)
  }

  private async preloadGenreByName(name: string): Promise<Genre>{
    const genre = await this.genreRepository.findOne({ where: { name } })
    if(genre){
      return genre
    }
    return this.genreRepository.create( { name } )
  }
}
