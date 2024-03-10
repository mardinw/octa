import { Module } from '@nestjs/common';
import { PtpService } from './ptp.service';
import { PtpController } from './ptp.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [PtpService, DatabaseService],
  controllers: [PtpController]
})
export class PtpModule {}
