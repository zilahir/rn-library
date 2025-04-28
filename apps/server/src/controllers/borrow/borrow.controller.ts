import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Response,
} from '@nestjs/common';
import { Borrow } from '../../schemas/borrow/borrow.schema';
import { BookService } from '../..//services/book/book.service';

import { BorrowService } from '../../services/borrow/borrow.service';

interface BorrowBookDto {
  user: string;
  isbn: string;
}

@Controller('borrow')
export class BorrowController {
  constructor(
    private readonly borrowService: BorrowService,
    private readonly bookService: BookService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async borrowBook(
    @Body() borrowBookDto: BorrowBookDto,
    @Response() response: any,
  ): Promise<Borrow | null> {
    const thisBook = await this.bookService.findBookByIsbn(borrowBookDto.isbn);

    const user = response.locals.user;
    if (!user) {
      // TODO: handle this
    }
    if (thisBook) {
      // await this.bookService.setBookToBorrowed(borrowBookDto.isbn);
      const newBorrow = await this.borrowService.borrowBook({
        ...borrowBookDto,
        book: thisBook,
        user: user._id,
      });

      // TODO: this here should adjust the borrow[] array in the book schema

      thisBook.borrows = [...(thisBook.borrows ?? []), newBorrow._id];
      thisBook.save();
      // thisBook.updateOne({ borrows: thisBook.borrows });
      return response.status(HttpStatus.OK).json(newBorrow);
    }
  }

  @Get('/')
  async getAllBorrowedBook(): Promise<Borrow[]> {
    return this.borrowService.getAllBorrowedBook();
  }

  @Post('/return')
  async returnBook(
    @Body() borrowBookDto: BorrowBookDto,
  ): Promise<Borrow | null> {
    const borrow = await this.borrowService.returnBook(borrowBookDto);
    return borrow;
  }
}
