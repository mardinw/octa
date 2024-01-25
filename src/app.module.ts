import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomerController } from './customers/customer.controller';
import { CustomerService } from './customers/customer.service';
import { ExpressAdapter } from '@nestjs/platform-express';
import { extname, join } from 'path';
import exphbs from 'express-handlebars';
import { indexHelper } from './helpers/handlebars-helper';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
  })],
  controllers: [AppController, CustomerController],
  providers: [CustomerService],
})

export class AppModule {}
