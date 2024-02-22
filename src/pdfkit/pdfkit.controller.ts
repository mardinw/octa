import { Controller, Get, Header, Res, Session } from '@nestjs/common';
import { AccountService } from 'src/accounts/account.service';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';
import * as blobStream from 'blob-stream';
import { PdfkitService } from './pdfkit.service';

@Controller('pdf')
export class PdfkitController {
  constructor(
    private readonly pdfKit: PdfkitService,
    private readonly accountService: AccountService,
  ) {}

  @Get('export/all')
  async customersAll(@Res() res: Response, @Session() session:Record<string, any>): Promise<void> {
      try {
        const rowData = await this.accountService.customersAll();
        await this.pdfKit.generateTablePDF(rowData, res);
        console.log('table pdf generated successfully')
      } catch (err) {
        console.error(err);
      }
  }
}

