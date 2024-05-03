import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { PdfController } from './pdf.controller';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'invoice.cet.ak47',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, PdfController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
