import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
//import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from './local.strategy';
//import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from 'src/app.module';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DatabaseService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
