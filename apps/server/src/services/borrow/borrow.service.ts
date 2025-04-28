import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Borrow, BorrowDocument } from '../../schemas/borrow/borrow.schema';
import { Book } from '../../schemas/book/book.schema';

interface BorrowBookDto {
  user: string;
  isbn: string;
  book: Book;
}

@Injectable()
export class BorrowService {
  constructor(
    @InjectModel(Borrow.name, 'pikkukirjasto-db')
    private borrowModel: Model<Borrow>,
  ) {}

  public async borrowBook(
    borrowBookDto: BorrowBookDto,
  ): Promise<BorrowDocument> {
    const createdBorrow = this.borrowModel.create({
      ...borrowBookDto,
      isBorrowed: true,
    });
    return createdBorrow;
  }

  public async getBorrowedBookByUser(userId) {
    return this.borrowModel
      .find({
        isBorrowed: true,
        user: new Types.ObjectId(userId),
      })
      .populate('book');
  }

  public async returnBook(
    borrowBookDto: Pick<BorrowBookDto, 'isbn' | 'user'>,
  ): Promise<BorrowDocument | null> {
    return this.borrowModel
      .findOneAndUpdate(
        {
          isbn: borrowBookDto.isbn,
          user: new Types.ObjectId(borrowBookDto.user),
          isBorrowed: true,
        },
        { isBorrowed: false },
        { new: true },
      )
      .exec();
  }

  public async getAllBorrowedBook(): Promise<BorrowDocument[] | null> {
    return this.borrowModel
      .find({
        isBorrowed: true,
      })
      .populate('book')
      .populate('user');
  }
}
