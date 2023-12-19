import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDostavkaDto } from './dto/create-dostavka.dto';
import { UpdateDostavkaDto } from './dto/update-dostavka.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dostavka } from './entities/dostavka.entity';
import { Repository } from 'typeorm';
import { User } from 'src/module/user/entities/user.entity';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { FindAllDostavkaDto } from './dto/findAll-dostavkaDto';
import { Pagination } from 'src/common/util/pagination';

@Injectable()
export class DostavkaService {
  constructor(
    @InjectRepository(Dostavka)
    private readonly dostavkaRepo: Repository<Dostavka>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createDostavkaDto: CreateDostavkaDto) {
    const { address, house, phoneNumber, street, timeDastavka, user_id } =
      createDostavkaDto;
    const userID = await this.userRepo.findOneBy({ id: user_id });
    if (!userID) {
      throw new NotFoundException(`${userID} not found`);
    }
    const dostavka = await this.dostavkaRepo.create(createDostavkaDto);
    dostavka.user = userID;
    await this.dostavkaRepo.save(dostavka);
  }

  async findAll(findAllDostavkaDto: FindAllDostavkaDto) {
    try {
      const totalPageCount = await this.userRepo.count();
      const { limit, page } = findAllDostavkaDto;
      const pagination = new Pagination(limit, page, totalPageCount);
      const posts = await this.dostavkaRepo.find({
        take: pagination.limit,
        skip: pagination.offset,
        relations: ['user'],
        loadRelationIds: true,
      });
      return new ApiResponse(posts, pagination);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const dostavkaID = await this.dostavkaRepo.findOneBy({ id });
    if (!dostavkaID) {
      throw new NotFoundException(`${dostavkaID} not found`);
    }
    const result = await this.dostavkaRepo.findOne({
      relations: ['user'],
      where: { id: id },
    });
    return new ApiResponse(result);
  }

  async update(id: number, updateDostavkaDto: UpdateDostavkaDto) {
    const dostavkaID = await this.dostavkaRepo.findOneBy({ id });
    const { address, house, phoneNumber, street, timeDastavka, user_id } =
      updateDostavkaDto;
    const userDostavka = await this.userRepo.findOneBy({ id: user_id });
    if (!dostavkaID) {
      throw new NotFoundException(`${dostavkaID} not found`);
    }
    await this.dostavkaRepo.update(
      { id },
      { address, house, phoneNumber, street, timeDastavka, user: userDostavka },
    );
  }

  async remove(id: number) {
    const dostavkaID = await this.dostavkaRepo.findOneBy({ id });
    await this.dostavkaRepo.remove(
      await this.dostavkaRepo.findOneBy({ id: id }),
    );
  }
}
