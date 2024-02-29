import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { AccountService } from 'src/accounts/account.service';
import { ExcelkitService } from 'src/excelkit/excelkit.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [FilesController],
  providers: [ExcelkitService, AccountService, DatabaseService]
})
export class FilesModule {}
