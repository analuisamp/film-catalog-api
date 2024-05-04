import { IsString } from "class-validator";

export class CreateMovieDTO {
  @IsString()
  readonly name: string;

  @IsString()
  readonly director: string;

  @IsString({ each: true })
  readonly genres: string[];

  @IsString()
  readonly duration: string;

  @IsString()
  readonly synopsis: string;
}
