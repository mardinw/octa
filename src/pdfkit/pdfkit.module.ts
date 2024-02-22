import { Module } from '@nestjs/common';
import { PdfkitController } from './pdfkit.controller';
import { AccountService } from 'src/accounts/account.service';
import { DatabaseService } from 'src/database/database.service';
import { PdfkitService } from './pdfkit.service';

@Module({
  controllers: [PdfkitController],
  providers: [AccountService, DatabaseService, PdfkitService],
})
export class PdfkitModule {}
