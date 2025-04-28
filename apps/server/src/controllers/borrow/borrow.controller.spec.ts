import { Test } from '@nestjs/testing';
import { BorrowController } from './borrow.controller';
import { BorrowService } from '../../services/borrow/borrow.service';
import { createRandomBooks } from '../../../test/utils';
import { BookService } from '../../services/book/book.service';
import { BookController } from '../book/book.controller';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const UserMiddleware = jest.fn().mockImplementation(() => ({
  use: jest.fn(),
}));

describe('BorrowController', () => {
  let controller: BorrowController;
  let borrowService: BorrowService;
  let bookService: BookService;

  const book = createRandomBooks({ amount: 10 });

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      controllers: [BorrowController, BookController],
      providers: [
        {
          provide: UserMiddleware,
          useValue: new UserMiddleware(), // Use the actual class instance
        },
        BorrowService,
        {
          provide: getModelToken(BorrowService.name, 'pikkukirjasto-db'),
          useValue: Model,
        },
        {
          provide: getModelToken(BookService.name, 'pikkukirjasto-db'),
          useValue: Model,
        },
        {
          provide: BookService,
          useValue: {
            findBookByIsbn: jest.fn().mockImplementation((isbn: string) => {
              return Promise.resolve({
                isbn,
                ...book[0],
                save: jest.fn(),
              });
            }),
          },
        },
        {
          provide: BorrowService,
          useValue: {
            returnBook: jest.fn().mockResolvedValue(book[1]),
            getAllBorrowedBook: jest.fn().mockResolvedValue([...book]),
            borrowBook: jest.fn().mockImplementation((borrowBookDto: any) =>
              Promise.resolve({
                _id: 'a uuid',
                ...borrowBookDto,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<BorrowController>(BorrowController);
    borrowService = module.get<BorrowService>(BorrowService);
    bookService = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should insert a new borrow', async () => {
    const newBorrow = {
      ...book[0],
      isBorrowed: true,
      user: 'user uuid',
    };

    const newBorrowData = await controller.borrowBook(newBorrow, {
      locals: {
        user: 'user uuid',
      },
      status: jest.fn().mockImplementation(() => {
        return {
          json: jest.fn().mockImplementation((data) => {
            return data;
          }),
        };
      }),
    });

    expect({
      user: 'user uuid',
      isbn: book[0].isbn,
    }).toEqual({
      user: 'user uuid',
      isbn: newBorrowData.isbn,
    });
  });

  it('should return all borrowed books', async () => {
    await expect(controller.getAllBorrowedBook()).resolves.toEqual([...book]);
  });

  it('should return a borrowed book', async () => {
    expect(
      controller.returnBook({
        user: 'user uuid',
        isbn: book[0].isbn,
      }),
    ).resolves.toEqual(book[1]);
  });
});
