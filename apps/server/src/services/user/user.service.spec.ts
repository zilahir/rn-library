import { Model } from 'mongoose';
import { UserController } from '../../controllers/user/user.controller';
import { UserService } from './user.service';
import { UserDocument } from '../../schemas/user/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  let controller: UserController;
  let service: UserService;
  let model: Model<UserDocument>;

  const demoUser = {
    _id: 'a user id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User', 'pikkukirjasto-db'),
          useValue: {
            findOne: jest.fn().mockImplementation(() => demoUser),
            find: jest.fn(),
            create: jest.fn().mockImplementation(() => demoUser),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserDocument>>(
      getModelToken('User', 'pikkukirjasto-db'),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('gets user by device id', async () => {
    const tempUser = {
      _id: 'a user id',
    };

    const user = await service.getUserByDeviceId('1234');

    expect(user).toEqual(tempUser);
  });

  it('get user by id', async () => {
    const tempUser = {
      _id: 'a user id',
    };
    const user = await service.getUserById(tempUser._id);

    expect(user).toEqual(tempUser);
  });

  it('creates a user', async () => {
    const newUser = await service.createUser({
      userId: 'a user id',
    });

    expect(newUser).toBe(demoUser);
  });
});
