import { Module } from '@nestjs/common';
import { PdfkitController } from './pdfkit.controller';
import { AccountService } from 'src/accounts/account.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [PdfkitController],
  providers: [AccountService, DatabaseService],
})
export class PdfkitModule {}
