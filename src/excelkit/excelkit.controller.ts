import { Controller, Get, Res } from '@nestjs/common';
import { ExcelkitService } from './excelkit.service';
import { AccountService } from 'src/accounts/account.service';

@Controller('excel')
export class ExcelkitController {
  constructor(
    private readonly excelService: ExcelkitService,
    private readonly accountService: AccountService,
  ) {}

  /*
  @Get('generate')
  async generateExcel() {
    const data = await this.accountService.customersAll();
    const filePath = 'external/excel/result.xlsx';

    await this.excelService.generateExcel(data, filePath);

    console.log('excel file generated!');
  }
*/

  @Get('exports')
  async streamExcel(@Res() res) {
    const data = await this.accountService.customersAll();

    await this.excelService.streamExcel(data, res);
  }
}
