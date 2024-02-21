import { Test, TestingModule } from '@nestjs/testing';
import { PdfkitController } from './pdfkit.controller';

describe('PdfkitController', () => {
  let controller: PdfkitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfkitController],
    }).compile();

    controller = module.get<PdfkitController>(PdfkitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
