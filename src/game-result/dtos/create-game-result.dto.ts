import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateGameResultDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  playGameId: string;

  @IsNumber()
  value: number;
}
