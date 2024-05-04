import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDTO {
  @ApiProperty({description: 'User email'})
  @IsEmail()
  readonly email: string;

  @ApiProperty({description: 'User name'})
  @IsString()
  readonly name: string;

  @ApiProperty({description: 'User password'})
  @IsString()
  readonly password: string;

  @ApiProperty({description: 'User role', enum: Role, enumName: 'Role'})
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;
}
