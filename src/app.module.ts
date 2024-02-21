import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AccountController } from './accounts/account.controller';
import { AccountService } from './accounts/account.service';
import { AuthModule } from './auth/auth.module';
//import { PrismaService } from './prisma/prisma.service';
//import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { PdfkitModule } from './pdfkit/pdfkit.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true,
  }), AuthModule, AdminModule, DatabaseModule, UsersModule, PdfkitModule,
  ],
  controllers: [AppController, AccountController, UsersController],
  providers: [AccountService, DatabaseService, UsersService],
})

export class AppModule {}
