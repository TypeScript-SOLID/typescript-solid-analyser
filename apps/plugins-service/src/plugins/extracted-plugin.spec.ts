import { ExtractedPlugin } from './extracted-plugin';

describe('ExtractedPlugin', () => {
  it('should be defined', () => {
    expect(new ExtractedPlugin(null, null, null)).toBeDefined();
  });
});
