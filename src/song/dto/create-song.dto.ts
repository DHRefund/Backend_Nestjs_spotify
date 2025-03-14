import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateSongDto {
  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsString()
  songUrl: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  duration: number;
}
