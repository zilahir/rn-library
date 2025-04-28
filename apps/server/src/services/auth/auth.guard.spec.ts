import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, JwtService],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true for a valid token', async () => {
      const mockToken = 'validJwtToken';
      const mockPayload = { sub: 'user123' };
      const mockRequest = {
        headers: { authorization: `Bearer ${mockToken}` },
      } as any;
      const mockExecutionContext = {
        switchToHttp: () => ({ getRequest: () => mockRequest as any }),
      } as any;

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);

      const result = await authGuard.canActivate(mockExecutionContext);

      expect(result).toBe(true);
      expect(mockRequest.user).toEqual(mockPayload);
    });

    it('should throw an UnauthorizedException for an invalid token', async () => {
      const mockToken = 'invalidJwtToken';
      const mockRequest = {
        headers: { authorization: `Bearer ${mockToken}` },
      } as any;
      const mockExecutionContext: ExecutionContext = {
        switchToHttp: () => ({ getRequest: () => mockRequest }),
      } as any;

      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockRejectedValue(new Error('Invalid token'));

      await expect(
        authGuard.canActivate(mockExecutionContext),
      ).rejects.toThrowError(UnauthorizedException);
      expect(mockRequest.user).toBeUndefined();
    });

    it('should throw an UnauthorizedException for missing token', async () => {
      const mockRequest = { headers: {} } as any;
      const mockExecutionContext: ExecutionContext = {
        switchToHttp: () => ({ getRequest: () => mockRequest }),
      } as any;

      await expect(
        authGuard.canActivate(mockExecutionContext),
      ).rejects.toThrowError(UnauthorizedException);
      expect(mockRequest.user).toBeUndefined();
    });
  });
});
