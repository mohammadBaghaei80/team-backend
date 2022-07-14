import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserInfoEntity } from './entities/user-info.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfiguration } from '../../configuration/app/jwt.configuration';
import { JwtStrategy } from '../../strategies/jwt.strategy';

@Module({
  imports: [JwtModule.registerAsync({ useClass: JwtConfiguration }),
    TypeOrmModule.forFeature([UserEntity, UserInfoEntity])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})

export class AuthModule {
}