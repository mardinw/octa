import { Controller, Get, Query, Res, Session } from '@nestjs/common';
import { Response } from 'express';
import { AccountService } from 'src/accounts/account.service';
import { ExcelkitService } from 'src/excelkit/excelkit.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly excelService: ExcelkitService,
    private readonly accountService: AccountService,
  ) {}

  @Get('export')
  async exportExcel(@Query('format') format: string, @Res() res: Response, @Session() session: Record<string, any>) {
    if (format === 'excel') {
      const data = await this.accountService.customersAll();

      await this.excelService.streamExcel(data, res)
    }
  }
}
