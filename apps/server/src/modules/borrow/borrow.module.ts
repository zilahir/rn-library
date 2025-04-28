import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowController } from '../../controllers/borrow/borrow.controller';
import { Borrow, BorrowSchema } from '../../schemas/borrow/borrow.schema';

import { BorrowService } from '../../services/borrow/borrow.service';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    BookModule,
    MongooseModule.forFeature(
      [
        {
          name: Borrow.name,
          schema: BorrowSchema,
        },
      ],
      'pikkukirjasto-db',
    ),
  ],
  controllers: [BorrowController],
  providers: [BorrowService],
  exports: [BorrowService],
})
export class BorrowModule {}
