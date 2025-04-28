import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './modules/book/book.module';
import { UserModule } from './modules/user/user.module';
import { BorrowModule } from './modules/borrow/borrow.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  imports: [
    BookModule,
    UserModule,
    BorrowModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      connectionName: 'pikkukirjasto-db',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('borrow');
  }
}
