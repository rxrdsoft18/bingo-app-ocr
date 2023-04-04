import { CreateBingoCardItemDto } from './create-bingo-card-item.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBingoCardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  items: CreateBingoCardItemDto[];
}
