import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomerController } from './customers/customer.controller';
import { CustomerService } from './customers/customer.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
  }), AuthModule, UsersModule, PrismaModule,
  ],
  controllers: [AppController, CustomerController],
  providers: [CustomerService, PrismaService],
})

export class AppModule {}
