import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomerController } from './customers/customer.controller';
import { CustomerService } from './customers/customer.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
  }), AuthModule, UsersModule,
  ],
  controllers: [AppController, CustomerController],
  providers: [CustomerService],
})

export class AppModule {}
