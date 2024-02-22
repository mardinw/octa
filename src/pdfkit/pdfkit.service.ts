import { Injectable, Res } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as blobStream from 'blob-stream';
import { AccountService } from 'src/accounts/account.service';
import { Response } from 'express';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { promisify } from 'util';
import { createWriteStream } from 'fs';

@Injectable()
export class PdfkitService {
  async generateTablePDF(data: any[], filePath: string, res: Response): Promise<void> {
      // const data = await this.customerService.customersAll();

      const doc = new PDFDocument();

      const stream = await createWriteStream(filePath);
      //const stream = doc.pipe(blobStream());
      doc.pipe(res);


      /* versi github
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
      */
     this.drawTable(doc, data, 210, 297);
      doc.end();
      return new Promise<void>((resolve, reject) => {
        stream.on('finish', () => resolve());
        stream.on('error', (error) => reject(error));
      })
    }
      /*
    const doc = new PDFDocument();
    const outputfilePath = 'output.pdf';
    const stream = await fs.createWriteStream(outputfilePath);

    doc.pipe(stream);

    // call fungsi drawtable
    this.drawTable(doc, data, 210, 297);

    doc.end();

    return new Promise<void>((resolve, reject) => {
      stream.on('finish', () => resolve());
      stream.on('error', (error) => reject(error));
    })
  }*/

  private drawTable(doc: PDFDocument, data: any[][], pageWidth: number, pageHeight: number) {

    const columnWidth = pageWidth / Object.keys(data[0]).length;
    const cellPadding = 5;

    doc.font('Helvetica-Bold');

    // create header tabel
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

    // draw headers
    headers.forEach((header, colIndex) => {
      const x = colIndex * columnWidth;
      const y = 0;
      //  doc.text(header)
      // draw cell headers
      //doc.rect(x, y, columnWidth, 20).fillAndStroke('#2E2E2E', 'black');
      // adding text
      doc.fillColor('black').text(header, x + cellPadding, y + cellPadding);
      //doc.fillColor('black');
    });

    doc.moveDown();

    /*
    data.forEach((row, rowIndex) => {
      console.log(row, rowIndex);
      row.forEach((key, colIndex) => {
        const x = colIndex * columnWidth;
        const y = (rowIndex + 1) * 20;

        console.log('Data', row[key]);
        doc.rect(x || 0, y || 0, columnWidth, 20).fillAndStroke('#2E2E2E', 'black');

        // tambahkan teks didalam sel dengan padding
        const cellValue = (row[key] instanceof Date) ? row[key].toLocaleDateString(): String(row[key]);

        doc.fillColor('#FFFFFF').text(cellValue, (x || 0) + cellPadding, (y || 0) + cellPadding);
        doc.fillColor('black');
      })
    })*/
  }
}

