import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayGameDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  pattern: [];
}
