import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { encrypWithAES } from 'src/common/util/hashing.utils';
import { log } from 'console';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { Pagination } from 'src/common/util/pagination';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ){}

  async search(query) {
    return new ApiResponse(
      await this.userRepo.find({
        where: {
          name: Like(`%${query}%`),
        },
      }),
    );
  }
  async create(createUserDto: CreateUserDto) {
    const {email,name,password} = createUserDto
    const emailVerify = await this.userRepo.findOneBy({email:email})
    if(emailVerify){
      throw new BadRequestException(`email already taken`)
    }
    const hash = await bcrypt.hash(createUserDto.password,1)
    const user = this.userRepo.create({email,name,password:hash});
    this.userRepo.save(user);
    return 'succes';
  }

  async findAll(findAllUserDto:FindAllUserDto) {
    try {
      const totalPageCount = await this.userRepo.count();
      const {limit,page} = findAllUserDto
      const pagination = new Pagination(limit, page, totalPageCount);
      const posts = await this.userRepo.find({
        take: pagination.limit,
        skip: pagination.offset,
      });
      return new ApiResponse(posts, pagination);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepo.findOneBy({telegramUserID:id})
      return new ApiResponse(user)
    } catch (error) {
      throw error
    }
  }
  

  

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOneBy({id})
      if (!user) {
        throw new BadRequestException(`ID not found`);
      }
      if(updateUserDto.email){
       const user = await this.userRepo.exist({where:{email:updateUserDto.email}})
       if(user){
        throw new BadRequestException(`user with email ${updateUserDto.email} already exists`)
       }
      }
      await this.userRepo.update({id},updateUserDto)
    } catch (error) {
      throw error
    }
  }

  async remove(id: number) {
    try {
      await this.userRepo.remove(
        await this.userRepo.findOneBy({ id: id }),
      );
      return { success: true };
    }
     catch (error) {
      throw error
    }
  }
}
