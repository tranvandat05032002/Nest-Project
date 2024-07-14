import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { UserIdentifierMiddleware } from './user-identifier/user-identifier.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, PostsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdentifierMiddleware).forRoutes('*')
  }
}
