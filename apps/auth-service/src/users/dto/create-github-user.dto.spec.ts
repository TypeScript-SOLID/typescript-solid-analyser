import { CreateGithubUserDto } from './create-github-user.dto';

describe('UserDto', () => {
  it('should be defined', () => {
    expect(new CreateGithubUserDto('', '', '', '')).toBeDefined();
  });
});
