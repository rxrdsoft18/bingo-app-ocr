import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class ReviewPlayGameDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  playGameId: string;

  @IsNumber()
  value: number;
}
