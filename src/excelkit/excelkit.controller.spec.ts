import { Test, TestingModule } from '@nestjs/testing';
import { ExcelkitController } from './excelkit.controller';

describe('ExcelkitController', () => {
  let controller: ExcelkitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcelkitController],
    }).compile();

    controller = module.get<ExcelkitController>(ExcelkitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
