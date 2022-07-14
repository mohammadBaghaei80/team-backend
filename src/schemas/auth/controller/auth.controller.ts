import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UseJwtGuard } from '../../../guards/jwt.guard';
import { JwtUserInfo } from '../../../decorators/jwt-user-info.decorator';
import { IJwtUserInfo } from '../interfaces/jwt-user-info.interface';
import { UseBearerAuth } from '../../../configuration/swagger/use-bearer-auth.decorator';
import { CreateUserProfileDto } from '../dto/create-user-info.dto';
import { UserInfoEntity } from '../entities/user-info.entity';
import { LoginDto } from '../dto/login.dto';

@ApiTags('[Auth]')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('register')
  async registerUser(@Body() userRegisterDto: LoginDto): Promise<any> {
    return await this.authService.register((userRegisterDto))
  }

  @Post('login')
  async loginUser(@Body() userLoginDto: LoginDto): Promise<any> {
    return await this.authService.login(userLoginDto)
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Post('profile')
  async userProfile(@JwtUserInfo() userInfo: IJwtUserInfo, @Body() createUserProfileDto: CreateUserProfileDto): Promise<any> {
    return this.authService.userProfile(userInfo, createUserProfileDto);
  }

  @UseBearerAuth()
  @UseJwtGuard()
  @Put('profile')
  async updateUserProfile(@JwtUserInfo() userInfo: IJwtUserInfo, @Body() updateProfileDto: CreateUserProfileDto): Promise<UserInfoEntity> {
    return this.authService.updateUserProfile(userInfo, updateProfileDto);
  }

  @UseJwtGuard()
  @UseBearerAuth()
  @Get('user')
  async findUserByToken(@JwtUserInfo() userInfo: IJwtUserInfo): Promise<any> {
    return this.authService.findUserByToken(userInfo);
  }

}