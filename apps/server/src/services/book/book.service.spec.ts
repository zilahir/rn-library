import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { random } from 'lodash';
import { createMock } from '@golevelup/ts-jest';

import { BookController } from '../../controllers/book/book.controller';
import { BookService } from './book.service';
import { createRandomBooks } from '../../../test/utils';
import { Model, Query } from 'mongoose';
import { BookDocument } from '../../schemas/book/book.schema';

describe('BookService', () => {
  let controller: BookController;
  let service: BookService;
  let model: Model<BookDocument>;
  const demoBook: Partial<BookDocument>[] = createRandomBooks({ amount: 10 });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken('Book', 'pikkukirjasto-db'),
          useValue: {
            new: jest
              .fn()
              .mockResolvedValue(demoBook[random(0, demoBook.length - 1)]),
            constructor: jest
              .fn()
              .mockResolvedValue(demoBook[random(0, demoBook.length - 1)]),
            find: jest.fn().mockImplementation(() => ({
              populate: () => demoBook,
            })),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    model = module.get<Model<BookDocument>>(
      getModelToken('Book', 'pikkukirjasto-db'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all books', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue(
      createMock<Query<BookDocument, BookDocument>>({
        populate: jest.fn().mockImplementationOnce(() => ({
          exec: jest.fn().mockResolvedValueOnce(demoBook),
        })),
      }),
    );
    const books = await service.getAllBooks();
    expect(books).toEqual(demoBook);
  });

  it('should getOne by author', async () => {
    const thisBook = demoBook[random(0, demoBook.length - 1)];
    jest.spyOn(model, 'find').mockReturnValue(
      createMock<Query<BookDocument[], BookDocument[]>>({
        exec: jest.fn().mockResolvedValueOnce(thisBook),
      }),
    );

    const book = await service.findBookByAuthor(thisBook.author);
    expect(book).toEqual(thisBook);
  });

  it('should getOne by title', async () => {
    const thisBook = demoBook[random(0, demoBook.length - 1)];
    jest.spyOn(model, 'find').mockReturnValue(
      createMock<Query<BookDocument[], BookDocument[]>>({
        exec: jest.fn().mockResolvedValueOnce(thisBook),
      }),
    );

    const book = await service.findBookByTitle(thisBook.author);
    expect(book).toEqual(thisBook);
  });

  it('should get one book by isbn', async () => {
    const thisBook = {
      ...demoBook[random(0, demoBook.length - 1)],
      borrows: [],
    };

    jest.spyOn(model, 'findOne').mockReturnValue(
      createMock<Query<BookDocument, BookDocument>>({
        populate: jest.fn().mockImplementationOnce(() => ({
          exec: jest.fn().mockResolvedValueOnce(thisBook),
        })),
      }),
    );

    const book = await service.findBookByIsbn(thisBook.isbn);

    expect(book).toEqual(thisBook);
  });

  it('should insert a new book', async () => {
    const book = createRandomBooks({ amount: 1 })[0];
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        ...(book as any),
      }),
    );
    const newBook = await service.createBook({
      ...book,
    });
    expect(newBook).toEqual(book);
  });

  it('should find a book by id', async () => {
    const thisBook = {
      ...demoBook[random(0, demoBook.length - 1)],
      borrows: [],
    };

    jest.spyOn(model, 'findOne').mockReturnValue(
      createMock<Query<BookDocument[], BookDocument[]>>({
        exec: jest.fn().mockResolvedValueOnce(thisBook),
      }),
    );

    const book = await service.findBookById(thisBook.id);

    expect(book).toEqual(thisBook);
  });
});
