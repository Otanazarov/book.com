import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { decryptWithAES, encrypWithAES } from 'src/common/util/hashing.utils';
import { User } from 'src/module/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/loginDto';
import { log } from 'console';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { email, name, password } = createAuthDto;
    const emailVerify = await this.userRepo.findOneBy({ email: email });
    if (emailVerify) {
      throw new BadRequestException(`${email} already taken`);
    }
    const hashPass = await bcrypt.hash(password, 1);

    const user = this.userRepo.create({ email, name, password: hashPass });
    this.userRepo.save(user);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password, telegramUserID } = loginAuthDto;
    const TgID = await this.userRepo.findOneBy({ telegramUserID });
    // if (TgID) {
    //   throw new BadRequestException(`Telegram botdan registratsiya bo'lgan`);
    // }
    const emailVerify = await this.userRepo.findOneBy({ email: email });
    if (!emailVerify) {
      throw new NotFoundException(`${email} not found`);
    }
    const passVerify = await bcrypt.compare(password, emailVerify.password);
    if (!passVerify) {
      throw new BadRequestException(`${password} the password is incorrect`);
    }
    const jwt = await this.jwtService.signAsync({
      id: emailVerify.id,
      role: emailVerify.role,
    });
    const id = emailVerify.id;
    console.log(telegramUserID, password);

    await this.userRepo.update(
      { id },
      { refresh_token: jwt, telegramUserID: telegramUserID },
    );
    return {
      answer: `Siz ro'yxatdan muvofaqqiyatli o'tdingiz ✅\nBotdan menu foydalanish uchun Menu ni bosing,${jwt}`,
      user: emailVerify.id,
    };
  }

  async logout(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const emailVerify = await this.userRepo.findOneBy({ email: email });
    if (!emailVerify) {
      throw new NotFoundException(`${email} not found`);
    }
    const passVerify = await bcrypt.compare(password, emailVerify.password);
    if (!passVerify) {
      throw new BadRequestException(`${password} the password is incorrect`);
    }
    const id = emailVerify.id;
    await this.userRepo.remove(await this.userRepo.findOneBy({ id: id }));
  }
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  async findOne(id: string) {
    console.log(id);
     
    const userTgID = await this.userRepo.findOneBy({ telegramUserID: id });
    if (userTgID) {
      throw new BadRequestException(`registratsiya bo'lgan`,`${userTgID.id}`);
    }
    return { answer: 'true' };
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
