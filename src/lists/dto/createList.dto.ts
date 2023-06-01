import { IsArray, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateListDto {
  @IsEmail()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsArray()
  games: number[];

  id: string;
}
