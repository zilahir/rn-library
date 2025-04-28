import { Test, TestingModule } from '@nestjs/testing';
import { UserController, PikkuKirjastoUser } from './user.controller';
import { UserService } from '../../services/user/user.service';
import { BorrowService } from '../../services/borrow/borrow.service';
import { User } from '../../schemas/user/user.schema';
import { Borrow } from '../../schemas/borrow/borrow.schema';
import { BorrowController } from '../borrow/borrow.controller';
import { BookService } from '../../services/book/book.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  let borrowService: BorrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController, BorrowController],
      // imports: [BookService],
      providers: [
        BorrowService,
        {
          provide: BorrowService,
          useValue: {
            getBorrowedBookByUser: jest.fn().mockResolvedValue([]),
            returnBook: jest.fn().mockResolvedValue({}),
            getAllBorrowedBook: jest.fn().mockResolvedValue([]),
            borrowBook: jest.fn().mockImplementation((borrowBookDto: any) =>
              Promise.resolve({
                _id: 'a uuid',
                ...borrowBookDto,
              }),
            ),
          },
        },
        {
          provide: BookService,
          useValue: {
            findBookByIsbn: jest.fn().mockImplementation(() => {
              return Promise.resolve({});
            }),
          },
        },
        UserService,
        {
          provide: UserService,
          useValue: {
            getUserByDeviceId: jest
              .fn()
              .mockImplementation((userId: string) => {
                return Promise.resolve({
                  userId,
                });
              }),
            createUser: jest.fn().mockImplementation((user: User) => {
              return Promise.resolve({
                _id: 'a uuid',
                ...user,
              });
            }),
            getUserById: jest.fn().mockImplementation((userId: string) => {
              return Promise.resolve({
                userId,
                _id: 'userId123',
              });
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    borrowService = module.get<BorrowService>(BorrowService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get a user by ID', async () => {
    const userId = 'user123';
    const user = { userId, _id: 'userId123' };

    jest.spyOn(userService, 'getUserById').mockResolvedValue(user);

    const result = await controller.getUser(userId);
    expect(result).toEqual(user);
  });

  it('should create a user', async () => {
    const createUserDto: PikkuKirjastoUser = {
      userId: 'newUser',
      _id: 'newUserId',
    };

    jest.spyOn(userService, 'createUser').mockResolvedValue(createUserDto);

    const result = await controller.createUser(createUserDto);
    expect(result).toEqual(createUserDto);
  });

  it('should get users borrows', async () => {
    const userId = 'user123';
    const thisUser = { userId, _id: 'userId123' } as any;
    const borrows = [
      /* Your mock borrows here */
    ];

    jest.spyOn(userService, 'getUserByDeviceId').mockResolvedValue(thisUser);
    jest
      .spyOn(borrowService, 'getBorrowedBookByUser')
      .mockResolvedValue(borrows);

    const result = await controller.getUsersBorros(userId);
    expect(result).toEqual(borrows);
  });
});
