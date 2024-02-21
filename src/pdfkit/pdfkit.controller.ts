import { Controller, Get, Header, Res, Session } from '@nestjs/common';
import { AccountService } from 'src/accounts/account.service';
import { Response } from 'express';
import * as PDFDocument from 'pdfkit';
import * as blobStream from 'blob-stream';

@Controller('pdf')
export class PdfkitController {
  constructor(private readonly customerService: AccountService) {}

  @Get('export/all')
  async customersAll(@Res() res: Response, @Session() session:Record<string, any>): Promise<void> {
    if (session.user) {
      const data = await this.customerService.customersAll();

      const doc = new PDFDocument();

      var stream = doc.pipe(blobStream());
      doc.pipe(res);

      doc.fontSize(12);

      const headers = [
        'NO',
        'CARD NUMBER',
        'FIRST NAME',
        'DOB',
        'CURRENT BALANCE',
        'LAST PAYMENT AMOUNT',
        'GA/LP',
        'LEADER',
        'COLLECTOR',
        'ACTION',
        'DESCRIPTION',
        'PERMANENT MESSAGES',
      ];

      // table setup
      const columnWidths = [30, 100, 100, 80, 120, 120, 50, 80, 80, 80, 100, 200];

      let currentX = 50;
      headers.forEach((header, index) => {
        doc.text(header, currentX, 50);
        currentX += columnWidths[index];
      })

      doc.moveDown();

      data.forEach((row, index) => {
        doc.text(index+1);
        doc.text(row.card_number.toString());
        doc.text(row.first_name);
        doc.text(row.dob);
        doc.text(row.current_balance);
        doc.text(row.last_payment_amount);
        doc.text(row.type_account);
        doc.text(row.leader);
        doc.text(row.collector);
        doc.text(row.action);
        doc.text(row.description);
        doc.text(row.permanent_messages);
        doc.moveDown();
      })
      doc.end();
      stream.on('finish', function() {
      });
    } else {
      return res.redirect('/auth/login');
    }
  }
}
