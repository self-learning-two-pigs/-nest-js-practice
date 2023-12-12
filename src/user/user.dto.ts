import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}

export class UpdateDto {
  oldPassword: string;
  newPassword: string;
}
