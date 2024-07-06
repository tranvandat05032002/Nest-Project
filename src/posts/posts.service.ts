import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostsDto } from './dto/post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  create = async (postData: CreatePostsDto): Promise<Post> => {
    return await this.prismaService.post.create({ data: postData });
  };
}
