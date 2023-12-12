import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { LoggingMiddleware } from './common/middleware/logging/logging.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DemoGuard } from './common/guard/demo/demo.guard';
import { CountTimeInterceptor } from './common/interceptor/count-time/count-time.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    PostsModule,
    SchedulingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: DemoGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CountTimeInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
