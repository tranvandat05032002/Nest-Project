import { IsNotEmpty } from 'class-validator';

export class CreatePostsDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  summary: string;
  content: string;
  status: number;

  @IsNotEmpty()
  ownerId: number;

  @IsNotEmpty()
  categoryId: number;
}
