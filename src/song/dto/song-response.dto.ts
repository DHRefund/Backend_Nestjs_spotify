export class SongResponseDto {
  id: string;
  title: string;
  artist: string;
  duration: number;
  songUrl: string;
  imageUrl?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
