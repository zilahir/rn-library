import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../services/user/user.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user/user.schema';

describe('AuthController', () => {
  let controller: AuthController;

  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        UserService,
        {
          provide: getModelToken(User.name, 'pikkukirjasto-db'),
          useValue: {
            findOne: jest.fn(),
            new: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            auth: jest.fn().mockImplementation((token: string) => ({
              token,
            })),
            getUserByDeviceId: jest
              .fn()
              .mockImplementation((deviceId: string) => {
                const user = {
                  userId: deviceId,
                };
                return Promise.resolve(user);
              }),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signs in', async () => {
    const loginRequest = await controller.signIn({
      deviceId: '1234',
    });

    expect(loginRequest).toBeDefined();
  });
});
