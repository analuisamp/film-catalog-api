import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthValidationTokenDTO {
  @ApiProperty({description: 'Auth token'})
  @IsString()
  token: string
}
