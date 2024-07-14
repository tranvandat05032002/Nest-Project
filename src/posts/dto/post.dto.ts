import { IsNotEmpty } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  summary: string;
  content: string;
  status: number;

  ownerId: number; // decoded_auth

  @IsNotEmpty()
  categoryId: number;
}
