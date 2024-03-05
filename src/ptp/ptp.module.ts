import { Module } from '@nestjs/common';
import { PtpService } from './ptp.service';
import { PtpController } from './ptp.controller';

@Module({
  providers: [PtpService],
  controllers: [PtpController]
})
export class PtpModule {}
