import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { createReadStream } from 'fs';

@Injectable()
export class ExcelkitService {
  async generateExcel(data: any[], filePath: string): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // add headers to worksheet
    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    data.forEach((row) => {
      const values = headers.map((header) => row[header]);
      worksheet.addRow(values);
    })

    // save workbook to a file
    await workbook.xlsx.writeFile(filePath);
  }

  async streamExcel(data: any[], res: any): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    const headers = Object.keys(data[0]);
    worksheet.addRow(headers);

    data.forEach((row) => {
      const values = headers.map((header) => row[header]);
      worksheet.addRow(values);
    })

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=result.xlsx',
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
