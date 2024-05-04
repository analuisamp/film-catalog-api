import { IsString, IsEnum,  IsOptional} from "class-validator";
import { Role } from "src/enums/role.enum";

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
