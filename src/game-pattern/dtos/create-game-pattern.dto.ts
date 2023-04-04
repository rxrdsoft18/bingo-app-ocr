import { IsArray, IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CreateGamePatternDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsArray()
  pattern: [];
}
