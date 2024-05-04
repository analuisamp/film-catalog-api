import { IsString } from "class-validator";

export class CreateUserDTO {

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
