import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user/user.schema';

describe('AuthService', () => {
  let service: AuthService;
  let user: UserService;
  let jwt: JwtService;

  let model: Model<UserDocument>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,

        {
          provide: getModelToken('User', 'pikkukirjasto-db'),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    user = module.get<UserService>(UserService);
    jwt = module.get<JwtService>(JwtService);
    model = module.get<Model<UserDocument>>(
      getModelToken('User', 'pikkukirjasto-db'),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should auth', async () => {
    jest.spyOn(model, 'findOne').mockImplementationOnce(
      () =>
        Promise.resolve({
          userId: '1234',
        } as any) as any,
    );

    jest.spyOn(jwt, 'signAsync').mockResolvedValue('1234');

    const result = await service.auth('1234');
    expect(result).toEqual({
      token: '1234',
    });
  });

  it('should return a token for a new user', async () => {
    const deviceId = 'newUserDeviceId';
    const newUser = { userId: deviceId };
    const tokenPayload = { sub: newUser.userId };
    const mockedJwtToken = 'mockedJwtToken';

    jest.spyOn(user, 'getUserByDeviceId').mockResolvedValue(null);
    jest.spyOn(user, 'createUser').mockResolvedValue(newUser);

    jest.spyOn(jwt, 'signAsync').mockResolvedValue(mockedJwtToken);

    await service.auth(deviceId);

    expect({
      token: mockedJwtToken,
    }).toEqual({ token: mockedJwtToken });

    expect(jwt.signAsync).toHaveBeenCalledWith(tokenPayload);
  });
});
