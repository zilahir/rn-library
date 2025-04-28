import { Test } from '@nestjs/testing';
import { random } from 'lodash';

import { BookController } from './book.controller';
import {
  BookService,
  PikkukirjastoBook,
} from '../../services/book/book.service';

import { createRandomBooks } from '../../../test/utils';

const demoBook: PikkukirjastoBook[] = createRandomBooks({ amount: 10 });

describe('BookController', () => {
  let controller: BookController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        BookService,
        {
          provide: BookService,
          useValue: {
            getAllBooks: jest.fn().mockResolvedValue([...demoBook]),
            findBookByAuthor: jest.fn().mockImplementation((author: string) => {
              const book = demoBook.find((book) => book.author === author);
              return Promise.resolve({
                author,
                ...book,
              });
            }),
            findBookByTitle: jest.fn().mockImplementation((title: string) => {
              const book = demoBook.find((book) => book.title === title);
              return Promise.resolve({
                title,
                ...book,
              });
            }),
            findBookByIsbn: jest.fn().mockImplementation((isbn: string) => {
              const book = demoBook.find((book) => book.isbn === isbn);
              return Promise.resolve({
                isbn,
                ...book,
              });
            }),
            createBook: jest
              .fn()
              .mockImplementation((book: PikkukirjastoBook) =>
                Promise.resolve({
                  _id: 'a uuid',
                  ...book,
                }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all books', () => {
    expect(controller.getAllBook()).resolves.toEqual([...demoBook]);
  });

  it('should return books by author', async () => {
    const book = demoBook[random(0, demoBook.length - 1)];
    await expect(controller.findBookByAuthor(book.author)).resolves.toEqual({
      ...book,
    });
  });

  it('should return books by title', async () => {
    const book = demoBook[random(0, demoBook.length - 1)];
    await expect(controller.findBookByTitle(book.title)).resolves.toEqual({
      ...book,
    });
  });

  it('should return books by isbn', async () => {
    const book = demoBook[random(0, demoBook.length - 1)];
    await expect(controller.findBookByIsbn(book.isbn)).resolves.toEqual({
      ...book,
    });
  });

  it('should create a book', async () => {
    const newBook: PikkukirjastoBook = {
      ...demoBook[random(0, demoBook.length - 1)],
    };

    expect(controller.createBook(newBook)).resolves.toEqual({
      _id: 'a uuid',
      ...newBook,
    });
  });
});
