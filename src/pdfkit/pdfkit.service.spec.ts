import { Test, TestingModule } from '@nestjs/testing';
import { PdfkitService } from './pdfkit.service';

describe('PdfkitService', () => {
  let service: PdfkitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfkitService],
    }).compile();

    service = module.get<PdfkitService>(PdfkitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
