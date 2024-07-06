import { Controller, Post, Body } from '@nestjs/common';
import { CreatePostsDto } from './dto/post.dto';
import { Post as PostModel } from '@prisma/client';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post('add')
  async create(@Body() body: CreatePostsDto): Promise<PostModel> {
    return this.postsService.create(body);
  }
}
