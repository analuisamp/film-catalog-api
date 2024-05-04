import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginDTO {
  @IsEmail({}, { message: 'Invalid email format' })
  @ApiProperty({description: 'Auth email'})
  email: string;

  @IsString()
  @ApiProperty({description: 'Auth password'})
  password: string;
}
