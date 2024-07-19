import { Controller, Post, Body } from '@nestjs/common';
import { CreatePostsDto } from './dto/post.dto';
import { Post as PostModel } from '@prisma/client';
import { PostsService } from './posts.service';
import { UserDecodedAuthorization } from 'src/common/decorator/user-identifier.decorator';
import { TokenPayload } from 'src/types/jwt.types';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }
  @Post('add')
  async create(@Body() body: CreatePostsDto, @UserDecodedAuthorization() user_decoded: TokenPayload): Promise<PostModel> {
    const { id } = user_decoded
    return this.postsService.create({
      ...body,
      ownerId: id
    });
  }
}
