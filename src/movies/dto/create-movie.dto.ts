import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum, IsOptional } from "class-validator";

export class CreateMovieDTO {
  @ApiProperty({description: 'Movie name'})
  @IsString()
  readonly name: string;

  @ApiProperty({description: 'Director name'})
  @IsString()
  readonly director: string;

  @ApiProperty({description: 'Genres of the movie', type: [String]})
  @IsString({ each: true })
  readonly genres: string[];

  @ApiProperty({description: 'Duration of the movie'})
  @IsString()
  readonly duration: string;

  @ApiProperty({description: 'Synopsis of the movie'})
  @IsString()
  readonly synopsis: string;
}
