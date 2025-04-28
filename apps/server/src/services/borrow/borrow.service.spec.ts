import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { createMock } from '@golevelup/ts-jest';
import { BorrowController } from '../../controllers/borrow/borrow.controller';
import { BorrowService } from './borrow.service';
import { BorrowDocument } from '../../schemas/borrow/borrow.schema';
import { createRandomBooks } from '../../../test/utils';
import { BookDocument } from '../../schemas/book/book.schema';

describe('BorrowService', () => {
  let controller: BorrowController;
  let service: BorrowService;
  let model: Model<BorrowDocument>;

  const demoBook: Partial<BookDocument>[] = createRandomBooks({ amount: 10 });
  const demoBorow = {
    user: 'a uuid',
    isbn: demoBook[0].isbn,
    book: demoBook[0]._id,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowService,
        {
          provide: getModelToken('Borrow', 'pikkukirjasto-db'),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            exec: jest.fn(),
            populate: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BorrowService>(BorrowService);
    model = module.get<Model<BorrowDocument>>(
      getModelToken('Borrow', 'pikkukirjasto-db'),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should borrow a book', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        ...(demoBorow as any),
      }),
    );

    const newBorrow = await service.borrowBook({
      user: 'a uuid',
      isbn: 'a isbn',
      book: demoBook[0] as BookDocument,
    });

    expect(newBorrow).toEqual(demoBorow);
  });

  it('should return a borroed book', async () => {
    const returnBookDto = {
      user: '6490d76b3bbcf303c1525313',
      isbn: demoBook[0].isbn,
    };

    const demoBorrow = {
      isbn: demoBook[0].isbn,
      user: '6490d76b3bbcf303c1525313',
      isBorrowed: true,
    };

    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue(
      createMock<Query<BorrowDocument, BorrowDocument[]>>({
        exec: jest.fn().mockResolvedValueOnce(demoBorrow),
      }),
    );

    const returnedBook = await service.returnBook(returnBookDto);

    expect(returnedBook).toEqual({
      ...demoBorrow,
    });
  });

  it('should return a borrowed book', async () => {
    jest.spyOn(model, 'find').mockReturnValue(
      createMock<Query<BorrowDocument[], BorrowDocument[]>>({
        populate: jest.fn().mockImplementationOnce(() => ({
          populate: jest.fn().mockResolvedValueOnce([demoBorow]),
        })),
      }),
    );
    const borrows = await service.getAllBorrowedBook();

    expect(borrows).toEqual([demoBorow]);
  });

  it('get borrowed book by user', async () => {
    jest.spyOn(model, 'find').mockReturnValue(
      createMock<Query<BorrowDocument[], BorrowDocument[]>>({
        populate: jest.fn().mockImplementationOnce(() => [demoBorow]),
      }),
    );
    const borrows = await service.getBorrowedBookByUser(
      '6490d76b3bbcf303c1525313',
    );

    expect(borrows).toEqual([demoBorow]);
  });
});
