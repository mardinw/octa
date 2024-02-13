import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(5, 12)
  username: string;

  @IsString()
  @Length(6, 12)
  password: string;
}
