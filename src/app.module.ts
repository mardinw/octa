import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './models/customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './models/customer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.18.0.3',
      port: 3306,
      username: 'root',
      password: 'udin4j4',
      database: 'u1779231_octa_bni',
      entities: [Customer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers: [AppController, CustomerController],
  providers: [CustomerService],
})

export class AppModule {}
