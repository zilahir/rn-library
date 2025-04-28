import { UserMiddleware } from './user.middleware';
import { Request, Response, NextFunction } from 'express';

describe('UserMiddleware', () => {
  let userMiddleware: UserMiddleware;
  let mockUserService: { getUserByDeviceId: jest.Mock };

  const createMockRequest = () => {
    return {
      body: {
        user: 'user_device_id',
      },
    } as Request;
  };

  const createMockResponse = () => {
    const res = {} as Response;
    res.locals = {};
    return res;
  };

  const createMockNext = () => {
    return jest.fn() as NextFunction;
  };

  beforeEach(() => {
    mockUserService = {
      getUserByDeviceId: jest.fn(),
    };

    userMiddleware = new UserMiddleware(mockUserService as any);
  });

  it('should set user in response.locals when user is found', async () => {
    const mockRequest = createMockRequest();
    const mockResponse = createMockResponse();
    const mockNext = createMockNext();

    mockUserService.getUserByDeviceId.mockResolvedValue({
      userId: 'user_device_id',
    });

    await userMiddleware.use(mockRequest, mockResponse, mockNext);

    expect(mockUserService.getUserByDeviceId).toHaveBeenCalledWith(
      'user_device_id',
    );
    expect(mockResponse.locals.user).toBeDefined();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should call next when user is not found', async () => {
    const mockRequest = createMockRequest();
    const mockResponse = createMockResponse();
    const mockNext = createMockNext();

    mockUserService.getUserByDeviceId.mockResolvedValue(null);

    await userMiddleware.use(mockRequest, mockResponse, mockNext);

    expect(mockUserService.getUserByDeviceId).toHaveBeenCalledWith(
      'user_device_id',
    );
    expect(mockResponse.locals.user).toBeUndefined();
    expect(mockNext).toHaveBeenCalled();
  });
});
