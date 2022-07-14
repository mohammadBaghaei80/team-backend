import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtUserInfo } from '../interfaces/jwt-user-info.interface';
import { UserInfoEntity } from '../entities/user-info.entity';
import { CreateUserProfileDto } from '../dto/create-user-info.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from '../enums/role.enum';
import { generateHashedString } from '../../../utils/utils';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
              @InjectRepository(UserInfoEntity) private userProfileRepo: Repository<UserInfoEntity>,
              private jwtService: JwtService,
  ) {
    this.userRepo.findOne({ where: { username: 'admin' } }).then((res) => {
      if (!res) {
        this.userRepo.save({
          username: 'admin',
          password: generateHashedString('admin'),
          role: RoleEnum.Admin,
        }).then(
          (r) => console.log('Admin User created...'),
        );
      }
    });
  }

  async validateUser(userLoginDto: LoginDto): Promise<any> {
    const findUser = await this.userRepo.findOne({ where: { username: userLoginDto.username } });

    if (!findUser) throw new BadRequestException('user not found');

    if (!bcrypt.compareSync(userLoginDto.password, findUser.password)) throw new BadRequestException('password incorrect');

    const { password, ...result } = findUser;

    return result;
  }

  async register(register: LoginDto): Promise<any> {
    const hashPassword = bcrypt.hashSync(register.password, 15);
    const user = new UserEntity();
    user.username = register.username;
    user.password = hashPassword;
    await this.userRepo.save(await this.userRepo.create(user));
    return true;
  }

  async login(login: LoginDto): Promise<any> {
    const user = await this.validateUser(login);
    return this.generateToken(user);
  }

  async userProfile(userInfo: IJwtUserInfo, createUserProfileDto: CreateUserProfileDto): Promise<UserInfoEntity> {
    const findUser = await this.userRepo.findOne({ where: { id: userInfo.userId }, relations: ["obj_userInfo"] });

    const userProfile = new UserInfoEntity();
    userProfile.firstName = createUserProfileDto.firstName;
    userProfile.lastName = createUserProfileDto.lastName;
    userProfile.email = createUserProfileDto.email;
    userProfile.mobile = createUserProfileDto.mobile;
    userProfile.city = createUserProfileDto.city;
    userProfile.gender = createUserProfileDto.gender;
    const saveProfile = await this.userProfileRepo.save(await this.userProfileRepo.create(userProfile));

    findUser.obj_userInfo = saveProfile;
    await this.userRepo.save(await this.userRepo.create(findUser));

    return saveProfile;
  }

  async updateUserProfile(userInfo: IJwtUserInfo, updateProfileDto: CreateUserProfileDto): Promise<UserInfoEntity> {
    const findUser = await this.userRepo.findOne({
      where: { id: userInfo.userId },
      relations: ['obj_userInfo'],
    });
    if (!findUser.obj_userInfo)
      throw new BadRequestException(`You dont have profile yet`);

    findUser.obj_userInfo.firstName = updateProfileDto.firstName;
    findUser.obj_userInfo.lastName = updateProfileDto.lastName;
    findUser.obj_userInfo.email = updateProfileDto.email;
    findUser.obj_userInfo.mobile = updateProfileDto.mobile;
    findUser.obj_userInfo.city = updateProfileDto.city;
    findUser.obj_userInfo.gender = updateProfileDto.gender;
    return await this.userProfileRepo.save(await this.userProfileRepo.create(findUser.obj_userInfo));
  }

  async findUserByToken(userInfo: IJwtUserInfo): Promise<any> {
    const user = await this.userRepo.findOne({ where: { id: userInfo.userId }, relations: ['obj_userInfo'] });
    const { password, ...res } = user;
    return res;
  }

  private generateToken(user: UserEntity): string {
    const payload = { userId: user.id, userRole: user.role };
    return this.jwtService.sign(payload, { expiresIn: '12h' });
  }
}