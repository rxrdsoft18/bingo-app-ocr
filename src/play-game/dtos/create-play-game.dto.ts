import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlayGameDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  pattern: [];

  @IsOptional()
  userId?: string;
}
