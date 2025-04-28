import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from '../../controllers/book/book.controller';
import { Book, BookSchema } from '../../schemas/book/book.schema';
import { BookService } from '../../services/book/book.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Book.name,
          schema: BookSchema,
        },
      ],
      'pikkukirjasto-db',
    ),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
