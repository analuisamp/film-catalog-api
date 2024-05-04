import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDTO {

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsEnum(Role)
  readonly role: number;
}
