import { Test, TestingModule } from '@nestjs/testing';

import { AnalysesGateway } from './analyses.gateway';

describe('AppGateway', () => {
  let gateway: AnalysesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalysesGateway],
    }).compile();

    gateway = module.get<AnalysesGateway>(AnalysesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
