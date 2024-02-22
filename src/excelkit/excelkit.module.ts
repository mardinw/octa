import { Module } from '@nestjs/common';
import { ExcelkitService } from './excelkit.service';
import { ExcelkitController } from './excelkit.controller';
import { AccountService } from 'src/accounts/account.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [ExcelkitService, AccountService, DatabaseService],
  controllers: [ExcelkitController]
})
export class ExcelkitModule {}
