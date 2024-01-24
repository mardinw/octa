import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomerController } from './customers/customer.controller';
import { CustomerService } from './customers/customer.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
  })],
  controllers: [AppController, CustomerController],
  providers: [CustomerService],
})

export class AppModule {}
