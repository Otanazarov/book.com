import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { Saved } from './entities/saved.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/module/book/entities/book.entity';
import { User } from 'src/module/user/entities/user.entity';
import { FindAllSavedDto } from './dto/findAll-savedDto';
import { Pagination } from 'src/common/util/pagination';
import { ApiResponse } from 'src/common/http/ApiResponse';
import { log } from 'console';

@Injectable()
export class SavedService {
  constructor(
    @InjectRepository(Saved) private readonly savedRepo: Repository<Saved>,
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createSavedDto: CreateSavedDto) {
    const { bookID, userID } = createSavedDto;
    const book = await this.bookRepo.findOneBy({ id: bookID });
    const user = await this.userRepo.findOneBy({ id: userID });
    if (!user) {
      throw new NotFoundException(`user_id ${userID} not found`);
    }
    if (!book) {
      throw new NotFoundException(`post_id ${bookID} not found`);
    }
    const saveExist = await this.savedRepo.exist({
      where: { book, user },
    });

    if (saveExist) {
      throw new NotFoundException(`Saved bolgan`);
    }
    const result = await this.savedRepo.create({ book: book, user: user });
    await this.savedRepo.save(result);
  }

  async findAll(findAllSavedDto: FindAllSavedDto) {
    try {
      const totalPageCount = await this.userRepo.count();
      const { limit, page } = findAllSavedDto;
      const pagination = new Pagination(limit, page, totalPageCount);
      const posts = await this.savedRepo.find({
        take: pagination.limit,
        skip: pagination.offset,
        relations: ['book', 'user'],
        loadRelationIds: true,
      });
      return new ApiResponse(posts, pagination);
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    const save = await this.savedRepo.find({
      where: { user: { id: id } },
      relations: ['book'],
    });
    return save.map((v) => {
      return { name: v.book.bookName, price: v.book.price };
    });
    // if (!savedID) {
    //   throw new NotFoundException(`${id} not found`);
    // }
    // const saved = await this.savedRepo.findOne({
    //   relations: ['book', 'user'],
    //   loadRelationIds: true,
    //   where: { id: id },
    // });
    // return new ApiResponse(save);
  }

  async update(id: number, updateSavedDto: UpdateSavedDto) {
    const saved = await this.savedRepo.findOneBy({ id });
    const { bookID, userID } = updateSavedDto;
    const book = await this.bookRepo.findOneBy({ id: bookID });
    const user = await this.userRepo.findOneBy({ id: userID });
    if (!saved) {
      throw new NotFoundException(`${id} id not found`);
    }
    await this.savedRepo.update({ id }, { book: book, user: user });
  }

  async remove(id: number) {
    await this.savedRepo.remove(await this.savedRepo.findOneBy({ id: id }));
  }
}
