import { Controller, Get, Post, Query, Res, Session, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AccountService } from 'src/accounts/account.service';
import { ExcelkitService } from 'src/excelkit/excelkit.service';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly excelService: ExcelkitService,
    private readonly accountService: AccountService,
    private readonly fileService: FilesService,
  ) {}

  @Get('export')
  async exportExcel(@Query('format') format: string, @Query('select') select: string, @Res() res: Response, @Session() session: Record<string, any>) {
    if (format === 'excel' && select) {
      const selectNumber = parseInt(select, 10)
      const data = await this.accountService.customerCardNumber(selectNumber);

      await this.excelService.streamExcel(data as any[], res);
    } else if (format === "excel") {
      const data = await this.accountService.customersAll();

      await this.excelService.streamExcel(data, res);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Session() session: Record<string, any>): Promise<string> {
    return this.fileService.saveFile(file);
  }

  @Get('list')
  async getFiles(): Promise<string[]> {
    return this.fileService.getFiles();
  }
}
