import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from '../../controllers/user/user.controller';
import { User, UserSchema } from '../../schemas/user/user.schema';

import { UserService } from '../../services/user/user.service';
import { BorrowModule } from '../borrow/borrow.module';

@Module({
  imports: [
    BorrowModule,
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
        },
      ],
      'pikkukirjasto-db',
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
