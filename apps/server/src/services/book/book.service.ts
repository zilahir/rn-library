import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book, BookDocument } from '../../schemas/book/book.schema';

export interface PikkukirjastoBook {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  borrows?: string[];
}

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name, 'pikkukirjasto-db')
    private readonly bookModel: Model<Book>,
  ) {}

  public async getAllBooks(): Promise<BookDocument[]> {
    const books = this.bookModel.find().populate('borrows');
    return books;
  }

  public async findBookByAuthor(author: string): Promise<BookDocument[]> {
    const books = this.bookModel
      .find({
        $text: { $search: author },
      })
      .exec();

    return books;
  }

  public async findBookByTitle(title: string): Promise<BookDocument[]> {
    return this.bookModel
      .find({
        title: { $regex: title, $options: 'i' },
      })
      .exec();
  }

  public async findBookByIsbn(isbn: string): Promise<BookDocument | null> {
    return this.bookModel
      .findOne({
        isbn: isbn,
      })
      .populate('borrows')
      .exec();
  }

  public async findBookById(id: string): Promise<BookDocument | null> {
    return this.bookModel
      .findOne({
        _id: id,
      })
      .exec();
  }

  public async createBook(
    createBookDto: PikkukirjastoBook,
  ): Promise<BookDocument> {
    const createdBook = this.bookModel.create(createBookDto);
    return createdBook;
  }
}
