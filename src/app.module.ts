import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AccountController } from './accounts/account.controller';
import { AccountService } from './accounts/account.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
  }), AuthModule, UsersModule, PrismaModule, AdminModule,
  ],
  controllers: [AppController, AccountController],
  providers: [AccountService, PrismaService],
})

export class AppModule {}
