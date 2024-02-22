import { Test, TestingModule } from '@nestjs/testing';
import { ExcelkitService } from './excelkit.service';

describe('ExcelkitService', () => {
  let service: ExcelkitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcelkitService],
    }).compile();

    service = module.get<ExcelkitService>(ExcelkitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
