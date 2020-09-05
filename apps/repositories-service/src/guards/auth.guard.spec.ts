import { AuthGuard } from './auth.guard';

const configService = null;

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(configService)).toBeDefined();
  });
});
