import { AuthGuard } from './auth.guard';

const jwtService = null;

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(jwtService)).toBeDefined();
  });
});
